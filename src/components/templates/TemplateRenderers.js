function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}

function contactRow(data) {
  const parts = [];
  if (data.email) parts.push(data.email);
  if (data.phone) parts.push(data.phone);
  if (data.location) parts.push(data.location);
  if (data.linkedin) parts.push(`<a href="https://${data.linkedin}" target="_blank">${data.linkedin}</a>`);
  if (data.website) parts.push(`<a href="https://${data.website}" target="_blank">${data.website}</a>`);
  if (data.github) parts.push(`<a href="https://${data.github}" target="_blank">${data.github}</a>`);
  return parts.join(' &nbsp;·&nbsp; ');
}

function skillsHtml(skills, cls) {
  if (!skills.length) return '';
  return `<div class="r-skills-grid">${skills.map(s => `<span class="r-skill-chip">${escHtml(s)}</span>`).join('')}</div>`;
}

function expHtml(exp, cls) {
  if (!exp.length) return '';
  return exp.map(e => `
    <div class="${cls}">
      <div class="r-item-header">
        <span class="r-item-title">${escHtml(e.title)}</span>
        <span class="r-item-date">${escHtml(e.start)}${e.start || e.end ? ' – ' : ''}${escHtml(e.end || 'Present')}</span>
      </div>
      <div class="r-item-sub">${escHtml(e.company)}${e.location ? ' · ' + escHtml(e.location) : ''}</div>
      ${e.desc ? `<div class="r-item-desc">${escHtml(e.desc).replace(/\n/g, '<br>')}</div>` : ''}
    </div>
  `).join('');
}

function eduHtml(edu, cls) {
  if (!edu.length) return '';
  return edu.map(e => `
    <div class="${cls}">
      <div class="r-item-header">
        <span class="r-item-title">${escHtml(e.degree)}</span>
        <span class="r-item-date">${escHtml(e.start)}${e.start || e.end ? ' – ' : ''}${escHtml(e.end)}</span>
      </div>
      <div class="r-item-sub">${escHtml(e.school)}${e.location ? ' · ' + escHtml(e.location) : ''}${e.gpa ? ' | GPA: ' + escHtml(e.gpa) : ''}</div>
      ${e.desc ? `<div class="r-item-desc">${escHtml(e.desc)}</div>` : ''}
    </div>
  `).join('');
}

function projHtml(projects, cls) {
  if (!projects.length) return '';
  return projects.map(p => `
    <div class="${cls}">
      <div class="r-item-header">
        <span class="r-item-title">${escHtml(p.name)}</span>
        ${p.link ? `<span class="r-item-date"><a href="https://${p.link}" target="_blank">${escHtml(p.link)}</a></span>` : ''}
      </div>
      ${p.tech ? `<div class="r-item-sub">${escHtml(p.tech)}</div>` : ''}
      ${p.desc ? `<div class="r-item-desc">${escHtml(p.desc).replace(/\n/g, '<br>')}</div>` : ''}
    </div>
  `).join('');
}

// ============ CLASSIC ============
function renderClassic(data) {
  const name = data.fullName || 'Your Name';
  return `
  <div class="resume-classic">
    <div class="r-header">
      <div class="r-name">${escHtml(name)}</div>
      ${data.jobTitle ? `<div class="r-title">${escHtml(data.jobTitle)}</div>` : ''}
      <div class="r-contact">${contactRow(data)}</div>
    </div>
    ${data.summary ? `<div class="r-section"><div class="r-section-title">Professional Summary</div><div class="r-summary">${escHtml(data.summary).replace(/\n/g,'<br>')}</div></div>` : ''}
    ${data.experiences.some(e => e.title) ? `
    <div class="r-section">
      <div class="r-section-title">Experience</div>
      ${expHtml(data.experiences.filter(e => e.title), 'r-item')}
    </div>` : ''}
    ${data.projects.some(p => p.name) ? `
    <div class="r-section">
      <div class="r-section-title">Projects</div>
      ${projHtml(data.projects.filter(p => p.name), 'r-item')}
    </div>` : ''}
    ${data.educations.some(e => e.degree) ? `
    <div class="r-section">
      <div class="r-section-title">Education</div>
      ${eduHtml(data.educations.filter(e => e.degree), 'r-item')}
    </div>` : ''}
    ${data.skills.length ? `
    <div class="r-section">
      <div class="r-section-title">Skills</div>
      ${skillsHtml(data.skills, 'r-skill-chip')}
    </div>` : ''}
    ${data.certifications ? `<div class="r-section"><div class="r-section-title">Certifications</div><div class="r-summary">${escHtml(data.certifications).replace(/\n/g,'<br>')}</div></div>` : ''}
    ${data.languages ? `<div class="r-section"><div class="r-section-title">Languages</div><div class="r-summary">${escHtml(data.languages)}</div></div>` : ''}
  </div>`;
}

