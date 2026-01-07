import { useState } from 'react';
import { FileSignature, ShieldCheck, Users, Building2, Stamp, MapPin, Phone, CheckCircle, FileText, Shield, Scale, Briefcase, Handshake, FileCheck, Gavel, Landmark } from 'lucide-react';
import SearchBar from '../../components/user/SearchBar';
import RegionSearchBar from '../../components/user/RegionSearchBar';
import CategoryCard from '../../components/user/CategoryCard';

const categories = [
  {
    title: 'Akta Perusahaan',
    desc: 'Pendirian PT, CV, yayasan, perubahan anggaran dasar.',
    icon: <Building2 size={32} />
  },
  {
    title: 'Akta Tanah & Properti',
    desc: 'Jual beli, hibah, PPJB, SHM/SHGB, roya dan APHT.',
    icon: <MapPin size={32} />
  },
  {
    title: 'Legalisasi & Waarmerking',
    desc: 'Pengesahan dokumen, legalisasi tanda tangan, waarmerking.',
    icon: <Stamp size={32} />
  },
  {
    title: 'Perdata Keluarga',
    desc: 'Akta waris, hibah keluarga, perjanjian pra/ pasca nikah.',
    icon: <Users size={32} />
  },
  {
    title: 'Pembiayaan & Fidusia',
    desc: 'Akta kredit, jaminan fidusia, surat kuasa pembebanan hak.',
    icon: <ShieldCheck size={32} />
  },
  {
    title: 'Korporasi & Kontrak',
    desc: 'Perjanjian kerja sama, MOU, franchise, NDA, dan lisensi.',
    icon: <FileSignature size={32} />
  },
  {
    title: 'Hukum Pidana',
    desc: 'Konsultasi hukum pidana, surat kuasa khusus, dan bantuan hukum.',
    icon: <Gavel size={32} />
  },
  {
    title: 'Hukum Perburuhan',
    desc: 'Perjanjian kerja, PHK, pesangon, dan hubungan industrial.',
    icon: <Briefcase size={32} />
  },
  {
    title: 'Hukum Pajak',
    desc: 'Konsultasi perpajakan, legalisasi dokumen pajak, dan perizinan.',
    icon: <Landmark size={32} />
  },
  {
    title: 'Mediasi & Arbitrase',
    desc: 'Penyelesaian sengketa, mediasi, dan arbitrase komersial.',
    icon: <Handshake size={32} />
  },
  {
    title: 'Hukum Kesehatan',
    desc: 'Akta persetujuan medis, informed consent, dan medikolegal.',
    icon: <FileCheck size={32} />
  },
  {
    title: 'Hukum Umum',
    desc: 'Konsultasi hukum umum, surat kuasa, dan perizinan.',
    icon: <Scale size={32} />
  }
];

const UserHome = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
    // TODO: Implement search logic
    console.log('Searching for:', query);
  };

  const handleRegionSearch = (regionData) => {
    // TODO: Implement region-based search
    console.log('Searching by region:', regionData);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
      {/* Left Panel - Informational */}
      <div className="lg:w-2/5 space-y-6">
        {/* Breadcrumb */}
        <nav className="text-sm text-brand-muted dark:text-brand-light/70">
          <span className="hover:text-brand-primary cursor-pointer">Beranda</span>
          <span className="mx-2">/</span>
          <span className="text-brand-dark dark:text-brand-light font-semibold">Cari Notaris</span>
        </nav>

        {/* Main Heading */}
        <div>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-brand-dark dark:text-brand-light leading-tight">
            Cari Notaris di NotaryID
          </h1>
          <p className="mt-4 text-base sm:text-lg text-brand-muted dark:text-brand-light/80 leading-relaxed">
            Layanan notaris digital yang siap siaga untuk bantu kamu mengurus dokumen legal dengan mudah dan terpercaya.
          </p>
        </div>

        {/* Call to Action */}
        <div className="rounded-2xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 dark:border-brand-primary/30 p-6">
          <p className="text-brand-dark dark:text-brand-light font-medium">
            Silakan pilih kategori layanan dan lokasi untuk menemukan notaris terpercaya sesuai kebutuhan Anda.
          </p>
        </div>

        {/* Why Choose Section */}
        <div className="space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-brand-dark dark:text-brand-light">
            Mengapa Cari Notaris di NotaryID?
          </h2>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <FileText className="text-brand-primary" size={24} />
              </div>
              <div>
                <p className="text-brand-dark dark:text-brand-light font-medium">
                  Satu platform untuk berbagai kebutuhan
                </p>
                <p className="text-sm text-brand-muted dark:text-brand-light/70 mt-1">
                  Periksa notaris, buat akta, legalisasi dokumen hingga konsultasi hukum dalam satu aplikasi.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <CheckCircle className="text-brand-primary" size={24} />
              </div>
              <div>
                <p className="text-brand-dark dark:text-brand-light font-medium">
                  Notaris terverifikasi dan terpercaya
                </p>
                <p className="text-sm text-brand-muted dark:text-brand-light/70 mt-1">
                  Semua notaris di platform telah terverifikasi dan memiliki izin praktik resmi.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex-shrink-0 mt-1">
                <Shield className="text-brand-primary" size={24} />
              </div>
              <div>
                <p className="text-brand-dark dark:text-brand-light font-medium">
                  Dokumen aman dan terjamin
                </p>
                <p className="text-sm text-brand-muted dark:text-brand-light/70 mt-1">
                  Semua dokumen dienkripsi dan dilindungi sesuai standar keamanan data yang berlaku.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Interactive */}
      <div className="lg:w-3/5 space-y-6">
        {/* Search Bar */}
        <div className="rounded-2xl bg-brand-surface dark:bg-brand-dark shadow-sm border border-brand-muted/30 dark:border-brand-light/10 p-6">
          <SearchBar
            placeholder="Cari notaris, spesialis atau layanan"
            onSearch={handleSearch}
          />
        </div>

        {/* Region Search */}
        <div className="rounded-2xl bg-brand-surface dark:bg-brand-dark shadow-sm border border-brand-muted/30 dark:border-brand-light/10 p-6">
          <h3 className="text-lg sm:text-xl font-bold text-brand-dark dark:text-brand-light mb-2">
            Cari Notaris atau Spesialisasi
          </h3>
          <p className="text-sm text-brand-muted dark:text-brand-light/70 mb-4">
            Pilih kategori yang tersedia sesuai kebutuhan Anda
          </p>
          <RegionSearchBar onSearch={handleRegionSearch} />
        </div>

        {/* Categories Grid */}
        <div className="rounded-2xl bg-brand-surface dark:bg-brand-dark shadow-sm border border-brand-muted/30 dark:border-brand-light/10 p-6">
          <h3 className="text-lg sm:text-xl font-bold text-brand-dark dark:text-brand-light mb-4">
            Kategori Layanan
          </h3>
          <div className="max-h-[500px] overflow-y-auto pr-2">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((item) => (
                <CategoryCard
                  key={item.title}
                  icon={item.icon}
                  title={item.title}
                  desc={item.desc}
                  onClick={() => {
                    // TODO: Navigate to category page or filter
                    console.log('Category clicked:', item.title);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserHome;

