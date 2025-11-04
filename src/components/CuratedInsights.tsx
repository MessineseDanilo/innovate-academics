import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Podcast, FileText, Newspaper, Filter, ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const CuratedInsights = () => {
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<number>>(new Set());

  const insights = [
    {
      type: "article",
      icon: Newspaper,
      title: "Hypotheses devised by AI could find 'blind spots' in research",
      description: "Explores how AI systems can generate novel scientific hypotheses and identify overlooked patterns in research, potentially revolutionizing scientific discovery.",
      abstract: "Scientists are exploring the use of AI systems to automatically generate scientific hypotheses, potentially identifying overlooked patterns and 'blind spots' in research. These AI tools analyze vast amounts of scientific literature and data to propose novel hypotheses that human researchers might miss, offering a new approach to accelerate scientific discovery and address biases in research focus.",
      author: "Matthew Hutson, Nature",
      link: "#",
      color: "text-emerald-600",
      badge: "Practitioner-oriented article",
      topics: ["AI", "Innovation"],
    },
    {
      type: "paper",
      icon: FileText,
      title: "Modeling the Change of Paradigm: Non-Bayesian Reactions to Unexpected News",
      description: "Examines how individuals update their beliefs when confronted with unexpected information, proposing a model of non-Bayesian learning that captures paradigm shifts in thinking.",
      abstract: "This paper proposes a model of non-Bayesian learning to capture how individuals update their beliefs when confronted with unexpected information. The model shows that individuals may exhibit paradigm shifts in their thinking, radically changing their beliefs in response to surprising evidence. This framework provides insights into phenomena such as scientific revolutions, political realignments, and market crashes, where conventional Bayesian updating fails to explain observed behavior.",
      author: "Pietro Ortoleva, AER 2012",
      link: "#",
      color: "text-primary",
      badge: "Research Paper",
      topics: ["Innovation", "Entrepreneurship"],
    },
  ];

  const types = [
    { value: "paper", label: "Research Paper", icon: FileText },
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
          {filteredInsights.map((item, index) => {
            const isExpanded = expandedAbstracts.has(index);
            
            return (
              <Card
                key={index}
                className="group hover:shadow-elegant transition-smooth border border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 50}ms` }}
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

                  <Collapsible open={isExpanded} onOpenChange={(open) => {
                    setExpandedAbstracts(prev => {
                      const newSet = new Set(prev);
                      if (open) {
                        newSet.add(index);
                      } else {
                        newSet.delete(index);
                      }
                      return newSet;
                    });
                  }}>
                    <CollapsibleTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="w-full justify-between text-xs"
                      >
                        <span>{isExpanded ? "Hide" : "Show"} Abstract</span>
                        {isExpanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                      </Button>
                    </CollapsibleTrigger>
                    <CollapsibleContent className="mt-2">
                      <p className="text-sm text-muted-foreground leading-relaxed bg-secondary/30 p-3 rounded-md">
                        {item.abstract}
                      </p>
                    </CollapsibleContent>
                  </Collapsible>

                  <div className="flex items-center justify-between pt-2 border-t border-border/30">
                    <p className="text-xs text-muted-foreground font-medium">
                      {item.author}
                    </p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 hover:bg-transparent"
                      onClick={() => window.open(item.link, '_blank')}
                    >
                      <ExternalLink 
                        size={16} 
                        className="text-muted-foreground group-hover:text-primary transition-smooth" 
                      />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CuratedInsights;