// ============ MODERN ============
function renderModern(data) {
  const name = data.fullName || 'Your Name';
  const initials = name.split(' ').map(w => w[0]).join('').substring(0, 2).toUpperCase();
  return `
  <div class="resume-modern">
    <div class="r-sidebar">
      <div class="r-sidebar-avatar">${initials}</div>
      <div class="r-sidebar-name">${escHtml(name)}</div>
      <div class="r-sidebar-title">${escHtml(data.jobTitle)}</div>
      <div class="r-sidebar-section">Contact</div>
      ${data.email ? `<div class="r-sidebar-item">✉ ${escHtml(data.email)}</div>` : ''}
      ${data.phone ? `<div class="r-sidebar-item">📞 ${escHtml(data.phone)}</div>` : ''}
      ${data.location ? `<div class="r-sidebar-item">📍 ${escHtml(data.location)}</div>` : ''}
      ${data.linkedin ? `<div class="r-sidebar-item">🔗 <a href="https://${data.linkedin}" target="_blank">${escHtml(data.linkedin)}</a></div>` : ''}
      ${data.website ? `<div class="r-sidebar-item">🌐 <a href="https://${data.website}" target="_blank">${escHtml(data.website)}</a></div>` : ''}
      ${data.github ? `<div class="r-sidebar-item">💻 <a href="https://${data.github}" target="_blank">${escHtml(data.github)}</a></div>` : ''}
      ${data.skills.length ? `
      <div class="r-sidebar-section">Skills</div>
      ${data.skills.map(s => `<div class="r-sidebar-skill"><div class="r-skill-name">${escHtml(s)}</div><div class="r-skill-bar"><div class="r-skill-fill"></div></div></div>`).join('')}
      ` : ''}
      ${data.languages ? `<div class="r-sidebar-section">Languages</div><div class="r-sidebar-item">${escHtml(data.languages)}</div>` : ''}
    </div>
    <div class="r-main">
      ${data.summary ? `<div class="r-section"><div class="r-section-title">About</div><div class="r-summary">${escHtml(data.summary).replace(/\n/g,'<br>')}</div></div>` : ''}
      ${data.experiences.some(e => e.title) ? `
      <div class="r-section">
        <div class="r-section-title">Experience</div>
        ${expHtml(data.experiences.filter(e => e.title), 'r-item')}
      </div>` : ''}
      ${data.projects.some(p => p.name) ? `
      <div class="r-section">
        <div class="r-section-title">Projects</div>
        ${projHtml(data.projects.filter(p => p.name), 'r-item')}
      </div>` : ''}
      ${data.educations.some(e => e.degree) ? `
      <div class="r-section">
        <div class="r-section-title">Education</div>
        ${eduHtml(data.educations.filter(e => e.degree), 'r-item')}
      </div>` : ''}
      ${data.certifications ? `<div class="r-section"><div class="r-section-title">Certifications</div><div class="r-summary">${escHtml(data.certifications).replace(/\n/g,'<br>')}</div></div>` : ''}
    </div>
  </div>`;
}

