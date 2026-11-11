/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef, useState } from 'react';
import { X, Check, ArrowRight, Menu } from 'lucide-react';

interface Specialty {
  id: string;
  title: string;
  description: string;
  leadPhysician: string;
  credentials: string;
  diagnosticCapabilities: string[];
  clinicalOutcome: string;
  delayClass?: string;
}

const SPECIALTIES: Specialty[] = [
  {
    id: 'Maternal & Antenatal Care',
    title: 'Maternal & Antenatal',
    description:
      'Consultant-led pregnancy care, high-resolution fetal medicine, and serene private birthing suites designed around maternal safety and dignity.',
    leadPhysician: 'Dr. Adesuwa Adebayo, MBBS, FRCOG, FMCOG',
    credentials: 'Lead Consultant Obstetrician & Maternal-Fetal Medicine Specialist (UK & Nigeria)',
    diagnosticCapabilities: [
      'Unrushed Consultant-Led Antenatal & High-Risk Pregnancy Clinics',
      '4D Fetal Echocardiography, Anomaly Scans & Non-Invasive Prenatal Testing (NIPT)',
      'Private Sanctuary Birthing Suites with 24/7 Consultant Obstetric & Anaesthetic Cover',
    ],
    clinicalOutcome: '1-to-1 specialist midwifery care with immediate on-site Neonatal ICU backup.',
  },
  {
    id: 'Fertility & IVF Support',
    title: 'Fertility & IVF',
    description:
      'Discreet, evidence-based reproductive medicine, assisted conception, and fertility preservation tailored to every couple’s journey.',
    leadPhysician: 'Dr. Olumide Balogun, MBBS, MRCOG, MSc (Oxon)',
    credentials: 'Director of Reproductive Endocrinology & Clinical Embryology',
    diagnosticCapabilities: [
      'Complete Couple Fertility Workup, AMH Mapping & Tubal Patency HyCoSy',
      'In-Vitro Fertilization (IVF), ICSI & Pre-Implantation Genetic Testing (PGT-A)',
      'Egg Freezing, Cycle Monitoring & Male Factor Microsurgical Fertility Care',
    ],
    clinicalOutcome: 'Internationally benchmarked cleanroom embryology lab with transparent cycle success rates.',
    delayClass: 'delay-100',
  },
  {
    id: 'Minimally Invasive Fibroid Care',
    title: 'Fibroid & Gynaecology',
    description:
      'Advanced keyhole and fertility-preserving fibroid, endometriosis, and gynaecological procedures with minimal hospital stay.',
    leadPhysician: 'Dr. Ngozi Okafor, MD, FACOG, FWACS',
    credentials: 'Head of Minimally Invasive & Fertility-Sparing Gynaecological Surgery',
    diagnosticCapabilities: [
      'Fertility-Preserving Laparoscopic & Hysteroscopic Myomectomy',
      'High-Definition Pelvic MRI Fibroid Mapping & Non-Surgical Uterine Embolization',
      'Specialist Endometriosis, Ovarian Cyst & Menstrual Disorder Management',
    ],
    clinicalOutcome: 'Over 85% of procedures performed via keyhole technique with 48-hour recovery discharge.',
    delayClass: 'delay-200',
  },
  {
    id: 'Pediatrics & Neonatal Care',
    title: 'Paediatrics & Neonatal',
    description:
      'Dedicated newborn intensive care, childhood immunization schedules, and developmental paediatrics from birth through adolescence.',
    leadPhysician: 'Dr. Tunde Kazeem, MBBS, FWACP (Paed), FRCPCH',
    credentials: 'Chief of Neonatology & Developmental Paediatrics',
    diagnosticCapabilities: [
      '24-Hour Level-III Neonatal Intensive Care Unit (NICU) for Preterm & Newborn Care',
      'Nigerian & International (UK/US) Childhood Immunization & Travel Vaccines',
      'Newborn Genotype, Metabolic Screening & Early Developmental Assessments',
    ],
    clinicalOutcome: 'Direct paediatrician access for parents and seamless continuity from the delivery suite.',
  },
  {
    id: 'Well-Woman Diagnostics',
    title: 'Well-Woman Screening',
    description:
      'Comprehensive preventative breast, cervical, hormonal, and metabolic screening completed in a single calm visit.',
    leadPhysician: 'Dr. Halima Danjuma, MBBS, MPH, FMCR',
    credentials: 'Director of Women’s Preventative Imaging & Breast Diagnostics',
    diagnosticCapabilities: [
      'Low-Dose 3D Digital Mammography, Breast Ultrasound & Same-Day Radiologist Review',
      'Liquid-Based Cervical Cytology (Pap Smear), HPV DNA Typing & Video Colposcopy',
      'Comprehensive Thyroid, Perimenopause, Bone Density & Cardiometabolic Panels',
    ],
    clinicalOutcome: 'Complete Well-Woman diagnostic report reviewed with your consultant in under 3 hours.',
    delayClass: 'delay-100',
  },
  {
    id: 'Postpartum & Fourth Trimester',
    title: 'Postpartum Sanctuary',
    description:
      'Restorative fourth-trimester maternal recovery, lactation support, and pelvic rehabilitation for new mothers and babies.',
    leadPhysician: 'Dr. Chidinma Eze, MBBS, DRCOG, IBCLC',
    credentials: 'Consultant in Postnatal Recovery, Maternal Wellness & Lactation Medicine',
    diagnosticCapabilities: [
      'Private Postpartum Recovery Suites with 24/7 Nursery & Lactation Specialist Care',
      'Pelvic Floor Physiotherapy, C-Section Scar Healing & Core Restoration',
      'Postnatal Nutritional Replenishment, Iron Optimization & Emotional Wellness Care',
    ],
    clinicalOutcome: 'Structured 12-week fourth-trimester support programme for mother and infant.',
    delayClass: 'delay-200',
  },
];

