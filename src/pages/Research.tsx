import Navigation from "@/components/Navigation";
import Publications from "@/components/Publications";
import Footer from "@/components/Footer";

const Research = () => {
  return (
    <div className="min-h-screen">
      <Navigation />
      <main className="pt-14 md:pt-16">
        <Publications />
      </main>
      <Footer />
    </div>
  );
};

export default Research;