// ============ CREATIVE ============
function renderCreative(data) {
  const name = data.fullName || 'Your Name';
  return `
  <div class="resume-creative">
    <div class="r-header">
      <div class="r-name">${escHtml(name)}</div>
      ${data.jobTitle ? `<div class="r-title">${escHtml(data.jobTitle)}</div>` : ''}
      <div class="r-contact">${contactRow(data)}</div>
    </div>
    <div class="r-body">
      <div class="r-left">
        ${data.summary ? `<div class="r-section"><div class="r-section-title">Summary</div><div class="r-summary">${escHtml(data.summary).replace(/\n/g,'<br>')}</div></div>` : ''}
        ${data.experiences.some(e => e.title) ? `
        <div class="r-section">
          <div class="r-section-title">Experience</div>
          ${data.experiences.filter(e => e.title).map(e => `
          <div class="r-item">
            <div class="r-item-title">${escHtml(e.title)}</div>
            <div class="r-item-sub">${escHtml(e.company)}</div>
            <div class="r-item-date">${escHtml(e.start)}${e.start || e.end ? ' – ' : ''}${escHtml(e.end || 'Present')}</div>
            ${e.desc ? `<div class="r-item-desc">${escHtml(e.desc).replace(/\n/g,'<br>')}</div>` : ''}
          </div>`).join('')}
        </div>` : ''}
        ${data.projects.some(p => p.name) ? `
        <div class="r-section">
          <div class="r-section-title">Projects</div>
          ${data.projects.filter(p => p.name).map(p => `
          <div class="r-item">
            <div class="r-item-title">${escHtml(p.name)}</div>
            ${p.tech ? `<div class="r-item-sub">${escHtml(p.tech)}</div>` : ''}
            ${p.desc ? `<div class="r-item-desc">${escHtml(p.desc).replace(/\n/g,'<br>')}</div>` : ''}
          </div>`).join('')}
        </div>` : ''}
        ${data.educations.some(e => e.degree) ? `
        <div class="r-section">
          <div class="r-section-title">Education</div>
          ${data.educations.filter(e => e.degree).map(e => `
          <div class="r-item">
            <div class="r-item-title">${escHtml(e.degree)}</div>
            <div class="r-item-sub">${escHtml(e.school)}</div>
            <div class="r-item-date">${escHtml(e.start)}${e.start || e.end ? ' – ' : ''}${escHtml(e.end)}</div>
          </div>`).join('')}
        </div>` : ''}
      </div>
      <div class="r-right">
        ${data.skills.length ? `
        <div class="r-section">
          <div class="r-section-title">Skills</div>
          ${skillsHtml(data.skills, 'r-skill-chip')}
        </div>` : ''}
        ${data.languages ? `<div class="r-section"><div class="r-section-title">Languages</div><div class="r-summary" style="font-size:0.82rem;color:#555;">${escHtml(data.languages)}</div></div>` : ''}
        ${data.interests ? `<div class="r-section"><div class="r-section-title">Interests</div><div class="r-summary" style="font-size:0.82rem;color:#555;">${escHtml(data.interests)}</div></div>` : ''}
        ${data.certifications ? `<div class="r-section"><div class="r-section-title">Certifications</div><div class="r-summary" style="font-size:0.78rem;color:#555;">${escHtml(data.certifications).replace(/\n/g,'<br>')}</div></div>` : ''}
      </div>
    </div>
  </div>`;
}

// ============ EXECUTIVE ============
function renderExecutive(data) {
  const name = data.fullName || 'Your Name';
  return `
  <div class="resume-executive">
    <div class="r-header">
      <div class="r-name">${escHtml(name)}</div>
      ${data.jobTitle ? `<div class="r-title">${escHtml(data.jobTitle)}</div>` : ''}
      <div class="r-header-divider"></div>
      <div class="r-contact">${contactRow(data)}</div>
    </div>
    <div class="r-body">
      ${data.summary ? `<div class="r-section"><div class="r-section-title">Executive Summary</div><div class="r-summary">${escHtml(data.summary).replace(/\n/g,'<br>')}</div></div>` : ''}
      ${data.experiences.some(e => e.title) ? `
      <div class="r-section">
        <div class="r-section-title">Professional Experience</div>
        ${expHtml(data.experiences.filter(e => e.title), 'r-item')}
      </div>` : ''}
      ${data.projects.some(p => p.name) ? `
      <div class="r-section">
        <div class="r-section-title">Key Projects</div>
        ${projHtml(data.projects.filter(p => p.name), 'r-item')}
      </div>` : ''}
      ${data.skills.length ? `
      <div class="r-section">
        <div class="r-section-title">Core Competencies</div>
        ${skillsHtml(data.skills, 'r-skill-chip')}
      </div>` : ''}
      ${data.educations.some(e => e.degree) ? `
      <div class="r-section">
        <div class="r-section-title">Education</div>
        ${eduHtml(data.educations.filter(e => e.degree), 'r-item')}
      </div>` : ''}
      ${data.certifications ? `<div class="r-section"><div class="r-section-title">Certifications & Awards</div><div class="r-summary">${escHtml(data.certifications).replace(/\n/g,'<br>')}</div></div>` : ''}
    </div>
  </div>`;
}

