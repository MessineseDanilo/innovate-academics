import { ExternalLink, FileText, X, MessageCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
}

interface PublicationsProps {
  activeFilter: string | null;
  onClearFilter: () => void;
}

const Publications = ({ activeFilter, onClearFilter }: PublicationsProps) => {
  const [activeTab, setActiveTab] = useState("publications");
  const [selectedPaper, setSelectedPaper] = useState<Publication | null>(null);

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
      title: "AI-Augmented Decision-Making in Strategic Management",
      authors: "Smith, J. & Johnson, A.",
      journal: "Strategic Management Journal",
      year: "2024",
      image: paper1,
      categories: ["ai", "decisions"],
      ssrnLink: "https://ssrn.com/abstract=example1",
      journalLink: "https://onlinelibrary.wiley.com/journal/10970266",
    },
    {
      title: "Machine Learning and Entrepreneurial Decision Quality",
      authors: "Smith, J., Williams, R. & Brown, M.",
      journal: "Organization Science",
      year: "2023",
      image: paper2,
      categories: ["ai", "entrepreneurship"],
      ssrnLink: "https://ssrn.com/abstract=example2",
      journalLink: "https://pubsonline.informs.org/journal/orsc",
    },
  ];

  const workingPapers: Publication[] = [
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
              <TabsTrigger value="publications" className="text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2.5">
                <span className="hidden sm:inline">Peer-Reviewed Publications</span>
                <span className="sm:hidden">Peer-Rev.</span>
                {activeFilter && <span className="ml-1">({filteredPublications.length})</span>}
              </TabsTrigger>
              <TabsTrigger value="working" className="text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2.5">
                <span className="hidden sm:inline">Working Papers</span>
                <span className="sm:hidden">Working</span>
                {activeFilter && <span className="ml-1">({filteredWorking.length})</span>}
              </TabsTrigger>
              <TabsTrigger value="new" className="text-xs sm:text-sm px-2 py-2 sm:px-3 sm:py-2.5">
                <span className="hidden sm:inline">Work in Progress</span>
                <span className="sm:hidden">In Progress</span>
                {activeFilter && <span className="ml-1">({filteredNew.length})</span>}
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
