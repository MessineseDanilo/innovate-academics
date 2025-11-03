import { Award, Brain, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";

const About = () => {
  const highlights = [
    {
      icon: Brain,
      title: "AI Research",
      description: "Exploring how artificial intelligence transforms strategic decision-making processes",
    },
    {
      icon: TrendingUp,
      title: "Entrepreneurship",
      description: "Investigating innovation dynamics and entrepreneurial decision-making under uncertainty",
    },
    {
      icon: Award,
      title: "Strategic Management",
      description: "Publishing in top-tier journals including SMJ, Organization Science, and AMJ",
    },
  ];

  return (
    <section id="about" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              About My Research
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              At the intersection of cutting-edge technology and strategic thinking
            </p>
          </div>

          <div className="prose prose-lg max-w-none text-muted-foreground animate-fade-in" style={{ animationDelay: "200ms" }}>
            <p className="text-center leading-relaxed">
              My research explores how artificial intelligence is reshaping the landscape of strategic
              decision-making and entrepreneurship. By combining rigorous quantitative methods with
              deep qualitative insights, I investigate how organizations and entrepreneurs navigate
              uncertainty, leverage AI capabilities, and make critical strategic choices in rapidly
              evolving markets.
            </p>
            <p className="text-center leading-relaxed mt-6">
              Through both theoretical development and empirical validation, my work bridges the gap
              between technological innovation and strategic management, contributing to leading
              academic journals while maintaining practical relevance for business leaders and
              policymakers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 pt-8">
            {highlights.map((item, index) => (
              <Card
                key={item.title}
                className="p-6 hover:shadow-hover transition-smooth animate-slide-in"
                style={{ animationDelay: `${(index + 2) * 100}ms` }}
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                    <item.icon size={24} />
                  </div>
                  <h3 className="text-xl font-serif font-semibold">{item.title}</h3>
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
