import { ArrowRight, BookOpen, GraduationCap, Microscope, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import professorPortrait from "@/assets/professor-portrait.jpg";
import HeroBackground from "@/components/HeroBackground";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { icon: Microscope, label: "Research", id: "about" },
    { icon: BookOpen, label: "Publications", id: "publications" },
    { icon: GraduationCap, label: "Teaching", id: "teaching" },
  ];

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-16 md:pt-20 px-4 md:px-6 overflow-hidden">
      <HeroBackground />
      <div className="container mx-auto relative z-10">
        {/* Header Text - Centered between navbar and content */}
        <div className="absolute -top-36 md:-top-40 left-0 right-0 flex justify-center px-4">
          <div className="text-center">
            <p className="text-base md:text-lg text-foreground/80">Research on</p>
            <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-primary">
              Algorithmic Exploration
            </h2>
            <p className="text-base md:text-lg text-foreground/80 italic mt-2">Prepared Minds</p>
          </div>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mt-12 md:mt-16">
          {/* Left Column - Text Content */}
          <div className="space-y-4 md:space-y-6 animate-fade-in text-center md:text-left">
            <div className="space-y-3 md:space-y-4">
              
              {/* Mobile: Image positioned here */}
              <div className="md:hidden flex justify-center my-4">
                <div className="relative w-full max-w-[260px]">
                  <div className="absolute -inset-4 bg-gradient-academic opacity-20 blur-2xl rounded-full"></div>
                  <img
                    src={professorPortrait}
                    alt="Danilo Messinese - Professor Portrait"
                    className="relative rounded-2xl shadow-elegant w-full object-cover"
                  />
                </div>
              </div>
              
              <p className="text-sm md:text-base font-serif text-black max-w-xl mx-auto md:mx-0 text-justify">
                Danilo Messinese is an Assistant Professor of Strategy at IE Business School. His research examines how data and artificial intelligence (AI) shape strategic decision-making, innovation, and entrepreneurship. He combines field and laboratory experiments with computational methods to study how humans and algorithms learn, create, and adapt under uncertainty. His work has been published in leading academic journals and featured in Harvard Business Review. Before academia, Danilo worked at Bain & Company and UniCredit Group. Danilo earned his bachelor's degree in Physics and master's degrees in Theoretical Physics and Mathematical Finance from the University of Bologna, and his Ph.D. in Management from Bocconi University.
              </p>
            </div>


            {/* Quick Links - Different layout for mobile vs desktop */}
            <div className="pt-4 md:pt-8">
              {/* Mobile: Horizontal centered layout */}
              <div className="flex md:hidden justify-center gap-2 px-2">
                {quickLinks.map((link, index) => (
                  <Card
                    key={link.id}
                    className="flex-1 max-w-[110px] p-2.5 cursor-pointer hover:shadow-hover transition-smooth group animate-slide-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => scrollToSection(link.id)}
                  >
                    <div className="flex flex-col items-center gap-1.5 text-center">
                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                        <link.icon size={16} />
                      </div>
                      <span className="text-[10px] font-medium leading-tight">{link.label}</span>
                    </div>
                  </Card>
                ))}
              </div>
              
              {/* Desktop: Grid layout */}
              <div className="hidden md:grid grid-cols-2 gap-4">
                {quickLinks.map((link, index) => (
                  <Card
                    key={link.id}
                    className="p-4 cursor-pointer hover:shadow-hover transition-smooth group animate-slide-in"
                    style={{ animationDelay: `${index * 100}ms` }}
                    onClick={() => scrollToSection(link.id)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-smooth">
                        <link.icon size={20} />
                      </div>
                      <span className="text-sm font-medium">{link.label}</span>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Image (Desktop only) */}
          <div className="hidden md:flex justify-center animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="relative w-full max-w-md">
              <div className="absolute -inset-4 bg-gradient-academic opacity-20 blur-2xl rounded-full"></div>
              <img
                src={professorPortrait}
                alt="Danilo Messinese - Professor Portrait"
                className="relative rounded-2xl shadow-elegant w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
