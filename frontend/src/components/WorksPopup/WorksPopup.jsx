import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./WorksPopup.css";

const ICONS = {
  "Capcut":        "🎬",
  "PremirePro":    "🎞️",
  "After Effects": "✨",
  "Canva":         "🎨",
  "PhotoShop":     "🖼️",
};

const WorksPopup = ({ service, onClose }) => {
  const [active, setActive] = useState(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") { if (active) setActive(null); else onClose(); }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const works = service.works || [];

  return (
    <AnimatePresence>
      <motion.div
        className="wp-backdrop"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        transition={{ duration: 0.35 }}
        onClick={() => { if (!active) onClose(); }}
      >
        <motion.div
          className="wp-panel"
          initial={{ opacity: 0, scale: 0.9, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 50 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="wp-floor-glow" />

          <div className="wp-header">
            <span className="wp-header-icon">{ICONS[service.title] || "🛠️"}</span>
            <div>
              <h2 className="wp-title">{service.title}</h2>
              <p className="wp-desc">{service.description}</p>
            </div>
            <button className="wp-close" onClick={onClose}>✕</button>
          </div>

          <div className="wp-count">
            <span>{works.length} Work{works.length !== 1 ? "s" : ""}</span>
          </div>

          {works.length === 0 ? (
            <div className="wp-empty">
              <div className="wp-empty-icon">🎨</div>
              <p>No works uploaded yet for this service.</p>
            </div>
          ) : (
            <div className="wp-gallery">
              {works.map((work, i) => (
                <motion.div
                  className="wp-item"
                  key={work._id || i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                  onClick={() => setActive(work)}
                >
                  <div className="wp-item-glow" />
                  <div className="wp-item-media">
                    {work.mediaType === "video"
                      ? <video src={work.url} muted autoPlay loop playsInline />
                      : <img src={work.url} alt={work.title || `Work ${i + 1}`} />
                    }
                    <div className="wp-item-overlay">
                      <span>{work.mediaType === "video" ? "▶" : "🔍"}</span>
                    </div>
                  </div>
                  {work.title && <p className="wp-item-title">{work.title}</p>}
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>

        <AnimatePresence>
          {active && (
            <motion.div
              className="wp-fs-backdrop"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActive(null)}
            >
              <motion.div
                className="wp-fs-box"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="wp-fs-close" onClick={() => setActive(null)}>✕</button>
                <div className="wp-fs-glow" />
                {active.mediaType === "video"
                  ? <video src={active.url} controls autoPlay loop playsInline className="wp-fs-media" />
                  : <img src={active.url} alt={active.title || "Work"} className="wp-fs-media" />
                }
                {active.title && <p className="wp-fs-title">{active.title}</p>}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </AnimatePresence>
  );
};

export default WorksPopup;