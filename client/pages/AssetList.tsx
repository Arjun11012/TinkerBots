import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Search, Filter, ArrowUpDown } from "lucide-react";
import { useState } from "react";

const mockAssets = [
  {
    rank: 1,
    code: "XLM",
    name: "Stellar Lumens",
    issuer: "Stellar Development Foundation",
    supply: "50,000,000,000",
    status: "Verified",
    type: "Utility Token",
  },
  {
    rank: 2,
    code: "USDC",
    name: "USD Coin",
    issuer: "Centre Consortium",
    supply: "52,800,000,000",
    status: "Verified",
    type: "Stablecoin",
  },
  {
    rank: 3,
    code: "EURT",
    name: "Tether Euro",
    issuer: "Tether Operations Limited",
    supply: "250,000,000",
    status: "Verified",
    type: "Stablecoin",
  },
  {
    rank: 4,
    code: "WBTC",
    name: "Wrapped Bitcoin",
    issuer: "Bittrex Inc.",
    supply: "10,000",
    status: "Unverified",
    type: "Wrapped Asset",
  },
  {
    rank: 5,
    code: "WETH",
    name: "Wrapped Ethereum",
    issuer: "Binance Chain",
    supply: "15,000",
    status: "Unverified",
    type: "Wrapped Asset",
  },
  {
    rank: 6,
    code: "AQUA",
    name: "Aqua",
    issuer: "Aqua Network",
    supply: "1,000,000,000",
    status: "Verified",
    type: "DeFi Token",
  },
  {
    rank: 7,
    code: "BRLT",
    name: "Brazilian Digital Token",
    issuer: "SmartChain SA",
    supply: "500,000,000",
    status: "Verified",
    type: "Stablecoin",
  },
  {
    rank: 8,
    code: "CNYM",
    name: "Tether Yuan",
    issuer: "Tether Operations Limited",
    supply: "300,000,000",
    status: "Unverified",
    type: "Stablecoin",
  },
];

export default function AssetList() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("rank");

  const filteredAssets = mockAssets.filter((asset) => {
    const query = searchQuery.toLowerCase();
    return (
      asset.code.toLowerCase().includes(query) ||
      asset.name.toLowerCase().includes(query) ||
      asset.issuer.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {/* Page Header */}
          <div className="border-b border-border p-6 sm:p-8 bg-secondary">
            <h1 className="text-3xl font-bold text-foreground mb-6">Stellar Network Assets</h1>

            {/* Search and Filter Bar */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Filter assets..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex gap-2">
                <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <ArrowUpDown className="w-4 h-4" />
                  <span>Sort By</span>
                </button>
                <button className="flex items-center gap-2 px-3 py-2 border border-border rounded-lg hover:bg-secondary transition-colors">
                  <Filter className="w-4 h-4" />
                  <span>Filters</span>
                </button>
              </div>
              <button className="px-6 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors hidden sm:inline-block">
                Submit New Token
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="p-6 sm:p-8 overflow-x-auto">
            <div className="border border-border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-secondary border-b border-border">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">#</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Asset Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Issuer</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Total Supply</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Status</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">Type</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAssets.map((asset, idx) => (
                    <tr
                      key={idx}
                      className="border-b border-border hover:bg-secondary/50 transition-colors cursor-pointer"
                    >
                      <td className="px-6 py-4 text-sm text-foreground font-medium">{asset.rank}</td>
                      <td className="px-6 py-4 text-sm">
                        <div className="font-semibold text-foreground">{asset.name}</div>
                        <div className="text-xs text-muted-foreground">{asset.code}</div>
                      </td>
                      <td className="px-6 py-4 text-sm text-muted-foreground">{asset.issuer}</td>
                      <td className="px-6 py-4 text-sm text-foreground">{asset.supply}</td>
                      <td className="px-6 py-4 text-sm">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-medium ${
                            asset.status === "Verified"
                              ? "bg-success/10 text-success"
                              : "bg-warning/10 text-warning"
                          }`}
                        >
                          {asset.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-foreground">{asset.type}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
