import React, { useState, useEffect, useRef, useCallback } from 'react';

// ===== DATA =====
const carsData = [
  { id:1, brand:'Porsche', name:'911 GT3 RS', price:'$249,900', priceNum:249, specs:['500 hp','0–60 in 3.0s','PDK 7-spd','Petrol'], category:'super', badge:'Limited', img:'https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80&auto=format&fit=crop' },
  { id:2, brand:'Ferrari', name:'F8 Tributo', price:'$276,550', priceNum:276, specs:['710 hp','0–60 in 2.9s','DCT 7-spd','Petrol'], category:'super', badge:'Hot', img:'https://images.unsplash.com/photo-1592198084033-aade902d1aae?w=800&q=80&auto=format&fit=crop' },
  { id:3, brand:'Bentley', name:'Continental GT', price:'$239,900', priceNum:239, specs:['626 hp','0–60 in 3.5s','DCT 8-spd','Petrol'], category:'luxury', badge:'New', img:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80&auto=format&fit=crop' },
  { id:4, brand:'Mercedes', name:'AMG GT Black', price:'$185,000', priceNum:185, specs:['720 hp','0–60 in 3.1s','Automatic','Petrol'], category:'sport', badge:'', img:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80&auto=format&fit=crop' },
  { id:5, brand:'Rolls-Royce', name:'Ghost EWB', price:'$489,000', priceNum:489, specs:['563 hp','0–60 in 4.8s','Auto 8-spd','Petrol'], category:'luxury', badge:'', img:'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=80&auto=format&fit=crop' },
  { id:6, brand:'Porsche', name:'Taycan Turbo S', price:'$187,200', priceNum:187, specs:['750 hp','0–60 in 2.6s','Auto','Electric'], category:'electric', badge:'New', img:'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80&auto=format&fit=crop' },
  { id:7, brand:'Lamborghini', name:'Huracán EVO', price:'$229,995', priceNum:229, specs:['631 hp','0–60 in 2.9s','DCT 7-spd','Petrol'], category:'super', badge:'Hot', img:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&auto=format&fit=crop' },
  { id:8, brand:'BMW', name:'M8 Competition', price:'$134,100', priceNum:134, specs:['617 hp','0–60 in 3.0s','M-DCT','Petrol'], category:'sport', badge:'', img:'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80&auto=format&fit=crop' },
  { id:9, brand:'Tesla', name:'Model S Plaid', price:'$108,990', priceNum:108, specs:['1020 hp','0–60 in 1.99s','Auto','Electric'], category:'electric', badge:'New', img:'https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80&auto=format&fit=crop' },
];

const galleryImgs = [
  { url:'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200&q=85&auto=format&fit=crop', label:'Lamborghini Huracán', wide:true },
  { url:'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&q=85&auto=format&fit=crop', label:'Ferrari Interior', tall:true },
  { url:'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=85&auto=format&fit=crop', label:'Bentley GT' },
  { url:'https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=85&auto=format&fit=crop', label:'Porsche Taycan' },
  { url:'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200&q=85&auto=format&fit=crop', label:'Mercedes AMG', wide:true },
  { url:'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=800&q=85&auto=format&fit=crop', label:'Rolls-Royce Ghost' },
];

const testimonials = [
  { name:'Alexander R.', car:'Porsche 911 GT3', text:'AutoLux made my dream car a reality. The entire process was seamless — from the first call to keys in hand. Truly exceptional service.', stars:5, initial:'A' },
  { name:'Sophia M.', car:'Bentley Continental GT', text:"I've bought cars from many dealerships, but none came close to AutoLux. The white-glove service is not just marketing — it's the reality.", stars:5, initial:'S' },
  { name:'James T.', car:'Ferrari F8 Tributo', text:'They sourced a rare spec Ferrari I had been hunting for 2 years. Delivered within a week. Absolutely phenomenal team.', stars:5, initial:'J' },
  { name:'Layla K.', car:'Rolls-Royce Ghost', text:'Effortless experience. My advisor knew every detail about the car. The financing was sorted in hours. Pure luxury from start to finish.', stars:5, initial:'L' },
  { name:'Marcus W.', car:'Tesla Model S Plaid', text:'Even for EVs they are unbeatable. Got the best deal and the delivery was incredibly fast. Will be back for the Cybertruck!', stars:5, initial:'M' },
  { name:'Priya S.', car:'Lamborghini Huracán', text:'As a first-time supercar buyer I was nervous, but the team made me feel completely at ease. Took the time to explain everything.', stars:5, initial:'P' },
];

const botReplies = {
  'inventory': 'We currently have 500+ premium vehicles in stock, including Porsche, Ferrari, Lamborghini, Bentley, Rolls-Royce and more. Scroll up to browse our featured collection! 🚗',
  'cars': 'We stock supercars, luxury sedans, electric performance cars and more. Brands include Porsche, Ferrari, Lamborghini, Rolls-Royce, Mercedes AMG, Bentley and BMW M. 💎',
  'price': "Our collection ranges from $85,000 to over $2M. We offer flexible financing starting from 0% APR with same-day approval. What's your budget?",
  'test drive': 'Absolutely! Test drives are available 7 days a week, 9am–9pm. Simply fill in the contact form or reply with your preferred date and we\'ll confirm within the hour. 🏎️',
  'book': 'To book a test drive, scroll to the Contact section at the bottom of the page, or tell me your name and preferred date and I\'ll take note! 📅',
  'financing': 'We offer bespoke financing packages: 0% APR for 12 months, extended terms up to 84 months, and same-day credit approval. Would you like to speak with our finance advisor?',
  'contact': 'You can reach us at: 📍 1 Automotive Blvd, Dubai | 📞 +971 4 000 0000 | ✉️ hello@autolux.com — we respond within 2 hours!',
  'delivery': 'We offer 48-hour delivery anywhere in the UAE. For international orders, we partner with white-glove global logistics firms.',
  'warranty': 'Every AutoLux vehicle comes with a comprehensive 3-year/unlimited-mileage warranty. Extended packages are available on request.',
  'hello': "Welcome to AutoLux! I'm your AI concierge. 🏆 How can I help you today? Ask about inventory, pricing, test drives, or financing.",
  'hi': 'Hello! Welcome to AutoLux — the world\'s most exclusive automotive destination. What can I help you with today? 🚗',
  'default': 'Great question! One of our luxury advisors can give you a detailed answer. You can also fill in the contact form below and we\'ll respond within 2 hours. Is there anything else I can help with? 😊',
};

function getBotReply(msg) {
  const lower = msg.toLowerCase();
  for (const [key, reply] of Object.entries(botReplies)) {
    if (lower.includes(key)) return reply;
  }
  return botReplies.default;
}

// ===== HOOK: Scroll Reveal =====
function useScrollReveal() {
  useEffect(() => {
    const observe = () => {
      const els = document.querySelectorAll('.reveal:not(.visible)');
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
        });
      }, { threshold: 0.12 });
      els.forEach(el => obs.observe(el));
    };
    observe();
    const timer = setInterval(observe, 500);
    return () => clearInterval(timer);
  }, []);
}

