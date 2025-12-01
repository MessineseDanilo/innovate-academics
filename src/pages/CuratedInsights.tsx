import Navigation from "@/components/Navigation";
import CuratedInsights from "@/components/CuratedInsights";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const CuratedInsightsPage = () => {
  return (
    <div className="min-h-screen">
      <Helmet>
        <title>Curated Insights — Danilo Messinese</title>
        <meta
          name="description"
          content="A personal selection of ideas and papers outside my primary field that I've found inspiring."
        />
        <meta property="og:title" content="Curated Insights — Danilo Messinese" />
        <meta
          property="og:description"
          content="A personal selection of ideas and papers outside my primary field that I've found inspiring."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.danilomessinese.com/insights" />
        <meta property="og:image" content="https://www.danilomessinese.com/opengraph.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Curated Insights — Danilo Messinese" />
        <meta
          name="twitter:description"
          content="A personal selection of ideas and papers outside my primary field that I've found inspiring."
        />
        <meta name="twitter:image" content="https://www.danilomessinese.com/opengraph.png" />
      </Helmet>
      <Navigation />
      <main className="pt-20">
        <CuratedInsights />
      </main>
      <Footer />
    </div>
  );
};

export default CuratedInsightsPage;
