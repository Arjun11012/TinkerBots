import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { useState } from "react";
import { ChevronRight, CheckCircle2, AlertCircle, Loader } from "lucide-react";

interface SubmitResponse {
  success: boolean;
  message: string;
  transactionHash?: string;
  tokenDetails?: {
    code: string;
    issuer: string;
    name: string;
    description: string;
  };
}

export default function SubmitToken() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [submitResponse, setSubmitResponse] = useState<SubmitResponse | null>(null);
  const [formData, setFormData] = useState({
    tokenName: "",
    tokenCode: "",
    issuerAccount: "",
    description: "",
    logoUrl: "",
    domain: "",
    website: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setError("");
  };

  const validateForm = (): boolean => {
    if (!formData.tokenName.trim()) {
      setError("Token name is required");
      return false;
    }
    if (!formData.tokenCode.trim()) {
      setError("Token code is required");
      return false;
    }
    if (!formData.issuerAccount.trim()) {
      setError("Issuer account is required");
      return false;
    }
    if (formData.tokenCode.length > 12) {
      setError("Token code must be 12 characters or less");
      return false;
    }
    if (formData.issuerAccount.length !== 56 || !formData.issuerAccount.startsWith('G')) {
      setError("Issuer account must be a valid Stellar public key (56 characters, starting with 'G')");
      return false;
    }
    return true;
  };

  const handleSubmitToken = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      // Create token on Stellar Testnet
      const stellarResponse = await fetch("/api/stellar/create-token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tokenCode: formData.tokenCode,
          issuerAccount: formData.issuerAccount,
          tokenName: formData.tokenName,
          description: formData.description,
        }),
      });

      // Check response status first before trying to parse
      if (!stellarResponse.ok) {
        let errorMessage = "Failed to create token on Stellar";
        try {
          const errorData = await stellarResponse.json();
          errorMessage = errorData.error || errorData.message || errorMessage;
        } catch {
          // If response body is not JSON, use default error message
        }
        throw new Error(errorMessage);
      }

      const stellarData = (await stellarResponse.json()) as SubmitResponse;

      if (!stellarData.success) {
        throw new Error(
          stellarData.error || "Failed to create token on Stellar"
        );
      }

      // Save to localStorage after successful Stellar creation
      const submissions = JSON.parse(localStorage.getItem("token_submissions") || "[]");
      submissions.push({
        ...formData,
        id: `token_${Date.now()}`,
        submittedAt: new Date().toISOString(),
        transactionHash: stellarData.transactionHash,
        stellarStatus: "created",
      });
      localStorage.setItem("token_submissions", JSON.stringify(submissions));

      setSubmitResponse(stellarData);
      setSubmitted(true);
      setStep(1);
      setFormData({
        tokenName: "",
        tokenCode: "",
        issuerAccount: "",
        description: "",
        logoUrl: "",
        domain: "",
        website: "",
      });

      // Reset success message after 8 seconds
      setTimeout(() => setSubmitted(false), 8000);
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Failed to create token on Stellar. Please try again.";
      setError(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const handlePreviousStep = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {/* Page Header */}
          <div className="border-b border-border p-6 sm:p-8 bg-secondary">
            <h1 className="text-3xl font-bold text-foreground mb-2">Submit Your Token for Listing</h1>
            <p className="text-muted-foreground">
              Provide comprehensive details about your Stellar asset to get it listed on the marketplace.
            </p>
          </div>

          {/* Form */}
          <div className="p-6 sm:p-8">
            <div className="max-w-2xl mx-auto">
              {/* Success Message */}
              {submitted && submitResponse && (
                <div className="mb-6 p-6 bg-success/10 border border-success/20 rounded-xl flex gap-4 animate-in">
                  <CheckCircle2 className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-success mb-2">Token Created Successfully on Stellar Testnet!</h3>
                    <p className="text-sm text-success/80 mb-3">
                      Your token has been created and is now on the Stellar Testnet.
                    </p>
                    <div className="bg-black/5 rounded p-3 space-y-2 text-xs font-mono">
                      <div>
                        <span className="text-muted-foreground">Token Code: </span>
                        <span className="text-foreground font-semibold">{submitResponse.tokenDetails?.code}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Issuer: </span>
                        <span className="text-foreground font-semibold break-all">
                          {submitResponse.tokenDetails?.issuer}
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Transaction Hash: </span>
                        <span className="text-foreground font-semibold break-all">
                          {submitResponse.transactionHash}
                        </span>
                      </div>
                      {submitResponse.transactionHash && (
                        <div>
                          <a
                            href={`https://stellar.expert/explorer/testnet/tx/${submitResponse.transactionHash}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline"
                          >
                            View on Stellar Expert →
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Progress Steps */}
              {!submitted && (
                <div className="mb-12">
                  <div className="flex justify-between mb-4">
                    {[
                      { num: 1, label: "Basic Info" },
                      { num: 2, label: "Detailed Info" },
                      { num: 3, label: "Review & Submit" },
                    ].map((item) => (
                      <div key={item.num} className="flex items-center flex-1">
                        <div
                          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm transition-colors ${
                            step === item.num
                              ? "bg-primary text-primary-foreground"
                              : step > item.num
                              ? "bg-success text-success-foreground"
                              : "bg-secondary text-muted-foreground"
                          }`}
                        >
                          {step > item.num ? "✓" : item.num}
                        </div>
                        <div
                          className={`h-1 flex-1 mx-2 ${
                            step > item.num ? "bg-success" : "bg-border"
                          }`}
                        />
                        <p className="text-xs font-medium text-muted-foreground hidden sm:block">{item.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Form Content */}
              {!submitted && (
                <div className="bg-white rounded-xl border border-border p-8">
                  {/* Error Alert */}
                  {error && (
                    <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex gap-3">
                      <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}

                  {step === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">1. Basic Info</h2>
                        <p className="text-muted-foreground mb-6">Provide basic information about your token.</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Token Name</label>
                        <input
                          type="text"
                          name="tokenName"
                          placeholder="e.g., Stellar USD"
                          value={formData.tokenName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Token Code</label>
                        <input
                          type="text"
                          name="tokenCode"
                          placeholder="e.g., USDC"
                          value={formData.tokenCode}
                          onChange={handleInputChange}
                          maxLength={12}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <p className="text-xs text-muted-foreground mt-1">Max 12 characters</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Issuer Account</label>
                        <input
                          type="text"
                          name="issuerAccount"
                          placeholder="e.g., GABCD...3T5R9K1L2M3N4P5Q6R7S8T9U0V1W2X3Y4Z (Stellar Public Key)"
                          value={formData.issuerAccount}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                        <p className="text-xs text-muted-foreground mt-2">
                          Must be a valid Stellar public key: exactly 56 characters, starting with 'G'.
                        </p>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">2. Detailed Info</h2>
                        <p className="text-muted-foreground mb-6">
                          Provide additional information about your token and issuer.
                        </p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                        <textarea
                          name="description"
                          placeholder="Describe your token and its purpose..."
                          value={formData.description}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary h-32"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Logo URL</label>
                        <input
                          type="url"
                          name="logoUrl"
                          placeholder="https://example.com/logo.png"
                          value={formData.logoUrl}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Domain</label>
                        <input
                          type="text"
                          name="domain"
                          placeholder="example.com"
                          value={formData.domain}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Website</label>
                        <input
                          type="url"
                          name="website"
                          placeholder="https://example.com"
                          value={formData.website}
                          onChange={handleInputChange}
                          className="w-full px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                        />
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-foreground mb-6">3. Review & Submit</h2>
                        <p className="text-muted-foreground mb-6">Review your token information before submitting.</p>
                      </div>

                      <div className="bg-secondary rounded-lg p-6 space-y-4">
                        <div className="flex justify-between border-b border-border pb-4">
                          <span className="text-sm text-muted-foreground">Token Name</span>
                          <span className="font-medium text-foreground">{formData.tokenName || "—"}</span>
                        </div>
                        <div className="flex justify-between border-b border-border pb-4">
                          <span className="text-sm text-muted-foreground">Token Code</span>
                          <span className="font-medium text-foreground">{formData.tokenCode || "—"}</span>
                        </div>
                        <div className="flex justify-between border-b border-border pb-4">
                          <span className="text-sm text-muted-foreground">Issuer Account</span>
                          <span className="font-medium text-foreground text-right">
                            {formData.issuerAccount ? `${formData.issuerAccount.slice(0, 10)}...` : "��"}
                          </span>
                        </div>
                        <div className="flex justify-between border-b border-border pb-4">
                          <span className="text-sm text-muted-foreground">Domain</span>
                          <span className="font-medium text-foreground">{formData.domain || "—"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-muted-foreground">Website</span>
                          <span className="font-medium text-foreground text-right">
                            {formData.website ? (
                              <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                                View
                              </a>
                            ) : (
                              "—"
                            )}
                          </span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground bg-secondary/50 p-4 rounded-lg">
                        By submitting this form, you agree that the information provided is accurate and that you
                        have the authority to submit this token for listing.
                      </p>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex gap-4 mt-8 pt-8 border-t border-border">
                    <button
                      onClick={handlePreviousStep}
                      disabled={step === 1 || isSubmitting}
                      className={`px-6 py-3 border border-border rounded-lg font-medium transition-colors ${
                        step === 1 || isSubmitting
                          ? "text-muted-foreground opacity-50 cursor-not-allowed"
                          : "text-foreground hover:bg-secondary"
                      }`}
                    >
                      Previous
                    </button>
                    <button
                      onClick={step === 3 ? handleSubmitToken : handleNextStep}
                      disabled={isSubmitting}
                      className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ml-auto ${
                        isSubmitting
                          ? "bg-primary/50 text-primary-foreground cursor-not-allowed"
                          : "bg-primary text-primary-foreground hover:bg-primary/90"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" />
                          Submitting...
                        </>
                      ) : (
                        <>
                          {step === 3 ? "Submit Token" : "Next Step"}
                          {step < 3 && <ChevronRight className="w-4 h-4" />}
                        </>
                      )}
                    </button>
                  </div>
                </div>
              )}

              {/* Success State Footer */}
              {submitted && submitResponse && (
                <div className="bg-white rounded-xl border border-success/20 p-8 text-center">
                  <CheckCircle2 className="w-12 h-12 text-success mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-foreground mb-2">Token Created Successfully!</h3>
                  <p className="text-muted-foreground mb-6">
                    Your token "{submitResponse.tokenDetails?.code}" has been created on Stellar Testnet.
                    You can now trade this token on the Stellar network.
                  </p>
                  <div className="mb-6 p-4 bg-secondary rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">Transaction confirmed at ledger:</p>
                    <p className="font-mono font-semibold text-foreground">{submitResponse.transactionHash}</p>
                  </div>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setStep(1);
                      setSubmitResponse(null);
                    }}
                    className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                  >
                    Create Another Token
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-border py-12 px-6 sm:px-12 bg-secondary">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Discover</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">Asset Search</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Asset List</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Top Assets</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Create</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">Submit Token</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Company</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Legal</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                    <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                  </ul>
                </div>
              </div>
              <div className="border-t border-border pt-8 text-center text-sm text-muted-foreground">
                Explore and list assets on the Stellar network.
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
