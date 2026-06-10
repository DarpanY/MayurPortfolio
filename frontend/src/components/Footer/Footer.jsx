import "./Footer.css";

const Footer = () => {
  return (
    <footer>
      <div className="container footer-content">

        <h2>MAYUR DHIMAN.</h2>

        <p>
          Video Editor &amp; Graphic Designer — Creating impactful visuals
          through editing, design and 3D animation.
        </p>

        <div className="footer-links">
          <a href="https://instagram.com/mayur.dhiman_" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://behance.net/mayurdhiman" target="_blank" rel="noreferrer">Behance</a>
          <a href="https://youtube.com/@mayur.dhiman" target="_blank" rel="noreferrer">YouTube</a>
          <a href="https://linkedin.com/in/mayur-dhiman" target="_blank" rel="noreferrer">LinkedIn</a>
        </div>

        <div className="footer-contact">
          <span>📞 8269076877</span>
          <span>✉️ dhimanmayur37@gmail.com</span>
        </div>

        <span className="footer-copy">
          © 2026 Mayur Dhiman. All Rights Reserved.
        </span>

      </div>
    </footer>
  );
};

export default Footer;
