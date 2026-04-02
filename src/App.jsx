import React, { useState, useEffect, useRef } from 'react';
import { Mail, ExternalLink, Menu, X, ChevronDown, CheckCircle, Smartphone, Layout, Server } from 'lucide-react';
import { FiGithub as Github, FiLinkedin as Linkedin } from 'react-icons/fi';
import { FaReact, FaNodeJs, FaHtml5, FaPython, FaJava, FaCss3Alt, FaChartBar } from 'react-icons/fa';
import { SiScikitlearn, SiPandas, SiTensorflow, SiMysql } from 'react-icons/si';
import './index.css';
import './App.css';

export default function Portfolio() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const cursorDotRef = useRef(null);
  const cursorFollowerRef = useRef(null);

  // Custom Cursor Logic
  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let dotX = 0, dotY = 0;
    let followerX = 0, followerY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      const target = e.target;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        document.body.classList.add('hovering');
      } else {
        document.body.classList.remove('hovering');
      }
    };

    const renderCursor = () => {
      dotX += (mouseX - dotX) * 0.5;
      dotY += (mouseY - dotY) * 0.5;

      followerX += (mouseX - followerX) * 0.2;
      followerY += (mouseY - followerY) * 0.2;

      if (cursorDotRef.current && cursorFollowerRef.current) {
        cursorDotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;
        cursorFollowerRef.current.style.transform = `translate3d(${followerX}px, ${followerY}px, 0)`;
      }

      requestAnimationFrame(renderCursor);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(renderCursor);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.body.classList.remove('hovering');
    };
  }, []);

  // Intersection Observer
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'training', 'certifications', 'education', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, []);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const navItems = ['home', 'about', 'skills', 'projects', 'training', 'certifications', 'education', 'contact'];

  // Helper for rendering dot progress
  const renderDots = (score) => {
    const max = 5;
    return (
      <div className="skill-dots">
        {[...Array(max)].map((_, i) => (
          <div key={i} className={`dot ${i < score ? 'active' : ''}`} />
        ))}
      </div>
    );
  };

  return (
    <>
      <div id="cursor-dot" ref={cursorDotRef}></div>
      <div id="cursor-follower" ref={cursorFollowerRef}></div>

      {/* NAVIGATION */}
      <nav className="navbar">
        <div className="nav-brand">Rudra Nayak</div>
        <div className="nav-links">
          {navItems.map(item => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              className={`nav-link ${activeSection === item ? 'active' : ''}`}
            >
              {item}
            </button>
          ))}
        </div>
        <button className="menu-toggle" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div style={{
          position: 'fixed', top: '70px', left: 0, right: 0,
          background: 'rgba(13, 0, 26, 0.95)', backdropFilter: 'blur(10px)',
          borderBottom: '1px solid var(--glass-border)', padding: '2rem', zIndex: 99
        }}>
          {navItems.map(item => (
            <button
              key={item}
              onClick={() => scrollToSection(item)}
              style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '1rem 0', color: '#fff', textTransform: 'uppercase',
                borderBottom: '1px solid rgba(255,255,255,0.05)', background: 'none', border: 'none',
                fontWeight: 'bold', letterSpacing: '2px'
              }}
            >
              {item}
            </button>
          ))}
        </div>
      )}

      {/* HERO SECTION */}
      <section id="home" className="hero max-container">
        <div className="hero-background"></div>
        <div className="hero-glow"></div>

        <div className="hero-content">
          <div className="hero-text reveal">
            <span className="hero-greeting">Hi, I am Rudra Narayan Nayak</span>
            <h1 className="hero-title">
              Data Science <br />
              <span className="highlight">Student</span>
            </h1>
            <p className="hero-subtitle">
              A computer science student focused on extracting actionable insights through data analysis, statistical modeling, and machine learning. Let's solve complex problems with data.
            </p>
            <div className="btn-group">
              <a href="/Rudra%20Narayan%20Nayak%2012306470.pdf" target="_blank" rel="noreferrer" className="btn btn-primary">
                View CV
              </a>
              <button onClick={() => scrollToSection('projects')} className="btn btn-secondary">
                View Work
              </button>
            </div>
          </div>

          <div className="hero-image-container reveal delay-200">
            <div className="hero-image-mask">
              <span className="hero-image-placeholder">RN.</span>
            </div>

            {/* Floating Tech Icons */}
            <div className="floating-icon icon-1"><FaPython size={30} color="#FFD43B" /></div>
            <div className="floating-icon icon-2"><SiScikitlearn size={30} color="#F7931E" /></div>
            <div className="floating-icon icon-3"><SiPandas size={30} color="#150458" /></div>
          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section id="about" className="section max-container">
        <div className="section-title reveal">
          <span>Get To Know Me</span>
          <h2>Biography</h2>
        </div>

        <div className="about-split glass-card reveal delay-100">
          <div className="about-image">
            <div className="about-img-mask">
              <span style={{ fontSize: '3rem', fontWeight: 900, color: 'rgba(255,255,255,0.05)' }}>RN.</span>
            </div>
          </div>

          <div className="about-details">
            <div className="about-text">
              <p>
                I am a driven Computer Science student at Lovely Professional University, deeply passionate about harnessing the power of data through machine learning and statistical modeling. Finding patterns within complex datasets and extracting actionable business intelligence is my daily fuel.
              </p>
              <p>
                I thrive in building robust predictive models, performing exploratory data analysis, and designing data pipelines. My analytical principles rely heavily on mathematical rigor, clean coding practices, and transforming raw information into strategic insights.
              </p>
            </div>

            <div className="feature-tags">
              <span className="feature-tag"><Server size={16} /> Machine Learning Engineering</span>
              <span className="feature-tag"><Layout size={16} /> Data Analysis & Visualization</span>
              <span className="feature-tag"><CheckCircle size={16} /> Predictive Modeling</span>
            </div>

            <a href="/Rudra%20Narayan%20Nayak%2012306470.pdf" download="Rudra_Nayak_CV.pdf" className="btn btn-primary">
              Download Resume
            </a>
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="section max-container">
        <div className="section-title reveal">
          <span>My Arsenal</span>
          <h2>Technical Expertise</h2>
        </div>

        <div className="skills-container">
          <div className="glass-card reveal">
            <h3 style={{ marginBottom: '2rem', color: '#fff', fontSize: '1.4rem' }}>Programming & Web</h3>

            <div className="skill-row">
              <div className="skill-info">
                <div className="skill-icon"><FaReact size={24} /></div>
                <div className="skill-name">React.js</div>
              </div>
              {renderDots(4)}
            </div>

            <div className="skill-row">
              <div className="skill-info">
                <div className="skill-icon"><FaPython size={24} /></div>
                <div className="skill-name">Python</div>
              </div>
              {renderDots(5)}
            </div>

            <div className="skill-row">
              <div className="skill-info">
                <div className="skill-icon"><FaJava size={24} /></div>
                <div className="skill-name">Java</div>
              </div>
              {renderDots(4)}
            </div>

            <div className="skill-row" style={{ marginBottom: 0 }}>
              <div className="skill-info">
                <div className="skill-icon"><FaHtml5 size={24} /></div>
                <div className="skill-name">HTML & Vanilla CSS</div>
              </div>
              {renderDots(5)}
            </div>
          </div>

          <div className="glass-card reveal delay-200">
            <h3 style={{ marginBottom: '2rem', color: '#fff', fontSize: '1.4rem' }}>Data Science & MLOps</h3>

            <div className="skill-row">
              <div className="skill-info">
                <div className="skill-icon"><SiScikitlearn size={24} /></div>
                <div className="skill-name">Scikit-learn</div>
              </div>
              {renderDots(4)}
            </div>

            <div className="skill-row">
              <div className="skill-info">
                <div className="skill-icon"><SiPandas size={24} /></div>
                <div className="skill-name">Pandas & NumPy</div>
              </div>
              {renderDots(5)}
            </div>

            <div className="skill-row">
              <div className="skill-info">
                <div className="skill-icon"><SiMysql size={24} /></div>
                <div className="skill-name">MySQL</div>
              </div>
              {renderDots(4)}
            </div>

            <div className="skill-row" style={{ marginBottom: 0 }}>
              <div className="skill-info">
                <div className="skill-icon"><FaChartBar size={24} /></div>
                <div className="skill-name">Power BI</div>
              </div>
              {renderDots(4)}
            </div>
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="section max-container">
        <div className="section-title reveal">
          <span>My Creations</span>
          <h2>Featured Work</h2>
        </div>

        <div className="projects-grid">
          {/* Project 1 */}
          <div className="glass-card project-card reveal">
            <div className="project-image">
              Machine Learning Architecture
            </div>
            <div className="project-content">
              <div className="project-header">
                <h3 className="project-title">Shopper Intention Predictor</h3>
              </div>
              <p className="project-desc">
                An advanced ML-powered web application that accurately predicts e-commerce customer purchase intent. Included robust EDA and feature engineering to lift accuracy by over 12%.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">Flask</span>
                <span className="tech-tag">XGBoost</span>
              </div>
              <div className="project-action" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <a href="https://github.com/Rudra-Nayak" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>Demo</a>
                <a href="https://github.com/Rudra-Nayak" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>Source Code</a>
              </div>
            </div>
          </div>

          {/* Project 2 */}
          <div className="glass-card project-card reveal delay-200">
            <div className="project-image">
              Data Visualization Map
            </div>
            <div className="project-content">
              <div className="project-header">
                <h3 className="project-title">Expenditure Dashboard</h3>
              </div>
              <p className="project-desc">
                Interactive Power BI data visualization suite analyzing U.S. state-level personal consumption expenditures, delivering actionable strategic insights via dynamic KPI tracking.
              </p>
              <div className="project-tech">
                <span className="tech-tag">Power BI</span>
                <span className="tech-tag">DAX</span>
                <span className="tech-tag">ETL</span>
              </div>
              <div className="project-action" style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                <a href="https://github.com/Rudra-Nayak" target="_blank" rel="noreferrer" className="btn btn-primary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>Demo</a>
                <a href="https://github.com/Rudra-Nayak" target="_blank" rel="noreferrer" className="btn btn-secondary" style={{ padding: '0.6rem 1.5rem', fontSize: '0.85rem' }}>Source Code</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRAINING SECTION */}
      <section id="training" className="section max-container">
        <div className="section-title reveal">
          <span>Continuous Learning</span>
          <h2>Professional Training</h2>
        </div>

        <div className="glass-card reveal">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>Machine Learning Made Easy: From Basics to AI Applications</h3>
              <div style={{ color: 'var(--accent-pink)', fontWeight: '500', fontSize: '1rem' }}>LPU Skill Development | Certificate</div>
            </div>
            <div style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Jun '25 – Jul '25</div>
          </div>
          
          <ul style={{ color: 'var(--text-secondary)', lineHeight: '1.8', paddingLeft: '1.5rem', listStyleType: 'circle' }}>
            <li style={{ marginBottom: '0.8rem' }}>Performed in-depth Exploratory Data Analysis (EDA) using NumPy and Pandas, streamlining preprocessing workflows and reducing data preparation time by 20%.</li>
            <li style={{ marginBottom: '0.8rem' }}>Engineered, trained, and evaluated multiple Machine Learning models (Linear Regression, KNN, SVM, Decision Trees, K-Means, Ensemble Methods) using Scikit-learn, achieving an average model accuracy improvement of 15%.</li>
            <li style={{ marginBottom: '0.8rem' }}>Deployed trained ML models on a web interface, enabling real-time prediction and user interaction.</li>
            <li>Gained hands-on experience with Generative AI, workflow automation using n8n, and developing agentic AI applications.</li>
          </ul>
        </div>
      </section>

      {/* CERTIFICATIONS SECTION */}
      <section id="certifications" className="section max-container">
        <div className="section-title reveal">
          <span>My Qualifications</span>
          <h2>Certifications</h2>
        </div>

        <div className="projects-grid">
          <div className="glass-card reveal">
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.8rem' }}>Become an OCI AI Foundations Associate (2025)</h3>
            <div style={{ color: 'var(--accent-pink)', marginBottom: '1rem', fontWeight: '500' }}>Oracle</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="tech-tag">Feb 2026</span>
            </div>
          </div>
          
          <div className="glass-card reveal delay-100">
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.8rem' }}>Cloud Computing</h3>
            <div style={{ color: 'var(--accent-pink)', marginBottom: '1rem', fontWeight: '500' }}>NPTEL</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="tech-tag">Apr 2025</span>
            </div>
          </div>

          <div className="glass-card reveal delay-200">
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.8rem' }}>Intro to SQL</h3>
            <div style={{ color: 'var(--accent-pink)', marginBottom: '1rem', fontWeight: '500' }}>Kaggle</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="tech-tag">Nov 2025</span>
            </div>
          </div>
        </div>
      </section>

      {/* EDUCATION SECTION */}
      <section id="education" className="section max-container">
        <div className="section-title reveal">
          <span>Academic Background</span>
          <h2>Education</h2>
        </div>

        <div className="glass-card reveal">
          <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', color: '#fff', marginBottom: '0.5rem' }}>Bachelor of Technology in Computer Science and Engineering</h3>
            <div style={{ color: 'var(--accent-pink)', fontWeight: '500', fontSize: '1rem', marginBottom: '0.5rem' }}>Lovely Professional University (Phagwara, Punjab)</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ color: 'var(--text-secondary)' }}>CGPA: <span style={{ color: '#fff', fontWeight: 'bold' }}>6.71</span></div>
              <div style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Aug '23 – Present</div>
            </div>
          </div>

          <div style={{ paddingBottom: '1.5rem', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>Intermediate (PCM)</h3>
            <div style={{ color: 'var(--accent-pink)', fontWeight: '500', fontSize: '0.95rem', marginBottom: '0.5rem' }}>Bhadrak Higher Secondary School (Bhadrak, Odisha)</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ color: 'var(--text-secondary)' }}>Percentage: <span style={{ color: '#fff', fontWeight: 'bold' }}>63%</span></div>
              <div style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Mar '20 – May '22</div>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', color: '#fff', marginBottom: '0.5rem' }}>Matriculation</h3>
            <div style={{ color: 'var(--accent-pink)', fontWeight: '500', fontSize: '0.95rem', marginBottom: '0.5rem' }}>St. Xavier High School (Bhadrak, Odisha)</div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ color: 'var(--text-secondary)' }}>Percentage: <span style={{ color: '#fff', fontWeight: 'bold' }}>83%</span></div>
              <div style={{ color: 'var(--text-secondary)', fontWeight: '600' }}>Mar '16 – May '20</div>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="section max-container" style={{ marginBottom: '4rem' }}>
        <div className="section-title reveal">
          <span>Let's Talk</span>
          <h2>Drop Me a Message</h2>
        </div>

        <div className="glass-card contact-container reveal">
          <div className="contact-info">
            <h3>Contact Information</h3>
            <p>
              I am currently open to exciting new data science and machine learning opportunities. Fill out the form or reach out directly via my socials!
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-pink)' }}>
                  <Mail size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Email</div>
                  <div style={{ fontWeight: 600 }}>rudran089@gmail.com</div>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#fff' }}>
                <div style={{ background: 'var(--bg-surface)', padding: '1rem', borderRadius: '50%', color: 'var(--accent-pink)' }}>
                  <Smartphone size={24} />
                </div>
                <div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Phone</div>
                  <div style={{ fontWeight: 600 }}>+91 7847871204</div>
                </div>
              </div>
            </div>
          </div>

          <div className="contact-form">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="form-group">
                <label className="form-label">Full Name</label>
                <input type="text" className="form-input" placeholder="Your name" />
              </div>
              <div className="form-group">
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" placeholder="you@domain.com" />
              </div>
              <div className="form-group" style={{ marginBottom: '2rem' }}>
                <label className="form-label">Message</label>
                <textarea className="form-textarea" placeholder="How can I help you?"></textarea>
              </div>
              <button className="btn btn-primary form-submit">Endeavor Together</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="max-container footer-content">
          <div className="social-links" style={{ marginBottom: '1rem' }}>
            <a href="https://github.com/Rudra-Nayak" target="_blank" rel="noreferrer" className="social-link" aria-label="Github">
              <Github size={22} />
            </a>
            <a href="https://www.linkedin.com/in/rudra-narayan-nayak-/" target="_blank" rel="noreferrer" className="social-link" aria-label="LinkedIn">
              <Linkedin size={22} />
            </a>
          </div>
          <div className="copyright">
            © 2026 Rudra Narayan Nayak.
          </div>
        </div>
      </footer>
    </>
  );
}