// ============ TECH ============
function renderTech(data) {
  const name = data.fullName || 'YourName';
  return `
  <div class="resume-tech">
    <div class="r-header">
      <div class="r-terminal-bar">
        <div class="r-terminal-dots">
          <div class="r-terminal-dot dot-red"></div>
          <div class="r-terminal-dot dot-yellow"></div>
          <div class="r-terminal-dot dot-green"></div>
        </div>
        <div class="r-terminal-title">resume.sh</div>
      </div>
      <div class="r-name">${escHtml(name)}</div>
      <div class="r-cmd">$ echo <span>"${escHtml(data.jobTitle)}"</span></div>
      <div class="r-contact">
        ${data.email ? `📧 ${escHtml(data.email)}<br>` : ''}
        ${data.phone ? `📱 ${escHtml(data.phone)}<br>` : ''}
        ${data.location ? `📍 ${escHtml(data.location)}<br>` : ''}
        ${data.website ? `🌐 <a href="https://${data.website}" target="_blank">${escHtml(data.website)}</a><br>` : ''}
        ${data.github ? `💻 <a href="https://${data.github}" target="_blank">${escHtml(data.github)}</a><br>` : ''}
        ${data.linkedin ? `🔗 <a href="https://${data.linkedin}" target="_blank">${escHtml(data.linkedin)}</a>` : ''}
      </div>
    </div>
    <div class="r-body">
      ${data.summary ? `<div class="r-section"><div class="r-section-title">about_me</div><div class="r-summary">${escHtml(data.summary).replace(/\n/g,'<br>')}</div></div>` : ''}
      ${data.skills.length ? `
      <div class="r-section">
        <div class="r-section-title">tech_stack</div>
        <div class="r-skills-grid">${data.skills.map(s => `<span class="r-skill-chip">${escHtml(s)}</span>`).join('')}</div>
      </div>` : ''}
      ${data.experiences.some(e => e.title) ? `
      <div class="r-section">
        <div class="r-section-title">work_experience</div>
        ${data.experiences.filter(e => e.title).map(e => `
        <div class="r-item">
          <div class="r-item-title">> ${escHtml(e.title)}</div>
          <div class="r-item-sub">@${escHtml(e.company)}</div>
          <div class="r-item-date"># ${escHtml(e.start)}${e.start || e.end ? ' → ' : ''}${escHtml(e.end || 'present')}</div>
          ${e.desc ? `<div class="r-item-desc">${escHtml(e.desc).replace(/\n/g,'<br>')}</div>` : ''}
        </div>`).join('')}
      </div>` : ''}
      ${data.projects.some(p => p.name) ? `
      <div class="r-section">
        <div class="r-section-title">projects</div>
        ${data.projects.filter(p => p.name).map(p => `
        <div class="r-item">
          <div class="r-item-title">📁 ${escHtml(p.name)}</div>
          ${p.tech ? `<div class="r-item-sub">stack: [${escHtml(p.tech)}]</div>` : ''}
          ${p.link ? `<div class="r-item-date"><a href="https://${p.link}" target="_blank">${escHtml(p.link)}</a></div>` : ''}
          ${p.desc ? `<div class="r-item-desc">${escHtml(p.desc).replace(/\n/g,'<br>')}</div>` : ''}
        </div>`).join('')}
      </div>` : ''}
      ${data.educations.some(e => e.degree) ? `
      <div class="r-section">
        <div class="r-section-title">education</div>
        ${eduHtml(data.educations.filter(e => e.degree), 'r-item')}
      </div>` : ''}
      ${data.certifications ? `<div class="r-section"><div class="r-section-title">certifications</div><div class="r-summary">${escHtml(data.certifications).replace(/\n/g,'<br>')}</div></div>` : ''}
    </div>
  </div>`;
}

