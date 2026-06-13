/* ============================================
   RESUME FORGE AI - MAIN APP LOGIC
   Built by MadCoder (madcoder.in)
   ============================================ */

// ============ STATE ============
let state = {
  template: 'classic',
  skills: [],
  experiences: [],
  educations: [],
  projects: [],
  previewScale: 0.7,
  zoomMode: 'auto'
};

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  fillSampleData();
  setPreviewScale('auto', document.querySelector('.preview-btn'));
  window.addEventListener('resize', applyScale);
});

function initNavScroll() {
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  });
}

// ============ NAVIGATION ============
function scrollToBuilder() {
  document.getElementById('builder').scrollIntoView({ behavior: 'smooth' });
}
function scrollToTemplates() {
  document.getElementById('templates').scrollIntoView({ behavior: 'smooth' });
}

// ============ TEMPLATE SELECTION ============
function selectTemplate(template, card) {
  state.template = template;
  document.querySelectorAll('.template-card').forEach(c => c.classList.remove('active'));
  card.classList.add('active');
  const names = { classic: 'Classic', modern: 'Modern', creative: 'Creative', executive: 'Executive', tech: 'Tech', compact: 'Compact', slate: 'Slate', elegant: 'Elegant', minimal: 'Minimal' };
  document.getElementById('currentTemplate').textContent = names[template];
  updatePreview();
  showToast(`✓ Template changed to ${names[template]}`, 'success');
}

// ============ TABS ============
function switchTab(tab, btn) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('tab-content-' + tab).classList.add('active');
}

// ============ SKILLS ============
function addSkill(event) {
  if (event.key === 'Enter') { event.preventDefault(); addSkillBtn(); }
}
function addSkillBtn() {
  const input = document.getElementById('skillInput');
  const val = input.value.trim();
  if (!val || state.skills.includes(val)) { input.value = ''; return; }
  state.skills.push(val);
  input.value = '';
  renderSkillTags();
  updatePreview();
}
function removeSkill(skill) {
  state.skills = state.skills.filter(s => s !== skill);
  renderSkillTags();
  updatePreview();
}
function renderSkillTags() {
  document.getElementById('skillsTags').innerHTML = state.skills.map(s => `
    <div class="skill-tag">
      <span>${escHtml(s)}</span>
      <span class="skill-tag-remove" onclick="removeSkill('${escJs(s)}')" title="Remove">×</span>
    </div>
  `).join('');
}

// ============ EXPERIENCE ============
let expCount = 0;
function addExperience() {
  const id = ++expCount;
  state.experiences.push({ id, title: '', company: '', location: '', start: '', end: '', current: false, desc: '' });
  renderExperienceList();
}
function removeExperience(id) {
  state.experiences = state.experiences.filter(e => e.id !== id);
  renderExperienceList();
  updatePreview();
}
function renderExperienceList() {
  document.getElementById('experienceList').innerHTML = state.experiences.map((exp, i) => `
    <div class="experience-item" id="exp-${exp.id}">
      <div class="item-header">
        <h4>Experience ${i + 1}</h4>
        <button class="remove-item-btn" onclick="removeExperience(${exp.id})">× Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Job Title</label>
          <input type="text" value="${escHtml(exp.title)}" placeholder="e.g. Frontend Developer" oninput="updateExp(${exp.id},'title',this.value)" />
        </div>
        <div class="form-group">
          <label>Company</label>
          <input type="text" value="${escHtml(exp.company)}" placeholder="e.g. Google" oninput="updateExp(${exp.id},'company',this.value)" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Start Date</label>
          <input type="text" value="${escHtml(exp.start)}" placeholder="e.g. Jan 2022" oninput="updateExp(${exp.id},'start',this.value)" />
        </div>
        <div class="form-group">
          <label>End Date</label>
          <input type="text" value="${escHtml(exp.end)}" placeholder="Present" oninput="updateExp(${exp.id},'end',this.value)" ${exp.current ? 'disabled' : ''} />
        </div>
      </div>
      <div class="form-group">
        <label>Location</label>
        <input type="text" value="${escHtml(exp.location)}" placeholder="e.g. Remote / San Francisco" oninput="updateExp(${exp.id},'location',this.value)" />
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea rows="3" placeholder="Describe your responsibilities and achievements..." oninput="updateExp(${exp.id},'desc',this.value)">${escHtml(exp.desc)}</textarea>
      </div>
    </div>
  `).join('');
}
function updateExp(id, field, value) {
  const exp = state.experiences.find(e => e.id === id);
  if (exp) { exp[field] = value; updatePreview(); }
}

