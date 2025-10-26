import { Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { ArrowRight, Zap, Search, TrendingUp, Share2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function Index() {
  const { isAuthenticated, user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-20 pb-32 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              {isAuthenticated ? (
                <>
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                    Welcome, {user?.name?.split(' ')[0]}!
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Explore, analyze, and track tokens on the Stellar network. Start discovering new assets and opportunities.
                  </p>
                  <Link
                    to="/search"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-lg"
                  >
                    Start Exploring
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </>
              ) : (
                <>
                  <h1 className="text-5xl md:text-6xl font-bold text-foreground leading-tight mb-6">
                    Explore Stellar Assets
                  </h1>
                  <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                    Discover, analyze, and track tokens on the Stellar network. Your complete asset marketplace and explorer for the Stellar ecosystem.
                  </p>
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors text-lg"
                  >
                    Get Started
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </>
              )}
            </div>
            <div className="bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 rounded-2xl aspect-square flex items-center justify-center">
              <div className="text-center">
                <Zap className="w-24 h-24 text-primary mx-auto mb-4" />
                <p className="text-2xl font-bold text-foreground">Stellar Network</p>
                <p className="text-muted-foreground mt-2">Asset Explorer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 sm:px-12 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-foreground text-center mb-16">
            Designed for Discovery
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-background p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <Search className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Search Assets</h3>
              <p className="text-muted-foreground">
                Find tokens by name, code, or issuer. Advanced search and filtering to discover exactly what you need.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <TrendingUp className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Track Top Assets</h3>
              <p className="text-muted-foreground">
                Monitor trending tokens, view live prices, and explore detailed asset metrics and statistics.
              </p>
            </div>
            <div className="bg-background p-8 rounded-xl border border-border hover:shadow-lg transition-shadow">
              <Share2 className="w-8 h-8 text-primary mb-4" />
              <h3 className="text-xl font-bold text-foreground mb-3">Submit Tokens</h3>
              <p className="text-muted-foreground">
                Issuers can submit their tokens for listing, showcase issuer information, and reach the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 sm:px-12 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-foreground mb-6">Ready to Explore?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Browse thousands of tokens on the Stellar network. Find new opportunities, analyze asset metrics, and stay informed about the ecosystem.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/search"
              className="px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
            >
              Search Assets
            </Link>
            <Link
              to="/assets"
              className="px-8 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/5 transition-colors"
            >
              View All Assets
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-12 px-6 sm:px-12 bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="font-semibold text-foreground mb-4">Discover</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/search" className="hover:text-primary transition-colors">Asset Search</Link></li>
                <li><Link to="/assets" className="hover:text-primary transition-colors">Asset List</Link></li>
                <li><Link to="/top-assets" className="hover:text-primary transition-colors">Top Assets</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Create</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link to="/submit" className="hover:text-primary transition-colors">Submit Token</Link></li>
                <li><a href="#" className="hover:text-primary transition-colors">Documentation</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">API Docs</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-foreground mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
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
          <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">Explore and list assets on the Stellar network.</p>
            <div className="flex gap-4 mt-4 sm:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">LinkedIn</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">GitHub</a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">Discord</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
