import { useEffect, useMemo, useRef, useState } from 'react';
import { projects, certs, tagLabels, education, awards, skillGroups } from './data';

const EMAIL = 'kentmedina88@gmail.com';
const socials = [
  { label: 'GitHub', url: 'https://github.com/kenthub123' },
  { label: 'LinkedIn', url: 'https://www.linkedin.com/in/kent-medina-0978a140b/' },
  { label: 'Facebook', url: 'https://www.facebook.com/kent.gella.9' }
];

const filters = [{ key: 'all', label: 'All work' }, { key: 'html', label: 'HTML/CSS' }, { key: 'js', label: 'JavaScript' }, { key: 'react', label: 'React' }, { key: 'python', label: 'Python' }, { key: 'php', label: 'PHP' }];

function Icon({ name, size = 18, ...props }) {
  const iconPaths = {
    arrow: <><path d="M5 12h14M13 6l6 6-6 6" /></>,
    external: <><path d="M8 5h11v11M19 5 5 19" /><path d="M18 13v6H5V6h6" /></>,
    chevron: <path d="m6 9 6 6 6-6" />,
    sun: <><circle cx="12" cy="12" r="4" /><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42" /></>,
    moon: <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5 8.6 8.6 0 1 0 20.5 14.5Z" />,
    menu: <><path d="M4 7h16M4 12h16M4 17h16" /></>,
    close: <><path d="M5 5l14 14M19 5 5 19" /></>,
    check: <path d="m5 12 4 4L19 6" />,
    copy: <><rect x="8" y="8" width="12" height="12" rx="2" /><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" /></>,
    file: <><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M9 8h6M9 12h6M9 16h4" /></>,
    code: <><path d="m8 8-4 4 4 4m8-8 4 4-4 4m-3-11-2 18" /></>,
    shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" /><path d="m9 12 2 2 4-4" /></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v14c0 4 16 4 16 0V5M4 12c0 4 16 4 16 0" /></>,
    globe: <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18M12 3c-5 5-5 13 0 18" /></>,
    up: <><path d="M12 19V5m-7 7 7-7 7 7" /></>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" {...props}>{iconPaths[name] || iconPaths.arrow}</svg>;
}

// Deterministic stars: no randomness during re-render, so both themes stay smooth.
const stars = Array.from({ length: 95 }, (_, index) => {
  const value = (index * 71.72 + 13.24) % 100;
  return {
    left: `${(index * 37.73 + 9) % 100}%`,
    top: `${(index * 57.11 + 19) % 100}%`,
    width: `${index % 11 === 0 ? 3 : 1.4}px`,
    height: `${index % 11 === 0 ? 3 : 1.4}px`,
    opacity: 0.18 + (value / 100) * 0.7,
    animationDelay: `${(index % 13) * -0.43}s`
  };
});

function GalaxyBackground() {
  return <div className="galaxy" aria-hidden="true"><div className="galaxy-orbit galaxy-orbit-one"/><div className="galaxy-orbit galaxy-orbit-two"/><div className="galaxy-glow galaxy-glow-one"/><div className="galaxy-glow galaxy-glow-two"/><div className="galaxy-grid"/>{stars.map((style, index) => <i className="star" key={index} style={style} />)}</div>;
}

function Header({ theme, toggleTheme }) {
  const [open, setOpen] = useState(false);
  const [scroll, setScroll] = useState(0);
  useEffect(() => {
    const onScroll = () => {
      const full = document.documentElement.scrollHeight - window.innerHeight;
      setScroll(full > 0 ? (window.scrollY / full) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return <header className="site-header">
    <div className="header-inner container">
      <a className="brand" href="#home" onClick={() => setOpen(false)} aria-label="Kent Medina portfolio home"><span className="brand-mark"><img src="/assets/logo-dark.png" alt="" /></span></a>
      <nav className={`nav-links ${open ? 'nav-open' : ''}`} aria-label="Main navigation">
        {[['About', '#about'], ['Education', '#education'], ['Projects', '#projects'], ['Certificates', '#certificates'], ['Contact', '#contact']].map(([label, href]) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
      </nav>
      <div className="header-actions">
        <button type="button" className="theme-toggle" onClick={toggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`} title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}><Icon name={theme === 'dark' ? 'sun' : 'moon'} size={18}/><span>{theme === 'dark' ? 'Light' : 'Dark'}</span></button>
        <a className="header-contact" href="#contact">Let's connect <Icon name="arrow" size={15}/></a>
        <button type="button" className="menu-toggle" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(value => !value)}><Icon name={open ? 'close' : 'menu'} size={22}/></button>
      </div>
    </div>
    <div className="scroll-line" style={{ width: `${scroll}%` }} />
  </header>;
}

function IDBadge() {
  const [imageFailed, setImageFailed] = useState(false);
  return <div className="badge-stage">
    <div className="badge-aura" />
    <div className="badge-aura secondary" />
    <div className="float-label float-label-top"><span className="ping-dot"/> DIGITAL CREATOR</div>
    <div className="float-label float-label-bottom">DESIGNED TO BUILD <span>↗</span></div>
    <div className="identity-card" aria-label="Stylized identification card of Kent G. Medina">
      <div className="id-top"><span className="id-logo"><img className="id-logo-img" src="/assets/logo-light.png" alt="KM logo" /></span><span className="id-auth"><span className="online-dot"/> CREATOR PROFILE</span></div>
      <div className="id-slot"/>
      <div className="id-picture">
        {imageFailed ? <div className="id-photo-fallback"><span>KGM</span><small>YOUR PHOTO HERE</small></div> : <img src="/assets/Profile_Picture.png" alt="Kent G. Medina" onError={() => setImageFailed(true)} />}
        <div className="id-photo-overlay" aria-hidden="true" />
        <span className="photo-side-label">BUILD · LEARN · CREATE</span>
      </div>
      <div className="id-information"><span className="id-caption">IDENTITY / 001</span><h2>KENT G.<br/><strong>MEDINA</strong></h2><p>Information Technology Student</p><div className="id-line"/><div className="id-bottom"><div><small>ORGANIZATION</small><strong>La Salle University Ozamis</strong></div><span className="barcode" aria-hidden="true"/></div></div>
      <div className="id-reflection" aria-hidden="true" />
    </div>
    <div className="stage-caption">INTERACTIVE DIGITAL ID <span>—</span> HOVER TO INSPECT</div>
  </div>;
}

function SectionEyebrow({ index, children }) {
  return <div className="section-eyebrow"><span>{index}</span><span className="eyebrow-rule"/>{children}</div>;
}

function Hero() {
  return <section className="hero container" id="home" aria-label="Introduction">
    <div className="hero-copy"><div className="availability"><span className="ping-dot"/> OPEN TO OPPORTUNITIES <span className="availability-slash"></span></div>
      <div className="hero-kicker">HELLO WORLD <span>—</span> I'M KENT G. MEDINA</div>
      <h1>Code. Create.<br/><span className="gradient-text">Go beyond.</span></h1>
      <p className="hero-description">Fourth-year IT student building practical web applications and exploring the world of <strong>Computer.</strong></p>
      <div className="hero-buttons"><a className="button primary-button" href="#projects">Explore my work <Icon name="arrow" size={17}/></a><a className="button ghost-button" href="#certificates">View certificates <Icon name="external" size={16}/></a></div>
      <div className="hero-footnote"><span className="footnote-line"/><span>MAHAYAG, ZAMBOANGA DEL SUR, PH</span><span className="footnote-separator">/</span><span>AVAILABLE TO COLLABORATE</span></div>
    </div>
    <IDBadge/>
  </section>;
}

function Metrics() {
  return <div className="metrics-bar"><div className="container metrics-inner">
    <div className="metric"><span className="metric-value">{String(projects.length).padStart(2, '0')}<i>+</i></span><span className="metric-label">PROJECTS SHIPPED</span></div>
    <span className="metric-divider"/>
    <div className="metric"><span className="metric-value">{String(certs.length).padStart(2, '0')}<i>+</i></span><span className="metric-label">CERTIFICATIONS & EVENTS</span></div>
    <span className="metric-divider"/>
    <div className="metric metric-university"><span className="metric-value">LSU<span className="metric-slash">/</span></span><span className="metric-label">LA SALLE UNIVERSITY OZAMIS</span></div>
  </div></div>;
}

function About() {
  return <section className="section container" id="about"><SectionEyebrow index="01">GET TO KNOW ME</SectionEyebrow><div className="about-layout"><div><h2 className="section-heading">A little about<br/><span className="outline-text">the person.</span></h2><p className="body-copy">I'm <strong>Kent G. Medina</strong>, an IT student at La Salle University Ozamiz who builds full-stack web apps and works with machine learning.</p><p className="body-copy">For my capstone, I <strong>led the design and deployment of an inventory and sales system</strong> for a local business. I'm looking for an <strong>internship or entry-level web development role.</strong></p><a className="text-link" href="#contact">Let's work together <Icon name="arrow" size={18}/></a></div><div className="skills-panel"><div className="panel-topline"><span className="panel-cross">✳</span><span>MY TOOLKIT</span><span className="panel-counter">{skillGroups.reduce((n, g) => n + g.items.length, 0)} SKILLS</span></div><h3>Things I work with<span>.</span></h3><div className="skill-groups">{skillGroups.map(group => <div className="skill-group" key={group.label}><span className="skill-group-label">{group.label}</span><div className="skill-tags">{group.items.map(skill => <span key={skill} className="skill-tag">{skill}</span>)}</div></div>)}</div></div></div></section>;
}

function Education() {
  return <section className="section container" id="education"><SectionEyebrow index="02">BACKGROUND</SectionEyebrow><div className="section-heading-row"><h2 className="section-heading">Education &amp;<br/><span className="outline-text">honors.</span></h2><p>Where I'm studying and what I've been recognized for so far.</p></div>
    <div className="edu-grid">
      <article className="edu-card"><div className="edu-meta"><span>EDUCATION</span><span>{education.years}</span></div><h3>{education.degree}</h3><p className="edu-school">{education.school}</p><div className="edu-courses-label">RELEVANT COURSEWORK</div><div className="skill-tags edu-courses">{education.coursework.map(c => <span className="skill-tag" key={c}>{c}</span>)}</div></article>
      <article className="edu-card"><div className="edu-meta"><span>AWARDS &amp; HONORS</span><span>{awards.length} TOTAL</span></div><ul className="award-list">{awards.map(a => <li key={a.title}><div><strong>{a.title}</strong><span>{a.place}</span></div><em>{a.year}</em></li>)}</ul></article>
    </div>
  </section>;
}

function Projects() {
  const [filter, setFilter] = useState('all');
  const filtered = useMemo(() => filter === 'all' ? projects : projects.filter(project => project.tags.includes(filter)), [filter]);
  return <section className="section container" id="projects"><SectionEyebrow index="03">SELECTED WORK</SectionEyebrow><div className="section-heading-row"><h2 className="section-heading">Projects<span className="heading-accent">.</span></h2><p>Things I've built, tested, and learned from along the way.</p></div>
    <div className="project-filters" role="group" aria-label="Filter projects by technology">{filters.map(item => <button type="button" key={item.key} aria-pressed={filter === item.key} className={`filter-button ${filter === item.key ? 'active' : ''}`} onClick={() => setFilter(item.key)}>{item.label}</button>)}</div>
    <div className="projects-grid">{filtered.length ? filtered.map((project) => {
      const index = projects.indexOf(project);
      return <a className="project-card" href={project.url} target="_blank" rel="noopener noreferrer" key={project.name}>
        <div className="project-top"><span className="project-index">{project.type.toUpperCase()}</span><span className="project-arrow"><Icon name="external" size={19}/></span></div>
        <div className="project-visual"><img src={project.image} alt={`Screenshot of ${project.name}`} loading="lazy" /></div>
        <h3>{project.name}</h3><p>{project.desc}</p><div className="project-stack">{project.stack}</div><div className="project-tags">{project.tags.map(tag => <span key={tag}>{tagLabels[tag] || tag}</span>)}</div>
      </a>;
    }) : <div className="empty-state">No projects match this filter yet. Try another technology.</div>}</div>
  </section>;
}

function CertThumbnail({ cert }) {
  const [failed, setFailed] = useState(false);
  const id = cert.data.match(/\/d\/([^/]+)/)?.[1];
  return <div className="certificate-image">{!failed && id ? <img src={`https://drive.google.com/thumbnail?id=${id}&sz=w800`} alt={`Preview of ${cert.name}`} loading="lazy" onError={() => setFailed(true)}/> : <div className="certificate-placeholder"><div className="certificate-watermark">KGM</div><div className="certificate-placeholder-head">CERTIFICATE</div><span className="certificate-seal">✳</span><div className="certificate-placeholder-body">OF PARTICIPATION</div><div className="certificate-line"/><div className="certificate-line short"/></div>}</div>;
}

function Certificates({ openCert }) {
  return <section className="section container" id="certificates"><SectionEyebrow index="04">CREDENTIALS & CONTINUOUS LEARNING</SectionEyebrow><div className="section-heading-row"><h2 className="section-heading">Proof of<br/><span className="outline-text">progress.</span></h2><p>Workshops, bootcamps, and learning experiences that helped shape my skills.</p></div>
    <div className="certificate-grid">{certs.map((cert, index) => <article className="certificate-card" key={cert.data}>
      <CertThumbnail cert={cert}/><div className="certificate-content"><div className="certificate-meta"><span>{cert.date}</span><span>NO. {String(index + 1).padStart(2, '0')}</span></div><h3>{cert.name}</h3><p>{cert.issuer}</p><button className="certificate-open" type="button" onClick={() => openCert(cert)}>Preview certificate <Icon name="external" size={16}/></button></div>
    </article>)}</div>
    <p className="certificate-note">Certificate images are loaded from Google Drive when sharing permissions allow it. Click any card's preview button to open the original certificate.</p>
  </section>;
}

function Contact() {
  const [copied, setCopied] = useState(false);
  const copyEmail = async () => {
    try {
      if (navigator.clipboard?.writeText) await navigator.clipboard.writeText(EMAIL);
      else {
        const input = document.createElement('textarea'); input.value = EMAIL; document.body.appendChild(input); input.select();
        if (!document.execCommand('copy')) throw new Error('Copy not supported'); input.remove();
      }
      setCopied(true);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  useEffect(() => { if (!copied) return; const timeout = setTimeout(() => setCopied(false), 2400); return () => clearTimeout(timeout); }, [copied]);
  return <section className="section container contact-section" id="contact"><SectionEyebrow index="05">LET'S CONNECT</SectionEyebrow><div className="contact-panel"><span className="contact-orbit" aria-hidden="true"/><div className="contact-inner"><div className="availability contact-availability"><span className="ping-dot"/> CURRENTLY OPEN TO OPPORTUNITIES</div><h2>Have an idea?<br/><span className="gradient-text">Let's build it.</span></h2><p>I'm always interested in great conversations, opportunities, and projects worth creating.</p><div className="contact-actions"><a className="button primary-button" href={`mailto:${EMAIL}`}>Send me an email <Icon name="arrow" size={17}/></a><button className="button ghost-button copy-button" type="button" onClick={copyEmail}><Icon name={copied ? 'check' : 'copy'} size={17}/>{copied ? 'Copied!' : 'Copy email'}</button></div><a className="contact-email" href={`mailto:${EMAIL}`}>{EMAIL}</a></div></div></section>;
}

function CertificateModal({ cert, onClose }) {
  const closeRef = useRef(null);
  useEffect(() => {
    if (!cert) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const handler = (event) => { if (event.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => { document.body.style.overflow = previous; window.removeEventListener('keydown', handler); };
  }, [cert, onClose]);
  if (!cert) return null;
  return <div className="modal-backdrop" role="presentation" onMouseDown={(event) => { if (event.target === event.currentTarget) onClose(); }}><div className="certificate-modal" role="dialog" aria-modal="true" aria-labelledby="certificate-modal-title"><div className="modal-heading"><div><small>CREDENTIAL PREVIEW</small><h2 id="certificate-modal-title">{cert.name}</h2></div><button type="button" aria-label="Close certificate preview" ref={closeRef} className="modal-close" onClick={onClose}><Icon name="close" size={20}/></button></div><iframe title={cert.name} src={cert.data} className="modal-frame" allow="fullscreen"/><div className="modal-bottom"><span>Can't see the PDF? Open it directly in Google Drive.</span><a href={cert.data.replace('/preview', '/view')} target="_blank" rel="noopener noreferrer">Open in Google Drive <Icon name="external" size={15}/></a></div></div></div>;
}

function Footer() {
  return <footer className="site-footer"><div className="container footer-inner"><a className="footer-brand" href="#home" aria-label="Back to top"><img className="footer-logo logo-on-dark" src="/assets/logo-light.png" alt="KM logo" /><img className="footer-logo logo-on-light" src="/assets/logo-dark.png" alt="" /></a><div className="footer-copy">DESIGNED & BUILT BY KENT G. MEDINA <span>© {new Date().getFullYear()}</span></div><div className="footer-links">{socials.map(s => <a href={s.url} key={s.label} target="_blank" rel="noopener noreferrer">{s.label}</a>)}</div><a className="back-top" href="#home" aria-label="Back to top"><Icon name="up" size={18}/></a></div></footer>;
}

export default function App() {
  const [theme, setTheme] = useState(() => {
    try { return localStorage.getItem('kgm-theme') === 'light' ? 'light' : 'dark'; } catch { return 'dark'; }
  });
  const [activeCert, setActiveCert] = useState(null);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try { localStorage.setItem('kgm-theme', theme); } catch { /* blocked storage */ }
  }, [theme]);
  return <><GalaxyBackground/><Header theme={theme} toggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}/><main><Hero/><Metrics/><About/><Education/><Projects/><Certificates openCert={setActiveCert}/><Contact/></main><Footer/><CertificateModal cert={activeCert} onClose={() => setActiveCert(null)}/></>;
}
