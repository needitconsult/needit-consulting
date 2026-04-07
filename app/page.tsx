import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import FAQs from "./components/FAQs";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col">
      <Navbar />
      <Hero />
      <Services />
      <About />
      <Testimonials />
      <FAQs />
      <Contact />
      <Footer />
    </main>
  );
}
