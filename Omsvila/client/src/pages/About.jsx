import React from "react";
import aboutImg from "../assets/about-Img.png";
import {
  FaLeaf,
  FaHeart,
  FaAward,
  FaUsers,
  FaFlask,
  FaStar,
} from "react-icons/fa";

const stats = [
  { value: "25+", label: "Years of Legacy" },
  { value: "20+", label: "Unique Products" },
  { value: "10K+", label: "Happy Customers" },
  { value: "5", label: "States Delivered" },
];

const values = [
  {
    icon: <FaLeaf size={28} />,
    title: "100% Natural",
    desc: "No artificial colours, flavours, or preservatives. Ever.",
  },
  {
    icon: <FaHeart size={28} />,
    title: "Made with Love",
    desc: "Every batch is prepared with the same care as home cooking.",
  },
  {
    icon: <FaAward size={28} />,
    title: "Authentic Recipes",
    desc: "Recipes preserved across three generations of our family.",
  },
  {
    icon: <FaFlask size={28} />,
    title: "Hygienic Process",
    desc: "Manufactured in a certified hygienic facility with quality checks.",
  },
  {
    icon: <FaUsers size={28} />,
    title: "Family Business",
    desc: "Women-led enterprise rooted in community and tradition.",
  },
  {
    icon: <FaStar size={28} />,
    title: "Award Winning",
    desc: "Recognised by the Karnataka state government for quality produce.",
  },
];

const process = [
  { step: "01", title: "Source", desc: "We source spices and grains directly from trusted local farmers in Karnataka." },
  { step: "02", title: "Prepare", desc: "Ingredients are cleaned, sun-dried, and ground using traditional stone methods." },
  { step: "03", title: "Cook", desc: "Small batches are cooked in cold-pressed coconut oil to lock in freshness and taste." },
  { step: "04", title: "Pack", desc: "Vacuum-sealed in food-grade packaging to ensure a shelf life of 6 months." },
];

const About = () => {
  return (
    <div className="about-section">
      <div className="container mt-5 mb-5">

        {/* ── Our Story ── */}
        <h2 className="section-title mb-4">Our Story</h2>
        <div className="about-card shadow-sm p-4 d-flex flex-wrap align-items-center gap-4">
          <div className="col-md-5">
            <img src={aboutImg} alt="About Om Vilas" className="img-fluid rounded" />
          </div>
          <div className="col-md-6">
            <h5 className="fw-bold text-brown mb-2">Family-run since 1998</h5>
            <p className="text-muted">
              Founded in the heart of Mandya, Karnataka, Om Vilas Condiments began as a small
              family venture with a big dream — to share our grandmother's authentic recipes with the world.
            </p>
            <p className="text-muted">
              For over two decades, we've remained true to our vision of delivering pure, traditional taste
              using only the highest quality ingredients. Every product we create is a testament to our
              family's legacy and our commitment to preserving the authentic flavours of India.
            </p>
            <p className="text-muted">
              What started as selling to neighbours and local markets has grown into a brand trusted
              by over 10,000 families across five Indian states — yet our process, our recipes, and
              our values remain exactly the same.
            </p>
            <div className="d-flex align-items-start mt-3 vision-block">
              <span className="check-icon me-2">✓</span>
              <div>
                <strong className="text-brown">Our Vision</strong>
                <p className="mb-0 text-muted">
                  To bring the authentic taste of traditional Indian snacks to every home while
                  supporting local farming communities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="row g-3 my-5 text-center">
          {stats.map((s, i) => (
            <div className="col-6 col-md-3" key={i}>
              <div
                className="p-4 rounded-4 h-100"
                style={{ background: "#fff5e9", border: "1px solid #f2cc85" }}
              >
                <div
                  className="fw-bold mb-1"
                  style={{ fontSize: "2.2rem", color: "#e75b0c" }}
                >
                  {s.value}
                </div>
                <div className="text-muted small fw-semibold">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── Mission ── */}
        <div
          className="rounded-4 p-5 my-5 text-center"
          style={{
            background: "linear-gradient(135deg, #e75b0c 0%, #5e2b00 100%)",
            color: "white",
          }}
        >
          <h3 className="fw-bold mb-3">Our Mission</h3>
          <p
            className="mb-0 mx-auto"
            style={{ maxWidth: 620, fontSize: "1.1rem", opacity: 0.92 }}
          >
            To craft traditional snacks and condiments that connect people to their roots —
            using natural ingredients, honest processes, and the warmth of home cooking —
            while empowering local farmers and artisans who make it all possible.
          </p>
        </div>

        {/* ── Our Values ── */}
        <h2 className="section-title mb-4">Our Values</h2>
        <div className="row g-3 mb-5">
          {values.map((v, i) => (
            <div className="col-sm-6 col-md-4" key={i}>
              <div
                className="p-4 rounded-4 h-100 d-flex gap-3 align-items-start"
                style={{ background: "#fffcf2", border: "1px solid #f2cc85" }}
              >
                <div style={{ color: "#e75b0c", flexShrink: 0, marginTop: 2 }}>
                  {v.icon}
                </div>
                <div>
                  <h6 className="fw-bold text-brown mb-1">{v.title}</h6>
                  <p className="text-muted small mb-0">{v.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── How We Make It ── */}
        <h2 className="section-title mb-4">How We Make It</h2>
        <div className="row g-3">
          {process.map((p, i) => (
            <div className="col-sm-6 col-md-3" key={i}>
              <div className="p-4 rounded-4 h-100 text-center" style={{ background: "#fff5e9" }}>
                <div
                  className="fw-bold mb-2 mx-auto d-flex align-items-center justify-content-center rounded-circle"
                  style={{
                    width: 48,
                    height: 48,
                    background: "#e75b0c",
                    color: "white",
                    fontSize: "1rem",
                  }}
                >
                  {p.step}
                </div>
                <h6 className="fw-bold text-brown mb-1">{p.title}</h6>
                <p className="text-muted small mb-0">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default About;
