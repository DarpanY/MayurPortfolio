import Navbar from "../components/Navbar/Navbar";
import Hero from "../components/Hero/Hero";
import Services from "../components/Services/Services";
import About from "../components/About/About";
import Contact from "../components/Contact/Contact";
import Footer from "../components/Footer/Footer";

const Home = () => {
  return (
    <div className="cosmic-bg">

      <div className="stars"></div>

      <Navbar />

      <Hero />

      <Services />

      <About />

      <Contact />

      <Footer />

    </div>
  );
};

export default Home;