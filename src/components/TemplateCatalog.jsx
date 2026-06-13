import React from 'react';

export default function TemplateCatalog({ activeTemplate, onSelectTemplate }) {
  const templates = [
    {
      id: 'classic',
      name: 'Classic',
      badge: 'Popular',
      badgeClass: '',
      preview: (
        <div className="template-preview classic-preview">
          <div className="tp-header">
            <div className="tp-name">John Doe</div>
            <div className="tp-title">Software Engineer</div>
            <div className="tp-contact">john@email.com · +1 234 567 890</div>
          </div>
          <div className="tp-section">
            <div className="tp-section-title">EXPERIENCE</div>
            <div className="tp-line"></div>
            <div className="tp-item">
              <div className="tp-job-title">Senior Developer</div>
              <div className="tp-company">Google Inc.</div>
              <div className="tp-desc"></div>
              <div className="tp-desc short"></div>
            </div>
          </div>
          <div className="tp-section">
            <div className="tp-section-title">SKILLS</div>
            <div className="tp-line"></div>
            <div className="tp-skills-row">
              <div className="tp-skill"></div>
              <div className="tp-skill"></div>
              <div className="tp-skill"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'modern',
      name: 'Modern',
      badge: 'Trending',
      badgeClass: 'accent',
      preview: (
        <div className="template-preview modern-preview">
          <div className="mp-sidebar">
            <div className="mp-avatar"></div>
            <div className="mp-s-name"></div>
            <div className="mp-s-contact">
              <div className="mp-s-line"></div>
              <div className="mp-s-line"></div>
            </div>
            <div className="mp-s-section"></div>
            <div className="mp-s-skill"></div>
            <div className="mp-s-skill"></div>
          </div>
          <div className="mp-main">
            <div className="mp-title">Senior Developer</div>
            <div className="mp-section-title">EXPERIENCE</div>
            <div className="mp-item"></div>
            <div className="mp-item short"></div>
            <div className="mp-section-title">EDUCATION</div>
            <div className="mp-item"></div>
          </div>
        </div>
      )
    },
    {
      id: 'creative',
      name: 'Creative',
      badge: 'Designer',
      badgeClass: 'purple',
      preview: (
        <div className="template-preview creative-preview">
          <div className="cr-header">
            <div className="cr-accent-bar"></div>
            <div className="cr-name">JOHN DOE</div>
            <div className="cr-role">Creative Designer</div>
          </div>
          <div className="cr-body">
            <div className="cr-col">
              <div className="cr-section-dot">● EXPERIENCE</div>
              <div className="cr-item"></div>
              <div className="cr-item short"></div>
            </div>
            <div className="cr-col">
              <div className="cr-section-dot">● SKILLS</div>
              <div className="cr-skill-bar"><div className="cr-skill-fill"></div></div>
              <div className="cr-skill-bar"><div className="cr-skill-fill medium"></div></div>
              <div className="cr-skill-bar"><div className="cr-skill-fill long"></div></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'executive',
      name: 'Executive',
      badge: 'Premium',
      badgeClass: 'gold',
      preview: (
        <div className="template-preview executive-preview">
          <div className="ex-header">
            <div className="ex-top-bar"></div>
            <div className="ex-name">JOHN DOE</div>
            <div className="ex-title">Chief Executive Officer</div>
            <div className="ex-divider"></div>
          </div>
          <div className="ex-body">
            <div className="ex-section">PROFESSIONAL SUMMARY</div>
            <div className="ex-para"></div>
            <div className="ex-para short"></div>
            <div className="ex-section">EXPERIENCE</div>
            <div className="ex-item bold"></div>
            <div className="ex-item"></div>
          </div>
        </div>
      )
    },
    {
      id: 'tech',
      name: 'Tech',
      badge: 'Developer',
      badgeClass: 'cyan',
      preview: (
        <div className="template-preview tech-preview">
          <div className="te-header">
            <div className="te-terminal">
              <div className="te-dots"><span></span><span></span><span></span></div>
              <div className="te-cmd">$ ./john_doe.exe</div>
            </div>
          </div>
          <div className="te-body">
            <div className="te-section">// EXPERIENCE</div>
            <div className="te-item"></div>
            <div className="te-item short"></div>
            <div className="te-section">// TECH STACK</div>
            <div className="te-tags">
              <div className="te-tag"></div>
              <div className="te-tag"></div>
              <div className="te-tag"></div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'compact',
      name: 'Compact',
      badge: 'Minimal',
      badgeClass: 'green',
      preview: (
        <div className="template-preview compact-preview">
          <div className="co-header">
            <div className="co-name">John Doe</div>
            <div className="co-info-row">
              <div className="co-info-item"></div>
              <div className="co-info-item"></div>
              <div className="co-info-item"></div>
            </div>
          </div>
          <div className="co-body">
            <div className="co-row">
              <div className="co-label">SUMMARY</div>
              <div className="co-content">
                <div className="co-line"></div>
                <div className="co-line short"></div>
              </div>
            </div>
            <div className="co-divider"></div>
            <div className="co-row">
              <div className="co-label">SKILLS</div>
              <div className="co-content">
                <div className="co-chips">
                  <div className="co-chip"></div>
                  <div className="co-chip"></div>
                  <div className="co-chip"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'slate',
      name: 'Slate',
      badge: 'Professional',
      badgeClass: 'accent',
      preview: (
        <div className="template-preview slate-preview">
          <div className="new-preview-header"><strong>JOHN DOE</strong><span>PRODUCT MANAGER</span></div>
          <div className="new-preview-columns">
            <div className="new-preview-main"><b>PROFILE</b><i></i><i></i><b>EXPERIENCE</b><i></i><i></i><i></i></div>
            <div className="new-preview-side"><b>EXPERTISE</b><i></i><i></i><b>EDUCATION</b><i></i></div>
          </div>
        </div>
      )
    },
    {
      id: 'elegant',
      name: 'Elegant',
      badge: 'Editorial',
      badgeClass: 'gold',
      preview: (
        <div className="template-preview elegant-preview">
          <div className="elegant-preview-head"><small>CURRICULUM VITAE</small><strong>John Doe</strong><span>Editorial Director</span></div>
          <div className="elegant-preview-body"><b>PROFILE</b><i></i><i></i><b>EXPERIENCE</b><i></i><i></i><b>EDUCATION</b><i></i></div>
        </div>
      )
    },
    {
      id: 'minimal',
      name: 'Minimal',
      badge: 'ATS Ready',
      badgeClass: 'green',
      preview: (
        <div className="template-preview minimal-preview">
          <div className="minimal-preview-head"><strong>JOHN DOE</strong><span>DESIGN ENGINEER</span></div>
          <div className="minimal-preview-body"><i></i><i></i><b>EXPERIENCE</b><i></i><i></i><i></i><div><span></span><span></span></div></div>
        </div>
      )
    }
  ];

  return (
    <section className="templates-section" id="templates">
      <div className="section-container">
        <div className="section-header">
          <span className="section-tag">Choose Your Style</span>
          <h2 className="section-title">9 Professional<br/><span className="gradient-text">Resume Templates</span></h2>
          <p className="section-subtitle">Click any template to use it in the builder</p>
        </div>
        <div className="templates-grid">
          {templates.map((t) => (
            <div
              className={`template-card ${activeTemplate === t.id ? 'active' : ''}`}
              key={t.id}
              onClick={() => onSelectTemplate(t.id)}
            >
              {t.preview}
              <div className="template-info">
                <span className="template-name">{t.name}</span>
                <span className={`template-badge ${t.badgeClass}`}>{t.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
