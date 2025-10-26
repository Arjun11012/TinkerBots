import { Router, Request, Response } from "express";
// const StellarSdk = require('stellar-sdk');
import * as StellarSdk from "stellar-sdk"

const router = Router();

// Debug endpoint to check environment variables
router.get('/debug-env', (req: Request, res: Response) => {
  res.json({
    STELLAR_SECRET_KEY: process.env.STELLAR_SECRET_KEY ? '*** (exists)' : 'Not found',
    PING_MESSAGE: process.env.PING_MESSAGE || 'Not found',
    NODE_ENV: process.env.NODE_ENV || 'development',
    allEnv: process.env
  });
});

// Token creation endpoint
router.post("/create-token", async (req: Request, res: Response) => {
  try {
    const { 
      tokenCode, 
      amount = '100',
      destinationAccount
    } = req.body;

    // Validate required fields
    if (!tokenCode) {
      return res.status(400).json({
        success: false,
        error: "Token code is required",
      });
    }

    // Validate token code format (1-12 alphanumeric characters)
    if (!/^[a-zA-Z0-9]{1,12}$/.test(tokenCode)) {
      return res.status(400).json({
        success: false,
        error: "Token code must be 1-12 alphanumeric characters",
      });
    }

    // Get the secret key from environment
    const secretKey = process.env.STELLAR_SECRET_KEY;
    if (!secretKey) {
      return res.status(500).json({
        success: false,
        error: "Stellar secret key not configured",
      });
    }

    // Initialize Stellar SDK
    const { 
      Keypair, 
      Horizon, 
      TransactionBuilder, 
      Networks, 
      Operation, 
      Asset, 
      BASE_FEE 
    } = StellarSdk;

    // Initialize server and keypairs
    const server = new Horizon.Server('https://horizon-testnet.stellar.org');
    const networkPassphrase = Networks.TESTNET;
    
    // Create keypairs
    const issuerKeypair = Keypair.fromSecret(secretKey);
    
    // If no destination account is provided, just return the token details
    if (!destinationAccount) {
      return res.json({
        success: true,
        message: `Token ${tokenCode} is ready to be issued by ${issuerKeypair.publicKey()}`,
        tokenDetails: {
          code: tokenCode,
          issuer: issuerKeypair.publicKey(),
          asset: `${tokenCode}:${issuerKeypair.publicKey()}`,
          next_steps: [
            `To distribute tokens, provide a destination account and call this endpoint again`,
            'Recipients must establish a trustline to this asset before they can receive it'
          ]
        }
      });
    }

    try {
      // Load accounts
      const issuerAccount = await server.loadAccount(issuerKeypair.publicKey());
      const destinationAccountObj = await server.loadAccount(destinationAccount);
      
      // Create the asset
      const asset = new Asset(tokenCode, issuerKeypair.publicKey());

      // Check if trustline exists
      const trustlineExists = destinationAccountObj.balances.some(
        balance => 
          balance.asset_code === tokenCode && 
          balance.asset_issuer === issuerKeypair.publicKey()
      );

      // Build transaction
      const transaction = new TransactionBuilder(issuerAccount, {
        fee: BASE_FEE,
        networkPassphrase,
      });

      // Add trustline operation if needed
      if (!trustlineExists) {
        transaction.addOperation(
          Operation.changeTrust({
            asset: asset,
            source: destinationAccount,
          })
        );
      }

      // Add payment operation
      transaction.addOperation(
        Operation.payment({
          destination: destinationAccount,
          asset: asset,
          amount: amount.toString(),
        })
      );

      // Build and sign transaction
      const builtTx = transaction
        .setTimeout(30)
        .build();
      
      builtTx.sign(issuerKeypair);
      
      // If we needed to add a trustline, sign with destination's key if provided
      if (!trustlineExists && req.body.destinationSecret) {
        const destinationKeypair = Keypair.fromSecret(req.body.destinationSecret);
        builtTx.sign(destinationKeypair);
      }

      // Submit transaction
      const response = await server.submitTransaction(builtTx);

      return res.json({
        success: true,
        message: `Successfully issued ${amount} ${tokenCode} to ${destinationAccount}`,
        transactionHash: response.hash,
        tokenDetails: {
          code: tokenCode,
          issuer: issuerKeypair.publicKey(),
          asset: `${tokenCode}:${issuerKeypair.publicKey()}`,
          amount_issued: amount,
          distributed_to: destinationAccount
        }
      });
    } catch (error: any) {
      console.error('Error in token creation:', error);
      throw new Error(`Failed to create token: ${error.message}`);
    }
  } catch (error: any) {
    console.error("Error creating token:", error);

    // Handle specific Stellar errors
    if (error.response?.data?.extras?.result_codes) {
      const codes = error.response.data.extras.result_codes;
      res.status(400).json({
        success: false,
        error: "Failed to create token on Stellar",
        details: codes,
        message: error.message,
      });
    } else {
      res.status(500).json({
        success: false,
        error: "Failed to create token",
        message: error.message,
      });
    }
  }
});

export const stellarRouter = router;
