import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import TemplateCatalog from './components/TemplateCatalog';
import FormPanel from './components/FormPanel';
import PreviewPanel from './components/PreviewPanel';
import { renderTemplate } from './components/templates/TemplateRenderers';
import html2pdf from 'html2pdf.js';

export default function App() {
  // ============ STATE ============
  const [activeTemplate, setActiveTemplate] = useState('classic');
  const [activeTab, setActiveTab] = useState('personal');
  const [fitSinglePage, setFitSinglePage] = useState(true);
  const [resumeFont, setResumeFont] = useState('');
  const [zoomMode, setZoomMode] = useState('auto');
  const [previewScale, setPreviewScale] = useState(0.7);

  const [personalInfo, setPersonalInfo] = useState({
    fullName: 'Abhinandan Dubey',
    jobTitle: 'Data Science & Full-Stack Developer',
    email: 'abhidubey2536@gmail.com',
    phone: '(+91) 6306641291',
    location: 'India',
    linkedin: 'linkedin.com/in/Abhinandan49',
    website: 'madcoder.in',
    github: 'github.com/Abhinandan-49',
    summary: 'Data Science and Full-Stack Developer with a B.Tech background, skilled in Python, Deep Learning, Data Analysis, and SQL. Proven ability to build end-to-end solutions — from model development to deployment-ready web interfaces.',
    languages: 'English (Fluent), Hindi (Native)',
    certifications: 'Programming in Java (Elite + Silver) By NPTEL\nPython for Data Science By NPTEL\nMachine learning fundamentals by L&T edutech\nSQL for data science by great learning',
    interests: 'Open Source Contribution, Machine Learning, Full-Stack Development, Data Analytics'
  });

  const [skills, setSkills] = useState([
    'Python', 'Java', 'JavaScript', 'SQL', 'HTML', 'CSS', 'React.js', 'Node.js', 'Next.js', 
    'Express.js', 'MySQL', 'MongoDB', 'RAG', 'Razorpay', 'Git', 'GitHub', 'VS Code', 'Jupyterlab'
  ]);

  const [experiences, setExperiences] = useState([
    {
      id: 101,
      title: 'Summer Internship Training (Data Science)',
      company: 'SRDT Pvt. Ltd.',
      location: 'Lucknow, India',
      start: 'Sep 2025',
      end: 'Present',
      current: false,
      desc: 'Completed Summer Internship Training Program on Data Science with Machine Learning. Worked on café sales data analysis, extracting actionable insights, and building predictive models.'
    },
    {
      id: 102,
      title: 'Summer Internship Training (Mobile App Development)',
      company: 'SRDT Pvt. Ltd.',
      location: 'Lucknow, India',
      start: 'Jun 2026',
      end: 'Present',
      current: false,
      desc: 'Completed Summer Internship Training Program on Mobile App Development. Worked on developing a fitness mobile application.'
    }
  ]);

  const [educations, setEducations] = useState([
    {
      id: 201,
      degree: 'B.Tech CSE (Data Science)',
      school: 'SRMCEM',
      location: 'Lucknow, India',
      start: '2023',
      end: '2027',
      gpa: '7.75/10 CGPA',
      desc: 'Specialization in Computer Science & Engineering (Data Science).'
    },
    {
      id: 202,
      degree: 'Intermediate (PCM, CBSE)',
      school: 'Siddhant World School',
      location: 'Lucknow, India',
      start: '2021',
      end: '2023',
      gpa: '84.6%',
      desc: 'Completed Senior Secondary education in Physics, Chemistry, and Mathematics.'
    },
    {
      id: 203,
      degree: 'High School (CBSE)',
      school: 'Siddhant World School',
      location: 'Lucknow, India',
      start: '2019',
      end: '2021',
      gpa: '85%',
      desc: 'Completed Secondary school education.'
    }
  ]);

  const [projects, setProjects] = useState([
    {
      id: 301,
      name: 'AI-Powered Teaching Assistant',
      tech: 'React, TypeScript, Vite, Gemini API, RAG, Vector Embeddings, Vercel',
      link: 'paymentgateway.madcoder.in',
      desc: 'Built a RAG-based AI assistant that delivers context-aware answers from educational content using semantic search and vector embeddings. Optimized retrieval accuracy and scalability for large knowledge bases through an interactive web application.'
    },
    {
      id: 302,
      name: 'Responsive Portfolio Website',
      tech: 'React, JavaScript, HTML, CSS, GitHub, Vercel',
      link: 'madcoder.in',
      desc: 'Built a responsive personal portfolio website to showcase projects, skills, and achievements. Designed with a user-centric interface, interactive project sections, and cross-device compatibility to strengthen professional presence and demonstrate front-end development expertise.'
    },
    {
      id: 303,
      name: 'Payment Gateway Integration Platform',
      tech: 'React, Node.js, Express.js, MongoDB, Razorpay, REST APIs, Vercel',
      link: 'paymentgateway.madcoder.in',
      desc: 'Built a secure payment processing platform with integrated payment gateway APIs for seamless online transactions. Implemented transaction tracking, payment verification, and responsive user interfaces while ensuring reliability and security.'
    }
  ]);

  // ============ ACTIONS ============
  const handlePersonalInfoChange = (field, value) => {
    setPersonalInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleAddSkill = (skill) => {
    if (skill && !skills.includes(skill)) {
      setSkills(prev => [...prev, skill]);
    }
  };

  const handleRemoveSkill = (skill) => {
    setSkills(prev => prev.filter(s => s !== skill));
  };

  const handleAddExperience = () => {
    const newId = Date.now();
    setExperiences(prev => [...prev, { id: newId, title: '', company: '', location: '', start: '', end: '', current: false, desc: '' }]);
  };

  const handleRemoveExperience = (id) => {
    setExperiences(prev => prev.filter(e => e.id !== id));
  };

  const handleUpdateExperience = (id, field, value) => {
    setExperiences(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleAddEducation = () => {
    const newId = Date.now();
    setEducations(prev => [...prev, { id: newId, degree: '', school: '', location: '', start: '', end: '', gpa: '', desc: '' }]);
  };

  const handleRemoveEducation = (id) => {
    setEducations(prev => prev.filter(e => e.id !== id));
  };

  const handleUpdateEducation = (id, field, value) => {
    setEducations(prev => prev.map(e => e.id === id ? { ...e, [field]: value } : e));
  };

  const handleAddProject = () => {
    const newId = Date.now();
    setProjects(prev => [...prev, { id: newId, name: '', tech: '', link: '', desc: '' }]);
  };

  const handleRemoveProject = (id) => {
    setProjects(prev => prev.filter(p => p.id !== id));
  };

  const handleUpdateProject = (id, field, value) => {
    setProjects(prev => prev.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleClearAll = () => {
    if (!window.confirm('Clear all form data? This cannot be undone.')) return;
    setPersonalInfo({
      fullName: '',
      jobTitle: '',
      email: '',
      phone: '',
      location: '',
      linkedin: '',
      website: '',
      github: '',
      summary: '',
      languages: '',
      certifications: '',
      interests: ''
    });
    setSkills([]);
    setExperiences([]);
    setEducations([]);
    setProjects([]);
  };

  const handleFillSample = () => {
    setPersonalInfo({
      fullName: 'Abhinandan Dubey',
      jobTitle: 'Data Science & Full-Stack Developer',
      email: 'abhidubey2536@gmail.com',
      phone: '(+91) 6306641291',
      location: 'India',
      linkedin: 'linkedin.com/in/Abhinandan49',
      website: 'madcoder.in',
      github: 'github.com/Abhinandan-49',
      summary: 'Data Science and Full-Stack Developer with a B.Tech background, skilled in Python, Deep Learning, Data Analysis, and SQL. Proven ability to build end-to-end solutions — from model development to deployment-ready web interfaces.',
      languages: 'English (Fluent), Hindi (Native)',
      certifications: 'Programming in Java (Elite + Silver) By NPTEL\nPython for Data Science By NPTEL\nMachine learning fundamentals by L&T edutech\nSQL for data science by great learning',
      interests: 'Open Source Contribution, Machine Learning, Full-Stack Development, Data Analytics'
    });
    setSkills([
      'Python', 'Java', 'JavaScript', 'SQL', 'HTML', 'CSS', 'React.js', 'Node.js', 'Next.js', 
      'Express.js', 'MySQL', 'MongoDB', 'RAG', 'Razorpay', 'Git', 'GitHub', 'VS Code', 'Jupyterlab'
    ]);
    setExperiences([
      {
        id: 101,
        title: 'Summer Internship Training (Data Science)',
        company: 'SRDT Pvt. Ltd.',
        location: 'Lucknow, India',
        start: 'Sep 2025',
        end: 'Present',
        current: false,
        desc: 'Completed Summer Internship Training Program on Data Science with Machine Learning. Worked on café sales data analysis, extracting actionable insights, and building predictive models.'
      },
      {
        id: 102,
        title: 'Summer Internship Training (Mobile App Development)',
        company: 'SRDT Pvt. Ltd.',
        location: 'Lucknow, India',
        start: 'Jun 2026',
        end: 'Present',
        current: false,
        desc: 'Completed Summer Internship Training Program on Mobile App Development. Worked on developing a fitness mobile application.'
      }
    ]);
    setEducations([
      {
        id: 201,
        degree: 'B.Tech CSE (Data Science)',
        school: 'SRMCEM',
        location: 'Lucknow, India',
        start: '2023',
        end: '2027',
        gpa: '7.75/10 CGPA',
        desc: 'Specialization in Computer Science & Engineering (Data Science).'
      },
      {
        id: 202,
        degree: 'Intermediate (PCM, CBSE)',
        school: 'Siddhant World School',
        location: 'Lucknow, India',
        start: '2021',
        end: '2023',
        gpa: '84.6%',
        desc: 'Completed Senior Secondary education in Physics, Chemistry, and Mathematics.'
      },
      {
        id: 203,
        degree: 'High School (CBSE)',
        school: 'Siddhant World School',
        location: 'Lucknow, India',
        start: '2019',
        end: '2021',
        gpa: '85%',
        desc: 'Completed Secondary school education.'
      }
    ]);
    setProjects([
      {
        id: 301,
        name: 'AI-Powered Teaching Assistant',
        tech: 'React, TypeScript, Vite, Gemini API, RAG, Vector Embeddings, Vercel',
        link: 'paymentgateway.madcoder.in',
        desc: 'Built a RAG-based AI assistant that delivers context-aware answers from educational content using semantic search and vector embeddings. Optimized retrieval accuracy and scalability for large knowledge bases through an interactive web application.'
      },
      {
        id: 302,
        name: 'Responsive Portfolio Website',
        tech: 'React, JavaScript, HTML, CSS, GitHub, Vercel',
        link: 'madcoder.in',
        desc: 'Built a responsive personal portfolio website to showcase projects, skills, and achievements. Designed with a user-centric interface, interactive project sections, and cross-device compatibility to strengthen professional presence and demonstrate front-end development expertise.'
      },
      {
        id: 303,
        name: 'Payment Gateway Integration Platform',
        tech: 'React, Node.js, Express.js, MongoDB, Razorpay, REST APIs, Vercel',
        link: 'paymentgateway.madcoder.in',
        desc: 'Built a secure payment processing platform with integrated payment gateway APIs for online transactions. Implemented transaction tracking, payment verification, and responsive user interfaces while ensuring reliability and security.'
      }
    ]);
  };

  const handleDownloadPDF = async () => {
    const name = personalInfo.fullName || 'resume';
    const preview = document.getElementById('resumePreview');
    if (!preview) return;

    const exportHost = document.createElement('div');
    exportHost.className = 'pdf-export-host';
    const exportResume = preview.cloneNode(true);
    exportResume.removeAttribute('id');
    exportResume.classList.add('pdf-export-resume');
    exportHost.appendChild(exportResume);
    document.body.appendChild(exportHost);
    
    await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));

    const opt = {
      margin: fitSinglePage ? [24, 0, 24, 0] : [40, 0, 40, 0],
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
    } catch (e) {
      console.error(e);
      alert('Error generating PDF.');
    }

    exportHost.remove();
  };

  const handleScaleChange = (mode, scale) => {
    setZoomMode(mode);
    setPreviewScale(scale);
  };

  const scrollToBuilder = () => {
    document.getElementById('builder')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToTemplates = () => {
    document.getElementById('templates')?.scrollIntoView({ behavior: 'smooth' });
  };

  // Compile active template html
  const templateHtml = renderTemplate(activeTemplate, {
    ...personalInfo,
    skills,
    experiences,
    educations,
    projects
  });

  return (
    <>
      <Navbar onBuildClick={scrollToBuilder} />
      <Hero onStartClick={scrollToBuilder} onViewTemplatesClick={scrollToTemplates} />
      <Features />
      <TemplateCatalog activeTemplate={activeTemplate} onSelectTemplate={setActiveTemplate} />

      {/* Main Builder Dashboard */}
      <section className="builder-section" id="builder">
        <div className="builder-container">
          <FormPanel
            personalInfo={personalInfo}
            onPersonalInfoChange={handlePersonalInfoChange}
            experiences={experiences}
            onAddExperience={handleAddExperience}
            onRemoveExperience={handleRemoveExperience}
            onUpdateExperience={handleUpdateExperience}
            educations={educations}
            onAddEducation={handleAddEducation}
            onRemoveEducation={handleRemoveEducation}
            onUpdateEducation={handleUpdateEducation}
            projects={projects}
            onAddProject={handleAddProject}
            onRemoveProject={handleRemoveProject}
            onUpdateProject={handleUpdateProject}
            skills={skills}
            onAddSkill={handleAddSkill}
            onRemoveSkill={handleRemoveSkill}
            fitSinglePage={fitSinglePage}
            onFitToggle={() => setFitSinglePage(!fitSinglePage)}
            resumeFont={resumeFont}
            onFontChange={setResumeFont}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            onDownload={handleDownloadPDF}
            onClear={handleClearAll}
            onFillSample={handleFillSample}
          />
          <PreviewPanel
            template={activeTemplate}
            templateHtml={templateHtml}
            zoomMode={zoomMode}
            previewScale={previewScale}
            onScaleChange={handleScaleChange}
            fitSinglePage={fitSinglePage}
            resumeFont={resumeFont}
          />
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <span className="logo-icon">⚡</span>
            <span>ResumeForge</span>
          </div>
          <p className="footer-copy">© 2026 ResumeForge. No data stored. Your privacy matters.</p>
        </div>
      </footer>
    </>
  );
}
