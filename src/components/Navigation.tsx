import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FileDown, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavigation = (id: string, isPage?: boolean) => {
    if (isPage) {
      navigate(`/${id}`);
      setIsMobileMenuOpen(false);
    } else {
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          const element = document.getElementById(id);
          if (element) {
            element.scrollIntoView({ behavior: "smooth" });
          }
        }, 100);
      } else {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
      setIsMobileMenuOpen(false);
    }
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Research", id: "publications" },
    { label: "Insights", id: "insights", isPage: true },
    { label: "Contact", id: "contact" },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur-md transition-smooth ${
        isScrolled ? "shadow-elegant" : ""
      }`}
    >
      <div className="mx-auto max-w-5xl px-5 py-4 md:px-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => handleNavigation("home")}
            className="text-base font-semibold text-foreground transition-smooth hover:text-primary"
          >
            Danilo Messinese
          </button>

          <div className="hidden items-center gap-7 md:flex">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => handleNavigation(item.id, item.isPage)}
                className="text-sm text-muted-foreground transition-smooth hover:text-foreground"
              >
                {item.label}
              </button>
            ))}
            <a
              href="/Messinese Danilo_Academic_cv_October 2025.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-smooth hover:text-foreground"
            >
              <FileDown size={15} />
              CV
            </a>
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </Button>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.id, item.isPage)}
                  className="text-left text-sm font-medium text-muted-foreground hover:text-primary transition-smooth"
                >
                  {item.label}
                </button>
              ))}
              <a
                href="/Messinese Danilo_Academic_cv_October 2025.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="text-left text-sm font-medium text-muted-foreground transition-smooth hover:text-primary"
              >
                CV
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
