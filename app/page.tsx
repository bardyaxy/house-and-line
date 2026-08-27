'use client';

import { FormEvent, useRef, useState } from 'react';

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

const faqs = [
  ['When should we bring Hospitality Concepts in?', 'As early as possible—ideally before signing a lease. We can test a site against seating, kitchen, accessibility, and infrastructure needs before those constraints become expensive. If you are already underway, we can still enter at any phase.'],
  ['Can you work with our architect or contractor?', 'Yes. À la carte engagements are built for existing teams. We can own a specific drawing package, permitting path, or field-coordination scope and plug into the people you already trust.'],
  ['Do you handle agency conversations directly?', 'That is part of the point. We prepare the relevant exhibits, coordinate submissions, respond to comments, and help guide inspection readiness so you are not left translating technical feedback alone.'],
  ['How are projects priced?', 'Each engagement is scoped around the actual sheets, approvals, and construction support required. Turnkey work is proposed as a coordinated path; focused work is priced as a defined package.'],
  ['What do you need for a first conversation?', 'A napkin sketch is enough. If you have them, bring the menu, lease plan, address, target opening, budget range, and any agency or contractor notes already in hand.'],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const workRef = useRef<HTMLDivElement>(null);

  function closeMenu() {
    setMenuOpen(false);
  }

  function moveWork(direction: number) {
    workRef.current?.scrollBy({ left: direction * 420, behavior: 'smooth' });
  }

  async function prepareInquiry(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const servicesNeeded = form.getAll('services').join(', ') || 'Not selected';
    const text = [
      'HOSPITALITY CONCEPTS AND DESIGN SERVICES — PROJECT INQUIRY',
      '',
      `Name: ${form.get('name') || ''}`,
      `Email: ${form.get('email') || ''}`,
      `Project stage: ${form.get('stage') || ''}`,
      `Services: ${servicesNeeded}`,
      '',
      'Project notes:',
      `${form.get('notes') || ''}`,
    ].join('\n');

    await navigator.clipboard.writeText(text);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 3500);
  }

  return (
    <main id="top">
      <header className="site-header">
        <nav className="nav shell" aria-label="Main navigation">
          <a className="wordmark" href="#top" aria-label="Hospitality Concepts and Design Services, home" onClick={closeMenu}>
            <span className="brand-dot" aria-hidden="true" />
            Hospitality Concepts <span className="wordmark-detail">&amp; Design Services</span>
          </a>
          <div className="nav-links" aria-label="Page sections">
            <a href="#services">Services</a>
            <a href="#engagement">Engagement</a>
            <a href="#process">Process</a>
            <a href="#work">Work</a>
          </div>
          <a className="button button-small nav-cta" href="#contact">Book a consult</a>
          <button className="menu-toggle" type="button" aria-expanded={menuOpen} aria-controls="mobile-menu" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>
            <span /><span />
          </button>
        </nav>
        <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`} id="mobile-menu">
          {['services', 'engagement', 'process', 'work', 'faq', 'contact'].map((item, index) => (
            <a key={item} href={`#${item}`} onClick={closeMenu}><small>0{index + 1}</small>{item === 'contact' ? 'Start a project' : item}</a>
          ))}
        </div>
      </header>

      <section className="hero shell" aria-labelledby="hero-title">
        <div className="drawing-sheet">
          <div className="hero-copy">
            <p className="eyebrow">Hospitality Design &amp; Consulting</p>
            <h1 id="hero-title">Restaurants, drawn from first sketch to <em>final inspection.</em></h1>
            <p className="lede">Hospitality Concepts and Design Services shapes the concept, dining room, and kitchen—then carries every plan through licensing, permitting, construction, and opening night.</p>
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
            <span><small>Sheet</small><b>A-000 · Cover</b></span>
            <span><small>Scope</small><b>Concept → Open</b></span>
            <span className="approval">Issued<br /><b>For Review</b></span>
          </div>
        </div>
      </section>

      <section className="intro section shell" aria-labelledby="intro-title">
        <div className="section-kicker"><span>01</span><p>One coordinated practice</p></div>
        <div className="intro-grid">
          <h2 id="intro-title">Designers who speak <em>inspector.</em></h2>
          <div>
            <p className="intro-lede">The room guests see and the systems they never notice belong to the same project. We draw them that way.</p>
            <p className="body-copy">Hospitality Concepts and Design Services joins concept thinking with technical execution. The atmosphere, seating plan, kitchen flow, agency sheets, and site decisions stay connected from day one.</p>
          </div>
        </div>
        <div className="proof-grid">
          <article><b>Front + back</b><p>Guest experience and operational flow resolved together.</p></article>
          <article><b>Design + code</b><p>Creative intent translated into review-ready documents.</p></article>
          <article><b>Paper + field</b><p>Plans carried through contractor questions and inspections.</p></article>
        </div>
      </section>

      <section className="section services-section" id="services" aria-labelledby="services-title">
        <div className="shell">
          <div className="section-kicker"><span>02</span><p>Sheet index / Services</p></div>
          <div className="section-heading">
            <h2 id="services-title">The full set—every drawing a restaurant needs, and the paperwork that follows it.</h2>
            <p>Take the entire path or bring us in for the specific sheet that is holding the project up.</p>
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
          <div className="section-kicker light"><span>03</span><p>Choose the engagement</p></div>
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
          <div className="section-kicker"><span>04</span><p>Process / Five phases</p></div>
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
              <div className="section-kicker"><span>05</span><p>Representative drawing set</p></div>
              <h2 id="work-title">From the flat file.</h2>
            </div>
            <div className="work-controls" aria-label="Drawing set controls">
              <button type="button" onClick={() => moveWork(-1)} aria-label="Previous drawing">←</button>
              <button type="button" onClick={() => moveWork(1)} aria-label="Next drawing">→</button>
            </div>
          </div>
          <div className="work-track" ref={workRef} tabIndex={0}>
            {[
              ['A-401', 'The bar elevation', 'Millwork · Lighting · Service flow', 'bar-art'],
              ['K-210', 'The kitchen line', 'Equipment · Hood · Pass', 'kitchen-art'],
              ['A-520', 'The booth section', 'Comfort · Materials · Detail', 'booth-art'],
              ['C-001', 'The opening set', 'Coordination · Inspection · Punch', 'opening-art'],
            ].map(([number, title, meta, art]) => (
              <article className="work-card" key={number}>
                <div className={`diagram ${art}`} aria-hidden="true"><span /><span /><span /><span /></div>
                <div className="work-meta"><span>{number}</span><h3>{title}</h3><p>{meta}</p></div>
              </article>
            ))}
          </div>
          <p className="caption">Representative design studies shown in place of client-confidential work.</p>
        </div>
      </section>

      <section className="section faq-section" id="faq" aria-labelledby="faq-title">
        <div className="shell faq-grid">
          <div>
            <div className="section-kicker"><span>06</span><p>Field notes / FAQ</p></div>
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
            <div className="section-kicker light"><span>07</span><p>Start a project</p></div>
            <h2 id="contact-title">Bring the napkin sketch.<br />We&apos;ll bring the <em>drawing set.</em></h2>
            <p>Tell us where the project stands and what is getting in the way. We&apos;ll turn the essentials into a clean brief for your first conversation.</p>
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
            <button className="button button-paper" type="submit">{copied ? 'Brief copied — ready to share' : 'Prepare my project brief'} <span aria-hidden="true">↗</span></button>
            <p className="form-note">This copies a formatted brief to your clipboard. No information is sent or stored; connect the studio inbox when contact details are finalized.</p>
          </form>
        </div>
      </section>

      <footer>
        <div className="footer-title shell">
          <a className="wordmark" href="#top"><span className="brand-dot" aria-hidden="true" />Hospitality Concepts <span className="wordmark-detail">&amp; Design Services</span></a>
          <p>Hospitality design &amp; consulting<br />Concept · Design · Permit · Build · Open</p>
          <a href="#top">Back to top ↑</a>
        </div>
        <div className="footer-block">
          <span><small>Sheet</small>A-000 · Cover</span><span><small>Scale</small>NTS</span><span><small>Date</small>2026</span><span><small>Issued</small>For Review</span>
        </div>
      </footer>
    </main>
  );
}
