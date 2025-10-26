import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { Search, TrendingUp, Loader, AlertCircle } from "lucide-react";
import { useState, useMemo, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface Asset {
  id: string;
  code: string;
  name: string;
  issuer: string;
  issuerName: string;
  price: number;
  change: number;
  supply: string;
  holders: number;
  icon: string;
  category: string;
}

// Enhanced mock data with categories for demo
const mockAssets: Asset[] = [
  {
    id: "1",
    code: "USDC",
    name: "USD Coin",
    issuer: "GBBD47UZQ5LUNX5TZRMRVHIWRFEWVQTL33EFKFMQY2KWHVZZZBYQQLRB",
    issuerName: "Circle Inc.",
    price: 1.0,
    change: 0.01,
    supply: "5,000,000,000",
    holders: 450,
    icon: "💵",
    category: "stablecoin",
  },
  {
    id: "2",
    code: "XLM",
    name: "Star Lumens",
    issuer: "GBUQWP3BOUZX34ULNQG23RQ6F4BFXEUVloambbottlc6LSNOTMSWFCP7",
    issuerName: "Stellar Development Foundation",
    price: 0.12,
    change: -0.05,
    supply: "20,000,000,000",
    holders: 850,
    icon: "⭐",
    category: "utility",
  },
  {
    id: "3",
    code: "WBTC",
    name: "Wrapped Bitcoin",
    issuer: "GBCKFAXVJQVBTC3LEUWVB7RFTDZ3ZRRL4CJBPSL3CBT7GCSR3KAUI7FR",
    issuerName: "Interstellar",
    price: 65000,
    change: 1.2,
    supply: "150,000",
    holders: 320,
    icon: "₿",
    category: "wrapped",
  },
  {
    id: "4",
    code: "EURT",
    name: "Euro Token",
    issuer: "GCZST3XVCDTUJ76ZAV2HA72KYQJWY5JC33BY6QXV5NE6XVWZJCT2W2QA",
    issuerName: "Tempo Payments",
    price: 1.08,
    change: 0.03,
    supply: "250,000,000",
    holders: 280,
    icon: "€",
    category: "stablecoin",
  },
  {
    id: "5",
    code: "GMC",
    name: "Game Credits",
    issuer: "GDWHVCX7OX2EKY3V52GFZCAD2SZZBUAXZ6VA3RVP62VJXV3MGJPPZJ4M",
    issuerName: "PlayCorp Gaming",
    price: 0.05,
    change: 2.5,
    supply: "1,200,000,000",
    holders: 125,
    icon: "🎮",
    category: "gaming",
  },
  {
    id: "6",
    code: "AQUA",
    name: "Aqua",
    issuer: "GBUQWP3BOUZX34ULNQG23RQ6F4BFXEUVloambbottlc6LSNOTMSWFCP7",
    issuerName: "Aqua Network",
    price: 0.35,
    change: 3.2,
    supply: "1,000,000,000",
    holders: 420,
    icon: "💧",
    category: "defi",
  },
  {
    id: "7",
    code: "BRLT",
    name: "Brazilian Digital Token",
    issuer: "GCZST3XVCDTUJ76ZAV2HA72KYQJWY5JC33BY6QXV5NE6XVWZJCT2W2QA",
    issuerName: "SmartChain SA",
    price: 0.99,
    change: -0.1,
    supply: "500,000,000",
    holders: 210,
    icon: "🇧🇷",
    category: "stablecoin",
  },
  {
    id: "8",
    code: "SRT",
    name: "Stellar Rewards",
    issuer: "GBBD47UZQ5LUNX5TZRMRVHIWRFEWVQTL33EFKFMQY2KWHVZZZBYQQLRB",
    issuerName: "Stellar Rewards",
    price: 0.005,
    change: 5.1,
    supply: "1,500,000,000",
    holders: 890,
    icon: "🏆",
    category: "defi",
  },
];

const categories = [
  { value: "all", label: "All Categories" },
  { value: "stablecoin", label: "Stablecoins" },
  { value: "defi", label: "DeFi Tokens" },
  { value: "gaming", label: "Gaming" },
  { value: "wrapped", label: "Wrapped Assets" },
  { value: "utility", label: "Utility" },
];

export default function AssetSearch() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [assets, setAssets] = useState<Asset[]>(mockAssets);
  const [debouncedSearch, setDebouncedSearch] = useState("");

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Simulated API search (in production, this would call Stellar Horizon API)
  useEffect(() => {
    if (debouncedSearch.trim()) {
      setIsLoading(true);
      // Simulate API call delay
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [debouncedSearch]);

  // Filter and search assets
  const filteredAssets = useMemo(() => {
    let results = assets;

    // Apply search filter
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      results = results.filter(
        (asset) =>
          asset.code.toLowerCase().includes(query) ||
          asset.name.toLowerCase().includes(query) ||
          asset.issuerName.toLowerCase().includes(query)
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      results = results.filter((asset) => asset.category === selectedCategory);
    }

    // Sort by search relevance
    if (debouncedSearch.trim()) {
      const query = debouncedSearch.toLowerCase();
      results.sort((a, b) => {
        const aMatch = a.code.toLowerCase() === query ? 2 : a.code.toLowerCase().includes(query) ? 1 : 0;
        const bMatch = b.code.toLowerCase() === query ? 2 : b.code.toLowerCase().includes(query) ? 1 : 0;
        return bMatch - aMatch;
      });
    }

    return results;
  }, [assets, debouncedSearch, selectedCategory]);

  const handleViewDetails = useCallback(
    (assetId: string) => {
      navigate(`/token/${assetId}`);
    },
    [navigate]
  );

  const handleTrendingClick = useCallback(() => {
    setSearchQuery("XLM");
  }, []);

  const trendingAssets = useMemo(() => {
    return assets
      .sort((a, b) => Math.abs(b.change) - Math.abs(a.change))
      .slice(0, 3)
      .map((a) => a.code)
      .join(", ");
  }, [assets]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          {/* Page Header */}
          <div className="border-b border-border p-6 sm:p-8 bg-secondary">
            <h1 className="text-3xl font-bold text-foreground mb-6">Find Your Star Assets</h1>

            {/* Search Bar */}
            <div className="relative mb-6">
              <Search className="absolute left-4 top-4 w-5 h-5 text-muted-foreground pointer-events-none" />
              <input
                type="text"
                placeholder="Search by token name, code, or issuer..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
                className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-primary transition"
              />
              {isLoading && (
                <Loader className="absolute right-4 top-4 w-5 h-5 text-primary animate-spin" />
              )}
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Category</label>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary transition"
                >
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="sm:ml-auto">
                <button
                  onClick={handleTrendingClick}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
                >
                  <TrendingUp className="w-4 h-4" />
                  Trending: {trendingAssets}
                </button>
              </div>
            </div>
          </div>

          {/* Search Results */}
          <div className="p-6 sm:p-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {debouncedSearch ? `Results for "${debouncedSearch}"` : "All Assets"}
              </h2>
              <span className="text-sm text-muted-foreground">
                {filteredAssets.length} asset{filteredAssets.length !== 1 ? "s" : ""}
              </span>
            </div>

            {/* Error State */}
            {error && (
              <div className="mb-6 p-4 bg-destructive/10 border border-destructive/20 rounded-lg flex gap-3">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Loading State */}
            {isLoading && (
              <div className="text-center py-12">
                <Loader className="w-8 h-8 animate-spin text-primary mx-auto mb-4" />
                <p className="text-muted-foreground">Searching assets...</p>
              </div>
            )}

            {/* Empty State */}
            {!isLoading && filteredAssets.length === 0 && (
              <div className="text-center py-12">
                <Search className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground text-lg mb-2">No assets found</p>
                <p className="text-sm text-muted-foreground">
                  {debouncedSearch
                    ? `Try a different search term`
                    : "Start by searching or selecting a category"}
                </p>
              </div>
            )}

            {/* Results Grid */}
            {!isLoading && filteredAssets.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="bg-white rounded-lg border border-border p-6 hover:shadow-lg hover:border-primary transition-all duration-200 cursor-pointer group"
                    onClick={() => handleViewDetails(asset.id)}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-4xl group-hover:scale-110 transition-transform">{asset.icon}</div>
                      <span
                        className={`text-sm font-medium px-2 py-1 rounded whitespace-nowrap ${
                          asset.change >= 0
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {asset.change >= 0 ? "+" : ""}{asset.change.toFixed(2)}%
                      </span>
                    </div>

                    <h3 className="font-bold text-lg text-foreground mb-1 group-hover:text-primary transition-colors">
                      {asset.name}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">{asset.code}</p>

                    <p className="text-xs text-muted-foreground mb-4 truncate hover:text-clip" title={asset.issuerName}>
                      Issuer: {asset.issuerName}
                    </p>

                    <div className="border-t border-border pt-4 space-y-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Price</p>
                        <p className="font-semibold text-foreground text-lg">
                          ${asset.price.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </p>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <p className="text-muted-foreground">Supply</p>
                          <p className="font-medium text-foreground text-sm">{asset.supply}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Holders</p>
                          <p className="font-medium text-foreground text-sm">{asset.holders.toLocaleString()}</p>
                        </div>
                      </div>

                      <button className="w-full py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-colors">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
