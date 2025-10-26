import { Link, useLocation } from "react-router-dom";
import { Search, List, TrendingUp, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export const Sidebar = () => {
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  const navItems = [
    { path: "/search", label: "Asset Search", icon: Search },
    { path: "/assets", label: "Asset List", icon: List },
    { path: "/top-assets", label: "Top Assets", icon: TrendingUp },
    { path: "/submit", label: "Submit Token", icon: Plus },
  ];

  return (
    <aside className="w-64 border-r border-border bg-sidebar min-h-screen sticky top-16">
      <div className="p-6 space-y-8">
        <div>
          <h3 className="text-sm font-semibold text-sidebar-foreground mb-4">Discover</h3>
          <nav className="space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg transition-colors text-sm",
                    isActive(item.path)
                      ? "bg-sidebar-accent text-sidebar-primary font-medium"
                      : "text-sidebar-foreground hover:bg-sidebar-accent"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </aside>
  );
};