// ===== NAVBAR =====
function Navbar({ onNav }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  const handleNav = (id) => { onNav(id); setMobileOpen(false); };

  return (
    <>
      <nav className={`navbar${scrolled ? ' scrolled' : ''}`}>
        <div className="nav-logo">Auto<span>Lux</span></div>
        <ul className="nav-links">
          <li><a href="#inventory" onClick={e => { e.preventDefault(); handleNav('inventory'); }}>Inventory</a></li>
          <li><a href="#luxury" onClick={e => { e.preventDefault(); handleNav('luxury'); }}>Luxury Cars</a></li>
          <li><a href="#gallery" onClick={e => { e.preventDefault(); handleNav('gallery'); }}>Gallery</a></li>
          <li><a href="#contact" onClick={e => { e.preventDefault(); handleNav('contact'); }}>Contact</a></li>
        </ul>
        <button className="nav-cta" onClick={() => handleNav('contact')}>Book Test Drive</button>
        <div className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
          <span /><span /><span />
        </div>
      </nav>
      <div className={`mobile-nav${mobileOpen ? ' open' : ''}`}>
        <a href="#inventory" onClick={e => { e.preventDefault(); handleNav('inventory'); }}>Inventory</a>
        <a href="#luxury" onClick={e => { e.preventDefault(); handleNav('luxury'); }}>Luxury Cars</a>
        <a href="#gallery" onClick={e => { e.preventDefault(); handleNav('gallery'); }}>Gallery</a>
        <a href="#contact" onClick={e => { e.preventDefault(); handleNav('contact'); }}>Contact</a>
        <button className="btn-gold" onClick={() => handleNav('contact')}>Book Test Drive</button>
      </div>
    </>
  );
}

