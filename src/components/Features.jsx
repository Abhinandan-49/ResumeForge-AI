import React from 'react';

export default function Features() {
  const features = [
    { icon: '🤖', title: 'Writing Assistant', desc: 'Create focused summaries, objectives, skill suggestions, and stronger experience wording without an account or API key.' },
    { icon: '🎨', title: '9 Pro Templates', desc: 'Choose from traditional, modern, creative, executive, technical, compact, editorial, and minimal layouts.' },
    { icon: '⚡', title: 'Live Preview', desc: 'See your resume update in real-time as you type. What you see is exactly what you get in the final PDF.' },
    { icon: '📥', title: 'PDF Export', desc: 'Download a pixel-perfect PDF of your resume ready to send to employers, directly from your browser.' },
    { icon: '🎯', title: 'ATS Friendly', desc: 'All templates are optimized for Applicant Tracking Systems — ensuring your resume gets seen by humans.' },
    { icon: '🔒', title: 'Privacy First', desc: 'Your data never leaves your browser. No account required, no data stored on servers.' }
  ];

  return (
    <section className="features" id="features">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Why ResumeForge?</span>
          <h2 className="section-title">Everything You Need to<br/><span className="gradient-text">Land That Job</span></h2>
        </div>
        <div className="features-grid">
          {features.map((f, i) => (
            <div className="feature-card" key={i}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
