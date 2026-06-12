import { useEffect, useState } from "react";
import { ExternalLink, FileText, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Publication {
  title: string;
  authors: string;
  journal: string;
  year: string;
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

const publications: Publication[] = [
  {
    title: "Design- and Theory-Based Approaches to Strategic Decisions",
    authors: "Gambardella, A., Messinese, D.",
    journal: "Organization Science",
    year: "2025",
    categories: ["decisions"],
    journalLink: "https://doi.org/10.1287/orsc.2023.18245",
    status: "Best Paper, AOM 2022, TIM Division",
    abstract:
      "We develop a unified framework to examine two approaches to strategic decision making under uncertainty: designing and shaping future scenarios versus testing theories about future scenarios. In a randomized controlled trial with early-stage entrepreneurs, both approaches reduce information needs and increase commitment, but they lead to distinct rules for termination, pivoting, and breakthrough outcomes.",
  },
  {
    title: "A Scientific Approach to Entrepreneurial Decision Making: Large Scale Replication and Extension",
    authors: "Camuffo, A., Gambardella, A., Messinese, D., Novelli, E., Paolucci, E., & Spina, C.",
    journal: "Strategic Management Journal",
    year: "2024",
    categories: ["decisions"],
    journalLink: "https://doi.org/10.1002/smj.3580",
    status: "Best Experimental Paper, 2024 IGL Research Prize",
    abstract:
      "This article reports a large-scale replication and extension of a scientific approach to entrepreneurial decision making across 759 firms in four randomized controlled trials. The findings clarify how scientific training affects idea termination, methodic doubt, and radical pivots.",
  },
];

const workingPapers: Publication[] = [
  {
    title: "The Selective Tailwind Effect of A.I. on Startups: Predictions and Anomalies",
    authors: "Conti, A. & Messinese, D.",
    journal: "Under Review",
    year: "2025",
    categories: ["ai", "entrepreneurship", "decisions"],
    ssrnLink: "https://papers.ssrn.com/sol3/papers.cfm?abstract_id=4958898",
    abstract:
      "Using data on U.S. software startups and their adoption of AI, this paper studies how predictive AI reshapes technology portfolios and customer acquisition. The results point to strong heterogeneity and suggest that AI can surface anomalies that become valuable only when entrepreneurs embed them in causal theories.",
  },
  {
    title: "Entrepreneurial Responses to New Information under Different Reasoning Logics",
    authors: "Camuffo, A., Gambardella, A., & Messinese, D.",
    journal: "Under Review",
    year: "2025",
    categories: ["decisions", "entrepreneurship"],
    abstract:
      "This paper studies how entrepreneurs update beliefs and strategies when trained in theory-based or design-based reasoning. The findings reveal a trade-off between calibrated but rigid expectations and more flexible but volatile strategic adaptation.",
  },
];

const workInProgress: Publication[] = [
  {
    title: "Theorizing with Machines: From Causal Explanation of Anomalies to Generating New Hypotheses",
    authors: "Messinese, D.",
    journal: "Work in Progress",
    year: "2025",
    categories: ["ai", "entrepreneurship"],
    abstract:
      "This project develops a framework for AI-assisted abductive theorizing, where machine learning, causal discovery, and language models help detect theory violations, trace their causal structure, and generate plausible explanatory mechanisms.",
  },
  {
    title: "Unsupervised Discovery of Causal Mechanisms for Management Research",
    authors: "Messinese, D. & Barbero Mota, M.",
    journal: "Work in Progress",
    year: "2025",
    categories: ["ai"],
    abstract:
      "This project examines independence-based causal machine learning as a tool for identifying latent causal sources in longitudinal business data and estimating heterogeneous effects at the firm-time level.",
  },
  {
    title: "Bounded Machine Creativity and Human Judgment: Evidence from Chess",
    authors: "Messinese, D.",
    journal: "Work in Progress",
    year: "2025",
    categories: ["ai", "entrepreneurship"],
  },
];

const categoryLabels: Record<string, string> = {
  ai: "Artificial Intelligence",
  decisions: "Entrepreneurial Strategy",
  entrepreneurship: "Innovation",
};

const Publications = ({ activeFilter, onClearFilter }: PublicationsProps) => {
  const [activeTab, setActiveTab] = useState("publications");
  const [expandedAbstracts, setExpandedAbstracts] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!activeFilter) return;
    if (publications.some((paper) => paper.categories.includes(activeFilter))) setActiveTab("publications");
    else if (workingPapers.some((paper) => paper.categories.includes(activeFilter))) setActiveTab("working");
    else if (workInProgress.some((paper) => paper.categories.includes(activeFilter))) setActiveTab("progress");
  }, [activeFilter]);

  const toggleAbstract = (title: string) => {
    setExpandedAbstracts((current) => {
      const next = new Set(current);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const filterPublications = (items: Publication[]) => {
    if (!activeFilter) return items;
    return items.filter((paper) => paper.categories.includes(activeFilter));
  };

  const renderPublication = (paper: Publication) => (
    <article key={paper.title} className="border-b border-border py-7 last:border-b-0">
      <div className="grid gap-3 md:grid-cols-[110px_1fr]">
        <div className="text-sm font-medium text-muted-foreground">{paper.year}</div>
        <div className="space-y-3">
          <div>
            <h3 className="text-xl font-semibold leading-7 text-foreground">{paper.title}</h3>
            <p className="mt-2 text-sm leading-6 text-muted-foreground">{paper.authors}</p>
            <p className="mt-1 text-sm font-medium leading-6 text-foreground">{paper.journal}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {paper.status && <Badge variant="outline">{paper.status}</Badge>}
            {paper.categories.map((category) => (
              <Badge key={category} variant="secondary">
                {categoryLabels[category] || category}
              </Badge>
            ))}
          </div>

          <div className="flex flex-wrap gap-3">
            {paper.abstract && (
              <Button variant="ghost" size="sm" onClick={() => toggleAbstract(paper.title)} className="h-8 px-0">
                <FileText className="mr-2 h-4 w-4" />
                {expandedAbstracts.has(paper.title) ? "Hide abstract" : "Abstract"}
              </Button>
            )}
            {paper.ssrnLink && (
              <Button variant="ghost" size="sm" asChild className="h-8 px-0">
                <a href={paper.ssrnLink} target="_blank" rel="noopener noreferrer">
                  SSRN
                  <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </a>
              </Button>
            )}
            {paper.journalLink && (
              <Button variant="ghost" size="sm" asChild className="h-8 px-0">
                <a href={paper.journalLink} target="_blank" rel="noopener noreferrer">
                  Journal
                  <ExternalLink className="ml-2 h-3.5 w-3.5" />
                </a>
              </Button>
            )}
          </div>

          {paper.abstract && expandedAbstracts.has(paper.title) && (
            <p className="max-w-3xl text-sm leading-7 text-foreground/75">{paper.abstract}</p>
          )}
        </div>
      </div>
    </article>
  );

  const filteredPublications = filterPublications(publications);
  const filteredWorking = filterPublications(workingPapers);
  const filteredProgress = filterPublications(workInProgress);

  return (
    <section id="publications" className="px-5 py-16 md:px-6 md:py-20 scroll-mt-24">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-10 md:grid-cols-[220px_1fr]">
          <div>
            <h2 className="text-2xl font-semibold text-foreground">Publications</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              Peer-reviewed articles, working papers, and selected projects.
            </p>
            <p className="mt-4 text-xs leading-5 text-muted-foreground">
              Unless otherwise noted, authors are listed alphabetically.
            </p>
          </div>

          <div className="space-y-6">
            {activeFilter && (
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant="default">Filtered by {categoryLabels[activeFilter] || activeFilter}</Badge>
                <Button variant="ghost" size="sm" onClick={onClearFilter}>
                  <X className="mr-1 h-4 w-4" />
                  Clear
                </Button>
              </div>
            )}

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="h-auto w-full justify-start overflow-x-auto rounded-sm bg-muted p-1">
                <TabsTrigger value="publications">Peer-Reviewed</TabsTrigger>
                <TabsTrigger value="working">Working Papers</TabsTrigger>
                <TabsTrigger value="progress">Work in Progress</TabsTrigger>
              </TabsList>

              <TabsContent value="publications" className="mt-2">
                {filteredPublications.length > 0 ? (
                  filteredPublications.map(renderPublication)
                ) : (
                  <p className="py-8 text-sm text-muted-foreground">No publications found for this research area.</p>
                )}
              </TabsContent>
              <TabsContent value="working" className="mt-2">
                {filteredWorking.length > 0 ? (
                  filteredWorking.map(renderPublication)
                ) : (
                  <p className="py-8 text-sm text-muted-foreground">No working papers found for this research area.</p>
                )}
              </TabsContent>
              <TabsContent value="progress" className="mt-2">
                {filteredProgress.length > 0 ? (
                  filteredProgress.map(renderPublication)
                ) : (
                  <p className="py-8 text-sm text-muted-foreground">No projects found for this research area.</p>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Publications;