// ===== HERO =====
function Hero({ onNav }) {
  const bgRef = useRef(null);

  useEffect(() => {
    setTimeout(() => { if (bgRef.current) bgRef.current.classList.add('loaded'); }, 100);
    const handler = () => {
      const y = window.scrollY;
      if (bgRef.current && y < window.innerHeight) {
        bgRef.current.style.transform = `translateY(${y * 0.3}px) scale(1)`;
      }
    };
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero-bg" ref={bgRef} />
      <div className="hero-gradient" />
      <div className="hero-content">
        <div className="hero-tag">Premium Collection 2026</div>
        <h1>Experience Driving<br /><em>Like Never Before</em></h1>
        <p className="hero-sub">Curated luxury automobiles for those who demand the extraordinary. Performance, elegance, and prestige — all in one place.</p>
        <div className="hero-actions">
          <button className="btn-gold" onClick={() => onNav('inventory')}>Explore Cars</button>
          <button className="btn-outline" onClick={() => onNav('gallery')}>View Gallery</button>
        </div>
      </div>
      <div className="hero-numbers">
        <div className="hero-number-item">
          <div className="hni-num">01</div>
          <div className="hni-label">Wide Selection</div>
          <div className="hni-desc">Luxury to sport every taste served</div>
        </div>
        <div className="hero-number-item">
          <div className="hni-num">02</div>
          <div className="hni-label">Financing Made Easy</div>
          <div className="hni-desc">Flexible payment plans tailored for you</div>
        </div>
        <div className="hero-number-item">
          <div className="hni-num">03</div>
          <div className="hni-label">Test Drive Anytime</div>
          <div className="hni-desc">Experience before you commit</div>
        </div>
      </div>
    </section>
  );
}

// ===== SEARCH / FILTER =====
function SearchSection({ filters, setFilters, onSearch }) {
  return (
    <div className="search-section">
      <div className="search-inner">
        <div className="search-title">Find Your Perfect Car</div>
        <div className="search-form">
          <div className="search-field">
            <label className="search-label">Brand</label>
            <select className="search-select" value={filters.brand} onChange={e => setFilters(f => ({ ...f, brand: e.target.value }))}>
              <option value="">All Brands</option>
              {['Porsche','Lamborghini','Ferrari','Bentley','Mercedes','BMW','Rolls-Royce'].map(b => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="search-field">
            <label className="search-label">Price</label>
            <select className="search-select" value={filters.price} onChange={e => setFilters(f => ({ ...f, price: e.target.value }))}>
              <option value="">Any Price</option>
              <option value="100">Under $100K</option>
              <option value="200">Under $200K</option>
              <option value="500">Under $500K</option>
            </select>
          </div>
          <div className="search-field">
            <label className="search-label">Fuel Type</label>
            <select className="search-select" value={filters.fuel} onChange={e => setFilters(f => ({ ...f, fuel: e.target.value }))}>
              <option value="">Any</option>
              <option>Petrol</option>
              <option>Electric</option>
              <option>Hybrid</option>
            </select>
          </div>
          <div className="search-field">
            <label className="search-label">Transmission</label>
            <select className="search-select" value={filters.trans} onChange={e => setFilters(f => ({ ...f, trans: e.target.value }))}>
              <option value="">Any</option>
              <option>Automatic</option>
              <option>Manual</option>
              <option>PDK</option>
            </select>
          </div>
          <button className="search-btn" onClick={onSearch}>Search</button>
        </div>
      </div>
    </div>
  );
}

// ===== CAR CARD =====
function CarCard({ car, onOpen }) {
  return (
    <div className="car-card reveal" onClick={() => onOpen(car.img, `${car.brand} ${car.name}`)}>
      <div className="car-img-wrap">
        <img src={car.img} alt={car.name} loading="lazy" />
        {car.badge && <div className={`car-badge ${car.badge === 'New' ? 'new' : car.badge === 'Hot' ? 'hot' : ''}`}>{car.badge}</div>}
      </div>
      <div className="car-body">
        <div className="car-brand">{car.brand}</div>
        <div className="car-name">{car.name}</div>
        <div className="car-specs">
          {car.specs.map(s => (
            <div className="car-spec" key={s}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <polyline points="20 6 9 17 4 12" />
              </svg>
              {s}
            </div>
          ))}
        </div>
        <div className="car-footer">
          <div>
            <div className="car-price">{car.price}</div>
            <div className="car-price-sub">Starting price</div>
          </div>
          <button className="car-action" onClick={e => { e.stopPropagation(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>→</button>
        </div>
      </div>
    </div>
  );
}

// ===== INVENTORY =====
function Inventory({ filters, onOpenLightbox, onNav }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const categories = [{ key:'all', label:'All Models' }, { key:'super', label:'Supercars' }, { key:'luxury', label:'Luxury' }, { key:'electric', label:'Electric' }, { key:'sport', label:'Sport' }];

  const filtered = carsData.filter(c => {
    if (activeCategory !== 'all' && c.category !== activeCategory) return false;
    if (filters.brand && !c.brand.toLowerCase().includes(filters.brand.toLowerCase())) return false;
    if (filters.price && c.priceNum > parseInt(filters.price)) return false;
    if (filters.fuel && !c.specs.some(s => s.toLowerCase().includes(filters.fuel.toLowerCase()))) return false;
    if (filters.trans && !c.specs.some(s => s.toLowerCase().includes(filters.trans.toLowerCase()))) return false;
    return true;
  });

  return (
    <section className="section featured-bg" id="inventory">
      <div className="section-label">Our Collection</div>
      <h2 className="section-title">Featured Vehicles</h2>
      <p className="section-sub">Handpicked luxury automobiles representing the pinnacle of automotive engineering.</p>
      <div className="cars-filter">
        {categories.map(cat => (
          <button key={cat.key} className={`filter-btn${activeCategory === cat.key ? ' active' : ''}`} onClick={() => setActiveCategory(cat.key)}>{cat.label}</button>
        ))}
      </div>
      <div className="cars-grid">
        {filtered.length === 0
          ? <p style={{ color:'var(--muted)', gridColumn:'1/-1', textAlign:'center', padding:'48px 0' }}>No vehicles match your criteria. <button style={{ color:'var(--gold)', background:'none', border:'none', cursor:'pointer' }} onClick={() => setActiveCategory('all')}>Clear filters</button></p>
          : filtered.map(car => <CarCard key={car.id} car={car} onOpen={onOpenLightbox} />)
        }
      </div>
    </section>
  );
}

// ===== LUXURY HIGHLIGHT =====
function LuxurySection() {
  return (
    <section className="section luxury" id="luxury">
      <div className="luxury-inner">
        <div className="reveal">
          <div className="luxury-img-wrap">
            <img src="https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=900&q=85&auto=format&fit=crop" alt="Luxury Car Interior" />
            <div className="luxury-img-overlay" />
            <div className="luxury-badge">
              <div className="luxury-badge-num">500+</div>
              <div className="luxury-badge-text">Premium Vehicles</div>
            </div>
          </div>
        </div>
        <div className="reveal reveal-delay-2">
          <div className="section-label">Why AutoLux</div>
          <h2 className="section-title">Luxury <em style={{ fontStyle:'italic', color:'var(--gold)' }}>Redefined</em></h2>
          <p className="section-sub">We don't just sell cars. We curate automotive experiences that become chapters in the story of your life.</p>
          <div className="luxury-features">
            {[
              { icon:'🏆', title:'Award-Winning Curation', text:'Every vehicle in our collection passes a 200-point inspection by certified master technicians.' },
              { icon:'🛡️', title:'3-Year Comprehensive Warranty', text:'Drive with confidence knowing every AutoLux vehicle comes fully protected.' },
              { icon:'🤝', title:'White-Glove Concierge', text:'From test drive to delivery, your dedicated advisor handles every detail.' },
            ].map(f => (
              <div className="luxury-feature" key={f.title}>
                <div className="luxury-feature-icon">{f.icon}</div>
                <div>
                  <div className="luxury-feature-title">{f.title}</div>
                  <div className="luxury-feature-text">{f.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== WHY CHOOSE US =====
function WhySection() {
  const cards = [
    { icon:'🚗', title:'500+ Premium Models', text:'The largest curated collection of luxury and exotic automobiles in the region.' },
    { icon:'⚡', title:'48-Hour Delivery', text:'Your dream car, delivered to your doorstep within 48 hours of purchase.' },
    { icon:'💎', title:'Certified Authentic', text:'Every vehicle verified with full provenance history and authenticity certificates.' },
    { icon:'🏦', title:'Flexible Financing', text:'Bespoke finance packages starting from 0% APR with same-day approval.' },
    { icon:'🔧', title:'Expert Service', text:'Factory-trained technicians specializing in every marque we carry.' },
    { icon:'🌍', title:'Global Sourcing', text:'We source rare and limited editions from auctions and estates worldwide.' },
  ];
  return (
    <section className="section why">
      <div style={{ textAlign:'center', maxWidth:'600px', margin:'0 auto 56px' }}>
        <div className="section-label" style={{ justifyContent:'center' }}>Our Advantage</div>
        <h2 className="section-title">Why Choose AutoLux</h2>
        <p className="section-sub" style={{ margin:'0 auto' }}>Trusted by thousands of discerning drivers. Here's what makes us extraordinary.</p>
      </div>
      <div className="why-grid">
        {cards.map((c, i) => (
          <div className={`why-card reveal${i > 0 ? ` reveal-delay-${i}` : ''}`} key={c.title}>
            <span className="why-icon">{c.icon}</span>
            <div className="why-title">{c.title}</div>
            <div className="why-text">{c.text}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== COMPARISON TABLE =====
function ComparisonSection() {
  const rows = [
    ['Engine', '4.0L Flat-6', '3.9L Twin-Turbo V8', '5.2L V10', '4.0L Twin-Turbo V8'],
    ['Horsepower', '502 hp', '710 hp', '631 hp', '710 hp'],
    ['0–60 mph', '3.2s', '2.9s', '2.9s', '2.8s'],
    ['Top Speed', '197 mph', '211 mph', '202 mph', '212 mph'],
    ['Transmission', null, null, null, null],
    ['Carbon Ceramics', true, true, true, true],
    ['Launch Control', true, true, true, true],
    ['Track Mode', true, true, false, true],
    ['Starting Price', '$169,900', '$276,550', '$229,995', '$299,000'],
  ];
  const trans = ['PDK 7-spd', 'DCT 7-spd', 'DCT 7-spd', 'SSG 7-spd'];
  const headers = ['Feature', 'Porsche 911 GT3', 'Ferrari F8', 'Lamborghini Huracán', 'McLaren 720S'];

  const renderCell = (val, rowIndex, colIndex) => {
    if (rowIndex === 4) return <span className="comp-tag">{trans[colIndex - 1]}</span>;
    if (rowIndex === 8) return <span style={{ color:'var(--gold)', fontWeight:600 }}>{val}</span>;
    if (typeof val === 'boolean') return val ? <span className="check">✓</span> : <span className="cross">✗</span>;
    return val;
  };

  return (
    <section className="section comparison">
      <div className="section-label">Head to Head</div>
      <h2 className="section-title">Compare Models</h2>
      <p className="section-sub">See how our top picks stack up against each other.</p>
      <div className="comp-table-wrap">
        <table className="comp-table">
          <thead>
            <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri}>
                <td className="feature-col">{['Engine','Horsepower','0–60 mph','Top Speed','Transmission','Carbon Ceramics','Launch Control','Track Mode','Starting Price'][ri]}</td>
                {[1,2,3,4].map(ci => <td key={ci}>{renderCell(row[ci], ri, ci)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

// ===== GALLERY =====
function GallerySection({ onOpen }) {
  return (
    <section className="section gallery" id="gallery">
      <div className="section-label">Visual Stories</div>
      <h2 className="section-title">Our Gallery</h2>
      <p className="section-sub">Breathtaking photography of the world's most extraordinary automobiles.</p>
      <div className="gallery-grid">
        {galleryImgs.map(g => (
          <div key={g.label} className={`gallery-item${g.wide ? ' wide' : ''}${g.tall ? ' tall' : ''}`} onClick={() => onOpen(g.url, g.label)}>
            <img src={g.url} alt={g.label} loading="lazy" />
            <div className="gallery-item-overlay">
              <div className="gallery-item-label">{g.label}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== TESTIMONIALS =====
function TestimonialsSection() {
  return (
    <section className="section testimonials">
      <div style={{ textAlign:'center', maxWidth:'600px', margin:'0 auto 56px' }}>
        <div className="section-label" style={{ justifyContent:'center' }}>Client Stories</div>
        <h2 className="section-title">What Our Clients Say</h2>
      </div>
      <div className="testi-grid">
        {testimonials.map(t => (
          <div className="testi-card reveal" key={t.name}>
            <div className="testi-quote">"</div>
            <div className="testi-text">{t.text}</div>
            <div className="testi-author">
              <div className="testi-avatar">{t.initial}</div>
              <div>
                <div className="testi-stars">{'★'.repeat(t.stars)}</div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-car">{t.car}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ===== CTA =====
function CtaSection({ onNav }) {
  return (
    <section className="cta-section">
      <div className="cta-bg" />
      <div className="cta-inner">
        <div className="cta-label">Limited Availability</div>
        <h2 className="cta-title">Ready to Drive<br /><em style={{ color:'var(--gold)', fontStyle:'italic' }}>Your Dream Car?</em></h2>
        <p className="cta-sub">Book a private test drive today. No obligation. Just pure automotive bliss.</p>
        <div style={{ display:'flex', gap:'16px', justifyContent:'center', flexWrap:'wrap' }}>
          <button className="btn-gold" onClick={() => onNav('contact')}>Book Now — It's Free</button>
          <button className="btn-outline" onClick={() => onNav('inventory')}>Browse Collection</button>
        </div>
      </div>
    </section>
  );
}

// ===== CONTACT =====
function ContactSection() {
  const [form, setForm] = useState({ fname:'', lname:'', femail:'', fcar:'Porsche 911 GT3', fmessage:'' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (!form.fname || !form.femail) { alert('Please fill in your name and email.'); return; }
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <section className="section contact" id="contact">
      <div className="section-label">Get In Touch</div>
      <h2 className="section-title">Visit Us</h2>
      <div className="contact-inner">
        <div>
          <p className="section-sub">Our luxury advisors are ready to help you find the perfect vehicle. Visit our showroom or reach out directly.</p>
          {[
            { icon:'📍', title:'Tehreem Ali', text:'1 Automotive Boulevard,\nDubai, FA23 125' },
            { icon:'📞', title:'Phone', text:'+971 4 000 0000\nAvailable 9am – 9pm daily' },
            { icon:'✉️', title:'Email', text:'hello@autolux.com' },
          ].map(info => (
            <div className="contact-info-item" key={info.title}>
              <div className="contact-info-icon">{info.icon}</div>
              <div>
                <div className="contact-info-title">{info.title}</div>
                <div className="contact-info-text">{info.text.split('\n').map((line, i) => <span key={i}>{line}{i === 0 && info.text.includes('\n') ? <br /> : ''}</span>)}</div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="contact-form">
            <div className="form-row">
              <div className="form-field">
                <label className="form-label">First Name</label>
                <input type="text" className="form-input" placeholder="Tehreem" value={form.fname} onChange={e => setForm(f => ({ ...f, fname: e.target.value }))} />
              </div>
              <div className="form-field">
                <label className="form-label">Last Name</label>
                <input type="text" className="form-input" placeholder="Ali" value={form.lname} onChange={e => setForm(f => ({ ...f, lname: e.target.value }))} />
              </div>
            </div>
            <div className="form-field">
              <label className="form-label">Email</label>
              <input type="email" className="form-input" placeholder="james@example.com" value={form.femail} onChange={e => setForm(f => ({ ...f, femail: e.target.value }))} />
            </div>
            <div className="form-field">
              <label className="form-label">Car of Interest</label>
              <select className="form-input search-select" value={form.fcar} onChange={e => setForm(f => ({ ...f, fcar: e.target.value }))}>
                {['Porsche 911 GT3','Ferrari F8 Tributo','Lamborghini Huracán EVO','Bentley Continental GT','Rolls-Royce Ghost','Other / Not Sure Yet'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-field">
              <label className="form-label">Message</label>
              <textarea className="form-textarea" rows="4" placeholder="Tell us what you're looking for..." value={form.fmessage} onChange={e => setForm(f => ({ ...f, fmessage: e.target.value }))} />
            </div>
            <button className="btn-gold" style={{ width:'100%', padding:'16px' }} onClick={handleSubmit}>Send Message</button>
            {submitted && <div style={{ fontSize:'0.8rem', color:'#00c896', textAlign:'center', marginTop:'8px' }}>✓ Message sent! We'll be in touch within 2 hours.</div>}
          </div>
        </div>
      </div>
    </section>
  );
}

// ===== FOOTER =====
function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = () => {
    if (!email) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <footer className="footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <div className="nav-logo" style={{ fontSize:'1.5rem' }}>Auto<span>Lux</span></div>
          <p>The world's most exclusive automotive destination. Curating extraordinary vehicles for extraordinary people since 2010.</p>
          <div className="footer-social">
            {['𝕏', 'in', '📸', '▶'].map(s => <button className="social-btn" key={s}>{s}</button>)}
          </div>
        </div>
        <div>
          <div className="footer-col-title">Explore</div>
          <div className="footer-links">
            {['Inventory','Luxury Cars','Gallery','Contact','Financing'].map(l => <a href={`#${l.toLowerCase().replace(' ','-')}`} key={l}>{l}</a>)}
          </div>
        </div>
        <div>
          <div className="footer-col-title">Services</div>
          <div className="footer-links">
            {['Test Drives','Trade-In','Car Care','Insurance','Concierge'].map(l => <a href="#" key={l}>{l}</a>)}
          </div>
        </div>
        <div className="footer-newsletter">
          <div className="footer-col-title">Newsletter</div>
          <p style={{ fontSize:'0.82rem', color:'var(--muted)', marginBottom:'4px' }}>Be first to know about new arrivals and exclusive events.</p>
          <div className="newsletter-input-wrap">
            <input className="newsletter-input" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} />
            <button className="newsletter-btn" onClick={handleSubscribe}>→</button>
          </div>
          {subscribed && <div style={{ fontSize:'0.72rem', color:'#00c896', marginTop:'8px' }}>✓ You're on the list!</div>}
        </div>
      </div>
      <div className="footer-bottom">
        <span>© 2026 AutoLux. All rights reserved.</span>
        <span>Privacy Policy · Terms · Cookie Policy</span>
      </div>
    </footer>
  );
}

// ===== CHATBOT =====
function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const msgsRef = useRef(null);

  const addMsg = useCallback((text, type) => {
    setMessages(prev => [...prev, { text, type, id: Date.now() + Math.random() }]);
  }, []);

  const toggle = () => {
    setOpen(o => {
      if (!o && messages.length === 0) {
        setTimeout(() => addMsg(botReplies['hello'], 'bot'), 100);
      }
      return !o;
    });
  };

  const send = () => {
    if (!input.trim()) return;
    addMsg(input, 'user');
    const reply = getBotReply(input);
    setInput('');
    setTimeout(() => addMsg(reply, 'bot'), 600);
  };

  const quickAsk = (q) => {
    addMsg(q, 'user');
    setTimeout(() => addMsg(getBotReply(q), 'bot'), 600);
  };

  useEffect(() => {
    if (msgsRef.current) msgsRef.current.scrollTop = msgsRef.current.scrollHeight;
  }, [messages]);

  return (
    <>
      <button className="chatbot-btn" onClick={toggle}>{open ? '✕' : '💬'}</button>
      <div className={`chatbot-window${open ? ' open' : ''}`}>
        <div className="chatbot-header">
          <div className="chatbot-avatar">🤖</div>
          <div>
            <div className="chatbot-name">AutoLux AI</div>
            <div className="chatbot-status">● Online</div>
          </div>
          <button className="chatbot-close" onClick={toggle}>✕</button>
        </div>
        <div className="chatbot-messages" ref={msgsRef}>
          {messages.map(m => <div key={m.id} className={`chat-msg ${m.type}`}>{m.text}</div>)}
        </div>
        <div className="chat-quick-btns">
          {[['What cars do you have?','Our inventory'],['Book a test drive','Test drive'],['Financing options','Financing'],['Contact details','Contact']].map(([q, label]) => (
            <button key={label} className="chat-quick" onClick={() => quickAsk(q)}>{label}</button>
          ))}
        </div>
        <div className="chatbot-input-wrap">
          <input className="chatbot-input" placeholder="Ask me anything..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()} />
          <button className="chatbot-send" onClick={send}>Send</button>
        </div>
      </div>
    </>
  );
}

// ===== LIGHTBOX =====
function Lightbox({ src, alt, onClose }) {
  useEffect(() => {
    const handler = e => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  if (!src) return null;
  return (
    <div className={`lightbox${src ? ' open' : ''}`} onClick={onClose}>
      <button className="lightbox-close" onClick={onClose}>✕</button>
      <img className="lightbox-img" src={src} alt={alt} onClick={e => e.stopPropagation()} />
    </div>
  );
}

// ===== APP =====
export default function App() {
  const [filters, setFilters] = useState({ brand:'', price:'', fuel:'', trans:'' });
  const [lightbox, setLightbox] = useState({ src:'', alt:'' });

  useScrollReveal();

  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'start' });
  };

  const openLightbox = (src, alt) => setLightbox({ src, alt });
  const closeLightbox = () => setLightbox({ src:'', alt:'' });

  return (
    <div>
      <Navbar onNav={scrollToSection} />
      <Hero onNav={scrollToSection} />
      <SearchSection filters={filters} setFilters={setFilters} onSearch={() => scrollToSection('inventory')} />
      <Inventory filters={filters} onOpenLightbox={openLightbox} onNav={scrollToSection} />
      <LuxurySection />
      <WhySection />
      <ComparisonSection />
      <GallerySection onOpen={openLightbox} />
      <TestimonialsSection />
      <CtaSection onNav={scrollToSection} />
      <ContactSection />
      <Footer />
      <Chatbot />
      <Lightbox src={lightbox.src} alt={lightbox.alt} onClose={closeLightbox} />
    </div>
  );
}
