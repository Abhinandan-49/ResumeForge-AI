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
  zoomMode: 'auto',
  apiKey: localStorage.getItem('gemini_api_key') || ''
};

// ============ INIT ============
document.addEventListener('DOMContentLoaded', () => {
  initNavScroll();
  initApiKey();
  addExperience();
  addEducation();
  addProject();
  updatePreview();
  setPreviewScale('auto', document.querySelector('.preview-btn'));
  window.addEventListener('resize', applyScale);
});

function initNavScroll() {
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 60);
  });
}

function initApiKey() {
  if (state.apiKey) {
    document.getElementById('geminiApiKey').value = state.apiKey;
    document.getElementById('apiKeySection').style.display = 'none';
    showApiSavedIndicator();
  }
}

function showApiSavedIndicator() {
  const section = document.getElementById('apiKeySection');
  section.innerHTML = `
    <div style="display:flex;align-items:center;justify-content:space-between;font-size:0.8rem;">
      <span style="color:var(--accent-green);">✓ API Key saved</span>
      <button onclick="resetApiKey()" style="background:none;border:none;color:var(--text-secondary);cursor:pointer;font-size:0.75rem;text-decoration:underline;">Change</button>
    </div>
  `;
}

function saveApiKey() {
  const key = document.getElementById('geminiApiKey').value.trim();
  if (!key) { showToast('Please enter a valid API key', 'error'); return; }
  state.apiKey = key;
  localStorage.setItem('gemini_api_key', key);
  showApiSavedIndicator();
  showToast('✓ API Key saved successfully!', 'success');
}

