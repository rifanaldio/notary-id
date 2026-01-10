import PropTypes from 'prop-types';
import { ArrowLeft, Share2, Building2, CheckCircle, Briefcase, ThumbsUp, MapPin, GraduationCap, Shield, MessageCircle, Clock } from 'lucide-react';

const NotaryDetail = ({ notary, onBack, onConsultationClick, isCompact = false }) => {
  if (!notary) return null;

  if (isCompact) {
    // Compact version untuk ditampilkan di dalam card
    return (
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/40 dark:from-brand-primary/30 dark:to-brand-primary/50 flex items-center justify-center overflow-hidden shadow-sm">
                <Building2 size={40} className="text-brand-primary" />
              </div>
              {notary.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center border-2 border-white dark:border-brand-dark shadow-sm">
                  <CheckCircle size={14} className="text-white fill-white" />
                </div>
              )}
              <div className="absolute top-1 right-1 px-2 py-0.5 rounded-full bg-status-success text-white text-[10px] font-semibold shadow-sm">
                Online
              </div>
            </div>
            <div>
              <h2 className="text-xl font-bold text-brand-dark dark:text-brand-light mb-1">
                {notary.name}
              </h2>
              <p className="text-sm text-brand-primary font-medium mb-2">
                {notary.categories[0] || 'Notaris'}
              </p>
              <div className="flex items-center gap-4 text-xs">
                <div className="flex items-center gap-1.5">
                  <Briefcase size={14} className="text-brand-muted dark:text-brand-light/60" />
                  <span className="text-brand-muted dark:text-brand-light/70">{notary.experience}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ThumbsUp size={14} className="text-brand-primary fill-brand-primary" />
                  <span className="font-bold text-brand-dark dark:text-brand-light">
                    {Math.round(notary.rating * 20)}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Price */}
        <div className="p-4 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20">
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-2xl font-bold text-brand-dark dark:text-brand-light">
              Rp 150.000
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-brand-muted dark:text-brand-light/70 line-through">
              Rp 200.000
            </span>
            <span className="px-2 py-0.5 rounded bg-status-success/20 text-status-success text-xs font-semibold">
              DISKON NOTARIS
            </span>
          </div>
        </div>

        {/* Info Sections */}
        <div className="space-y-3 text-sm">
          <div className="flex items-start gap-3">
            <GraduationCap size={18} className="text-brand-muted dark:text-brand-light/60 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-brand-muted dark:text-brand-light/70">Alumnus </span>
              <span className="text-brand-dark dark:text-brand-light font-medium">Universitas Indonesia, 2010</span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="text-brand-muted dark:text-brand-light/60 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-brand-muted dark:text-brand-light/70">Praktik di </span>
              <span className="text-brand-dark dark:text-brand-light font-medium">
                {notary.regency.name}, {notary.province.name}
              </span>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Shield size={18} className="text-brand-muted dark:text-brand-light/60 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-brand-muted dark:text-brand-light/70">Nomor STR </span>
              <span className="text-brand-dark dark:text-brand-light font-medium font-mono">
                {notary.id.toUpperCase().replace('N', 'STR')}001
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm text-brand-muted dark:text-brand-light/70 leading-relaxed">
            {notary.description}
          </p>
        </div>

        {/* Categories */}
        <div>
          <h3 className="text-sm font-semibold text-brand-dark dark:text-brand-light mb-3">
            Kategori Layanan:
          </h3>
          <div className="flex flex-wrap gap-2">
            {notary.categories.map((category) => (
              <span
                key={category}
                className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary border border-brand-primary/20"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-2 text-sm pt-4 border-t border-brand-muted/20">
          <div className="flex items-center gap-2">
            <span className="text-brand-muted dark:text-brand-light/70">Telepon:</span>
            <a
              href={`tel:${notary.phone}`}
              className="text-brand-primary hover:underline font-medium"
            >
              {notary.phone}
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-brand-muted dark:text-brand-light/70">Email:</span>
            <a
              href={`mailto:${notary.email}`}
              className="text-brand-primary hover:underline font-medium text-xs"
            >
              {notary.email}
            </a>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-brand-muted dark:text-brand-light/70">Alamat:</span>
            <span className="text-brand-dark dark:text-brand-light text-xs">
              {notary.address}, {notary.district.name}
            </span>
          </div>
        </div>

        {/* Chat Button */}
        <button
          type="button"
          onClick={() => onConsultationClick(notary)}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-base transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
        >
          <MessageCircle size={20} className="fill-white" />
          Chat
        </button>
      </div>
    );
  }

  // Full version (original)
  return (
    <div className="min-h-screen bg-white dark:bg-brand-dark">
      <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
        {/* Left Content Area */}
        <div className="flex-1 px-4 sm:px-6 lg:px-8 xl:px-12 py-8">
          {/* Breadcrumbs */}
          <div className="flex items-center gap-2 text-sm text-brand-muted dark:text-brand-light/70 mb-6">
            <span>Home</span>
            <span>→</span>
            <span>Tanya Notaris</span>
            <span>→</span>
            <span className="text-brand-dark dark:text-brand-light">{notary.name}</span>
          </div>

          {/* Main Content */}
          <div className="max-w-3xl">
            <h1 className="text-3xl sm:text-4xl font-bold text-brand-dark dark:text-brand-light mb-3">
              Chat Notaris di NotaryID
            </h1>
            <p className="text-lg text-brand-muted dark:text-brand-light/70 mb-8">
              Layanan notaris digital yang siap siaga untuk bantu kamu mengurus dokumen legal dengan mudah dan terpercaya.
            </p>

            {/* Approval Graphic */}
            <div className="flex items-center gap-4 mb-6 p-6 rounded-2xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20">
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-brand-primary/20 dark:bg-brand-primary/30 flex items-center justify-center">
                <Clock size={40} className="text-brand-primary" />
              </div>
              <div>
                <div className="text-xs font-semibold text-brand-primary mb-1">APPROVED</div>
                <div className="text-2xl font-bold text-brand-dark dark:text-brand-light">1 min</div>
                <p className="text-sm text-brand-muted dark:text-brand-light/70 mt-2">
                  Notaris akan segera menerima permintaan chat kamu
                </p>
              </div>
            </div>

            {/* Why Choose Section */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-brand-dark dark:text-brand-light mb-6">
                Mengapa Chat Notaris di NotaryID?
              </h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
                    <Building2 size={24} className="text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-brand-dark dark:text-brand-light mb-1">
                      Satu aplikasi untuk berbagai kebutuhan
                    </p>
                    <p className="text-sm text-brand-muted dark:text-brand-light/70">
                      Periksa notaris, buat akta, legalisasi dokumen hingga konsultasi hukum dalam satu aplikasi.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
                    <Shield size={24} className="text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-brand-dark dark:text-brand-light mb-1">
                      Dapatkan rujukan ke pemeriksaan offline jika diperlukan
                    </p>
                    <p className="text-sm text-brand-muted dark:text-brand-light/70">
                      Notaris dapat memberikan rujukan untuk pertemuan tatap muka atau pemeriksaan dokumen fisik jika diperlukan.
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
                    <CheckCircle size={24} className="text-brand-primary" />
                  </div>
                  <div>
                    <p className="text-base font-semibold text-brand-dark dark:text-brand-light mb-1">
                      Notaris terverifikasi dan terpercaya
                    </p>
                    <p className="text-sm text-brand-muted dark:text-brand-light/70">
                      Semua notaris di platform telah terverifikasi dan memiliki izin praktik resmi dari Kemenkumham.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Notary Profile */}
        <div className="lg:w-96 flex-shrink-0 bg-brand-surface dark:bg-brand-dark border-l border-brand-muted/20 dark:border-brand-light/10 p-6 sticky top-0 h-screen overflow-y-auto">
          {/* Header with Back and Share */}
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={onBack}
              className="p-2 rounded-full hover:bg-brand-muted/20 dark:hover:bg-brand-light/10 transition"
            >
              <ArrowLeft size={20} className="text-brand-dark dark:text-brand-light" />
            </button>
            <button
              className="p-2 rounded-full hover:bg-brand-muted/20 dark:hover:bg-brand-light/10 transition"
              aria-label="Share"
            >
              <Share2 size={20} className="text-brand-dark dark:text-brand-light" />
            </button>
          </div>

          {/* Profile Picture */}
          <div className="flex justify-center mb-4">
            <div className="relative">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/40 dark:from-brand-primary/30 dark:to-brand-primary/50 flex items-center justify-center overflow-hidden shadow-lg">
                <Building2 size={64} className="text-brand-primary" />
              </div>
              {notary.verified && (
                <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-brand-primary flex items-center justify-center border-4 border-white dark:border-brand-dark shadow-lg">
                  <CheckCircle size={16} className="text-white fill-white" />
                </div>
              )}
              {/* Status Badge */}
              <div className="absolute top-2 right-2 px-3 py-1 rounded-full bg-status-success text-white text-xs font-semibold shadow-md">
                Online
              </div>
            </div>
          </div>

          {/* Name and Specialty */}
          <div className="text-center mb-4">
            <h2 className="text-xl font-bold text-brand-dark dark:text-brand-light mb-1">
              {notary.name}
            </h2>
            <p className="text-sm text-brand-primary font-medium">
              {notary.categories[0] || 'Notaris'}
            </p>
          </div>

          {/* Experience and Rating */}
          <div className="flex items-center justify-center gap-4 mb-6 text-sm">
            <div className="flex items-center gap-1.5">
              <Briefcase size={16} className="text-brand-muted dark:text-brand-light/60" />
              <span className="text-brand-muted dark:text-brand-light/70">{notary.experience}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <ThumbsUp size={16} className="text-brand-primary fill-brand-primary" />
              <span className="font-bold text-brand-dark dark:text-brand-light">
                {Math.round(notary.rating * 20)}%
              </span>
            </div>
          </div>

          {/* Price */}
          <div className="mb-6 p-4 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20">
            <div className="flex items-baseline gap-2 mb-1">
              <span className="text-2xl font-bold text-brand-dark dark:text-brand-light">
                Rp 150.000
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-brand-muted dark:text-brand-light/70 line-through">
                Rp 200.000
              </span>
              <span className="px-2 py-0.5 rounded bg-status-success/20 text-status-success text-xs font-semibold">
                DISKON NOTARIS
              </span>
            </div>
          </div>

          {/* Alumnus */}
          <div className="flex items-start gap-3 mb-4 text-sm">
            <GraduationCap size={18} className="text-brand-muted dark:text-brand-light/60 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-brand-muted dark:text-brand-light/70">Alumnus</span>
              <p className="text-brand-dark dark:text-brand-light font-medium">
                Universitas Indonesia, 2010
              </p>
            </div>
          </div>

          {/* Practice Location */}
          <div className="flex items-start gap-3 mb-4 text-sm">
            <MapPin size={18} className="text-brand-muted dark:text-brand-light/60 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-brand-muted dark:text-brand-light/70">Praktik di</span>
              <p className="text-brand-dark dark:text-brand-light font-medium">
                {notary.regency.name}, {notary.province.name}
              </p>
            </div>
          </div>

          {/* STR Number */}
          <div className="flex items-start gap-3 mb-6 text-sm">
            <Shield size={18} className="text-brand-muted dark:text-brand-light/60 mt-0.5 flex-shrink-0" />
            <div>
              <span className="text-brand-muted dark:text-brand-light/70">Nomor STR</span>
              <p className="text-brand-dark dark:text-brand-light font-medium font-mono">
                {notary.id.toUpperCase().replace('N', 'STR')}001
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="mb-6">
            <p className="text-sm text-brand-muted dark:text-brand-light/70 leading-relaxed">
              {notary.description}
            </p>
          </div>

          {/* Categories */}
          <div className="mb-6">
            <h3 className="text-sm font-semibold text-brand-dark dark:text-brand-light mb-3">
              Kategori Layanan:
            </h3>
            <div className="flex flex-wrap gap-2">
              {notary.categories.map((category) => (
                <span
                  key={category}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary border border-brand-primary/20"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="mb-6 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-brand-muted dark:text-brand-light/70">Telepon:</span>
              <a
                href={`tel:${notary.phone}`}
                className="text-brand-primary hover:underline font-medium"
              >
                {notary.phone}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-brand-muted dark:text-brand-light/70">Email:</span>
              <a
                href={`mailto:${notary.email}`}
                className="text-brand-primary hover:underline font-medium text-xs"
              >
                {notary.email}
              </a>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-brand-muted dark:text-brand-light/70">Alamat:</span>
              <span className="text-brand-dark dark:text-brand-light text-xs">
                {notary.address}, {notary.district.name}
              </span>
            </div>
          </div>

          {/* Chat Button */}
          <button
            type="button"
            onClick={() => onConsultationClick(notary)}
            className="w-full flex items-center justify-center gap-2 py-4 rounded-xl bg-brand-primary hover:bg-brand-primary/90 text-white font-bold text-base transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
          >
            <MessageCircle size={20} className="fill-white" />
            Chat
          </button>
        </div>
      </div>
    </div>
  );
};

NotaryDetail.propTypes = {
  notary: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    province: PropTypes.object.isRequired,
    regency: PropTypes.object.isRequired,
    district: PropTypes.object.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    experience: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    verified: PropTypes.bool.isRequired,
    description: PropTypes.string.isRequired
  }),
  onBack: PropTypes.func.isRequired,
  onConsultationClick: PropTypes.func.isRequired
};

export default NotaryDetail;
