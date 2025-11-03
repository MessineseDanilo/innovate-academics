import Navigation from "@/components/Navigation";
import CuratedInsights from "@/components/CuratedInsights";
import Footer from "@/components/Footer";

const CuratedInsightsPage = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-20">
        <CuratedInsights />
      </main>
      <Footer />
    </div>
  );
};

export default CuratedInsightsPage;