// ============ EDUCATION ============
let eduCount = 0;
function addEducation() {
  const id = ++eduCount;
  state.educations.push({ id, degree: '', school: '', location: '', start: '', end: '', gpa: '', desc: '' });
  renderEducationList();
}
function removeEducation(id) {
  state.educations = state.educations.filter(e => e.id !== id);
  renderEducationList();
  updatePreview();
}
function renderEducationList() {
  document.getElementById('educationList').innerHTML = state.educations.map((edu, i) => `
    <div class="education-item" id="edu-${edu.id}">
      <div class="item-header">
        <h4>Education ${i + 1}</h4>
        <button class="remove-item-btn" onclick="removeEducation(${edu.id})">× Remove</button>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Degree / Certificate</label>
          <input type="text" value="${escHtml(edu.degree)}" placeholder="e.g. B.Tech Computer Science" oninput="updateEdu(${edu.id},'degree',this.value)" />
        </div>
        <div class="form-group">
          <label>School / University</label>
          <input type="text" value="${escHtml(edu.school)}" placeholder="e.g. IIT Delhi" oninput="updateEdu(${edu.id},'school',this.value)" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Start Year</label>
          <input type="text" value="${escHtml(edu.start)}" placeholder="2020" oninput="updateEdu(${edu.id},'start',this.value)" />
        </div>
        <div class="form-group">
          <label>End Year</label>
          <input type="text" value="${escHtml(edu.end)}" placeholder="2024" oninput="updateEdu(${edu.id},'end',this.value)" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Location</label>
          <input type="text" value="${escHtml(edu.location)}" placeholder="e.g. Delhi, India" oninput="updateEdu(${edu.id},'location',this.value)" />
        </div>
        <div class="form-group">
          <label>GPA / Score</label>
          <input type="text" value="${escHtml(edu.gpa)}" placeholder="e.g. 8.5 / 10" oninput="updateEdu(${edu.id},'gpa',this.value)" />
        </div>
      </div>
      <div class="form-group">
        <label>Additional Details</label>
        <textarea rows="2" placeholder="Relevant coursework, honors, activities..." oninput="updateEdu(${edu.id},'desc',this.value)">${escHtml(edu.desc)}</textarea>
      </div>
    </div>
  `).join('');
}
function updateEdu(id, field, value) {
  const edu = state.educations.find(e => e.id === id);
  if (edu) { edu[field] = value; updatePreview(); }
}

// ============ PROJECTS ============
let projCount = 0;
function addProject() {
  const id = ++projCount;
  state.projects.push({ id, name: '', tech: '', link: '', desc: '' });
  renderProjectsList();
}
function removeProject(id) {
  state.projects = state.projects.filter(p => p.id !== id);
  renderProjectsList();
  updatePreview();
}
function renderProjectsList() {
  document.getElementById('projectsList').innerHTML = state.projects.map((proj, i) => `
    <div class="project-item" id="proj-${proj.id}">
      <div class="item-header">
        <h4>Project ${i + 1}</h4>
        <button class="remove-item-btn" onclick="removeProject(${proj.id})">× Remove</button>
      </div>
      <div class="form-group">
        <label>Project Name</label>
          <input type="text" value="${escHtml(proj.name)}" placeholder="e.g. Portfolio Website" oninput="updateProj(${proj.id},'name',this.value)" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Tech Stack</label>
          <input type="text" value="${escHtml(proj.tech)}" placeholder="e.g. React, Node.js, PostgreSQL" oninput="updateProj(${proj.id},'tech',this.value)" />
        </div>
        <div class="form-group">
          <label>Link / GitHub</label>
          <input type="text" value="${escHtml(proj.link)}" placeholder="github.com/user/project" oninput="updateProj(${proj.id},'link',this.value)" />
        </div>
      </div>
      <div class="form-group">
        <label>Description</label>
        <textarea rows="3" placeholder="What did you build? What problem does it solve?" oninput="updateProj(${proj.id},'desc',this.value)">${escHtml(proj.desc)}</textarea>
      </div>
    </div>
  `).join('');
}
function updateProj(id, field, value) {
  const proj = state.projects.find(p => p.id === id);
  if (proj) { proj[field] = value; updatePreview(); }
}

