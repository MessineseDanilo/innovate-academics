import { ExternalLink, FileText, X, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import paperDesignTheory from "@/assets/paper-design-theory.jpg";
import paperScientificApproach from "@/assets/paper-scientific-approach.jpg";
import paperAiStartups from "@/assets/paper-ai-startups.jpg";
import paper1 from "@/assets/paper1.jpg";
import paper2 from "@/assets/paper2.jpg";
import paper3 from "@/assets/paper3.jpg";
import { useEffect, useState } from "react";
import PaperChatDialog from "@/components/PaperChatDialog";

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: string;
  image: string;
  categories: string[];
  ssrnLink?: string;
  journalLink?: string;
  status?: string;
  abstract?: string;
}

interface PublicationsProps {
  activeFilter: string | null;
  onClearFilter: () => void;
}

const Publications = ({ activeFilter, onClearFilter }: PublicationsProps) => {
  const [activeTab, setActiveTab] = useState("publications");
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null);
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<string>>(new Set());

  const toggleAbstract = (title: string) => {
    setExpandedAbstracts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(title)) {
        newSet.delete(title);
      } else {
        newSet.add(title);
      }
      return newSet;
    });
  };

  useEffect(() => {
    if (activeFilter) {
      // Auto-switch to the tab that has papers with this filter
      const hasInPublications = publications.some(p => p.categories.includes(activeFilter));
      const hasInWorking = workingPapers.some(p => p.categories.includes(activeFilter));
      const hasInNew = newProjects.some(p => p.categories.includes(activeFilter));
      
      if (hasInPublications) setActiveTab("publications");
      else if (hasInWorking) setActiveTab("working");
      else if (hasInNew) setActiveTab("new");
    }
  }, [activeFilter]);
  const publications: Publication[] = [
    {
      title: "Design- and Theory-Based Approaches to Strategic Decisions",
      authors: "Gambardella, A., Messinese, D.",
      journal: "Organization Science",
      year: "2025",
      image: paperDesignTheory,
      categories: ["decisions"],
      journalLink: "https://doi.org/10.1287/orsc.2023.18245",
      status: "Best Paper, AOM 2022, TIM Division",
      abstract: "We develop a unified framework to examine the implications of two primary approaches to strategic decision making under uncertainty: designing and shaping future scenarios vis-à-vis testing theories about future scenarios. We conducted a three-arm randomized controlled trial involving 308 early stage entrepreneurs, dividing them into three groups—design-based training, theory-based training, and a control group—and tracked them over approximately 1.5 years. Our findings reveal that both approaches reduce the need for information in decision making and lead to higher commitment rates. The design-based approach encourages action despite negative beliefs, resulting in less frequent and later project termination. In contrast, the theory-based approach promotes a more conservative termination rule, leading to earlier and more frequent project abandonment. Although the theory-based approach is associated with higher average performance upon survival, the design-based approach fosters breakthroughs for decision makers. In sum, the design-based approach is well-suited for innovative ventures that gather information to shape their environment, whereas the theory-based approach is optimal for pursuing high performance under lower degrees of uncertainty.",
    },
    {
      title: "A Scientific Approach to Entrepreneurial Decision Making: Large Scale Replication and Extension",
      authors: "Camuffo, A., Gambardella, A., Messinese, D., Novelli, E., Paolucci, E., & Spina, C.",
      journal: "Strategic Management Journal",
      year: "2024",
      image: paperScientificApproach,
      categories: ["entrepreneurship", "decisions"],
      journalLink: "https://doi.org/10.1002/smj.3580",
      status: "Best Experimental Paper, 2024 IGL Research Prize",
      abstract: "This article runs a large-scale replication of Camuffo and colleagues in 2020, involving 759 firms in four randomized control trials. The larger sample generates novel and more precise insights about the teachability and implications of a scientific approach in entrepreneurship. We observe a positive impact on idea termination and results that are consistent with a nonlinear effect on radical pivots, with treated firms running few over no or repeated pivots. We provide a theoretical interpretation of the empirical results: the scientific approach enhances entrepreneurs' efficiency in searching for viable ideas and raises their methodic doubt because, like scientists, they realize that there may be alternative scenarios from the ones that they theorize.",
    },
  ];

  const workingPapers: Publication[] = [
    {
      title: "The Selective Tailwind Effect of A.I. on Startups: Predictions and Anomalies",
      authors: "Conti, A. & Messinese, D.",
      journal: "SSRN Working Paper",
      year: "2024",
      image: paperAiStartups,
      categories: ["ai", "entrepreneurship", "decisions"],
      ssrnLink: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4958898",
      status: "Under Review",
      abstract: "What role does predictive artificial intelligence (A.I.) play in entrepreneurial decision-making? We explore this question using a comprehensive dataset of U.S. software startups and their time-varying adoption of A.I. We find that A.I. adoption significantly reshapes startups' technology portfolios and enhances customer acquisition, with performance gains concentrated in the upper tail of the treatment effect distribution. These effects are strongest among startups led by highly skilled founders. Complementary survey evidence and an ad hoc experiment shed light on the underlying mechanism: beyond extrapolating from past trends, A.I. detects unexpected patterns–anomalies–in data, signaling novel opportunities and enabling breakthrough innovation. To capitalize on these anomalies, however, entrepreneurs must embed them within causal theories that guide the development of actionable strategies.",
    },
    {
      title: "Deep Learning Applications in Venture Capital Decision-Making",
      authors: "Smith, J. & Davis, K.",
      journal: "Under Review at Academy of Management Journal",
      year: "2024",
      image: paper3,
      categories: ["ai", "entrepreneurship", "decisions"],
      ssrnLink: "https://ssrn.com/abstract=example3",
      status: "R&R",
    },
    {
      title: "Cognitive Biases in AI-Assisted Strategic Planning",
      authors: "Smith, J., Martinez, C. & Lee, H.",
      journal: "Under Review at Strategic Management Journal",
      year: "2024",
      image: paper1,
      categories: ["ai", "decisions"],
      ssrnLink: "https://ssrn.com/abstract=example4",
      status: "Under Review",
    },
    {
      title: "Neural Networks and Entrepreneurial Pattern Recognition",
      authors: "Smith, J. & Wilson, P.",
      journal: "Revise & Resubmit at Organization Science",
      year: "2024",
      image: paper2,
      categories: ["ai", "entrepreneurship"],
      ssrnLink: "https://ssrn.com/abstract=example5",
      status: "R&R",
    },
    {
      title: "Strategic Decision-Making in AI-Enabled Organizations",
      authors: "Smith, J., Brown, R. & Taylor, S.",
      journal: "Under Review at Administrative Science Quarterly",
      year: "2024",
      image: paper3,
      categories: ["ai", "decisions"],
      ssrnLink: "https://ssrn.com/abstract=example6",
      status: "Under Review",
    },
  ];

  const newProjects: Publication[] = [
    {
      title: "Algorithmic Bias in Entrepreneurial Financing Decisions",
      authors: "Smith, J., Thompson, L. & Garcia, P.",
      journal: "Work in Progress",
      year: "2024",
      image: paper1,
      categories: ["ai", "entrepreneurship"],
      status: "Data Collection",
    },
    {
      title: "AI and the Future of Strategic Planning: A Field Experiment",
      authors: "Smith, J. & Anderson, M.",
      journal: "Pilot Study",
      year: "2024",
      image: paper2,
      categories: ["ai", "decisions"],
      status: "Early Stage",
    },
    {
      title: "Entrepreneurial Learning in AI-Driven Markets",
      authors: "Smith, J., Kumar, R. & White, D.",
      journal: "Research Design Phase",
      year: "2024",
      image: paper3,
      categories: ["entrepreneurship", "ai"],
      status: "Conceptual",
    },
    {
      title: "Decision Automation and Strategic Flexibility",
      authors: "Smith, J. & Chen, L.",
      journal: "Data Collection Phase",
      year: "2024",
      image: paper1,
      categories: ["decisions", "ai"],
      status: "In Progress",
    },
  ];

  const categoryLabels: Record<string, { label: string; variant: "default" | "secondary" }> = {
    ai: { label: "Artificial Intelligence", variant: "default" },
    decisions: { label: "Strategic Decisions", variant: "secondary" },
    entrepreneurship: { label: "Entrepreneurship", variant: "default" },
  };

  const filterPublications = (pubs: Publication[]) => {
    if (!activeFilter) return pubs;
    return pubs.filter(pub => pub.categories.includes(activeFilter));
  };

  const renderPublicationCard = (pub: Publication, index: number) => (
    <Card
      key={pub.title}
      className="overflow-hidden hover:shadow-hover transition-smooth animate-slide-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="md:flex">
        <div className="md:w-1/3">
          <img
            src={pub.image}
            alt={pub.title}
            className="w-full h-48 md:h-full object-cover"
          />
        </div>
        <div className="p-6 md:w-2/3 space-y-4">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-2">
              {pub.status && (
                <Badge variant="outline">{pub.status}</Badge>
              )}
              {pub.categories.map(cat => (
                <Badge 
                  key={cat} 
                  variant={categoryLabels[cat]?.variant || "default"}
                  className="text-xs"
                >
                  {categoryLabels[cat]?.label || cat}
                </Badge>
              ))}
            </div>
            <h3 className="text-xl font-serif font-semibold">{pub.title}</h3>
            <p className="text-sm text-muted-foreground">{pub.authors}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-primary">{pub.journal}</p>
            <p className="text-sm text-muted-foreground">{pub.year}</p>
          </div>
          <div className="flex flex-wrap gap-3 pt-2">
            {pub.abstract && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => toggleAbstract(pub.title)}
                className="flex items-center gap-2"
              >
                <FileText size={16} />
                {expandedAbstracts.has(pub.title) ? "Hide Abstract" : "View Abstract"}
              </Button>
            )}
            <Button
              variant="default"
              size="sm"
              onClick={() => setSelectedPaper(pub)}
              className="flex items-center gap-2"
            >
              <MessageCircle size={16} />
              Ask AI about this paper
            </Button>
            {pub.ssrnLink && (
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <a
                  href={pub.ssrnLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <FileText size={16} />
                  SSRN
                  <ExternalLink size={14} />
                </a>
              </Button>
            )}
            {pub.journalLink && (
              <Button
                variant="outline"
                size="sm"
                asChild
              >
                <a
                  href={pub.journalLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  Journal
                  <ExternalLink size={14} />
                </a>
              </Button>
            )}
          </div>
          {pub.abstract && expandedAbstracts.has(pub.title) && (
            <div className="mt-4 pt-4 border-t border-border animate-fade-in">
              <h4 className="font-semibold mb-2 text-sm">Abstract</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {pub.abstract}
              </p>
            </div>
          )}
        </div>
      </div>
    </Card>
  );

  const filteredPublications = filterPublications(publications);
  const filteredWorking = filterPublications(workingPapers);
  const filteredNew = filterPublications(newProjects);

  return (
    <section id="publications" className="py-24 px-6 bg-secondary/30">
      <div className="container mx-auto max-w-6xl">
        <div className="space-y-12">
          <div className="text-center space-y-4 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-serif font-bold text-foreground">
              Publications
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Peer-reviewed research and ongoing projects
            </p>
          </div>

          {activeFilter && (
            <div className="flex items-center justify-center gap-3 animate-fade-in">
              <Badge variant="default" className="text-sm py-2 px-4">
                Filtering by: {categoryLabels[activeFilter]?.label || activeFilter}
              </Badge>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClearFilter}
                className="h-8"
              >
                <X size={16} className="mr-1" />
                Clear Filter
              </Button>
            </div>
          )}

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8 h-auto">
              <TabsTrigger value="publications" className="text-[10px] sm:text-sm px-1.5 py-3 sm:px-3 sm:py-2.5 h-auto whitespace-normal leading-tight">
                Peer-Reviewed Publications {activeFilter && `(${filteredPublications.length})`}
              </TabsTrigger>
              <TabsTrigger value="working" className="text-[10px] sm:text-sm px-1.5 py-3 sm:px-3 sm:py-2.5 h-auto whitespace-normal leading-tight">
                Working Papers {activeFilter && `(${filteredWorking.length})`}
              </TabsTrigger>
              <TabsTrigger value="new" className="text-[10px] sm:text-sm px-1.5 py-3 sm:px-3 sm:py-2.5 h-auto whitespace-normal leading-tight">
                Work in Progress {activeFilter && `(${filteredNew.length})`}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="publications" className="space-y-6">
              {filteredPublications.length > 0 ? (
                filteredPublications.map((pub, index) => renderPublicationCard(pub, index))
              ) : (
                <p className="text-center text-muted-foreground py-12">
                  No publications found for this research area.
                </p>
              )}
            </TabsContent>

            <TabsContent value="working" className="space-y-6">
              {filteredWorking.length > 0 ? (
                filteredWorking.map((pub, index) => renderPublicationCard(pub, index))
              ) : (
                <p className="text-center text-muted-foreground py-12">
                  No working papers found for this research area.
                </p>
              )}
            </TabsContent>

            <TabsContent value="new" className="space-y-6">
              {filteredNew.length > 0 ? (
                filteredNew.map((pub, index) => renderPublicationCard(pub, index))
              ) : (
                <p className="text-center text-muted-foreground py-12">
                  No new projects found for this research area.
                </p>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      {selectedPaper && (
        <PaperChatDialog
          paper={selectedPaper}
          isOpen={!!selectedPaper}
          onClose={() => setSelectedPaper(null)}
        />
      )}
    </section>
  );
};

export default Publications;
