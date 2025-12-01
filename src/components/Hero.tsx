import { ArrowRight, BookOpen, Microscope, Gamepad2 } from "lucide-react";
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
    { icon: Microscope, label: "Research Overview", id: "about" },
    { icon: BookOpen, label: "Publications", id: "publications" },
  ];

  return (
    <section
      id="home"
      className="relative pt-24 md:pt-32 pb-10 md:pb-16 px-4 md:px-6 overflow-hidden scroll-mt-24 md:scroll-mt-32"
    >
      <HeroBackground />
      <div className="container mx-auto relative z-10">
        {/* Header Text */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-sm md:text-lg text-foreground/80">Research on</p>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold text-primary">
            Algorithmic Exploration
          </h2>
          <p className="text-sm md:text-lg text-foreground/80 italic mt-2">
            When Data and Machines Inspire Prepared Minds
            </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start mt-8 md:mt-12">
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
              Danilo Messinese is an Assistant Professor of Strategy at IE Business School. His research explores how data 
              and artificial intelligence complement and shape strategic decision-making, innovation, and entrepreneurship. 
              He combines experimental and computational methods to study how humans and algorithms learn and adapt under uncertainty. 
              Viewing scientific and business theories as causal theories, he investigates how causal machine learning can support 
              human agents—managers, entrepreneurs, and scientists—in engaging in Kuhnian scientific reasoning: challenging existing 
              causal explanations through surprising or anomalous evidence and fostering theory-changing innovation.
              His work has been published in leading academic journals and featured in Harvard Business Review. 
              Before academia, he worked at Bain & Company and UniCredit. He holds degrees in Physics, Theoretical Physics, 
              and Mathematical Finance from the University of Bologna, and a Ph.D. in Management from Bocconi University.
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