// ============ GET FORM DATA ============
function getFormData() {
  return {
    fullName: val('fullName'),
    jobTitle: val('jobTitle'),
    email: val('email'),
    phone: val('phone'),
    location: val('location'),
    linkedin: val('linkedin'),
    website: val('website'),
    github: val('github'),
    summary: val('summary'),
    skills: [...state.skills],
    experiences: [...state.experiences],
    educations: [...state.educations],
    projects: [...state.projects],
    languages: val('languages'),
    certifications: val('certifications'),
    interests: val('interests'),
  };
}
function val(id) {
  const el = document.getElementById(id);
  return el ? el.value.trim() : '';
}

// ============ PREVIEW UPDATE ============
function updatePreview() {
  const data = getFormData();
  const preview = document.getElementById('resumePreview');
  preview.innerHTML = renderTemplate(state.template, data);

  // Apply single page fit class
  const fitCheckbox = document.getElementById('fitSinglePage');
  if (fitCheckbox && fitCheckbox.checked) {
    preview.classList.add('fit-single-page');
  } else {
    preview.classList.remove('fit-single-page');
  }

  // Apply selected font family variable
  const fontSelect = document.getElementById('resumeFont');
  if (fontSelect && fontSelect.value) {
    preview.style.setProperty('--resume-font', fontSelect.value);
  } else {
    preview.style.removeProperty('--resume-font');
  }

  // Paginate the preview dynamically to show separate sheets
  paginatePreview();

  applyScale();
}

function paginatePreview() {
  const preview = document.getElementById('resumePreview');
  if (!preview) return;

  // Remove existing spacers
  const existingSpacers = preview.querySelectorAll('.preview-page-break-spacer');
  existingSpacers.forEach(s => s.remove());

  const pageHeight = 1123;
  const gapHeight = 24; // Visual gap in px

  // Query elements that are candidates for page breaks
  const candidates = preview.querySelectorAll('.r-item, .r-section-title, .r-summary, .r-skills-grid, .r-skills-row, .r-contact, .r-contact-row, .r-sidebar-item, .r-sidebar-section, .r-row');
  
  // Calculate the current scale factor of the preview
  const scale = preview.offsetWidth ? (preview.getBoundingClientRect().width / preview.offsetWidth) : 1;
  const previewRect = preview.getBoundingClientRect();

  candidates.forEach(el => {
    const rect = el.getBoundingClientRect();
    const top = (rect.top - previewRect.top) / scale;
    const bottom = (rect.bottom - previewRect.top) / scale;

    const topPage = Math.floor(top / pageHeight);
    const bottomPage = Math.floor(bottom / pageHeight);

    // If it crosses a page boundary
    if (topPage !== bottomPage) {
      const nextPageStart = (topPage + 1) * pageHeight;
      const spacerHeight = (nextPageStart - top) + gapHeight;

      const spacer = document.createElement('div');
      spacer.className = 'preview-page-break-spacer';
      spacer.style.height = `${spacerHeight}px`;
      spacer.style.width = '100%';
      spacer.style.background = '#2a2a3e'; // Match preview-wrapper background
      spacer.style.boxShadow = 'inset 0 8px 10px -8px rgba(0,0,0,0.6), inset 0 -8px 10px -8px rgba(0,0,0,0.6)';
      spacer.style.margin = '0';
      spacer.style.padding = '0';
      spacer.style.border = 'none';

      el.parentNode.insertBefore(spacer, el);
    }
  });
}

function applyScale() {
  const wrapper = document.getElementById('previewWrapper');
  const viewport = document.getElementById('previewViewport');
  const container = document.getElementById('previewScaleContainer');
  if (!wrapper || !viewport || !container) return;

  const wrapperWidth = wrapper.clientWidth;
  const computedStyle = window.getComputedStyle(wrapper);
  const paddingLeft = parseFloat(computedStyle.paddingLeft) || 0;
  const paddingRight = parseFloat(computedStyle.paddingRight) || 0;
  const availableWidth = Math.max(200, wrapperWidth - paddingLeft - paddingRight - 8);

  let scale;
  if (state.zoomMode === 'auto') {
    scale = Math.min(1.0, availableWidth / 794);
    if (scale < 0.2) scale = 0.2;
  } else {
    scale = state.previewScale;
  }

  container.style.transform = `scale(${scale})`;
  viewport.style.width = `${794 * scale}px`;

  // Dynamically calculate the total content height of the resume
  const preview = document.getElementById('resumePreview');
  const contentHeight = preview ? preview.scrollHeight : 1123;
  const finalHeight = Math.max(1123, contentHeight);

  viewport.style.height = `${finalHeight * scale}px`;
  container.style.height = `${finalHeight}px`;
}

