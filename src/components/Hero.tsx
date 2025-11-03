import { ArrowRight, BookOpen, GraduationCap, Microscope, Gamepad2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import professorPortrait from "@/assets/professor-portrait.jpg";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const quickLinks = [
    { icon: Microscope, label: "Research", id: "research" },
    { icon: BookOpen, label: "Publications", id: "publications" },
    { icon: GraduationCap, label: "Teaching", id: "teaching" },
    { icon: Gamepad2, label: "Simulation Games", id: "teaching" },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-20 px-6">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="space-y-6 animate-fade-in">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl font-serif font-bold text-foreground leading-tight">
                AI, Entrepreneurship
                <span className="block text-primary mt-2">& Innovation</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-xl">
                Bridging artificial intelligence, strategic decision-making, and entrepreneurial
                innovation through rigorous academic research.
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-4">
              <Button
                size="lg"
                onClick={() => scrollToSection("research")}
                className="group"
              >
                Explore Research
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-smooth" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => scrollToSection("contact")}
              >
                Get in Touch
              </Button>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-4 pt-8">
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

          {/* Right Column - Image */}
          <div className="flex justify-center animate-fade-in" style={{ animationDelay: "200ms" }}>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-academic opacity-20 blur-2xl rounded-full"></div>
              <img
                src={professorPortrait}
                alt="Professor Portrait"
                className="relative rounded-2xl shadow-elegant w-full max-w-md object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
