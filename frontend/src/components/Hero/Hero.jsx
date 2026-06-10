import "./Hero.css";
import { motion } from "framer-motion";

const Hero = () => {
  return (
    <section className="hero">
      <div className="container hero-wrapper">

        <motion.div
          className="hero-left"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <span className="hero-badge">
            VIDEO EDITOR &bull; GRAPHIC DESIGNER &bull; 3D ANIMATOR
          </span>

          <h1>
            Designing Stories.
            Editing
            Emotions.
          </h1>

          <p>
            Creative and passionate Graphic Designer &amp; Video Editor with a keen
            eye for detail and a strong sense of visual storytelling. Turning ideas
            into impactful designs and engaging videos that communicate messages
            effectively.
          </p>

          <div className="hero-buttons">
            <a href="#services">
              <button className="primary-btn">View Work</button>
            </a>
            <a href="#contact">
              <button className="secondary-btn">Hire Me</button>
            </a>
          </div>

        </motion.div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1 }}
        >
          <div className="planet"></div>
        </motion.div>

      </div>
    </section>
  );
};

export default Hero;