function setPreviewScale(scale, btn) {
  if (scale === 'auto') {
    state.zoomMode = 'auto';
  } else {
    state.zoomMode = 'manual';
    state.previewScale = scale;
  }
  
  applyScale();
  
  document.querySelectorAll('.preview-btn').forEach(b => b.classList.remove('active'));
  if (btn) {
    btn.classList.add('active');
  } else {
    const btns = document.querySelectorAll('.preview-btn');
    btns.forEach(b => {
      const onclickAttr = b.getAttribute('onclick');
      if (scale === 'auto' && onclickAttr.includes("'auto'")) {
        b.classList.add('active');
      } else if (scale !== 'auto' && onclickAttr.includes(scale.toString())) {
        b.classList.add('active');
      }
    });
  }
}

// ============ TEMPLATE RENDERERS ============
function renderTemplate(template, data) {
  switch(template) {
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
  const safeFilename = name.toLowerCase().replace(/\s+/g, '_');
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

// ============ WRITING ASSISTANT ============
function toggleAIPanel() {
  const body = document.getElementById('aiPanelBody');
  const toggle = document.querySelector('.ai-panel-toggle');
  body.style.display = body.style.display === 'none' ? 'block' : 'none';
  toggle.classList.toggle('collapsed');
}

async function generateWithAI() {
  const action = document.getElementById('aiAction').value;
  const context = document.getElementById('aiContext').value.trim();
  const data = getFormData();
  const btn = document.getElementById('aiGenerateBtn');
  const btnText = document.getElementById('aiButtonText');

  btn.disabled = true;
  btnText.innerHTML = '<span class="spinner"></span>Creating...';
  await new Promise(resolve => setTimeout(resolve, 250));

  const role = data.jobTitle || context || 'professional';
  const topSkills = data.skills.slice(0, 4).join(', ') || 'communication, problem solving, and collaboration';
  const outputs = {
    summary: `Results-focused ${role} with experience delivering reliable, user-centered work. Skilled in ${topSkills}, with a practical approach to solving problems and collaborating across teams. Known for taking ownership, learning quickly, and turning goals into measurable outcomes.`,
    experience: data.experiences.filter(e => e.title).map(e => `Led ${e.title.toLowerCase()} responsibilities at ${e.company || 'the organization'}, improving delivery through clear priorities, cross-functional collaboration, and measurable results.`).join('\n') || `Led key ${role} initiatives, improved day-to-day delivery, and collaborated with stakeholders to achieve measurable results.`,
    skills: suggestSkills(role),
    objective: `Motivated ${role} seeking an opportunity to apply ${topSkills} in a growth-focused team. Eager to contribute dependable execution, thoughtful problem solving, and continuous improvement from day one.`,
    improve: `1. Add measurable outcomes to each experience entry.\n2. Start bullets with strong action verbs.\n3. Keep the summary focused on role, strengths, and impact.\n4. Prioritize skills from the target job description.\n5. Remove generic phrases and keep only relevant content.`
  };

  document.getElementById('aiOutputText').textContent = outputs[action];
  document.getElementById('aiOutput').style.display = 'block';
  btn.disabled = false;
  btnText.textContent = 'Create suggestion';
  showToast('Writing suggestion ready', 'success');
}

function suggestSkills(role) {
  const normalized = role.toLowerCase();
  const general = ['Communication', 'Problem Solving', 'Teamwork', 'Time Management', 'Adaptability', 'Leadership'];
  let specific = ['Project Management', 'Data Analysis', 'Process Improvement', 'Stakeholder Management', 'Documentation', 'Quality Assurance'];
  if (/developer|engineer|software|web|frontend|backend/.test(normalized)) specific = ['JavaScript', 'Git', 'APIs', 'Testing', 'Debugging', 'System Design', 'Agile', 'Code Review'];
  if (/design|creative|ux|ui/.test(normalized)) specific = ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Accessibility', 'Visual Design'];
  if (/data|analyst|science/.test(normalized)) specific = ['SQL', 'Python', 'Data Visualization', 'Statistics', 'Excel', 'Dashboards', 'Data Cleaning'];
  if (/marketing|sales|growth/.test(normalized)) specific = ['Campaign Strategy', 'SEO', 'CRM', 'Analytics', 'Copywriting', 'Lead Generation', 'Market Research'];
  return [...specific, ...general].join(', ');
}

function copyAIOutput() {
  const text = document.getElementById('aiOutputText').textContent;
  navigator.clipboard.writeText(text).then(() => showToast('✓ Copied to clipboard', 'success'));
}

function applyToSummary() {
  const text = document.getElementById('aiOutputText').textContent;
  const action = document.getElementById('aiAction').value;
  if (action === 'skills') {
    const skills = text.split(',').map(s => s.trim()).filter(Boolean);
    skills.forEach(s => { if (s && !state.skills.includes(s)) state.skills.push(s); });
    renderSkillTags();
    showToast(`✓ Added ${skills.length} skills!`, 'success');
  } else {
    document.getElementById('summary').value = text;
    showToast('✓ Applied to summary!', 'success');
  }
  updatePreview();
  document.getElementById('aiOutput').style.display = 'none';
}

function closeAIOutput() {
  document.getElementById('aiOutput').style.display = 'none';
}

// ============ PDF DOWNLOAD ============
async function downloadPDF() {
  const btn = document.getElementById('downloadBtn');
  const data = getFormData();
  const name = data.fullName || 'resume';

  btn.innerHTML = '<span class="spinner"></span> Generating...';
  btn.disabled = true;

  const preview = document.getElementById('resumePreview');
  if (!preview || typeof html2pdf === 'undefined') {
    btn.innerHTML = '<span>📥</span> Download PDF';
    btn.disabled = false;
    return;
  }

  updatePreview();
  const exportHost = document.createElement('div');
  exportHost.className = 'pdf-export-host';
  const exportResume = preview.cloneNode(true);
  exportResume.removeAttribute('id');
  exportResume.classList.add('pdf-export-resume');
  exportHost.appendChild(exportResume);
  document.body.appendChild(exportHost);
  
  await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

  const opt = {
    margin: [8, 0, 15, 0],
    filename: `${name.replace(/\s+/g, '_')}_Resume.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    pagebreak: { 
      mode: ['css', 'legacy'], 
      avoid: ['.r-item', '.r-section-title', '.r-summary', '.r-skills-grid', '.r-skills-row', '.r-contact', '.r-contact-row', '.r-sidebar-item', '.r-sidebar-section', '.r-row']
    },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true, backgroundColor: '#ffffff', scrollX: 0, scrollY: 0 },
    jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait', hotfixes: ['px_scaling'] }
  };

  try {
    await html2pdf().set(opt).from(exportResume).save();
    showToast('✓ Resume downloaded!', 'success');
  } catch (e) {
    console.error(e);
    showToast('Error generating PDF', 'error');
  }

  exportHost.remove();

  btn.innerHTML = '<span>📥</span> Download PDF';
  btn.disabled = false;
}

// ============ SAMPLE DATA ============
function fillSampleData() {
  document.getElementById('fullName').value = 'Abhinandan Dubey';
  document.getElementById('jobTitle').value = 'Data Science & Full-Stack Developer';
  document.getElementById('email').value = 'abhidubey2536@gmail.com';
  document.getElementById('phone').value = '(+91) 6306641291';
  document.getElementById('location').value = 'India';
  document.getElementById('linkedin').value = 'linkedin.com/in/Abhinandan49';
  document.getElementById('website').value = 'madcoder.in';
  document.getElementById('github').value = 'github.com/Abhinandan-49';
  document.getElementById('summary').value = 'Data Science and Full-Stack Developer with a B.Tech background, skilled in Python, Deep Learning, Data Analysis, and SQL. Proven ability to build end-to-end solutions — from model development to deployment-ready web interfaces.';

  state.skills = ['Python', 'Java', 'JavaScript', 'SQL', 'HTML', 'CSS', 'React.js', 'Node.js', 'Next.js', 'Express.js', 'MySQL', 'MongoDB', 'RAG', 'Razorpay', 'Git', 'GitHub', 'VS Code', 'Jupyterlab'];
  renderSkillTags();

  state.experiences = [
    { id: 101, title: 'Summer Internship Training (Data Science)', company: 'SRDT Pvt. Ltd.', location: 'Lucknow, India', start: 'Sep 2025', end: 'Present', desc: 'Completed Summer Internship Training Program on Data Science with Machine Learning. Worked on café sales data analysis, extracting actionable insights, and building predictive models.' },
    { id: 102, title: 'Summer Internship Training (Mobile App Development)', company: 'SRDT Pvt. Ltd.', location: 'Lucknow, India', start: 'Jun 2026', end: 'Present', desc: 'Completed Summer Internship Training Program on Mobile App Development. Worked on developing a fitness mobile application.' }
  ];
  renderExperienceList();

  state.educations = [
    { id: 201, degree: 'B.Tech CSE (Data Science)', school: 'SRMCEM', location: 'Lucknow, India', start: '2023', end: '2027', gpa: '7.75/10 CGPA', desc: 'Specialization in Computer Science & Engineering (Data Science).' },
    { id: 202, degree: 'Intermediate (PCM, CBSE)', school: 'Siddhant World School', location: 'Lucknow, India', start: '2021', end: '2023', gpa: '84.6%', desc: 'Completed Senior Secondary education in Physics, Chemistry, and Mathematics.' },
    { id: 203, degree: 'High School (CBSE)', school: 'Siddhant World School', location: 'Lucknow, India', start: '2019', end: '2021', gpa: '85%', desc: 'Completed Secondary school education.' }
  ];
  renderEducationList();

  state.projects = [
    { id: 301, name: 'AI-Powered Teaching Assistant', tech: 'React, TypeScript, Vite, Gemini API, RAG, Vector Embeddings, Vercel', link: 'paymentgateway.madcoder.in', desc: 'Built a RAG-based AI assistant that delivers context-aware answers from educational content using semantic search and vector embeddings. Optimized retrieval accuracy and scalability for large knowledge bases through an interactive web application.' },
    { id: 302, name: 'Responsive Portfolio Website', tech: 'React, JavaScript, HTML, CSS, GitHub, Vercel', link: 'madcoder.in', desc: 'Built a responsive personal portfolio website to showcase projects, skills, and achievements. Designed with a user-centric interface, interactive project sections, and cross-device compatibility to strengthen professional presence and demonstrate front-end development expertise.' },
    { id: 303, name: 'Payment Gateway Integration Platform', tech: 'React, Node.js, Express.js, MongoDB, Razorpay, REST APIs, Vercel', link: 'paymentgateway.madcoder.in', desc: 'Built a secure payment processing platform with integrated payment gateway APIs for seamless online transactions. Implemented transaction tracking, payment verification, and responsive user interfaces while ensuring reliability and security.' }
  ];
  renderProjectsList();

  document.getElementById('languages').value = 'English (Fluent), Hindi (Native)';
  document.getElementById('certifications').value = 'Programming in Java (Elite + Silver) By NPTEL\nPython for Data Science By NPTEL\nMachine learning fundamentals by L&T edutech\nSQL for data science by great learning';
  document.getElementById('interests').value = 'Open Source Contribution, Machine Learning, Full-Stack Development, Data Analytics';

  expCount = 102;
  eduCount = 203;
  projCount = 303;

  updatePreview();
  showToast('✓ Resume loaded!', 'success');
}

// ============ CLEAR FORM ============
function clearForm() {
  if (!confirm('Clear all form data? This cannot be undone.')) return;
  ['fullName', 'jobTitle', 'email', 'phone', 'location', 'linkedin', 'website', 'github', 'summary', 'languages', 'certifications', 'interests'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  state.skills = [];
  state.experiences = [];
  state.educations = [];
  state.projects = [];
  expCount = 0; eduCount = 0; projCount = 0;
  renderSkillTags();
  renderExperienceList();
  renderEducationList();
  renderProjectsList();
  addExperience(); addEducation(); addProject();
  updatePreview();
  showToast('✓ Form cleared', 'success');
}

// ============ UTILS ============
function escHtml(str) {
  if (!str) return '';
  return String(str).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
}
function escJs(str) {
  return String(str).replace(/'/g, "\\'");
}

function showToast(msg, type = '') {
  const toast = document.getElementById('toast');
  toast.textContent = msg;
  toast.className = 'toast show' + (type ? ' ' + type : '');
  clearTimeout(window._toastTimer);
  window._toastTimer = setTimeout(() => { toast.className = 'toast'; }, 3200);
}
