import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Target, Rocket, ArrowRight, Link2, ChevronDown, ChevronUp } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ResearchAgendaProps {
  onCategoryClick: (category: string) => void;
}

const ResearchAgenda = ({ onCategoryClick }: ResearchAgendaProps) => {
  const [expandedQuestions, setExpandedQuestions] = useState<Set<string>>(new Set());

  const toggleQuestions = (id: string) => {
    setExpandedQuestions(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const researchAreas = [
    {
      id: "ai",
      icon: Brain,
      title: "Artificial Intelligence",
      summary: "AI as epistemic partner in decision-making: causal discovery, theory generation, and computational creativity",
      publications: 5,
      color: "bg-primary/10 hover:bg-primary/20 border-primary/30",
      iconColor: "text-primary",
      connections: [
        { area: "decisions", count: 1, label: "Entrepreneurial Strategy" },
        { area: "entrepreneurship", count: 4, label: "Innovation" }
      ],
      questions: [
        "How do AI tools reshape technology portfolios and enable breakthrough innovation?",
        "Can machine learning detect anomalies that signal novel opportunities beyond trend extrapolation?",
        "How can AI act as an epistemic partner in causal discovery and theory generation?",
        "What is the role of computational creativity in scientific discovery?"
      ]
    },
    {
      id: "decisions",
      icon: Target,
      title: "Entrepreneurial Strategy",
      summary: "How entrepreneurs reason, form beliefs, and update strategies through theory-based and design-based approaches in uncertain environments",
      publications: 4,
      color: "bg-accent/10 hover:bg-accent/20 border-accent/30",
      iconColor: "text-accent",
      connections: [
        { area: "ai", count: 1, label: "AI" },
        { area: "entrepreneurship", count: 2, label: "Innovation" }
      ],
      questions: [
        "How do design-based vs. theory-based reasoning affect strategic commitment and pivoting?",
        "What cognitive mechanisms explain how entrepreneurs update beliefs under uncertainty?",
        "How do different reasoning logics shape forecast accuracy and business model revision?"
      ]
    },
    {
      id: "entrepreneurship",
      icon: Rocket,
      title: "Innovation",
      summary: "How algorithms and humans discover breakthrough opportunities, detect anomalies, and leverage serendipity in digital markets",
      publications: 5,
      color: "bg-emerald-50/50 hover:bg-emerald-50 border-emerald-100 dark:bg-emerald-950/20 dark:hover:bg-emerald-950/30 dark:border-emerald-900/30",
      iconColor: "text-emerald-600 dark:text-emerald-400",
      connections: [
        { area: "ai", count: 4, label: "AI" },
        { area: "decisions", count: 2, label: "Entrepreneurial Strategy" }
      ],
      questions: [
        "How do algorithms and humans discover serendipitous opportunities in digital markets?",
        "What does it mean for machines to innovate, and how do data and AI augment human scientific discovery?",
        "How do humans interpret and leverage machine creativity in the innovation process?"
      ]
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
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 space-y-8 animate-fade-in">
          <div>
            <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
              About My Research
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto italic">
              At the intersection of strategic thinking and AI in innovation and entrepreneurship
            </p>
          </div>
          <div className="space-y-6 text-muted-foreground">
            <p className="text-justify leading-relaxed">
              My research investigates how data and artificial intelligence (AI) are reshaping strategic decision-making, innovation, and entrepreneurship—and how, in turn, humans reason, learn, and create under uncertainty. I study how algorithms and human decision-makers complement each other in discovering new ideas, forming strategies, and driving innovation in fast-changing environments.
            </p>
            <p className="text-justify leading-relaxed">
              By combining large-scale experiments with data-driven analysis and theoretical modeling, my work explores how information and AI transform not only what organizations decide, but how they think. This approach connects the cognitive foundations of innovation—how entrepreneurs, scientists, and managers make sense of the unknown—with the transformative potential of predictive and generative technologies.
            </p>
            <p className="text-justify leading-relaxed">
              Through collaborations with tech startups, R&D labs, and established firms, my goal is to develop a behavioral and strategic understanding of AI—one that helps organizations leverage human judgment and algorithmic intelligence together to foster discovery, creativity, and sustainable competitive advantage.
            </p>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <TooltipProvider>
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
                      
                      {/* Research Questions - Collapsible */}
                      {area.questions && (
                        <div className="w-full pt-3">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleQuestions(area.id);
                            }}
                            className="w-full flex items-center justify-between gap-2 h-8 px-3 text-xs font-semibold text-foreground/70 hover:text-foreground hover:bg-muted/50"
                          >
                            <span className="uppercase tracking-wide">Key Questions</span>
                            {expandedQuestions.has(area.id) ? (
                              <ChevronUp size={14} />
                            ) : (
                              <ChevronDown size={14} />
                            )}
                          </Button>
                          {expandedQuestions.has(area.id) && (
                            <ul className="space-y-1.5 text-left mt-3 animate-fade-in">
                              {area.questions.map((question, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                                  <span className={`${area.iconColor} mt-0.5 text-[10px]`}>•</span>
                                  <span className="leading-relaxed">{question}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      )}
                      
                      <Badge variant="secondary" className="mt-2">
                        {area.publications} Publications
                      </Badge>
                      
                      {/* Connection indicators */}
                      {area.connections && area.connections.length > 0 && (
                        <div className="flex items-center gap-3 pt-2 flex-wrap justify-center">
                          {area.connections.map((conn) => {
                            const ConnectedIcon = researchAreas.find(a => a.id === conn.area)?.icon;
                            return (
                              <Tooltip key={conn.area}>
                                <TooltipTrigger asChild>
                                  <div className="flex items-center gap-1 cursor-help hover:opacity-80 transition-smooth">
                                    {ConnectedIcon && (
                                      <ConnectedIcon size={14} className="text-muted-foreground" />
                                    )}
                                    <Badge 
                                      variant="outline" 
                                      className="text-xs px-2 py-0"
                                    >
                                      {conn.count}
                                    </Badge>
                                  </div>
                                </TooltipTrigger>
                                <TooltipContent side="top">
                                  <p className="text-xs">
                                    {conn.count} paper{conn.count > 1 ? 's' : ''} with {conn.label}
                                  </p>
                                </TooltipContent>
                              </Tooltip>
                            );
                          })}
                        </div>
                      )}
                      
                      <div className="flex items-center gap-2 text-primary text-sm font-medium mt-4">
                        View Research <ArrowRight size={16} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TooltipProvider>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-none bg-muted/50 hover:shadow-elegant transition-smooth">
              <CardContent className="p-6">
                <h4 className="font-serif font-semibold text-foreground mb-3">
                  Cross-Cutting Themes
                </h4>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Human-AI complementarity in discovery and strategic reasoning</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Causal inference and theory generation from data</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>Cognitive foundations of entrepreneurial decision-making</span>
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
                    <span>Randomized controlled trials and longitudinal field studies</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Causal discovery and machine learning algorithms</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-accent mt-1">•</span>
                    <span>Computational modeling and theoretical development</span>
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
