import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Rocket, ArrowRight } from "lucide-react";

interface ResearchAgendaProps {
  onCategoryClick: (category: string) => void;
}

const ResearchAgenda = ({ onCategoryClick }: ResearchAgendaProps) => {
  const researchAreas = [
    {
      id: "ai",
      icon: Brain,
      title: "Artificial Intelligence",
      summary: "How AI systems shape organizational capabilities and competitive dynamics",
      publications: 4,
      color: "bg-primary/10 hover:bg-primary/20 border-primary/30",
      iconColor: "text-primary",
    },
    {
      id: "decisions",
      icon: Target,
      title: "Strategic Decisions",
      summary: "Understanding decision-making processes in complex, uncertain environments",
      publications: 5,
      color: "bg-accent/10 hover:bg-accent/20 border-accent/30",
      iconColor: "text-accent",
    },
    {
      id: "entrepreneurship",
      icon: Rocket,
      title: "Entrepreneurship",
      summary: "Innovation, venture creation, and entrepreneurial cognition in digital markets",
      publications: 3,
      color: "bg-secondary/10 hover:bg-secondary/20 border-secondary/30",
      iconColor: "text-secondary",
    },
  ];

  const handleCardClick = (id: string) => {
    onCategoryClick(id);
    const publicationsSection = document.getElementById("publications");
    if (publicationsSection) {
      publicationsSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="research-agenda" className="py-24 bg-background">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
            Research Agenda
          </h2>
          <p className="text-lg text-muted-foreground">
            Explore the interconnected landscape of my research across AI, strategy, and innovation
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {researchAreas.map((area, index) => (
              <Card
                key={area.id}
                onClick={() => handleCardClick(area.id)}
                className={`cursor-pointer border-2 ${area.color} transition-smooth hover:scale-105 hover:shadow-glow animate-fade-in`}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-8">
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className={`${area.iconColor} p-4 rounded-full bg-background`}>
                      <area.icon size={40} />
                    </div>
                    <h3 className="text-xl font-serif font-semibold text-foreground">
                      {area.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed min-h-[60px]">
                      {area.summary}
                    </p>
                    <Badge variant="secondary" className="mt-2">
                      {area.publications} Publications
                    </Badge>
                    <div className="flex items-center gap-2 text-primary text-sm font-medium mt-4">
                      View Research <ArrowRight size={16} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="relative py-12">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full max-w-4xl h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
            </div>
            <div className="relative text-center">
              <div className="inline-block bg-background px-6 py-3 rounded-full border border-primary/30">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Research at the Intersection:</span> 
                  {" "}Combining computational methods, behavioral insights, and strategic theory
                </p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-none bg-muted/50 hover:shadow-elegant transition-smooth">
              <CardContent className="p-6">
                <h4 className="font-serif font-semibold text-foreground mb-3">
                  Cross-Cutting Themes
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Human-AI collaboration in strategic contexts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Cognitive biases and algorithmic decision support</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Digital transformation and organizational adaptation</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="border-none bg-muted/50 hover:shadow-elegant transition-smooth">
              <CardContent className="p-6">
                <h4 className="font-serif font-semibold text-foreground mb-3">
                  Methodological Approaches
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Large-scale experiments and simulation games</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Machine learning and natural language processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Longitudinal field studies and archival analysis</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchAgenda;
