import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import researchHero from "@/assets/research-hero.jpg";

const ResearchAgenda = () => {
  const [activeNode, setActiveNode] = useState<string | null>(null);

  const researchNodes = [
    {
      id: "ai",
      title: "Artificial Intelligence",
      description: "Machine learning, deep learning, and AI decision systems",
      position: "left",
      color: "primary",
    },
    {
      id: "decisions",
      title: "Strategic Decisions",
      description: "Decision-making under uncertainty and cognitive biases",
      position: "center",
      color: "accent",
    },
    {
      id: "entrepreneurship",
      title: "Entrepreneurship",
      description: "Innovation, venture creation, and entrepreneurial cognition",
      position: "right",
      color: "primary",
    },
  ];

  const connections = [
    { from: "ai", to: "decisions", label: "AI-Augmented Decision-Making" },
    { from: "decisions", to: "entrepreneurship", label: "Entrepreneurial Strategy" },
    { from: "ai", to: "entrepreneurship", label: "AI-Driven Innovation" },
  ];

  return (
    <section id="research" className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Research Agenda
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              An integrated approach to understanding AI, decisions, and entrepreneurship
            </p>
          </div>

          {/* Visual Research Framework */}
          <div className="relative">
            <img
              src={researchHero}
              alt="Research Framework"
              className="w-full rounded-2xl shadow-elegant object-cover h-64 md:h-96 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent rounded-2xl"></div>
          </div>

          {/* Interactive Research Nodes */}
          <div className="grid md:grid-cols-3 gap-6 pt-8">
            {researchNodes.map((node, index) => (
              <Card
                key={node.id}
                className={`p-6 cursor-pointer transition-smooth animate-slide-in ${
                  activeNode === node.id
                    ? "shadow-hover border-primary"
                    : "hover:shadow-hover"
                }`}
                style={{ animationDelay: `${(index + 3) * 100}ms` }}
                onMouseEnter={() => setActiveNode(node.id)}
                onMouseLeave={() => setActiveNode(null)}
              >
                <div className="space-y-4">
                  <Badge variant={node.color === "primary" ? "default" : "secondary"}>
                    Research Area
                  </Badge>
                  <h3 className="text-xl font-serif font-semibold">{node.title}</h3>
                  <p className="text-sm text-muted-foreground">{node.description}</p>
                </div>
              </Card>
            ))}
          </div>

          {/* Research Connections */}
          <div className="space-y-4 pt-8">
            <h3 className="text-2xl font-serif font-semibold text-center">
              Key Research Themes
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {connections.map((connection, index) => (
                <Card
                  key={`${connection.from}-${connection.to}`}
                  className="p-4 text-center hover:shadow-hover transition-smooth animate-fade-in"
                  style={{ animationDelay: `${(index + 6) * 100}ms` }}
                >
                  <p className="text-sm font-medium text-primary">{connection.label}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchAgenda;
