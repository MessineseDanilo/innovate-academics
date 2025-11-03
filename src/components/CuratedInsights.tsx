import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Podcast, FileText, Newspaper, Filter } from "lucide-react";
import { useState } from "react";

const CuratedInsights = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

  const insights = [
    {
      type: "paper",
      icon: FileText,
      title: "The Impact of AI on Organizational Decision-Making",
      description: "A comprehensive study examining how machine learning algorithms influence strategic choices in Fortune 500 companies.",
      author: "Smith et al., 2024",
      link: "#",
      color: "text-primary",
      badge: "Paper",
      topics: ["AI", "Innovation"],
    },
    {
      type: "podcast",
      icon: Podcast,
      title: "AI Strategy Summit: Navigating the Future",
      description: "Leading researchers discuss the intersection of artificial intelligence and corporate strategy in this insightful conversation.",
      author: "Strategy & Innovation Podcast",
      link: "#",
      color: "text-accent",
      badge: "Podcast",
      topics: ["AI", "Innovation"],
    },
    {
      type: "article",
      icon: Newspaper,
      title: "Entrepreneurial Cognition in the Age of AI",
      description: "How artificial intelligence is reshaping the way entrepreneurs think about opportunity recognition and venture creation.",
      author: "Harvard Business Review",
      link: "#",
      color: "text-emerald-600",
      badge: "Practitioner-oriented article",
      topics: ["AI", "Entrepreneurship"],
    },
    {
      type: "paper",
      icon: FileText,
      title: "Machine Learning and Strategic Foresight",
      description: "Exploring the role of predictive analytics in shaping long-term organizational strategies and competitive positioning.",
      author: "Johnson & Lee, 2024",
      link: "#",
      color: "text-primary",
      badge: "Paper",
      topics: ["AI", "Innovation"],
    },
    {
      type: "article",
      icon: Newspaper,
      title: "The Future of Work: AI and Human Collaboration",
      description: "An examination of how AI tools are transforming workplace dynamics and decision-making processes across industries.",
      author: "MIT Sloan Management Review",
      link: "#",
      color: "text-emerald-600",
      badge: "Practitioner-oriented article",
      topics: ["AI", "Innovation"],
    },
    {
      type: "podcast",
      icon: Podcast,
      title: "Innovation Ecosystems and Digital Transformation",
      description: "A deep dive into how technology platforms are enabling new forms of entrepreneurship and innovation.",
      author: "Innovation Leaders Series",
      link: "#",
      color: "text-accent",
      badge: "Podcast",
      topics: ["Innovation", "Entrepreneurship"],
    },
  ];

  const types = [
    { value: "paper", label: "Paper", icon: FileText },
    { value: "podcast", label: "Podcast", icon: Podcast },
    { value: "article", label: "Practitioner-oriented article", icon: Newspaper },
  ];

  const topics = ["AI", "Entrepreneurship", "Innovation"];

  const filteredInsights = insights.filter((insight) => {
    const typeMatch = !selectedType || insight.type === selectedType;
    const topicMatch = !selectedTopic || insight.topics.includes(selectedTopic);
    return typeMatch && topicMatch;
  });

  return (
    <section id="curated-insights" className="py-24 bg-secondary/20">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto text-center mb-8 animate-fade-in">
          <h2 className="text-4xl font-serif font-bold text-foreground mb-4">
            Curated Insights
          </h2>
          <p className="text-lg text-muted-foreground italic">
            A personal selection of ideas, papers, and conversations I found inspiring.
          </p>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto mb-8 space-y-4 animate-fade-in">
          {/* Type Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Type:</span>
            <Button
              variant={selectedType === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedType(null)}
            >
              All
            </Button>
            {types.map((type) => (
              <Button
                key={type.value}
                variant={selectedType === type.value ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type.value)}
                className="gap-2"
              >
                <type.icon size={14} />
                {type.label}
              </Button>
            ))}
          </div>

          {/* Topic Filter */}
          <div className="flex flex-wrap items-center gap-2">
            <Filter size={18} className="text-muted-foreground" />
            <span className="text-sm font-medium text-foreground">Topic:</span>
            <Button
              variant={selectedTopic === null ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedTopic(null)}
            >
              All
            </Button>
            {topics.map((topic) => (
              <Button
                key={topic}
                variant={selectedTopic === topic ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </Button>
            ))}
          </div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredInsights.map((item, index) => (
            <Card
              key={index}
              className="group hover:shadow-elegant transition-smooth cursor-pointer border border-border/50 animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => window.open(item.link, '_blank')}
            >
              <CardContent className="p-6 space-y-4">
                <div className="flex items-start justify-between gap-3">
                  <div className={`p-2 rounded-lg bg-background ${item.color}`}>
                    <item.icon size={20} />
                  </div>
                  <Badge variant="secondary" className="text-xs">
                    {item.badge}
                  </Badge>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-lg font-serif font-semibold text-foreground leading-tight group-hover:text-primary transition-smooth">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                    {item.description}
                  </p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border/30">
                  <p className="text-xs text-muted-foreground font-medium">
                    {item.author}
                  </p>
                  <ExternalLink 
                    size={16} 
                    className="text-muted-foreground group-hover:text-primary transition-smooth" 
                  />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CuratedInsights;