function resetApiKey() {
  state.apiKey = '';
  localStorage.removeItem('gemini_api_key');
  const section = document.getElementById('apiKeySection');
  section.innerHTML = `
    <label for="geminiApiKey">🔑 Gemini API Key</label>
    <div class="api-key-input-wrapper">
      <input type="password" id="geminiApiKey" placeholder="Enter your Gemini API key..." />
      <button onclick="saveApiKey()" class="save-key-btn">Save</button>
    </div>
    <a href="https://aistudio.google.com/app/apikey" target="_blank" class="get-key-link">Get free API key →</a>
  `;
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
  const names = { classic: 'Classic', modern: 'Modern', creative: 'Creative', executive: 'Executive', tech: 'Tech', compact: 'Compact' };
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
        <input type="text" value="${escHtml(proj.name)}" placeholder="e.g. ResumeForge AI" oninput="updateProj(${proj.id},'name',this.value)" />
      </div>
      <div class="form-row">
        <div class="form-group">
          <label>Tech Stack</label>
          <input type="text" value="${escHtml(proj.tech)}" placeholder="e.g. React, Node.js, Gemini AI" oninput="updateProj(${proj.id},'tech',this.value)" />
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
  applyScale();
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
  viewport.style.height = `${1123 * scale}px`;
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

// ============ AI PANEL ============
function toggleAIPanel() {
  const body = document.getElementById('aiPanelBody');
  const toggle = document.querySelector('.ai-panel-toggle');
  body.style.display = body.style.display === 'none' ? 'block' : 'none';
  toggle.classList.toggle('collapsed');
}

async function generateWithAI() {
  const apiKey = state.apiKey || document.getElementById('geminiApiKey')?.value?.trim();
  if (!apiKey) {
    showToast('Please enter your Gemini API key first', 'error');
    return;
  }

  const action = document.getElementById('aiAction').value;
  const context = document.getElementById('aiContext').value.trim();
  const data = getFormData();

  const btn = document.getElementById('aiGenerateBtn');
  const btnText = document.getElementById('aiButtonText');
  btn.disabled = true;
  btnText.innerHTML = '<span class="spinner"></span>Generating...';

  const prompts = {
    summary: `Write a compelling 3-4 sentence professional summary for a resume. 
Name: ${data.fullName || 'Professional'}, Job Title: ${data.jobTitle || context}.
Context: ${context}
Skills: ${data.skills.join(', ')}
Make it impactful, first-person, ATS-friendly, and highlight key strengths. No fluff.`,

    experience: `Rewrite these experience bullet points to be more impactful and quantified:
Role: ${data.jobTitle || context}
Context: ${context}
${data.experiences.filter(e=>e.title).map(e => `- ${e.title} at ${e.company}: ${e.desc}`).join('\n')}
Use strong action verbs, include metrics where possible, keep each point under 2 lines.`,

    skills: `Suggest 15-20 relevant technical and soft skills for a ${data.jobTitle || context} role.
Context: ${context}
Format: comma-separated list only, no explanations.`,

    objective: `Write a focused 2-3 sentence career objective for:
Role targeting: ${data.jobTitle || context}
Context: ${context}
Make it specific, goal-oriented, and tailored for ${data.jobTitle || context} position.`,

    improve: `Review and improve this resume content:
Name: ${data.fullName}, Title: ${data.jobTitle}
Summary: ${data.summary}
Skills: ${data.skills.join(', ')}
Experience: ${data.experiences.filter(e=>e.title).map(e => `${e.title} at ${e.company}`).join(', ')}
Context: ${context}
Provide 5 specific improvements with examples. Be concise and actionable.`
  };

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompts[action] }] }],
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 }
        })
      }
    );

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error?.message || 'API error');
    }

    const result = await response.json();
    const text = result.candidates?.[0]?.content?.parts?.[0]?.text || 'No response generated.';

    document.getElementById('aiOutputText').textContent = text;
    document.getElementById('aiOutput').style.display = 'block';
    showToast('✨ AI content generated!', 'success');
  } catch (err) {
    showToast('Error: ' + err.message, 'error');
  } finally {
    btn.disabled = false;
    btnText.innerHTML = '✨ Generate with Gemini';
  }
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
  const container = document.getElementById('previewScaleContainer');
  const viewport = document.getElementById('previewViewport');
  if (!preview || !container || !viewport) {
    btn.innerHTML = '<span>📥</span> Download PDF';
    btn.disabled = false;
    return;
  }

  // Temporarily disable scaling & transitions to ensure a clean 1:1 render
  const originalTransform = container.style.transform;
  const originalTransition = container.style.transition;
  const originalVWidth = viewport.style.width;
  const originalVHeight = viewport.style.height;

  container.style.transition = 'none';
  container.style.transform = 'none';
  viewport.style.width = '794px';
  viewport.style.height = '1123px';

  // Small delay to allow browser layout paint
  await new Promise(r => setTimeout(r, 100));

  const opt = {
    margin: 0,
    filename: `${name.replace(/\s+/g, '_')}_Resume.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true, letterRendering: true },
    jsPDF: { unit: 'px', format: [794, 1123], orientation: 'portrait' }
  };

  try {
    await html2pdf().set(opt).from(preview).save();
    showToast('✓ Resume downloaded!', 'success');
  } catch (e) {
    console.error(e);
    showToast('Error generating PDF', 'error');
  }

  // Restore scaling & transitions
  container.style.transform = originalTransform;
  viewport.style.width = originalVWidth;
  viewport.style.height = originalVHeight;
  
  setTimeout(() => {
    container.style.transition = originalTransition;
  }, 50);

  btn.innerHTML = '<span>📥</span> Download PDF';
  btn.disabled = false;
}

// ============ SAMPLE DATA ============
function fillSampleData() {
  document.getElementById('fullName').value = 'Abhinandan Kumar';
  document.getElementById('jobTitle').value = 'Full Stack Developer & AI Enthusiast';
  document.getElementById('email').value = 'hello@madcoder.in';
  document.getElementById('phone').value = '+91 98765 43210';
  document.getElementById('location').value = 'India';
  document.getElementById('linkedin').value = 'linkedin.com/in/abhinandan';
  document.getElementById('website').value = 'madcoder.in';
  document.getElementById('github').value = 'github.com/abhinandan';
  document.getElementById('summary').value = 'Passionate Full Stack Developer with 3+ years of experience building scalable web applications. Expertise in React, Node.js and cloud technologies. Founded MadCoder.in to share coding knowledge with the developer community. Proven track record of delivering high-impact products and driving technical innovation.';

  state.skills = ['React', 'Node.js', 'TypeScript', 'Python', 'AWS', 'MongoDB', 'PostgreSQL', 'Docker', 'Next.js', 'Tailwind CSS', 'GraphQL', 'Git'];
  renderSkillTags();

  state.experiences = [
    { id: 101, title: 'Senior Full Stack Developer', company: 'Tech Startup', location: 'Remote', start: 'Jan 2023', end: 'Present', desc: 'Led development of core product features serving 50,000+ users.\nArchitected microservices reducing latency by 40%.\nMentored junior developers and conducted code reviews.' },
    { id: 102, title: 'Frontend Developer', company: 'Digital Agency', location: 'Bengaluru', start: 'Jun 2021', end: 'Dec 2022', desc: 'Built 15+ responsive web apps for enterprise clients.\nImproved website performance scores by 35% through optimization.\nCollaborated with design teams to implement pixel-perfect UIs.' }
  ];
  renderExperienceList();

  state.educations = [
    { id: 201, degree: 'B.Tech Computer Science', school: 'IIT Delhi', location: 'New Delhi', start: '2017', end: '2021', gpa: '8.7/10', desc: 'Specialization in Software Engineering. Best Project Award 2021.' }
  ];
  renderEducationList();

  state.projects = [
    { id: 301, name: 'MadCoder.in', tech: 'Next.js, Node.js, MongoDB', link: 'madcoder.in', desc: 'Personal coding portfolio and blog platform with 10,000+ monthly visitors. Features coding tutorials, project showcases, and developer resources.' },
    { id: 302, name: 'ResumeForge AI', tech: 'HTML, CSS, JS, Gemini API', link: 'github.com/madcoder/resumeforge', desc: 'AI-powered resume builder with 6 professional templates and Gemini AI integration for smart content generation.' }
  ];
  renderProjectsList();

  document.getElementById('languages').value = 'English (Fluent), Hindi (Native)';
  document.getElementById('certifications').value = 'AWS Certified Developer – Associate\nGoogle Cloud Professional\nMeta Frontend Developer Certificate';
  document.getElementById('interests').value = 'Open Source Contribution, Technical Blogging, UI/UX Design, Gaming';

  updatePreview();
  showToast('✓ Sample data filled!', 'success');
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
