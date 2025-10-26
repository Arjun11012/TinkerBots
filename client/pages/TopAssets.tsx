import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { TrendingUp, TrendingDown, MoreVertical } from "lucide-react";

const topAssets = [
  {
    id: 1,
    price: 1.0,
    change: 0.01,
    volume: "$5.2B",
    icon: "💵",
    code: "USDC",
    name: "USD Coin",
    issuer: "Centre Consortium",
  },
  {
    id: 2,
    price: 0.125,
    change: -2.34,
    volume: "$123M",
    icon: "⭐",
    code: "XLM",
    name: "Star Lumens",
    issuer: "Stellar Dev",
  },
  {
    id: 3,
    price: 3500,
    change: 1.5,
    volume: "$89M",
    icon: "💎",
    code: "ETH",
    name: "Wrapped Ethereum",
    issuer: "Interstellar",
  },
  {
    id: 4,
    price: 70123,
    change: -0.88,
    volume: "$75M",
    icon: "₿",
    code: "WBTC",
    name: "Wrapped Bitcoin",
    issuer: "Bittrex Inc.",
  },
  {
    id: 5,
    price: 0.005,
    change: 5.1,
    volume: "$12M",
    icon: "🏆",
    code: "SRT",
    name: "Stellar Rewards Token",
    issuer: "Stellar Rewards",
  },
  {
    id: 6,
    price: 25.75,
    change: 0.75,
    volume: "$8M",
    icon: "🌟",
    code: "SLD",
    name: "Stellar Gold",
    issuer: "Gold Reserve",
  },
  {
    id: 7,
    price: 1.08,
    change: -0.05,
    volume: "$4.5M",
    icon: "€",
    code: "EURT",
    name: "Anchor Europe",
    issuer: "Tether Ops",
  },
  {
    id: 8,
    price: 14.2,
    change: 3.22,
    volume: "$3.1M",
    icon: "🔗",
    code: "LINK",
    name: "Chainlink Stellar",
    issuer: "Chainlink",
  },
];

export default function TopAssets() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {/* Page Header */}
          <div className="border-b border-border p-6 sm:p-8 bg-secondary">
            <h1 className="text-3xl font-bold text-foreground">Top Assets</h1>
            <p className="text-muted-foreground mt-2">Trending and most active tokens on the Stellar network</p>
          </div>

          {/* Assets Grid */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {topAssets.map((asset) => (
                <div
                  key={asset.id}
                  className="bg-white rounded-xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:border-primary"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-5xl">{asset.icon}</div>
                    <button className="p-1 hover:bg-secondary rounded-lg">
                      <MoreVertical className="w-4 h-4 text-muted-foreground" />
                    </button>
                  </div>

                  <h3 className="font-bold text-lg text-foreground">{asset.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{asset.code}</p>

                  <div className="border-t border-border pt-4">
                    <p className="text-3xl font-bold text-foreground">${asset.price.toLocaleString()}</p>
                    <div className="flex items-center gap-2 mt-2 mb-4">
                      {asset.change >= 0 ? (
                        <TrendingUp className="w-4 h-4 text-success" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-destructive" />
                      )}
                      <span
                        className={`text-sm font-medium ${
                          asset.change >= 0 ? "text-success" : "text-destructive"
                        }`}
                      >
                        {asset.change >= 0 ? "+" : ""}{asset.change}%
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mb-4">
                      Volume (24h): {asset.volume}
                    </p>
                    <button className="w-full py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/5 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="flex justify-center mt-12">
              <button className="px-8 py-3 border border-border text-foreground rounded-lg font-medium hover:bg-secondary transition-colors">
                Load More Assets
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
