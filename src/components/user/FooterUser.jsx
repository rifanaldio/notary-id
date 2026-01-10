import { Link } from 'react-router-dom';
import {
  MessageCircle,
  ShoppingBag,
  Home,
  Shield,
  Mail,
  Phone,
  FileText,
  Users,
  Building2,
  Briefcase,
  GraduationCap,
  Handshake,
  Award,
  BookOpen,
  HelpCircle,
  Info,
  ShieldCheck
} from 'lucide-react';
import iniLogo from '../../assets/INI.png';
import kemenkumhamLogo from '../../assets/kemenkumham.png';
import waveSvg from '../../assets/waves.svg';

const FooterUser = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-brand-primary/10  to-indigo-200 mt-16 relative">
      <div className="relative w-full overflow-hidden">
        <svg
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          className="relative block w-full h-[150px] text-brand-light bg-gradient-to-b from-brand-primary/5  to-indigo-200 dark:text-brand-dark dark:bg-gradient-to-b dark:from-brand-primary/5 dark:to-brand-dark/5"
          style={{ transform: 'rotate(180deg)' }}
        >
          <path
            fill="currentColor"
            d="M0,160L48,176C96,192,192,224,288,213.3C384,203,480,149,576,144C672,139,768,181,864,181.3C960,181,1056,139,1152,122.7C1248,107,1344,117,1392,122.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
      <div className="w-full sm:px-6 lg:px-8 pt-12 relative z-10 bg-brand-primary/5 pb-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 px-28">
          {/* Left Section: Logo, Services, CTA */}
          <div className="space-y-8">
            {/* Logo */}
            <div>
              <Link to="/" className="flex items-center gap-2">
                <div className="text-2xl font-black text-brand-primary dark:text-white">
                  NotaryID
                </div>
              </Link>
            </div>

            {/* Service Categories */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center gap-3 p-4 rounded-xl bg-brand-surface dark:bg-brand-dark border border-brand-muted/20 dark:border-brand-light/10 hover:border-brand-primary/50 transition text-left"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
                  <MessageCircle size={20} className="text-brand-primary" />
                </div>
                <span className="text-sm font-semibold text-brand-dark dark:text-slate-100">
                  Konsultasi Notaris
                </span>
              </button>

              <button
                type="button"
                className="flex items-center gap-3 p-4 rounded-xl bg-brand-surface dark:bg-brand-dark border border-brand-muted/20 dark:border-brand-light/10 hover:border-brand-primary/50 transition text-left"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
                  <FileText size={20} className="text-brand-primary" />
                </div>
                <span className="text-sm font-semibold text-brand-dark dark:text-slate-100">
                  Layanan Akta
                </span>
              </button>

              <button
                type="button"
                className="flex items-center gap-3 p-4 rounded-xl bg-brand-surface dark:bg-brand-dark border border-brand-muted/20 dark:border-brand-light/10 hover:border-brand-primary/50 transition text-left"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
                  <Shield size={20} className="text-brand-primary" />
                </div>
                <span className="text-sm font-semibold text-brand-dark dark:text-slate-100">
                  Legalisasi Dokumen
                </span>
              </button>

              <button
                type="button"
                className="flex items-center gap-3 p-4 rounded-xl bg-brand-surface dark:bg-brand-dark border border-brand-muted/20 dark:border-brand-light/10 hover:border-brand-primary/50 transition text-left"
              >
                <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
                  <Building2 size={20} className="text-brand-primary" />
                </div>
                <span className="text-sm font-semibold text-brand-dark dark:text-slate-100">
                  PPAT Online
                </span>
              </button>
            </div>

            {/* Call to Action */}
            <div className="rounded-2xl bg-gradient-to-r from-brand-primary/10 to-brand-primary/5 dark:from-brand-primary/20 dark:to-brand-primary/10 border border-brand-primary/20 dark:border-brand-primary/30 p-6">
              <p className="text-base font-bold text-brand-dark dark:text-black mb-2">
                Layanan Notaris Digital Terpercaya
              </p>
              <p className="text-sm text-brand-muted dark:text-slate-700">
                Dapatkan layanan notaris profesional kapan saja, di mana saja. Unduh aplikasi NotaryID sekarang!
              </p>
            </div>

            {/* Contact Information */}
            <div className="space-y-3">
              <a
                href="mailto:help@notaryid.com"
                className="flex items-center gap-3 text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
              >
                <Mail size={18} />
                <span>help@notaryid.com</span>
              </a>
              <a
                href="tel:+622150959900"
                className="flex items-center gap-3 text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
              >
                <Phone size={18} />
                <span>021-5095-9900</span>
              </a>
            </div>
          </div>

          {/* Right Section: Links Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:pt-16">
            {/* BANTUAN & PANDUAN */}
            <div>
              <h3 className="text-sm font-bold text-brand-dark dark:text-brand-light mb-4 uppercase tracking-wide">
                Bantuan & Panduan
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/help"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    Pusat Bantuan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/terms"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    Syarat & Ketentuan
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    Pemberitahuan Privasi
                  </Link>
                </li>
                <li>
                  <Link
                    to="/faq"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    FAQ
                  </Link>
                </li>
              </ul>
            </div>

            {/* NOTARYID */}
            <div>
              <h3 className="text-sm font-bold text-brand-dark dark:text-brand-light mb-4 uppercase tracking-wide">
                NotaryID
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/about"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    Tentang Kami
                  </Link>
                </li>
                <li>
                  <Link
                    to="/notaries"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    Daftar Notaris
                  </Link>
                </li>
                <li>
                  <Link
                    to="/services"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    Layanan Kami
                  </Link>
                </li>
                <li>
                  <Link
                    to="/news"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    Berita NotaryID
                  </Link>
                </li>
                <li>
                  <Link
                    to="/blog"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    Blog NotaryID
                  </Link>
                </li>
                <li>
                  <Link
                    to="/dictionary"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    Kamus Hukum
                  </Link>
                </li>
                <li>
                  <Link
                    to="/promo"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    Promo Hari Ini
                  </Link>
                </li>
              </ul>
            </div>

            {/* KARIR & KOLABORASI */}
            <div>
              <h3 className="text-sm font-bold text-brand-dark dark:text-brand-light mb-4 uppercase tracking-wide">
                Karir & Kolaborasi
              </h3>
              <ul className="space-y-3">
                <li>
                  <Link
                    to="/careers"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    Karir
                  </Link>
                </li>
                <li>
                  <Link
                    to="/business"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    NotaryID for Business
                  </Link>
                </li>
                <li>
                  <Link
                    to="/join-notary"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    Gabung Sebagai Notaris
                  </Link>
                </li>
                <li>
                  <Link
                    to="/academy"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    NotaryID Academy
                  </Link>
                </li>
                <li>
                  <Link
                    to="/affiliate"
                    className="text-sm text-brand-muted dark:text-brand-light/70 hover:text-brand-primary transition"
                  >
                    Program Afiliasi
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section: Certifications & Copyright */}
        <div className="border-t border-brand-muted/20 dark:border-brand-light/10 pt-8 px-28">
          {/* Keamanan & Privasi Header */}
          <div className="mb-6">
            <h4 className="text-sm md:text-base font-bold text-brand-dark dark:text-brand-light mb-4 uppercase tracking-wide">
              Keamanan & Privasi
            </h4>
          </div>

          {/* Certifications Badges - Larger Size */}
          <div className="flex flex-wrap items-center gap-6 mb-6">
            {/* ISO 27001 Badge */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-brand-surface dark:bg-brand-dark/50 border border-brand-muted/20 dark:border-brand-light/10">
              <ShieldCheck size={24} className="text-brand-primary" />
              <div>
                <p className="text-sm font-semibold text-brand-dark dark:text-brand-light">
                  ISO/IEC 27001
                </p>
                <p className="text-xs text-brand-muted dark:text-brand-light/60">
                  Information Security
                </p>
              </div>
            </div>

            {/* ISO 27701 Badge */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-brand-surface dark:bg-brand-dark/50 border border-brand-muted/20 dark:border-brand-light/10">
              <ShieldCheck size={24} className="text-brand-primary" />
              <div>
                <p className="text-sm font-semibold text-brand-dark dark:text-brand-light">
                  ISO/IEC 27701
                </p>
                <p className="text-xs text-brand-muted dark:text-brand-light/60">
                  Privacy Management
                </p>
              </div>
            </div>

            {/* INI Logo Badge - Larger */}
            <div className="flex items-center gap-3 px-5 py-3 rounded-xl bg-brand-surface dark:bg-brand-dark/50 border border-brand-muted/20 dark:border-brand-light/10">
              <img
                src={iniLogo}
                alt="Ikatan Notaris Indonesia"
                className="w-10 h-10 object-contain"
              />
              <div>
                <p className="text-sm font-semibold text-brand-dark dark:text-brand-light">
                  Terdaftar INI
                </p>
                <p className="text-xs text-brand-muted dark:text-brand-light/60">
                  Ikatan Notaris Indonesia
                </p>
              </div>
            </div>
          </div>

          {/* Copyright & Affiliation */}
          <div className="pt-4 border-t border-brand-muted/10 dark:border-brand-light/5">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-xs text-brand-muted dark:text-brand-light/60">
                © {currentYear}, PT NotaryID Digital and Affiliates. All rights reserved.
              </p>
              <div className="flex items-center gap-4">
                <span className="text-sm font-semibold text-brand-dark dark:text-brand-light">
                  Dibina oleh
                </span>
                {/* Kemenkumham Logo - No Container */}
                <img
                  src={kemenkumhamLogo}
                  alt="Kementerian Hukum dan HAM"
                  className="h-12 w-auto object-contain"
                />
                {/* INI Logo - No Container */}
                <img
                  src={iniLogo}
                  alt="Ikatan Notaris Indonesia"
                  className="h-12 w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterUser;

