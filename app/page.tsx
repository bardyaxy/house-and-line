'use client';

import { FormEvent, useEffect, useState } from 'react';

const services = [
  ['A-000', 'Concept & Style', 'Positioning, guest profile, cuisine, mood, budget, and a clear creative direction before a wall moves.'],
  ['A-101', 'Front of House', 'Dining plans, bar design, seating counts, lighting, finishes, and furniture tuned for comfort and service.'],
  ['K-201', 'Kitchen Design', 'Equipment lines, prep and dish flow, walk-ins, and a pass engineered around the way your menu moves.'],
  ['L-301', 'Liquor Licensing', 'Application strategy, exhibits, documentation, and hearing preparation coordinated alongside design.'],
  ['H-302', 'Health Department', 'Plan-review sets, food-safety layouts, correction responses, and inspection walk-throughs.'],
  ['F-401', 'Fire & Grease', 'Hood, duct, and suppression coordination designed into the kitchen line—not patched in later.'],
  ['C-501', 'Construction', 'Contractor coordination, site observations, punch lists, and inspection scheduling through opening.'],
];

const phases = [
  ['01', 'Discover', 'Site, service model, menu, budget, and the story guests should feel.'],
  ['02', 'Draw', 'A coordinated front- and back-of-house design set with every inch accountable.'],
  ['03', 'Submit', 'Applications and drawings routed to the right agencies in the right sequence.'],
  ['04', 'Build', 'Decisions tracked on site, trades coordinated, and drawings kept current.'],
  ['05', 'Open', 'Final inspections, sign-offs, punch work, and a room ready for first service.'],
];

const selectedConcepts = [
  {
    number: 'Concept 01',
    name: 'Shake Shake Shake',
    initials: 'SSS',
    role: 'Co-founder / Owner',
    format: 'Retro-modern burger café',
    signature: 'Color · detail · neighborhood energy',
    copy: 'A fast-casual room made memorable through a complete point of view—from the chairs and counter to the way the brand meets the street.',
    href: 'https://shakeshakeshake.me/',
    linkLabel: 'Visit concept',
    visual: 'shake',
  },
  {
    number: 'Concept 02',
    name: 'The Boom Boom Room',
    initials: 'BBR',
    role: 'Owner / Creator / Designer',
    format: 'Mid-century cocktail lounge',
    signature: 'Black walnut · low light · gold detail',
    copy: 'A compact cocktail room with a cinematic identity, balancing modern nostalgia with an intimate service experience.',
    href: 'https://www.tacomasboomboomroom.com/story',
    linkLabel: 'Read the story',
    visual: 'boom',
  },
  {
    number: 'Concept 03',
    name: 'Manuscript & Dialogue',
    initials: 'M+D',
    role: 'Concept / Experience',
    format: 'Restaurant + nightlife',
    signature: 'Industrial shell · rope · saturated light',
    copy: 'A layered hospitality environment designed to shift from dining into nightlife through sequence, structure, lighting, and movement.',
    href: 'https://www.manuscripttacoma.com/',
    linkLabel: 'Visit concept',
    visual: 'manuscript',
  },
  {
    number: 'Concept 04',
    name: 'Miró Tapas',
    initials: 'MIRÓ',
    role: 'Concept / Design / Ownership',
    format: 'Art-led Spanish hospitality',
    signature: 'Color · shared plates · spontaneity',
    copy: 'A tapas concept inspired by Spain and Joan Miró, connecting an expressive visual language to the social rhythm of shared plates.',
    href: 'https://mirotapas.com/about',
    linkLabel: 'Read the concept',
    visual: 'miro',
  },
];

const faqs = [
  ['When should we bring Robert and Hospitality Concepts in?', 'As early as possible—ideally before signing a lease. We can test a site against seating, kitchen, accessibility, and infrastructure needs before those constraints become expensive. If you are already underway, we can still enter at any phase.'],
  ['Can you work with our architect or contractor?', 'Yes. À la carte engagements are built for existing teams. We can own a specific drawing package, permitting path, or field-coordination scope and plug into the people you already trust.'],
  ['Do you handle agency conversations directly?', 'That is part of the point. We prepare the relevant exhibits, coordinate submissions, respond to comments, and help guide inspection readiness so you are not left translating technical feedback alone.'],
  ['How are projects priced?', 'Each engagement is scoped around the actual sheets, approvals, and construction support required. Turnkey work is proposed as a coordinated path; focused work is priced as a defined package.'],
  ['What do you need for a first conversation?', 'A napkin sketch is enough. If you have them, bring the menu, lease plan, address, target opening, budget range, and any agency or contractor notes already in hand.'],
];

