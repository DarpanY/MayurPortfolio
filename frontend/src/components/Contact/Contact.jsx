import "./Contact.css";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref}>
      <div className="container">

        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          Let's Create Something Amazing
        </motion.h2>

        <motion.form
          className="contact-form glass"
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        >
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="Email" />
          <textarea rows="6" placeholder="Tell me about your project" />
          <button className="primary-btn" type="submit">
            Send Message
          </button>
        </motion.form>

      </div>
    </section>
  );
};

export default Contact;