// ============ COMPACT ============
function renderCompact(data) {
  const name = data.fullName || 'Your Name';
  return `
  <div class="resume-compact">
    <div class="r-header">
      <div class="r-name">${escHtml(name)}</div>
      ${data.jobTitle ? `<div class="r-title">${escHtml(data.jobTitle)}</div>` : ''}
      <div class="r-contact-row">
        ${data.email ? `<span>${escHtml(data.email)}</span>` : ''}
        ${data.phone ? `<span>${escHtml(data.phone)}</span>` : ''}
        ${data.location ? `<span>${escHtml(data.location)}</span>` : ''}
        ${data.website ? `<span><a href="https://${data.website}" target="_blank">${escHtml(data.website)}</a></span>` : ''}
        ${data.github ? `<span><a href="https://${data.github}" target="_blank">${escHtml(data.github)}</a></span>` : ''}
        ${data.linkedin ? `<span><a href="https://${data.linkedin}" target="_blank">${escHtml(data.linkedin)}</a></span>` : ''}
      </div>
    </div>
    ${data.summary ? `
    <div class="r-row">
      <div class="r-row-label">Summary</div>
      <div class="r-row-content"><div class="r-summary">${escHtml(data.summary).replace(/\n/g,'<br>')}</div></div>
    </div><hr class="r-section-divider">` : ''}
    ${data.experiences.some(e => e.title) ? `
    <div class="r-row">
      <div class="r-row-label">Experience</div>
      <div class="r-row-content">${expHtml(data.experiences.filter(e => e.title), 'r-item')}</div>
    </div><hr class="r-section-divider">` : ''}
    ${data.projects.some(p => p.name) ? `
    <div class="r-row">
      <div class="r-row-label">Projects</div>
      <div class="r-row-content">${projHtml(data.projects.filter(p => p.name), 'r-item')}</div>
    </div><hr class="r-section-divider">` : ''}
    ${data.educations.some(e => e.degree) ? `
    <div class="r-row">
      <div class="r-row-label">Education</div>
      <div class="r-row-content">${eduHtml(data.educations.filter(e => e.degree), 'r-item')}</div>
    </div><hr class="r-section-divider">` : ''}
    ${data.skills.length ? `
    <div class="r-row">
      <div class="r-row-label">Skills</div>
      <div class="r-row-content">${skillsHtml(data.skills, 'r-skill-chip')}</div>
    </div><hr class="r-section-divider">` : ''}
    ${data.certifications ? `
    <div class="r-row">
      <div class="r-row-label">Certs</div>
      <div class="r-row-content"><div class="r-summary">${escHtml(data.certifications).replace(/\n/g,'<br>')}</div></div>
    </div><hr class="r-section-divider">` : ''}
    ${data.languages ? `
    <div class="r-row">
      <div class="r-row-label">Languages</div>
      <div class="r-row-content"><div class="r-summary">${escHtml(data.languages)}</div></div>
    </div>` : ''}
  </div>`;
}

