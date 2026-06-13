import React from 'react';

export default function Hero({ onStartClick, onViewTemplatesClick }) {
  return (
    <section className="hero" id="hero">
      <div className="hero-bg">
        <div className="hero-blob blob-1"></div>
        <div className="hero-blob blob-2"></div>
        <div className="hero-blob blob-3"></div>
        <div className="grid-overlay"></div>
      </div>
      <div className="hero-content">
        <div className="hero-badge">
          <span className="badge-dot"></span>
          Private by design - built by <a href="https://madcoder.in" target="_blank" rel="noopener noreferrer">MadCoder</a>
        </div>
        <h1 className="hero-title">
          Build Your Dream<br />
          <span className="gradient-text">Resume in Seconds</span>
        </h1>
        <p className="hero-subtitle">
          Create a polished, ATS-friendly resume with nine clean templates, guided writing help, live preview, and one-click PDF export.
        </p>
        <div className="hero-actions">
          <button className="btn-primary" onClick={onStartClick}>
            <span>Start Building</span>
            <span className="btn-arrow">→</span>
          </button>
          <button className="btn-secondary" onClick={onViewTemplatesClick}>View Templates</button>
        </div>
        <div className="hero-stats">
          <div className="stat">
            <span className="stat-num">9</span>
            <span className="stat-label">Templates</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num">100%</span>
            <span className="stat-label">Private</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat">
            <span className="stat-num">PDF</span>
            <span className="stat-label">Export</span>
          </div>
        </div>
      </div>
      <div className="hero-visual">
        <div className="resume-mockup">
          <div className="mockup-card card-1">
            <div className="mockup-avatar"></div>
            <div className="mockup-lines">
              <div className="mockup-line long"></div>
              <div className="mockup-line medium"></div>
              <div className="mockup-line short"></div>
            </div>
          </div>
          <div className="mockup-card card-2">
            <div className="mockup-section-title"></div>
            <div className="mockup-item"></div>
            <div className="mockup-item short"></div>
            <div className="mockup-item"></div>
          </div>
          <div className="ai-badge floating">
            <span>+</span> Writing Help
          </div>
        </div>
      </div>
    </section>
  );
}