const projectImages = [
  {
    src: './projects/manuscript-dining-wide.jpg',
    alt: 'Wide view of the Manuscript dining room with illuminated banquettes, exposed timber structure, and a suspended tree installation',
    label: 'Dining room',
    meta: 'Seating · Lighting · Atmosphere',
    className: 'project-lead',
  },
  {
    src: './projects/manuscript-exterior.jpg',
    alt: 'Night exterior of the Manuscript restaurant with illuminated garage doors and custom signage',
    label: 'Street presence',
    meta: 'Exterior · Signage · Arrival',
    className: 'tile-wide',
  },
  {
    src: './projects/manuscript-entry-wide.jpg',
    alt: 'Entry view connecting a waiting bench, open bar, rope screen, and dining room',
    label: 'Entry sequence',
    meta: 'Threshold · Sightlines · Flow',
    className: 'tile-standard',
  },
  {
    src: './projects/manuscript-bar-wide.jpg',
    alt: 'Long open bar with wood cladding, dark stone top, square-backed stools, and integrated lighting',
    label: 'Open bar',
    meta: 'Millwork · Seating · Service',
    className: 'tile-wide',
  },
  {
    src: './projects/manuscript-entry-frame.jpg',
    alt: 'Dining room viewed through a black-framed rope screen at the entry',
    label: 'Layered threshold',
    meta: 'Screen · Booths · Framing',
    className: 'tile-standard',
  },
  {
    src: './projects/manuscript-dining-square.jpg',
    alt: 'Dining room centered on a lit tree installation and two garage-door openings',
    label: 'Dining axis',
    meta: 'Booths · Tables · Focal point',
    className: 'tile-square',
  },
  {
    src: './projects/manuscript-bar-dining.jpg',
    alt: 'Curved leather booth seating beside the bar under blue and amber lighting',
    label: 'Bar lounge',
    meta: 'Booths · Color · Circulation',
    className: 'tile-square',
  },
  {
    src: './projects/manuscript-tiffany-wide.jpg',
    alt: 'Bar-side booth wall with illuminated art, rope guardrail, and warm grazing light',
    label: 'Art wall',
    meta: 'Artwork · Grazing light · Texture',
    className: 'tile-square',
  },
  {
    src: './projects/manuscript-tiffany-detail.jpg',
    alt: 'Close view of a curved tufted booth and illuminated art feature',
    label: 'Booth detail',
    meta: 'Upholstery · Art · Intimacy',
    className: 'tile-square',
  },
  {
    src: './projects/manuscript-bar-rail.jpg',
    alt: 'Bar viewed across a rope guardrail with exposed timber and blue ceiling light',
    label: 'Bar overlook',
    meta: 'Ropework · Structure · Glow',
    className: 'tile-square',
  },
  {
    src: './projects/manuscript-bar-installation.jpg',
    alt: 'Bar installation with rope screen, illuminated art panel, timber post, and millwork in progress',
    label: 'Detail in progress',
    meta: 'Field coordination · Millwork',
    className: 'tile-square',
  },
  {
    src: './projects/manuscript-hall-pink-wide.jpg',
    alt: 'Finished corridor lighting detail with repeated circular sconces and pink linear light',
    label: 'Light corridor',
    meta: 'Custom detail · Repetition · Color',
    className: 'tile-wide',
  },
  {
    src: './projects/manuscript-hall-construction.jpg',
    alt: 'Restaurant corridor during construction with exposed framing and mechanical ductwork',
    label: 'Field condition',
    meta: 'Construction · Coordination',
    className: 'tile-standard',
  },
  {
    src: './projects/manuscript-exterior-light.jpg',
    alt: 'Vertical exterior light fixture glowing red and amber beside a garage door',
    label: 'Exterior fixture',
    meta: 'Custom light · Facade',
    className: 'tile-detail',
  },
  {
    src: './projects/manuscript-hall-red.jpg',
    alt: 'Red illuminated corridor creating a compressed transition between rooms',
    label: 'Red passage',
    meta: 'Sequence · Saturated light',
    className: 'tile-detail crop-screenshot',
  },
  {
    src: './projects/manuscript-hall-blue.jpg',
    alt: 'Blue corridor lighting study with repeated circular wall fixtures and red linear accents',
    label: 'Blue study',
    meta: 'Fixture rhythm · Contrast',
    className: 'tile-detail crop-screenshot',
  },
  {
    src: './projects/manuscript-hall-red-detail.jpg',
    alt: 'Red corridor lighting study showing circular sconces and continuous linear light',
    label: 'Red study',
    meta: 'Mockup · Color temperature',
    className: 'tile-detail crop-screenshot',
  },
];

