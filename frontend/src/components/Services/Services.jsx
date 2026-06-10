import "./Services.css";
import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { getServices } from "../../api/serviceApi";
import WorksPopup from "../WorksPopup/WorksPopup";

const Services = () => {
  const [services, setServices] = useState([]);
  const [selected, setSelected] = useState(null);
  const ref      = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    getServices().then(setServices).catch(() => {});
  }, []);

  return (
    <>
      <section id="services" ref={ref}>
        <div className="container">
          <motion.h2
            className="section-title"
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            Services
          </motion.h2>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                className="service-card glass"
                key={service._id}
                initial={{ opacity: 0, y: 60, scale: 0.95 }}
                animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.55, delay: index * 0.12, ease: "easeOut" }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
                onClick={() => setSelected(service)}
              >
                <div className="card-media">
                  {service.mediaType === "image" || !service.videoUrl ? (
                    <img src={service.imageUrl || service.videoUrl} alt={service.title} />
                  ) : (
                    <video autoPlay muted loop playsInline>
                      <source src={service.videoUrl} type="video/mp4" />
                    </video>
                  )}
                  <div className="card-overlay">
                    <span className="card-play-icon">
                      {service.works?.length > 0 ? `${service.works.length} Works` : "View Works"}
                    </span>
                  </div>
                </div>

                {/* Card body: only show title + works badge, NO description */}
                <div className="card-body">
                  <h3>{service.title}</h3>
                  {service.works?.length > 0 && (
                    <span className="card-works-badge">
                      {service.works.length} Work{service.works.length !== 1 ? "s" : ""}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {selected && (
        <WorksPopup service={selected} onClose={() => setSelected(null)} />
      )}
    </>
  );
};

export default Services;