// ============ SLATE ============
function renderSlate(data) {
  const name = data.fullName || 'Your Name';
  return `
  <div class="resume-slate">
    <div class="r-header">
      <div><div class="r-name">${escHtml(name)}</div><div class="r-title">${escHtml(data.jobTitle)}</div></div>
      <div class="r-contact">${contactRow(data)}</div>
    </div>
    <div class="r-body">
      <main>
        ${data.summary ? `<div class="r-section"><div class="r-section-title">Profile</div><div class="r-summary">${escHtml(data.summary).replace(/\n/g,'<br>')}</div></div>` : ''}
        ${data.experiences.some(e => e.title) ? `<div class="r-section"><div class="r-section-title">Experience</div>${expHtml(data.experiences.filter(e => e.title), 'r-item')}</div>` : ''}
        ${data.projects.some(p => p.name) ? `<div class="r-section"><div class="r-section-title">Selected Projects</div>${projHtml(data.projects.filter(p => p.name), 'r-item')}</div>` : ''}
      </main>
      <aside>
        ${data.skills.length ? `<div class="r-section"><div class="r-section-title">Expertise</div>${skillsHtml(data.skills, 'r-skill-chip')}</div>` : ''}
        ${data.educations.some(e => e.degree) ? `<div class="r-section"><div class="r-section-title">Education</div>${eduHtml(data.educations.filter(e => e.degree), 'r-item')}</div>` : ''}
        ${data.certifications ? `<div class="r-section"><div class="r-section-title">Certifications</div><div class="r-summary">${escHtml(data.certifications).replace(/\n/g,'<br>')}</div></div>` : ''}
      </aside>
    </div>
  </div>`;
}

// ============ ELEGANT ============
function renderElegant(data) {
  const name = data.fullName || 'Your Name';
  return `
  <div class="resume-elegant">
    <div class="r-header"><div class="r-kicker">Curriculum Vitae</div><div class="r-name">${escHtml(name)}</div><div class="r-title">${escHtml(data.jobTitle)}</div><div class="r-contact">${contactRow(data)}</div></div>
    <div class="r-body">
      ${data.summary ? `<div class="r-section"><div class="r-section-title">Profile</div><div class="r-summary">${escHtml(data.summary).replace(/\n/g,'<br>')}</div></div>` : ''}
      ${data.experiences.some(e => e.title) ? `<div class="r-section"><div class="r-section-title">Experience</div>${expHtml(data.experiences.filter(e => e.title), 'r-item')}</div>` : ''}
      ${data.educations.some(e => e.degree) ? `<div class="r-section"><div class="r-section-title">Education</div>${eduHtml(data.educations.filter(e => e.degree), 'r-item')}</div>` : ''}
      ${data.projects.some(p => p.name) ? `<div class="r-section"><div class="r-section-title">Projects</div>${projHtml(data.projects.filter(p => p.name), 'r-item')}</div>` : ''}
      ${data.skills.length ? `<div class="r-section"><div class="r-section-title">Skills</div>${skillsHtml(data.skills, 'r-skill-chip')}</div>` : ''}
    </div>
  </div>`;
}

// ============ MINIMAL ============
function renderMinimal(data) {
  const name = data.fullName || 'Your Name';
  return `
  <div class="resume-minimal">
    <div class="r-header"><div class="r-name">${escHtml(name)}</div><div class="r-title">${escHtml(data.jobTitle)}</div><div class="r-contact">${contactRow(data)}</div></div>
    ${data.summary ? `<div class="r-section r-intro"><div class="r-summary">${escHtml(data.summary).replace(/\n/g,'<br>')}</div></div>` : ''}
    ${data.experiences.some(e => e.title) ? `<div class="r-section"><div class="r-section-title">Experience</div>${expHtml(data.experiences.filter(e => e.title), 'r-item')}</div>` : ''}
    ${data.projects.some(p => p.name) ? `<div class="r-section"><div class="r-section-title">Projects</div>${projHtml(data.projects.filter(p => p.name), 'r-item')}</div>` : ''}
    <div class="r-two-col">
      ${data.educations.some(e => e.degree) ? `<div class="r-section"><div class="r-section-title">Education</div>${eduHtml(data.educations.filter(e => e.degree), 'r-item')}</div>` : ''}
      ${data.skills.length ? `<div class="r-section"><div class="r-section-title">Skills</div>${skillsHtml(data.skills, 'r-skill-chip')}</div>` : ''}
    </div>
  </div>`;
}

export function renderTemplate(template, data) {
  switch (template) {
    case 'modern': return renderModern(data);
    case 'creative': return renderCreative(data);
    case 'executive': return renderExecutive(data);
    case 'tech': return renderTech(data);
    case 'compact': return renderCompact(data);
    case 'slate': return renderSlate(data);
    case 'elegant': return renderElegant(data);
    case 'minimal': return renderMinimal(data);
    default: return renderClassic(data);
  }
}