type PolicyModalType = 'privacy' | 'terms' | null;

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSpecialty, setActiveSpecialty] = useState<Specialty | null>(null);
  const [policyModal, setPolicyModal] = useState<PolicyModalType>(null);

  // Image fallback states
  const [heroImgFailed, setHeroImgFailed] = useState(false);
  const [portraitImgFailed, setPortraitImgFailed] = useState(false);
  const [backdropImgFailed, setBackdropImgFailed] = useState(false);

  // Consultation form state
  const [fullName, setFullName] = useState('');
  const [phoneOrEmail, setPhoneOrEmail] = useState('');
  const [preferredLocation, setPreferredLocation] = useState('Victoria Island, Lagos');
  const [selectedSpecialty, setSelectedSpecialty] = useState('');
  const [formError, setFormError] = useState('');
  const [submittedData, setSubmittedData] = useState<{
    name: string;
    contact: string;
    location: string;
    specialty: string;
    referenceId: string;
  } | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-on-scroll-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[data-animation-on-scroll]');
    elements.forEach((el) => {
      el.classList.add('animate-on-scroll-hidden');
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleConsultSpecialty = (specialtyTitle: string) => {
    setSelectedSpecialty(specialtyTitle);
    setActiveSpecialty(null);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const trimmedName = fullName.trim();
    const trimmedContact = phoneOrEmail.trim();

    if (!trimmedName) {
      setFormError('Please enter your full name.');
      return;
    }
    const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedContact);
    const isPhone = /^[+\d][\d\s-]{6,18}$/.test(trimmedContact);
    if (!trimmedContact || (!isEmail && !isPhone)) {
      setFormError('Please enter a valid Nigerian/international phone number or email address.');
      return;
    }

    const specialtyChoice =
      selectedSpecialty && selectedSpecialty !== 'Select Care Pathway'
        ? selectedSpecialty
        : 'Maternal & Antenatal Care';

    const refCode = `VH-NG-${Math.floor(100000 + Math.random() * 900000)}`;
    setSubmittedData({
      name: trimmedName,
      contact: trimmedContact,
      location: preferredLocation,
      specialty: specialtyChoice,
      referenceId: refCode,
    });
    setFullName('');
    setPhoneOrEmail('');
    setSelectedSpecialty('');
  };

  return (
    <div
      ref={containerRef}
      className="font-secondary bg-neutral-background text-text-primary overflow-x-hidden min-h-screen flex flex-col w-full relative"
    >
      {/* Top Navigation Header */}
      <header
        id="main-header"
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/95 backdrop-blur-md border-b border-black/5 ${
          isScrolled ? 'py-1 shadow-md' : ''
        }`}
      >
        <nav
          data-editable="header"
          className={`max-w-[1500px] mx-auto px-8 flex items-center justify-between gap-8 transition-all duration-300 ${
            isScrolled ? 'py-2' : 'py-4'
          }`}
        >
          <a
            data-editable="text"
            data-path="header.logo.text"
            className="font-primary text-lg font-bold tracking-[2px] text-brand-primary uppercase whitespace-nowrap shrink-0"
            href="#hero"
          >
            Vanguard <span className="font-light italic lowercase">Sanctuary</span>
          </a>

          <div
            className="hidden md:flex items-center gap-12"
            data-editable-list="header.navLinks"
          >
            <a
              data-editable="text"
              data-path="header.navLinks[0].text"
              className="text-xs font-bold tracking-widest text-brand-primary/70 hover:text-brand-primary transition-colors whitespace-nowrap shrink-0"
              href="#hero"
            >
              SANCTUARY
            </a>
            <a
              data-editable="text"
              data-path="header.navLinks[1].text"
              className="text-xs font-bold tracking-widest text-brand-primary/70 hover:text-brand-primary transition-colors whitespace-nowrap shrink-0"
              href="#philosophy"
            >
              OUR PROMISE
            </a>
            <a
              data-editable="text"
              data-path="header.navLinks[2].text"
              className="text-xs font-bold tracking-widest text-brand-primary/70 hover:text-brand-primary transition-colors whitespace-nowrap shrink-0"
              href="#specialties"
            >
              CARE PATHWAYS
            </a>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <a
              href="#contact"
              className="border border-brand-primary/20 text-brand-primary px-6 py-1.5 text-xs tracking-widest hover:bg-brand-primary hover:text-white transition-all duration-300 uppercase font-bold whitespace-nowrap shrink-0"
            >
              Book Private Visit
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-brand-primary hover:bg-brand-grey transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </nav>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-black/5 px-8 py-6 space-y-4">
            <a
              href="#hero"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold tracking-widest text-brand-primary/80 hover:text-brand-primary py-2"
            >
              SANCTUARY
            </a>
            <a
              href="#philosophy"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold tracking-widest text-brand-primary/80 hover:text-brand-primary py-2"
            >
              OUR PROMISE
            </a>
            <a
              href="#specialties"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-xs font-bold tracking-widest text-brand-primary/80 hover:text-brand-primary py-2"
            >
              CARE PATHWAYS
            </a>
          </div>
        )}
      </header>

      <main className="flex-grow">
        {/* Hero Section */}
        <section
          id="hero"
          className="relative w-full h-screen min-h-[750px] flex items-stretch overflow-hidden"
        >
          <div className="absolute inset-0 z-0 bg-brand-primary">
            {!heroImgFailed ? (
              <img
                src="/src/assets/images/hero_maternal_sanctuary_lagos_1794314328541.jpg"
                alt="Consultant OB-GYN speaking warmly with an expectant mother in our Victoria Island sanctuary suite"
                referrerPolicy="no-referrer"
                onError={() => setHeroImgFailed(true)}
                className="w-full h-full object-cover animate-fade-in"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-brand-primary via-slate-900 to-brand-primary" />
            )}
            <div className="absolute inset-0 bg-black/15"></div>
          </div>

          <div className="relative z-10 w-full flex flex-col lg:flex-row">
            <div className="hidden lg:block lg:w-1/2"></div>
            <div className="w-full lg:w-1/2 bg-brand-overlay backdrop-blur-sm h-full flex flex-col justify-center px-8 md:px-20 lg:px-24 xl:px-32 animate-slide-right-full">
              <div className="max-w-[520px]">
                <p
                  className="text-[10px] font-bold tracking-[4px] text-white/70 uppercase mb-4 animate-on-scroll-hidden"
                  data-animation-on-scroll=""
                >
                  Victoria Island, Lagos · Maitama, Abuja
                </p>
                <div
                  className="h-[1px] w-12 bg-white/40 mb-8 animate-on-scroll-hidden"
                  data-animation-on-scroll=""
                ></div>

                <h1
                  className="font-primary text-[42px] md:text-[58px] leading-[1.12] text-white mb-8 tracking-widest-custom"
                  data-editable="text"
                  data-path="hero.heading"
                >
                  <span
                    className="font-bold block uppercase animate-on-scroll-hidden"
                    data-animation-on-scroll=""
                  >
                    Every Stage
                  </span>
                  <span
                    className="font-light block italic animate-on-scroll-hidden delay-100"
                    data-animation-on-scroll=""
                  >
                    Safely Guided
                  </span>
                </h1>

                <p
                  className="font-secondary text-lg md:text-xl leading-relaxed text-white/90 mb-10 font-light animate-on-scroll-hidden delay-200"
                  data-editable="text"
                  data-path="hero.subheading"
                  data-animation-on-scroll=""
                >
                  Consultant-led maternity, fertility, fibroid, and paediatric care in a serene
                  Nigerian sanctuary built around your safety, comfort, and dignity—without having
                  to travel abroad.
                </p>

                <div
                  className="flex flex-col sm:flex-row gap-6 animate-on-scroll-hidden delay-300"
                  data-animation-on-scroll=""
                >
                  <a
                    href="#specialties"
                    className="bg-white text-brand-primary px-10 py-4 font-bold text-xs tracking-[2px] hover:bg-white/90 transition-all text-center whitespace-nowrap"
                  >
                    EXPLORE CARE PATHWAYS
                  </a>
                  <a
                    href="#contact"
                    className="border border-white/40 text-white px-10 py-4 font-bold text-xs tracking-[2px] hover:bg-white hover:text-brand-primary transition-all text-center whitespace-nowrap"
                  >
                    SPEAK WITH A CONSULTANT
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Split Philosophy Section */}
        <section id="philosophy" className="py-24 md:py-32 bg-white">
          <div className="max-w-[1500px] mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
              <div data-animation-on-scroll="" className="slide-left">
                <p className="text-[10px] font-bold tracking-[4px] text-brand-primary/40 uppercase mb-4">
                  The Sanctuary Standard
                </p>
                <h2 className="font-primary text-4xl md:text-5xl lg:text-6xl text-brand-primary leading-tight mb-8">
                  Maternal Excellence, <br />
                  <span className="italic font-light">Closer to Home</span>
                </h2>
                <div className="h-[1px] w-16 bg-brand-primary/20 mb-8"></div>
                <p className="text-text-secondary font-light text-lg leading-relaxed mb-8">
                  For years, Nigerian families have flown to London or Houston for peace of mind
                  during pregnancy, fertility treatment, and complex gynaecological care. At
                  Vanguard Sanctuary, we bring UK- and US-board-certified consultants, neonatal
                  intensive backup, and calm hospitality right to Lagos and Abuja—so you are
                  surrounded by family while receiving world-class clinical care.
                </p>
                <ul className="space-y-6">
                  <li className="flex items-start gap-4">
                    <span className="w-6 h-[1px] bg-brand-primary mt-3 shrink-0"></span>
                    <div>
                      <h4 className="font-bold text-xs tracking-widest uppercase mb-1">
                        100% Consultant-Led Care
                      </h4>
                      <p className="text-sm text-text-secondary font-light">
                        Every antenatal checkup, delivery, fertility protocol, and surgical
                        procedure is personally led by a senior fellowship-trained consultant.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-4">
                    <span className="w-6 h-[1px] bg-brand-primary mt-3 shrink-0"></span>
                    <div>
                      <h4 className="font-bold text-xs tracking-widest uppercase mb-1">
                        Dignity, Privacy & Calm Recovery
                      </h4>
                      <p className="text-sm text-text-secondary font-light">
                        Private appointment scheduling with zero crowded waiting rooms, sound-insulated
                        birthing suites, and 24-hour specialist neonatal and anaesthetic readiness.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="relative" data-animation-on-scroll="">
                <div className="aspect-[4/5] bg-brand-grey overflow-hidden shadow-2xl">
                  {!portraitImgFailed ? (
                    <img
                      src="/src/assets/images/specialist_portrait_obgyn_lagos_1794314329087.jpg"
                      alt="Dr. Adesuwa Adebayo, Lead Consultant OB-GYN at Vanguard Sanctuary Lagos"
                      referrerPolicy="no-referrer"
                      onError={() => setPortraitImgFailed(true)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-brand-grey flex items-center justify-center p-8 text-center">
                      <span className="font-primary text-sm uppercase tracking-widest text-brand-primary/60">
                        Dr. Adesuwa Adebayo · Lead Consultant OB-GYN
                      </span>
                    </div>
                  )}
                </div>
                <div
                  className="absolute -bottom-12 -left-12 bg-brand-primary p-12 hidden md:block zoom-out"
                  data-animation-on-scroll=""
                >
                  <p className="text-white text-5xl font-primary font-bold tabular-nums">3,800+</p>
                  <p className="text-white/60 text-[10px] tracking-widest uppercase mt-2">
                    Safe Deliveries & Families Guided
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Specialties Grid */}
        <section id="specialties" className="py-24 md:py-32 bg-brand-grey">
          <div className="max-w-[1500px] mx-auto px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
              <div data-animation-on-scroll="">
                <p className="text-[10px] font-bold tracking-[4px] text-brand-primary/40 uppercase mb-4">
                  Dedicated Specialist Centres
                </p>
                <h2 className="font-primary text-4xl md:text-5xl text-brand-primary uppercase font-bold tracking-tighter">
                  Women &amp; Family <span className="font-light italic lowercase">Pathways</span>
                </h2>
              </div>
              <div className="max-w-md" data-animation-on-scroll="">
                <p className="text-sm text-text-secondary font-light leading-relaxed">
                  From pre-conception and fertility through safe childbirth, newborn care, and
                  lifetime gynaecological wellness. Select any pathway to view our clinical
                  protocols and lead consultants.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-brand-primary/5 border border-brand-primary/5">
              {SPECIALTIES.map((spec) => (
                <div
                  key={spec.id}
                  onClick={() => setActiveSpecialty(spec)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setActiveSpecialty(spec);
                    }
                  }}
                  className={`bg-white p-12 hover:bg-brand-primary group transition-all duration-500 cursor-pointer text-left animate-on-scroll-hidden ${
                    spec.delayClass || ''
                  }`}
                  data-animation-on-scroll=""
                >
                  <h3 className="font-primary text-2xl text-brand-primary group-hover:text-white transition-colors mb-6 uppercase tracking-widest">
                    {spec.title}
                  </h3>
                  <p className="text-text-secondary group-hover:text-white/70 transition-colors font-light text-sm leading-relaxed mb-8">
                    {spec.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="h-[1px] w-8 bg-brand-primary group-hover:bg-white group-hover:w-12 transition-all"></div>
                    <span className="text-[10px] font-bold tracking-widest uppercase text-brand-primary/0 group-hover:text-white/80 transition-all flex items-center gap-2">
                      View Pathway <ArrowRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action / Contact */}
        <section id="contact" className="relative py-32 bg-brand-primary overflow-hidden">
          <div className="absolute top-0 right-0 w-1/2 h-full hidden lg:block opacity-25">
            {!backdropImgFailed && (
              <img
                src="/src/assets/images/clinic_architecture_backdrop_1794314330955.jpg"
                alt="Vanguard Sanctuary Interior"
                referrerPolicy="no-referrer"
                onError={() => setBackdropImgFailed(true)}
                className="w-full h-full object-cover"
              />
            )}
          </div>

          <div className="max-w-[1500px] mx-auto px-8 relative z-10">
            <div className="max-w-2xl" data-animation-on-scroll="">
              <div className="h-[1px] w-12 bg-white/40 mb-8" data-animation-on-scroll=""></div>
              <h2
                className="font-primary text-4xl md:text-6xl text-white mb-8 tracking-widest-custom uppercase"
                data-animation-on-scroll=""
              >
                Begin Your <br />
                <span className="italic font-light">Care Journey</span>
              </h2>
              <p
                className="text-white/70 font-light text-lg mb-12 max-w-lg delay-200"
                data-animation-on-scroll=""
              >
                Arrange a confidential consultation or private maternity tour with our patient
                liaison team in Victoria Island or Maitama.
              </p>

              {submittedData ? (
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-8 max-w-md text-white transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-white text-brand-primary flex items-center justify-center">
                      <Check className="w-4 h-4" />
                    </div>
                    <p className="text-xs font-bold tracking-widest uppercase">
                      Private Consultation Reserved
                    </p>
                  </div>
                  <p className="text-sm text-white/80 font-light leading-relaxed mb-6">
                    Thank you, <span className="text-white font-semibold">{submittedData.name}</span>.
                    Our Senior Patient Liaison at our{' '}
                    <span className="text-white">{submittedData.location}</span> centre will reach
                    out via <span className="text-white">{submittedData.contact}</span> within 2
                    hours to confirm your{' '}
                    <span className="text-white">{submittedData.specialty}</span> appointment.
                  </p>
                  <div className="border-t border-white/15 pt-4 mb-6 flex items-center justify-between text-[11px] tracking-widest uppercase text-white/60">
                    <span>Booking Reference</span>
                    <span className="text-white font-bold tabular-nums">
                      {submittedData.referenceId}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubmittedData(null)}
                    className="w-full border border-white/40 text-white py-3 text-xs font-bold tracking-[2px] uppercase hover:bg-white hover:text-brand-primary transition-all cursor-pointer"
                  >
                    Book Another Appointment
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="space-y-6 max-w-md delay-300"
                  data-animation-on-scroll=""
                  noValidate
                >
                  <div className="border-b border-white/20 pb-2 focus-within:border-white transition-colors">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="FULL NAME"
                      aria-label="Full Name"
                      className="bg-transparent text-white w-full text-xs tracking-widest focus:outline-none placeholder:text-white/30 font-bold py-1"
                    />
                  </div>
                  <div className="border-b border-white/20 pb-2 focus-within:border-white transition-colors">
                    <input
                      type="text"
                      value={phoneOrEmail}
                      onChange={(e) => setPhoneOrEmail(e.target.value)}
                      placeholder="PHONE (WHATSAPP) OR EMAIL ADDRESS"
                      aria-label="Phone or Email Address"
                      className="bg-transparent text-white w-full text-xs tracking-widest focus:outline-none placeholder:text-white/30 font-bold py-1"
                    />
                  </div>
                  <div className="border-b border-white/20 pb-2 focus-within:border-white transition-colors">
                    <select
                      value={preferredLocation}
                      onChange={(e) => setPreferredLocation(e.target.value)}
                      aria-label="Preferred Centre Location"
                      className="bg-transparent text-white w-full text-xs tracking-widest focus:outline-none font-bold uppercase cursor-pointer py-1"
                    >
                      <option value="Victoria Island, Lagos" className="bg-brand-primary">
                        Centre: Victoria Island, Lagos
                      </option>
                      <option value="Ikoyi Outpatient Suite, Lagos" className="bg-brand-primary">
                        Centre: Ikoyi Outpatient Suite, Lagos
                      </option>
                      <option value="Maitama, Abuja" className="bg-brand-primary">
                        Centre: Maitama, Abuja
                      </option>
                    </select>
                  </div>
                  <div className="border-b border-white/20 pb-2 focus-within:border-white transition-colors">
                    <select
                      value={selectedSpecialty}
                      onChange={(e) => setSelectedSpecialty(e.target.value)}
                      aria-label="Select Care Pathway"
                      className="bg-transparent text-white w-full text-xs tracking-widest focus:outline-none font-bold uppercase cursor-pointer py-1"
                    >
                      <option value="" className="bg-brand-primary">
                        Select Care Pathway
                      </option>
                      <option value="Maternal & Antenatal" className="bg-brand-primary">
                        Maternal &amp; Antenatal Care
                      </option>
                      <option value="Fertility & IVF" className="bg-brand-primary">
                        Fertility &amp; IVF Support
                      </option>
                      <option value="Fibroid & Gynaecology" className="bg-brand-primary">
                        Minimally Invasive Fibroid Care
                      </option>
                      <option value="Paediatrics & Neonatal" className="bg-brand-primary">
                        Paediatrics &amp; Immunization
                      </option>
                      <option value="Well-Woman Screening" className="bg-brand-primary">
                        Well-Woman Diagnostics
                      </option>
                      <option value="Postpartum Sanctuary" className="bg-brand-primary">
                        Postpartum Recovery Sanctuary
                      </option>
                    </select>
                  </div>

                  {formError && (
                    <p className="text-xs text-amber-200 tracking-wide font-light">{formError}</p>
                  )}

                  <button
                    type="submit"
                    className="w-full bg-white text-brand-primary py-5 text-xs font-bold tracking-[3px] uppercase hover:bg-brand-grey transition-all mt-8 cursor-pointer"
                  >
                    REQUEST PRIVATE CONSULTATION
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-brand-primary text-white pt-24 pb-12 border-t border-white/10">
        <div className="max-w-[1500px] mx-auto px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-24">
            <div className="col-span-1 md:col-span-2">
              <h3 className="font-primary text-2xl font-bold tracking-widest-custom mb-6 uppercase">
                Vanguard <span className="font-light italic lowercase">Sanctuary</span>
              </h3>
              <p className="text-white/60 font-light max-w-md leading-relaxed">
                Nigeria’s premier consultant-led centre for maternal safety, fertility, minimally
                invasive gynaecology, and paediatric excellence. Designed as a calm sanctuary for
                every stage of womanhood and family life.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest mb-6 uppercase">Care Pathways</h4>
              <ul className="space-y-4 text-white/60 text-sm font-light">
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveSpecialty(SPECIALTIES[0])}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Maternal &amp; Antenatal Care
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveSpecialty(SPECIALTIES[1])}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Fertility &amp; IVF Support
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveSpecialty(SPECIALTIES[2])}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Minimally Invasive Fibroid Care
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={() => setActiveSpecialty(SPECIALTIES[3])}
                    className="hover:text-white transition-colors text-left cursor-pointer"
                  >
                    Paediatrics &amp; Neonatal ICU
                  </button>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-bold tracking-widest mb-6 uppercase">Locations &amp; Liaison</h4>
              <ul className="space-y-4 text-white/60 text-sm font-light">
                <li>14A Walter Carrington Crescent, Victoria Island, Lagos</li>
                <li>8 Gana Street, Maitama, Abuja</li>
                <li>
                  <a href="tel:+23412779000" className="hover:text-white transition-colors">
                    +234 (0) 201 277 9000
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:liaison@vanguardsanctuary.ng"
                    className="hover:text-white transition-colors"
                  >
                    liaison@vanguardsanctuary.ng
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-[10px] tracking-widest text-white/40 uppercase">
              © 2026 Vanguard Women &amp; Family Medical Sanctuary Nigeria. All Rights Reserved.
            </p>
            <div className="flex gap-8">
              <button
                type="button"
                onClick={() => setPolicyModal('privacy')}
                className="text-[10px] tracking-widest text-white/40 uppercase hover:text-white transition-colors cursor-pointer"
              >
                Patient Confidentiality (NDPA)
              </button>
              <button
                type="button"
                onClick={() => setPolicyModal('terms')}
                className="text-[10px] tracking-widest text-white/40 uppercase hover:text-white transition-colors cursor-pointer"
              >
                Terms of Clinical Care
              </button>
            </div>
          </div>
        </div>
      </footer>

      {/* Specialty Clinical Protocol Modal */}
      {activeSpecialty && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6"
          onClick={() => setActiveSpecialty(null)}
        >
          <div
            className="bg-white max-w-xl w-full p-10 md:p-12 relative border border-brand-primary/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveSpecialty(null)}
              aria-label="Close pathway details"
              className="absolute top-8 right-8 text-brand-primary/50 hover:text-brand-primary transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <p className="text-[10px] font-bold tracking-[4px] text-brand-primary/40 uppercase mb-3">
              Specialist Care Pathway
            </p>
            <h3 className="font-primary text-3xl text-brand-primary uppercase font-bold tracking-widest mb-4">
              {activeSpecialty.title}
            </h3>
            <div className="h-[1px] w-12 bg-brand-primary/20 mb-6"></div>

            <p className="text-text-secondary font-light text-sm leading-relaxed mb-8">
              {activeSpecialty.description}
            </p>

            <div className="bg-brand-grey p-6 mb-8">
              <p className="text-[10px] font-bold tracking-widest uppercase text-brand-primary/50 mb-1">
                Lead Consultant
              </p>
              <p className="font-primary text-base font-bold text-brand-primary">
                {activeSpecialty.leadPhysician}
              </p>
              <p className="text-xs text-text-secondary font-light mt-0.5">
                {activeSpecialty.credentials}
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xs font-bold tracking-widest uppercase text-brand-primary mb-4">
                Clinical Capabilities &amp; Sanctuary Standards
              </h4>
              <ul className="space-y-3">
                {activeSpecialty.diagnosticCapabilities.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3 text-sm text-text-secondary font-light">
                    <span className="w-4 h-[1px] bg-brand-primary mt-2.5 shrink-0"></span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-brand-primary/10 pt-6 mb-8">
              <p className="text-xs text-brand-primary font-semibold tracking-wide">
                {activeSpecialty.clinicalOutcome}
              </p>
            </div>

            <button
              type="button"
              onClick={() => handleConsultSpecialty(activeSpecialty.title)}
              className="w-full bg-brand-primary text-white py-4 text-xs font-bold tracking-[2px] uppercase hover:bg-brand-primary/90 transition-all cursor-pointer"
            >
              Book {activeSpecialty.title} Consultation
            </button>
          </div>
        </div>
      )}

      {/* Privacy / Terms Modal */}
      {policyModal && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-6"
          onClick={() => setPolicyModal(null)}
        >
          <div
            className="bg-white max-w-lg w-full p-10 relative border border-brand-primary/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setPolicyModal(null)}
              aria-label="Close legal notice"
              className="absolute top-8 right-8 text-brand-primary/50 hover:text-brand-primary transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
            <p className="text-[10px] font-bold tracking-[4px] text-brand-primary/40 uppercase mb-3">
              Vanguard Sanctuary Nigeria
            </p>
            <h3 className="font-primary text-2xl text-brand-primary uppercase font-bold tracking-widest mb-6">
              {policyModal === 'privacy'
                ? 'Patient Confidentiality & NDPA Governance'
                : 'Terms of Clinical Care'}
            </h3>
            <div className="space-y-4 text-sm text-text-secondary font-light leading-relaxed mb-8">
              {policyModal === 'privacy' ? (
                <>
                  <p>
                    Vanguard Sanctuary operates in strict compliance with the Nigeria Data
                    Protection Act (NDPA) and international medical confidentiality standards. All
                    maternal, fertility, and genetic records are encrypted and accessible only to
                    your designated consultant team.
                  </p>
                  <p>
                    Private appointments and suite visits in Victoria Island, Ikoyi, and Maitama are
                    scheduled to ensure complete personal discretion for you and your family.
                  </p>
                </>
              ) : (
                <>
                  <p>
                    Vanguard Sanctuary provides consultant-led obstetrics, gynaecology, fertility,
                    and paediatric services across our Lagos and Abuja centres, alongside 24/7
                    emergency maternal and neonatal cover for registered patients.
                  </p>
                  <p>
                    International insurance, select top-tier Nigerian corporate retainers, and
                    diaspora-sponsored family care plans are supported through our patient liaison
                    desk.
                  </p>
                </>
              )}
            </div>
            <button
              type="button"
              onClick={() => setPolicyModal(null)}
              className="w-full border border-brand-primary text-brand-primary py-3 text-xs font-bold tracking-[2px] uppercase hover:bg-brand-primary hover:text-white transition-all cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
