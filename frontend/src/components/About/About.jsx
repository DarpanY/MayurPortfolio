import "./About.css";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const skills = [
  { name: "Photoshop",   pct: 90 },
  { name: "Illustrator", pct: 85 },
  { name: "Premiere Pro",pct: 90 },
  { name: "After Effects",pct:80 },
  { name: "Maya",        pct: 75 },
  { name: "3ds Max",     pct: 70 },
];

const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" ref={ref}>
      <div className="container about-wrapper">

        <motion.div
          className="about-image"
          initial={{ opacity: 0, x: -80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <div className="about-circle"></div>
        </motion.div>

        <motion.div
          className="about-content"
          initial={{ opacity: 0, x: 80 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          <span>ABOUT ME</span>

          <h2>Mayur Dhiman</h2>

          <p className="about-role">Video Editor &amp; Graphic Designer</p>

          <p>
            Creative and passionate Graphic Designer &amp; Video Editor with a keen
            eye for detail and a strong sense of visual storytelling. Currently
            pursuing B.Sc in Animation &amp; Multimedia from Renaissance University.
            I love turning ideas into impactful designs and engaging videos that
            communicate messages effectively. Eager to contribute my skills,
            creativity and dedication to a dynamic team and grow together.
          </p>

          <div className="about-info-grid">
            <div><span className="info-label">Phone</span><span>8269076877</span></div>
            <div><span className="info-label">Email</span><span>dhimanmayur37@gmail.com</span></div>
            <div><span className="info-label">Location</span><span>India</span></div>
            <div><span className="info-label">Status</span><span>Open to Work — Full Time / Part Time</span></div>
          </div>

          <div className="stats">
            {[
              { value: "1+", label: "Years Exp." },
              { value: "150+", label: "Projects" },
              { value: "50+", label: "Clients" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 + i * 0.15 }}
              >
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </motion.div>
            ))}
          </div>

          {/* Skills */}
          <div className="skills-section">
            <h4>Skills</h4>
            {skills.map((s, i) => (
              <motion.div
                className="skill-row"
                key={s.name}
                initial={{ opacity: 0, x: 40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.6 + i * 0.1 }}
              >
                <div className="skill-label">
                  <span>{s.name}</span>
                  <span>{s.pct}%</span>
                </div>
                <div className="skill-bar">
                  <motion.div
                    className="skill-fill"
                    initial={{ width: 0 }}
                    animate={isInView ? { width: `${s.pct}%` } : {}}
                    transition={{ duration: 0.9, delay: 0.7 + i * 0.1, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            ))}
          </div>

          {/* Education */}
          <div className="education-section">
            <h4>Education</h4>
            <div className="edu-item">
              <span className="edu-year">2022</span>
              <div>
                <strong>Bright H.S School</strong>
                <p>Passed 12th Standard</p>
              </div>
            </div>
            <div className="edu-item">
              <span className="edu-year">2025</span>
              <div>
                <strong>Renaissance University</strong>
                <p>Bachelor of Computer Applications<br /><em>(Currently Pursuing B.Sc in Animation &amp; Multimedia)</em></p>
              </div>
            </div>
          </div>

          {/* Experience */}
          <div className="experience-section">
            <h4>Experience</h4>
            <div className="exp-item">
              <div className="exp-header">
                <strong>Graphic Designer &amp; Video Editor</strong>
                <span className="exp-date">Jan 2024 – Present</span>
              </div>
              <span className="exp-company">Rex Marketing</span>
              <p>
                Currently working at Rex Marketing as a Graphic Designer and Video Editor.
                Responsible for creating engaging designs, social media creatives,
                promotional videos and brand content.
              </p>
            </div>
          </div>

          {/* Social Links */}
          <div className="social-links">
            <a href="https://instagram.com/mayur.dhiman_" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://behance.net/mayurdhiman" target="_blank" rel="noreferrer">Behance</a>
            <a href="https://youtube.com/@mayur.dhiman" target="_blank" rel="noreferrer">YouTube</a>
            <a href="https://linkedin.com/in/mayur-dhiman" target="_blank" rel="noreferrer">LinkedIn</a>
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default About;