const galleryImageIndexes = [1, 2, 3, 5, 7, 11, 12, 13];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [inquiryDraft, setInquiryDraft] = useState('');
  const [activeImage, setActiveImage] = useState<number | null>(null);

  useEffect(() => {
    if (activeImage === null) return;

    const previousOverflow = document.body.style.overflow;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setActiveImage(null);
      if (event.key === 'ArrowLeft') setActiveImage((activeImage - 1 + projectImages.length) % projectImages.length);
      if (event.key === 'ArrowRight') setActiveImage((activeImage + 1) % projectImages.length);
    };

    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [activeImage]);

  function closeMenu() {
    setMenuOpen(false);
  }

  async function prepareInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const servicesNeeded = form.getAll('services').join(', ') || 'Not selected';
    const text = [
      'ROBERT STOCKER / HOSPITALITY CONCEPTS AND DESIGN SERVICES — PROJECT INQUIRY',
      '',
      `Name: ${form.get('name') || ''}`,
      `Email: ${form.get('email') || ''}`,
      `Project stage: ${form.get('stage') || ''}`,
      `Services: ${servicesNeeded}`,
      '',
      'Project notes:',
      `${form.get('notes') || ''}`,
    ].join('\n');

    const subject = `Project inquiry — ${form.get('name') || 'Hospitality concept'}`;
    setInquiryDraft(`mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`);

    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <main id="top">
      <header className="site-header">
        <nav className="nav shell" aria-label="Main navigation">
          <a className="wordmark" href="#top" aria-label="Hospitality Concepts and Design Services, home" onClick={closeMenu}>
            Hospitality Concepts <span className="wordmark-detail">Robert Stocker · Founder</span>
          </a>
          <div className="nav-links" aria-label="Page sections">
            <a href="#founder">Founder</a>
            <a href="#services">Services</a>
            <a href="#work">Work</a>
            <a href="#process">Process</a>
          </div>
          <a className="button button-small nav-cta" href="#contact">Book a consult</a>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span />
          </button>
        </nav>
        <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} id="mobile-menu">
          {['founder', 'services', 'engagement', 'process', 'work', 'faq', 'contact'].map((item, index) => (
            <a key={item} href={`#${item}`} onClick={closeMenu}><small>0{index + 1}</small>{item === 'contact' ? 'Start a project' : item}</a>
          ))}
        </div>
      </header>

      <section className="hero shell" aria-labelledby="hero-title">
        <div className="drawing-sheet">
          <div className="hero-copy">
            <p className="eyebrow">Robert Stocker · Restaurateur / Creator / Designer</p>
            <h1 id="hero-title">Restaurants with a point of view, from first sketch to <em>final inspection.</em></h1>
            <p className="lede">Led by Tacoma restaurateur and restaurant designer Robert Stocker, Hospitality Concepts and Design Services brings an owner&apos;s instincts to the concept, dining room, kitchen, permits, construction, and opening.</p>
            <div className="hero-actions">
              <a className="button" href="#contact">Start your project <span aria-hidden="true">↗</span></a>
              <a className="text-link" href="#services">Explore the drawing set <span aria-hidden="true">↓</span></a>
            </div>
          </div>

          <div className="blueprint" role="img" aria-label="Abstract restaurant floor plan with dining room, bar, kitchen line, and service areas">
            <span className="room room-dining"><b>Dining</b><small>62 seats</small></span>
            <span className="room room-bar"><b>Bar</b><small>12 seats</small></span>
            <span className="room room-kitchen"><b>Kitchen line</b><small>Hood + Ansul</small></span>
            <span className="room room-service"><b>Service</b></span>
            <span className="table t1" /><span className="table t2" /><span className="table t3" />
            <span className="table t4" /><span className="table t5" /><span className="table t6" />
            <span className="dimension">62&apos;–0&quot;</span><span className="north">N ↑</span>
          </div>

          <div className="title-block" aria-label="Project drawing details">
            <span><small>Project</small><b>Your Restaurant</b></span>
            <span><small>Lead</small><b>Robert Stocker</b></span>
            <span><small>Scope</small><b>Concept → Open</b></span>
            <span className="approval">Issued<br /><b>For Review</b></span>
          </div>
        </div>
      </section>

      <section className="intro section shell" aria-labelledby="intro-title">
        <div className="section-kicker"><span>01</span><p>Founder-led hospitality</p></div>
        <div className="intro-grid">
          <h2 id="intro-title">Built from the operator&apos;s side of the <em>table.</em></h2>
          <div>
            <p className="intro-lede">Robert has created hospitality concepts, opened restaurants, shaped their interiors, and lived with the operational decisions after opening night.</p>
            <p className="body-copy">That experience keeps the atmosphere, brand, seating plan, kitchen flow, agency sheets, and field decisions connected. The goal is not simply a beautiful room—it is a place with identity that works every day.</p>
          </div>
        </div>
        <div className="proof-grid">
          <article><b>Creator + owner</b><p>Hospitality decisions grounded in real operating experience.</p></article>
          <article><b>Identity + function</b><p>A memorable point of view resolved around service and flow.</p></article>
          <article><b>Concept + completion</b><p>Creative direction carried through permits, build, and opening.</p></article>
        </div>
      </section>

      <section className="founder-section section" id="founder" aria-labelledby="founder-title">
        <div className="shell">
          <div className="founder-grid">
            <div>
              <div className="section-kicker light"><span>02</span><p>Robert Stocker / Founder</p></div>
              <p className="founder-overline">Restaurateur · Creator · Designer</p>
              <h2 id="founder-title">A concept should feel unmistakable—and work when the <em>room fills.</em></h2>
            </div>
            <div className="founder-bio">
              <div className="founder-profile" aria-label="Robert Stocker, founder, Tacoma Washington">
                <span aria-hidden="true">RS</span>
                <p><b>Robert Stocker</b><small>Founder · Tacoma, Washington</small></p>
              </div>
              <p className="founder-lede">Robert Stocker creates hospitality from the owner&apos;s side of the table.</p>
              <p>His Tacoma portfolio moves confidently between formats: a retro burger café, a mid-century cocktail lounge, an industrial restaurant and nightclub, and an art-led tapas concept. Each has its own visual language; all are built around the way people gather, work, and return.</p>
              <div className="founder-principle"><span>Operating principle</span><b>Build a place your team loves. Guests will feel it.</b></div>
            </div>
          </div>
          <div className="concept-ledger" aria-label="Selected Robert Stocker hospitality concepts">
            {selectedConcepts.map((concept) => (
              <article className={`concept-card concept-${concept.visual}`} key={concept.name}>
                <div className="concept-visual" aria-hidden="true"><b>{concept.initials}</b><i>{concept.format}</i></div>
                <div className="concept-meta"><span>{concept.number}</span><small>{concept.role}</small></div>
                <h3>{concept.name}</h3>
                <p>{concept.copy}</p>
                <dl>
                  <div><dt>Design language</dt><dd>{concept.signature}</dd></div>
                </dl>
                <a href={concept.href} target="_blank" rel="noreferrer">{concept.linkLabel} <span aria-hidden="true">↗</span></a>
              </article>
            ))}
          </div>
          <p className="concept-note">Selected concepts · Current and past</p>
        </div>
      </section>

      <section className="section services-section" id="services" aria-labelledby="services-title">
        <div className="shell">
          <div className="section-kicker"><span>03</span><p>Sheet index / Services</p></div>
          <div className="section-heading">
            <h2 id="services-title">The point of view is personal. The drawing set is complete.</h2>
            <p>Robert leads the concept; a coordinated team carries it through the sheets, approvals, and field decisions that make it real.</p>
          </div>
          <div className="service-list">
            {services.map(([number, title, copy]) => (
              <article className="service-row" key={number}>
                <span className="sheet-no">{number}</span><h3>{title}</h3><p>{copy}</p><span className="row-arrow" aria-hidden="true">↗</span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="engagement section" id="engagement" aria-labelledby="engagement-title">
        <div className="shell">
          <div className="section-kicker light"><span>04</span><p>Choose the engagement</p></div>
          <div className="engagement-head">
            <h2 id="engagement-title">Take the whole set, or just the <em>sheets you need.</em></h2>
            <p>Every project starts where you actually are: an idea, a signed lease, a correction notice, or a build already moving.</p>
          </div>
          <div className="engagement-grid">
            <article>
              <div className="option-label"><span>Option 01</span><i>One team</i></div>
              <h3>Full Turnkey</h3>
              <p>One coordinated path from concept to opening. We develop it, document it, guide approvals, and stay with the build.</p>
              <ul><li>Concept through construction</li><li>Licensing and permitting</li><li>Single point of coordination</li></ul>
              <a href="#contact">Discuss a turnkey project <span>↗</span></a>
            </article>
            <article>
              <div className="option-label"><span>Option 02</span><i>Focused scope</i></div>
              <h3>À la Carte</h3>
              <p>Bring us in for a kitchen plan, licensing package, agency response, or other defined piece your current team needs.</p>
              <ul><li>Any service, standalone</li><li>Built around your existing team</li><li>Clear package and deliverables</li></ul>
              <a href="#contact">Scope a focused package <span>↗</span></a>
            </article>
          </div>
        </div>
      </section>

      <section className="section process-section" id="process" aria-labelledby="process-title">
        <div className="shell">
          <div className="section-kicker"><span>05</span><p>Process / Five phases</p></div>
          <div className="section-heading compact">
            <h2 id="process-title">One line, from first mark to open door.</h2>
          </div>
          <div className="phase-line">
            {phases.map(([number, title, copy]) => (
              <article key={number}><span>{number}</span><i aria-hidden="true" /><h3>{title}</h3><p>{copy}</p></article>
            ))}
          </div>
        </div>
      </section>

      <section className="section work-section" id="work" aria-labelledby="work-title">
        <div className="shell">
          <div className="work-head">
            <div>
              <div className="section-kicker light"><span>06</span><p>Selected built work</p></div>
              <h2 id="work-title">A Robert Stocker concept, <em>brought to life.</em></h2>
            </div>
            <div className="work-intro">
              <span>Project 01 / Manuscript</span>
              <p>Robert shaped an industrial shell into a layered hospitality experience—from street presence and entry sequence to the bar, dining room, custom lighting, and field coordination.</p>
            </div>
          </div>

          <button className="project-hero" type="button" onClick={() => setActiveImage(0)} aria-label="Open large view of the Manuscript dining room">
            <img src={projectImages[0].src} alt={projectImages[0].alt} />
            <span className="project-hero-copy"><b>{projectImages[0].label}</b><small>{projectImages[0].meta}</small><i>View image ↗</i></span>
          </button>

          <div className="project-facts" aria-label="Manuscript project highlights">
            <span><small>Scope</small>Front of house</span>
            <span><small>Key spaces</small>Entry · Bar · Dining</span>
            <span><small>Details</small>Millwork · Lighting · Seating</span>
            <span><small>Delivery</small>Design through field</span>
          </div>

          <div className="project-gallery">
            {galleryImageIndexes.map((imageIndex) => {
              const image = projectImages[imageIndex];
              return (
              <button className={`project-tile ${image.className}`} type="button" key={image.src} onClick={() => setActiveImage(imageIndex)} aria-label={`Open large view: ${image.label}`}>
                <img src={image.src} alt={image.alt} loading="lazy" />
                <span><b>{image.label}</b><small>{image.meta}</small></span>
              </button>
              );
            })}
          </div>
          <p className="caption light-caption">A completed space is the proof of the drawings, decisions, and coordination behind it. Select any image to view it larger.</p>
        </div>
      </section>

      {activeImage !== null && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`${projectImages[activeImage].label} image viewer`} onClick={() => setActiveImage(null)}>
          <button className="lightbox-close" type="button" onClick={() => setActiveImage(null)} aria-label="Close image viewer">Close ×</button>
          <button className="lightbox-arrow lightbox-prev" type="button" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage - 1 + projectImages.length) % projectImages.length); }} aria-label="Previous image">←</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={projectImages[activeImage].src} alt={projectImages[activeImage].alt} />
            <figcaption><b>{projectImages[activeImage].label}</b><span>{projectImages[activeImage].meta}</span><small>{String(activeImage + 1).padStart(2, '0')} / {String(projectImages.length).padStart(2, '0')}</small></figcaption>
          </figure>
          <button className="lightbox-arrow lightbox-next" type="button" onClick={(event) => { event.stopPropagation(); setActiveImage((activeImage + 1) % projectImages.length); }} aria-label="Next image">→</button>
        </div>
      )}

      <section className="section faq-section" id="faq" aria-labelledby="faq-title">
        <div className="shell faq-grid">
          <div>
            <div className="section-kicker"><span>07</span><p>Field notes / FAQ</p></div>
            <h2 id="faq-title">Questions from the first meeting.</h2>
            <p className="body-copy">Good projects begin with the constraints on the table. Here are the ones we hear most often.</p>
          </div>
          <div className="faq-list">
            {faqs.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary><span>{String(index + 1).padStart(2, '0')}</span>{question}<i aria-hidden="true" /></summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="contact section" id="contact" aria-labelledby="contact-title">
        <div className="shell contact-grid">
          <div className="contact-copy">
            <div className="section-kicker light"><span>08</span><p>Start a project</p></div>
            <h2 id="contact-title">Bring the napkin sketch.<br />We&apos;ll build the <em>point of view.</em></h2>
            <p>Tell us where the project stands and what is getting in the way. Your first conversation with Robert starts with the essentials and the experience you want guests to remember.</p>
            <div className="contact-note"><span>Good to include</span><p>Location · Cuisine · Timeline · Space status · Budget range</p></div>
          </div>
          <form className="inquiry-form" onSubmit={prepareInquiry}>
            <div className="form-grid">
              <label><span>Your name</span><input required name="name" autoComplete="name" placeholder="Name" /></label>
              <label><span>Email</span><input required type="email" name="email" autoComplete="email" placeholder="you@restaurant.com" /></label>
            </div>
            <label><span>Project stage</span><select name="stage" defaultValue="Have a space or lease"><option>Just an idea</option><option>Have a space or lease</option><option>In design</option><option>Under construction</option><option>Open and need help</option></select></label>
            <fieldset>
              <legend>Services in view</legend>
              <div className="check-grid">{['Concept & style', 'Front of house', 'Kitchen design', 'Licensing & permits', 'Construction', 'Full turnkey'].map(item => <label key={item}><input type="checkbox" name="services" value={item} /><span>{item}</span></label>)}</div>
            </fieldset>
            <label><span>About the project</span><textarea required name="notes" rows={4} placeholder="Cuisine, location, timeline—whatever you have." /></label>
            <button className="button button-paper" type="submit">{copied ? 'Brief copied — choose email next' : 'Prepare my project brief'} <span aria-hidden="true">↗</span></button>
            {inquiryDraft && <a className="email-draft" href={inquiryDraft}>Open email app with this brief <span aria-hidden="true">↗</span></a>}
            <p className="form-note">This prepares an email and copies the brief. The recipient stays blank until Robert&apos;s studio inbox is confirmed; no information is sent or stored here.</p>
          </form>
        </div>
      </section>

      <footer className="site-footer">
        <div className="brand-signature">
          <a href="#top" aria-label="Hospitality Concepts and Design Services, back to top">
            <img src="./brand-logo.jpg" alt="P.S. Hospitality Concepts &amp; Design Services — Inspired spaces, elevated experiences, lasting impressions" loading="lazy" />
          </a>
        </div>
        <div className="footer-title shell">
          <p>Robert Stocker · Founder / Restaurant Designer<br />Concept · Design · Permit · Build · Open</p>
          <a href="#top">Back to top ↑</a>
        </div>
        <div className="footer-block">
          <span><small>Sheet</small>A-000 · Cover</span><span><small>Scale</small>NTS</span><span><small>Date</small>2026</span><span><small>Issued</small>For Review</span>
        </div>
      </footer>
    </main>
  );
}
