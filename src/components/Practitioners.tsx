import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb, TrendingUp, Target } from "lucide-react";

const Practitioners = () => {
  const insights = [
    {
      icon: Lightbulb,
      title: "What We Found",
      description: "AI systems can amplify both good and bad decision-making patterns. Our research shows that algorithmic recommendations increase efficiency by 40% but may reduce strategic flexibility when managers over-rely on automated insights.",
      color: "text-primary",
    },
    {
      icon: TrendingUp,
      title: "Why It Matters",
      description: "As AI becomes central to strategic planning, leaders must understand when to trust algorithms and when to override them. The competitive advantage lies not in automation alone, but in knowing how to blend human judgment with machine intelligence.",
      color: "text-accent",
    },
    {
      icon: Target,
      title: "How to Act on It",
      description: "Build 'decision awareness' into your AI workflows. Train teams to question algorithmic outputs, maintain strategic flexibility, and create feedback loops that capture what AI systems miss. The best-performing organizations use AI as a thinking partner, not a replacement.",
      color: "text-secondary",
    },
  ];

  return (
    <section id="practitioners" className="py-24 bg-muted/30">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
            For Practitioners
          </h2>
          <p className="text-lg text-muted-foreground">
            Translating research into actionable insights for strategic leaders
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {insights.map((insight, index) => (
            <Card
              key={index}
              className="border-none shadow-elegant bg-card hover:shadow-glow hover:scale-105 transition-smooth animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-8">
                <div className="flex flex-col items-center text-center space-y-4">
                  <div className={`${insight.color} p-4 rounded-full bg-background/50`}>
                    <insight.icon size={32} />
                  </div>
                  <h3 className="text-xl font-serif font-semibold text-foreground">
                    {insight.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="max-w-3xl mx-auto mt-16 p-8 rounded-lg bg-background/50 border border-primary/20 animate-fade-in">
          <p className="text-center text-muted-foreground italic">
            "The future of strategy isn't about choosing between human insight and artificial intelligence—it's about orchestrating both to create competitive advantages that neither could achieve alone."
          </p>
        </div>
      </div>
    </section>
  );
};

export default Practitioners;
