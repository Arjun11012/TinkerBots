import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Share2, Copy, CheckCircle2, BarChart3, Users, Globe } from "lucide-react";
import { useState } from "react";

export default function TokenDetail() {
  const [copied, setCopied] = useState(false);

  const copyAddress = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {/* Token Header */}
          <div className="border-b border-border p-6 sm:p-8 bg-secondary">
            <div className="max-w-6xl mx-auto">
              <div className="flex items-start gap-6">
                <div className="text-6xl">💵</div>
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-foreground">Stellar USDC</h1>
                    <span className="text-sm bg-success/10 text-success px-3 py-1 rounded-full font-medium">
                      Verified
                    </span>
                  </div>
                  <p className="text-muted-foreground mb-4">USDC</p>
                  <div className="flex items-baseline gap-3">
                    <p className="text-4xl font-bold text-foreground">$1.00</p>
                    <span className="text-lg font-medium text-success">+0.01%</span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <button className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                    <Share2 className="w-4 h-4" />
                    Share
                  </button>
                  <button
                    onClick={copyAddress}
                    className="flex items-center gap-2 px-4 py-2 border border-border rounded-lg hover:bg-secondary transition-colors"
                  >
                    {copied ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-success" />
                        Copied
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        Copy Address
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-8">
            <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Price Chart Section */}
                <div className="bg-white rounded-xl border border-border p-6 mb-8">
                  <h2 className="text-2xl font-bold text-foreground mb-6">Price Chart</h2>
                  <div className="flex gap-2 mb-6">
                    {["1H", "1D", "1W", "1M", "1Y"].map((period) => (
                      <button
                        key={period}
                        className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                          period === "1D"
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-foreground hover:bg-secondary/50"
                        }`}
                      >
                        {period}
                      </button>
                    ))}
                  </div>
                  <div className="h-64 bg-secondary rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-12 h-12 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground mt-4">
                    Current price of USDC. Historical data for the selected period.
                  </p>
                </div>

                {/* Key Metrics */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="text-xl font-bold text-foreground mb-6">Key Metrics</h3>
                  <div className="grid grid-cols-2 gap-8">
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Total Supply</p>
                      <p className="text-2xl font-bold text-foreground">1,234,567,890 USDC</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-2">Holders</p>
                      <p className="text-2xl font-bold text-foreground">256,789</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sidebar Info */}
              <div className="lg:col-span-1 space-y-6">
                {/* Issuer Information */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Issuer Information</h3>
                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                        Issuer Address
                      </p>
                      <p className="text-sm font-mono text-foreground break-all">
                        GA5ZSEJ3DN54VM442Q05U3Q...
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                        Domain
                      </p>
                      <p className="text-sm text-foreground">circle.com</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">
                        Website
                      </p>
                      <a
                        href="https://circle.com"
                        className="text-sm text-primary hover:underline flex items-center gap-2"
                      >
                        <Globe className="w-4 h-4" />
                        circle.com
                      </a>
                    </div>
                  </div>
                </div>

                {/* About This Token */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">About This Token</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    USDC is a fully reserved U.S. dollar stablecoin issued by Circle and managed by the
                    Centre consortium. It is widely used for payments, DeFi, and trading on the Stellar
                    network, offering stability and rapid transactions.
                  </p>
                </div>

                {/* Resources */}
                <div className="bg-white rounded-xl border border-border p-6">
                  <h3 className="text-lg font-bold text-foreground mb-4">Resources</h3>
                  <ul className="space-y-2">
                    <li>
                      <a
                        href="#"
                        className="text-sm text-primary hover:underline"
                      >
                        Stellar Expert Profile
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-primary hover:underline"
                      >
                        Trading Pairs
                      </a>
                    </li>
                    <li>
                      <a
                        href="#"
                        className="text-sm text-primary hover:underline"
                      >
                        Holders
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
