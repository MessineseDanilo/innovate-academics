import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";

import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet-async";

const Index = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Helmet>
        <title>Home</title>
        <meta
          name="description"
          content="Danilo Messinese is a professor in the strategy area at IE Business School. His research studies how data and artificial intelligence impact firm and startup decisions, innovation, and the information landscape."
        />
        <meta property="og:title" content="Danilo Messinese" />
        <meta
          property="og:description"
          content="Professor in the strategy area at IE Business School. Research on data, artificial intelligence, firm and startup decisions, innovation, and the information landscape."
        />
        <meta property="og:url" content="https://www.danilomessinese.com/" />
        <meta name="twitter:title" content="Danilo Messinese" />
        <meta
          name="twitter:description"
          content="Professor in the strategy area at IE Business School. Research on data, artificial intelligence, firm and startup decisions, innovation, and the information landscape."
        />
      </Helmet>
      <Navigation />
      <main className="flex flex-1 flex-col">
        <Hero />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
