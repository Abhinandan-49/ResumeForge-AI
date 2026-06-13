import React, { useState } from 'react';
import { Sparkles, Trash2, Plus, FileDown, RotateCcw, Clipboard } from 'lucide-react';

export default function FormPanel({
  personalInfo,
  onPersonalInfoChange,
  experiences,
  onAddExperience,
  onRemoveExperience,
  onUpdateExperience,
  educations,
  onAddEducation,
  onRemoveEducation,
  onUpdateEducation,
  projects,
  onAddProject,
  onRemoveProject,
  onUpdateProject,
  skills,
  onAddSkill,
  onRemoveSkill,
  fitSinglePage,
  onFitToggle,
  resumeFont,
  onFontChange,
  activeTab,
  onTabChange,
  onDownload,
  onClear,
  onFillSample
}) {
  const [skillInput, setSkillInput] = useState('');
  const [aiExpanded, setAiExpanded] = useState(true);
  const [aiAction, setAiAction] = useState('summary');
  const [aiContext, setAiContext] = useState('');
  const [aiOutput, setAiOutput] = useState('');

  const handleAddSkill = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      triggerAddSkill();
    }
  };

  const triggerAddSkill = () => {
    const val = skillInput.trim();
    if (val) {
      onAddSkill(val);
      setSkillInput('');
    }
  };

  // Local AI writing assistant logic
  const handleAiGenerate = () => {
    const role = personalInfo.jobTitle || aiContext || 'professional';
    const topSkills = skills.slice(0, 4).join(', ') || 'communication, problem solving, and collaboration';
    
    let result = '';
    if (aiAction === 'summary') {
      result = `Results-focused ${role} with experience delivering reliable, user-centered work. Skilled in ${topSkills}, with a practical approach to solving problems and collaborating across teams. Known for taking ownership, learning quickly, and turning goals into measurable outcomes.`;
    } else if (aiAction === 'experience') {
      const activeExps = experiences.filter(e => e.title);
      result = activeExps.map(e => `Led ${e.title.toLowerCase()} responsibilities at ${e.company || 'the organization'}, improving delivery through clear priorities, cross-functional collaboration, and measurable results.`).join('\n') || `Led key ${role} initiatives, improved day-to-day delivery, and collaborated with stakeholders to achieve measurable results.`;
    } else if (aiAction === 'skills') {
      result = suggestSkills(role);
    } else if (aiAction === 'objective') {
      result = `Motivated ${role} seeking an opportunity to apply ${topSkills} in a growth-focused team. Eager to contribute dependable execution, thoughtful problem solving, and continuous improvement from day one.`;
    } else if (aiAction === 'improve') {
      result = `1. Add measurable outcomes to each experience entry.\n2. Start bullets with strong action verbs.\n3. Keep the summary focused on role, strengths, and impact.\n4. Prioritize skills from the target job description.\n5. Remove generic phrases and keep only relevant content.`;
    }

    setAiOutput(result);
  };

  const suggestSkills = (role) => {
    const normalized = role.toLowerCase();
    const general = ['Communication', 'Problem Solving', 'Teamwork', 'Time Management', 'Adaptability', 'Leadership'];
    let specific = ['Project Management', 'Data Analysis', 'Process Improvement', 'Stakeholder Management', 'Documentation', 'Quality Assurance'];
    if (/developer|engineer|software|web|frontend|backend/.test(normalized)) {
      specific = ['JavaScript', 'Git', 'APIs', 'Testing', 'Debugging', 'System Design', 'Agile', 'Code Review'];
    } else if (/design|creative|ux|ui/.test(normalized)) {
      specific = ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems', 'Accessibility', 'Visual Design'];
    } else if (/data|analyst|science/.test(normalized)) {
      specific = ['SQL', 'Python', 'Data Visualization', 'Statistics', 'Excel', 'Dashboards', 'Data Cleaning'];
    } else if (/marketing|sales|growth/.test(normalized)) {
      specific = ['Campaign Strategy', 'SEO', 'CRM', 'Analytics', 'Copywriting', 'Lead Generation', 'Market Research'];
    }
    return [...specific, ...general].join(', ');
  };

  const handleApplyAi = () => {
    if (aiAction === 'skills') {
      const splitSkills = aiOutput.split(',').map(s => s.trim()).filter(Boolean);
      splitSkills.forEach(s => onAddSkill(s));
    } else {
      onPersonalInfoChange('summary', aiOutput);
    }
    setAiOutput('');
  };

  return (
    <div className="builder-form" id="builderForm">
      <div className="form-header">
        <h2>📝 Resume Builder</h2>
      </div>

      {/* Writing Assistant Panel */}
      <div className="ai-panel">
        <div className="ai-panel-header" onClick={() => setAiExpanded(!aiExpanded)}>
          <span className="ai-icon">✨</span>
          <span>Writing Assistant</span>
          <button className={`ai-panel-toggle ${!aiExpanded ? 'collapsed' : ''}`} style={{ border: 'none', background: 'none' }}>
            ▲
          </button>
        </div>
        
        {aiExpanded && (
          <div className="ai-panel-body">
            <p className="assistant-note">Suggestions are created locally in your browser.</p>
            <div className="ai-controls">
              <select value={aiAction} onChange={(e) => setAiAction(e.target.value)} className="ai-select">
                <option value="summary">✍️ Write Professional Summary</option>
                <option value="experience">💼 Enhance Experience Bullets</option>
                <option value="skills">🛠️ Suggest Skills for Role</option>
                <option value="objective">🎯 Write Career Objective</option>
                <option value="improve">⬆️ Improve Entire Resume</option>
              </select>
              <input
                type="text"
                value={aiContext}
                onChange={(e) => setAiContext(e.target.value)}
                placeholder="Describe your role / experience..."
                className="ai-context-input"
              />
              <button className="ai-generate-btn" onClick={handleAiGenerate}>
                <span>Create suggestion</span>
              </button>
            </div>
            
            {aiOutput && (
              <div className="ai-output">
                <div className="ai-output-header">
                  <span>Writing Suggestion</span>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText(aiOutput);
                    }}
                    className="copy-btn"
                  >
                    📋 Copy
                  </button>
                </div>
                <div className="ai-output-text">{aiOutput}</div>
                <div className="ai-output-actions">
                  <button onClick={handleApplyAi} className="apply-btn">
                    {aiAction === 'skills' ? 'Add to Skills' : 'Apply to Summary'}
                  </button>
                  <button onClick={() => setAiOutput('')} className="dismiss-btn">Dismiss</button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Tabs Menu */}
      <div className="form-tabs">
        <button className={`tab-btn ${activeTab === 'personal' ? 'active' : ''}`} onClick={() => onTabChange('personal')}>Personal</button>
        <button className={`tab-btn ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => onTabChange('experience')}>Experience</button>
        <button className={`tab-btn ${activeTab === 'education' ? 'active' : ''}`} onClick={() => onTabChange('education')}>Education</button>
        <button className={`tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => onTabChange('skills')}>Skills</button>
        <button className={`tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => onTabChange('projects')}>Projects</button>
      </div>

      {/* Tab Contents */}
      <div style={{ flex: 1, padding: '16px', overflowY: 'auto' }}>
        {/* Personal Info Tab */}
        {activeTab === 'personal' && (
          <div className="tab-content active">
            <div className="form-group">
              <label htmlFor="resumeFont">Resume Font</label>
              <select id="resumeFont" value={resumeFont} onChange={(e) => onFontChange(e.target.value)} style={{ width: '100%' }}>
                <option value="">Default Template Font</option>
                <option value="'Inter', sans-serif">Inter (Modern & Clean)</option>
                <option value="'Outfit', sans-serif">Outfit (Sleek & Rounded)</option>
                <option value="'Georgia', serif">Georgia (Classic Serif)</option>
                <option value="'Lora', serif">Lora (Elegant Serif)</option>
                <option value="'Roboto Mono', monospace">Roboto Mono (Developer Tech)</option>
              </select>
            </div>
            <div className="form-group">
              <label>Full Name *</label>
              <input type="text" value={personalInfo.fullName} onChange={(e) => onPersonalInfoChange('fullName', e.target.value)} placeholder="e.g. Abhinandan Dubey" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Job Title *</label>
                <input type="text" value={personalInfo.jobTitle} onChange={(e) => onPersonalInfoChange('jobTitle', e.target.value)} placeholder="e.g. Full Stack Developer" />
              </div>
              <div className="form-group">
                <label>Email *</label>
                <input type="email" value={personalInfo.email} onChange={(e) => onPersonalInfoChange('email', e.target.value)} placeholder="john@email.com" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Phone</label>
                <input type="tel" value={personalInfo.phone} onChange={(e) => onPersonalInfoChange('phone', e.target.value)} placeholder="+1 234 567 890" />
              </div>
              <div className="form-group">
                <label>Location</label>
                <input type="text" value={personalInfo.location} onChange={(e) => onPersonalInfoChange('location', e.target.value)} placeholder="New York, USA" />
              </div>
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>LinkedIn</label>
                <input type="text" value={personalInfo.linkedin} onChange={(e) => onPersonalInfoChange('linkedin', e.target.value)} placeholder="linkedin.com/in/username" />
              </div>
              <div className="form-group">
                <label>Portfolio / Website</label>
                <input type="text" value={personalInfo.website} onChange={(e) => onPersonalInfoChange('website', e.target.value)} placeholder="madcoder.in" />
              </div>
            </div>
            <div className="form-group">
              <label>GitHub</label>
              <input type="text" value={personalInfo.github} onChange={(e) => onPersonalInfoChange('github', e.target.value)} placeholder="github.com/username" />
            </div>
            <div className="form-group">
              <label>Professional Summary</label>
              <textarea rows="4" value={personalInfo.summary} onChange={(e) => onPersonalInfoChange('summary', e.target.value)} placeholder="A brief summary of your background and goals..." />
            </div>
          </div>
        )}

        {/* Experience Tab */}
        {activeTab === 'experience' && (
          <div className="tab-content active">
            {experiences.map((exp, i) => (
              <div className="experience-item" key={exp.id}>
                <div className="item-header">
                  <h4>Experience {i + 1}</h4>
                  <button className="remove-item-btn" onClick={() => onRemoveExperience(exp.id)}>
                    <Trash2 size={12} style={{ marginRight: '4px', display: 'inline' }} /> Remove
                  </button>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Job Title</label>
                    <input type="text" value={exp.title} onChange={(e) => onUpdateExperience(exp.id, 'title', e.target.value)} placeholder="e.g. Frontend Developer" />
                  </div>
                  <div className="form-group">
                    <label>Company</label>
                    <input type="text" value={exp.company} onChange={(e) => onUpdateExperience(exp.id, 'company', e.target.value)} placeholder="e.g. Google" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Date</label>
                    <input type="text" value={exp.start} onChange={(e) => onUpdateExperience(exp.id, 'start', e.target.value)} placeholder="e.g. Jan 2022" />
                  </div>
                  <div className="form-group">
                    <label>End Date</label>
                    <input
                      type="text"
                      value={exp.end}
                      onChange={(e) => onUpdateExperience(exp.id, 'end', e.target.value)}
                      placeholder="Present"
                      disabled={exp.current}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label>Location</label>
                  <input type="text" value={exp.location} onChange={(e) => onUpdateExperience(exp.id, 'location', e.target.value)} placeholder="e.g. Remote / San Francisco" />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea rows="3" value={exp.desc} onChange={(e) => onUpdateExperience(exp.id, 'desc', e.target.value)} placeholder="Describe your responsibilities..." />
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={onAddExperience}>
              <Plus size={14} style={{ marginRight: '4px', display: 'inline' }} /> Add Experience
            </button>
          </div>
        )}

        {/* Education Tab */}
        {activeTab === 'education' && (
          <div className="tab-content active">
            {educations.map((edu, i) => (
              <div className="education-item" key={edu.id}>
                <div className="item-header">
                  <h4>Education {i + 1}</h4>
                  <button className="remove-item-btn" onClick={() => onRemoveEducation(edu.id)}>
                    <Trash2 size={12} style={{ marginRight: '4px', display: 'inline' }} /> Remove
                  </button>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Degree / Certificate</label>
                    <input type="text" value={edu.degree} onChange={(e) => onUpdateEducation(edu.id, 'degree', e.target.value)} placeholder="e.g. B.Tech Computer Science" />
                  </div>
                  <div className="form-group">
                    <label>School / University</label>
                    <input type="text" value={edu.school} onChange={(e) => onUpdateEducation(edu.id, 'school', e.target.value)} placeholder="e.g. IIT Delhi" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Start Year</label>
                    <input type="text" value={edu.start} onChange={(e) => onUpdateEducation(edu.id, 'start', e.target.value)} placeholder="2020" />
                  </div>
                  <div className="form-group">
                    <label>End Year</label>
                    <input type="text" value={edu.end} onChange={(e) => onUpdateEducation(edu.id, 'end', e.target.value)} placeholder="2024" />
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Location</label>
                    <input type="text" value={edu.location} onChange={(e) => onUpdateEducation(edu.id, 'location', e.target.value)} placeholder="e.g. Delhi, India" />
                  </div>
                  <div className="form-group">
                    <label>GPA / Score</label>
                    <input type="text" value={edu.gpa} onChange={(e) => onUpdateEducation(edu.id, 'gpa', e.target.value)} placeholder="e.g. 8.5 / 10" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Additional Details</label>
                  <textarea rows="2" value={edu.desc} onChange={(e) => onUpdateEducation(edu.id, 'desc', e.target.value)} placeholder="Relevant coursework..." />
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={onAddEducation}>
              <Plus size={14} style={{ marginRight: '4px', display: 'inline' }} /> Add Education
            </button>
          </div>
        )}

        {/* Skills Tab */}
        {activeTab === 'skills' && (
          <div className="tab-content active">
            <div className="form-group">
              <label>Technical Skills</label>
              <div className="skills-input-wrapper">
                <input
                  type="text"
                  value={skillInput}
                  onChange={(e) => setSkillInput(e.target.value)}
                  onKeyDown={handleAddSkill}
                  placeholder="Type a skill and press Enter..."
                />
                <button onClick={triggerAddSkill} className="add-skill-btn">+</button>
              </div>
              <div className="skills-tags">
                {skills.map((s, i) => (
                  <div className="skill-tag" key={i}>
                    <span>{s}</span>
                    <span className="skill-tag-remove" onClick={() => onRemoveSkill(s)} title="Remove">×</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Languages</label>
              <input type="text" value={personalInfo.languages} onChange={(e) => onPersonalInfoChange('languages', e.target.value)} placeholder="e.g. English (Fluent), Hindi (Native)" />
            </div>
            <div className="form-group">
              <label>Certifications</label>
              <textarea rows="3" value={personalInfo.certifications} onChange={(e) => onPersonalInfoChange('certifications', e.target.value)} placeholder="e.g. AWS Certified Developer..." />
            </div>
            <div className="form-group">
              <label>Interests / Hobbies</label>
              <input type="text" value={personalInfo.interests} onChange={(e) => onPersonalInfoChange('interests', e.target.value)} placeholder="e.g. Open Source, Gaming" />
            </div>
          </div>
        )}

        {/* Projects Tab */}
        {activeTab === 'projects' && (
          <div className="tab-content active">
            {projects.map((proj, i) => (
              <div className="project-item" key={proj.id}>
                <div className="item-header">
                  <h4>Project {i + 1}</h4>
                  <button className="remove-item-btn" onClick={() => onRemoveProject(proj.id)}>
                    <Trash2 size={12} style={{ marginRight: '4px', display: 'inline' }} /> Remove
                  </button>
                </div>
                <div className="form-group">
                  <label>Project Name</label>
                  <input type="text" value={proj.name} onChange={(e) => onUpdateProject(proj.id, 'name', e.target.value)} placeholder="e.g. Portfolio Website" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Tech Stack</label>
                    <input type="text" value={proj.tech} onChange={(e) => onUpdateProject(proj.id, 'tech', e.target.value)} placeholder="e.g. React, Node.js" />
                  </div>
                  <div className="form-group">
                    <label>Link / GitHub</label>
                    <input type="text" value={proj.link} onChange={(e) => onUpdateProject(proj.id, 'link', e.target.value)} placeholder="github.com/user/project" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea rows="3" value={proj.desc} onChange={(e) => onUpdateProject(proj.id, 'desc', e.target.value)} placeholder="What did you build?..." />
                </div>
              </div>
            ))}
            <button className="add-btn" onClick={onAddProject}>
              <Plus size={14} style={{ marginRight: '4px', display: 'inline' }} /> Add Project
            </button>
          </div>
        )}
      </div>

      {/* Fit to Single Page Checkbox Option */}
      <div className="download-options">
        <label className="toggle-switch">
          <input type="checkbox" id="fitSinglePage" checked={fitSinglePage} onChange={onFitToggle} />
          <span className="toggle-slider"></span>
        </label>
        <span className="toggle-label">Fit to Single Page</span>
      </div>

      {/* Download Action Buttons */}
      <div className="form-actions">
        <button className="download-btn" onClick={onDownload} id="downloadBtn">
          <FileDown size={16} style={{ marginRight: '6px', display: 'inline' }} /> Download PDF
        </button>
        <button className="clear-btn" onClick={onClear}>
          <RotateCcw size={14} style={{ marginRight: '4px', display: 'inline' }} /> Clear All
        </button>
        <button className="fill-sample-btn" onClick={onFillSample}>
          📋 Fill Sample
        </button>
      </div>
    </div>
  );
}
