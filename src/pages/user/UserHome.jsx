import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FileSignature, ShieldCheck, Users, Building2, Stamp, MapPin, Phone, CheckCircle, FileText, Shield, Scale, Briefcase, Handshake, FileCheck, Gavel, Landmark, ChevronDown, ChevronUp, Star, Mail, ThumbsUp, MessageCircle, Loader2, ArrowLeft } from 'lucide-react';
import SearchBar from '../../components/user/SearchBar';
import RegionSearchBar from '../../components/user/RegionSearchBar';
import CategoryCard from '../../components/user/CategoryCard';
import NotaryResults from '../../components/user/NotaryResults';
import NotaryDetail from '../../components/user/NotaryDetail';
import PaymentConfirmation from '../../components/user/PaymentConfirmation';
import PaymentMethodSelection from '../../components/user/PaymentMethodSelection';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { searchNotaries, clearSearch, checkCategoryAvailability } from '../../store/notarySlice';
import { addConsultation } from '../../store/consultationSlice';
import LoginModal from '../../components/user/LoginModal';
import SuccessModal from '../../components/user/SuccessModal';
import waveSvg from '../../assets/waves.svg';

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
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [isContentExpanded, setIsContentExpanded] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null); // Store selected location setelah button diklik
  const [showCategoryGrid, setShowCategoryGrid] = useState(true); // Control whether to show category grid or notary results
  const [isSearching, setIsSearching] = useState(false); // Loading state untuk pencarian
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false); // State untuk modal login
  const [pendingNotary, setPendingNotary] = useState(null); // Store notary yang akan dikonsultasikan setelah login
  const [selectedNotary, setSelectedNotary] = useState(null); // Store notary yang dipilih untuk detail
  const [showPaymentConfirmation, setShowPaymentConfirmation] = useState(false); // State untuk payment confirmation
  const [showPaymentMethodSelection, setShowPaymentMethodSelection] = useState(false); // State untuk payment method selection
  const [notaryToConsult, setNotaryToConsult] = useState(null); // Store notary untuk konsultasi
  const [paymentTotal, setPaymentTotal] = useState(0); // Store total payment amount
  const [showSuccessModal, setShowSuccessModal] = useState(false); // State untuk success modal
  const [successMessage, setSuccessMessage] = useState(''); // Store success message
  
  const { filteredNotaries, searchParams, notaries } = useAppSelector((state) => state.notary);
  const { selectedProvince, selectedRegency, selectedDistrict } = useAppSelector((state) => state.region);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);


  const handleSearch = (query) => {
    setSearchQuery(query);
    // TODO: Implement text search logic
    console.log('Searching for:', query);
  };

  const handleRegionSearch = async (regionData) => {
    // Ambil data dari form provinsi, kota, dan kecamatan
    const { province, regency, district } = regionData;
    
    // Reset state sebelum search
    setSelectedCategory(null);
    setShowCategoryGrid(true);
    dispatch(clearSearch());
    
    // Tampilkan loading
    setIsSearching(true);
    
    // Simulasi loading (bisa diganti dengan actual API call)
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Simpan lokasi yang dipilih setelah loading selesai
    // Ini akan membuat kategori muncul karena isLocationSelected akan true
    setSelectedLocation({ province, regency, district });
    setIsSearching(false);
    
    // Kategori sekarang akan muncul karena selectedLocation sudah di-set
  };

  // Callback ketika ada perubahan di form (untuk reset kategori ke default)
  const handleLocationChange = () => {
    // Reset semua state ke default
    setSelectedLocation(null);
    setSelectedCategory(null);
    setShowCategoryGrid(true);
    dispatch(clearSearch());
    setIsSearching(false);
  };

  const handleCategoryClick = (categoryTitle) => {
    // Cek apakah lokasi sudah dipilih (hanya dari selectedLocation, karena ini di-set setelah button diklik)
    if (!selectedLocation || !selectedLocation.province || !selectedLocation.regency) {
      return; // Jangan lakukan apa-apa jika lokasi belum dipilih (belum klik button "Cari Notaris")
    }
    
    const currentLocation = selectedLocation;
    
    // Cek apakah kategori tersedia di lokasi tersebut
    if (!isCategoryAvailable(categoryTitle)) {
      return; // Jangan lakukan apa-apa jika kategori tidak tersedia
    }
    
    // Jika kategori yang sama diklik lagi (deselect), kembali ke grid kategori
    if (selectedCategory === categoryTitle) {
      setSelectedCategory(null);
      setShowCategoryGrid(true);
      dispatch(clearSearch());
      return;
    }
    
    // Set kategori baru
    const newCategory = categoryTitle;
    setSelectedCategory(newCategory);
    
    // Simpan lokasi jika belum ada di state
    if (!selectedLocation) {
      setSelectedLocation(currentLocation);
    }
    
    // Lakukan pencarian berdasarkan lokasi yang sudah dipilih dan kategori yang diklik
    dispatch(searchNotaries({
      province: currentLocation.province,
      regency: currentLocation.regency,
      district: currentLocation.district || null,
      category: newCategory
    }));
    
    // Ganti tampilan dari grid kategori ke list notaris
    setShowCategoryGrid(false);
  };

  const handleClearSearch = () => {
    dispatch(clearSearch());
    setSelectedCategory(null);
    setSelectedLocation(null);
    setShowCategoryGrid(true);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    setShowCategoryGrid(true);
    dispatch(clearSearch());
  };

  // Handle klik button Konsultasi
  const handleConsultationClick = (notary) => {
    // Cek apakah user sudah login
    if (!isAuthenticated) {
      // Simpan notary yang akan dikonsultasikan
      setPendingNotary(notary);
      // Tampilkan modal login
      setIsLoginModalOpen(true);
    } else {
      // User sudah login, lanjutkan ke konsultasi
      handleStartConsultation(notary);
    }
  };

  // Handle start konsultasi setelah login
  const handleStartConsultation = (notary) => {
    // Tampilkan payment confirmation
    setNotaryToConsult(notary);
    setShowPaymentConfirmation(true);
  };

  // Handle payment confirmation - redirect ke payment method selection
  const handlePaymentConfirm = (paymentData) => {
    // Simpan total payment dan tampilkan payment method selection
    setPaymentTotal(paymentData.total);
    setShowPaymentConfirmation(false);
    setShowPaymentMethodSelection(true);
  };

  // Handle back dari payment confirmation
  const handleBackFromPayment = () => {
    setShowPaymentConfirmation(false);
    setNotaryToConsult(null);
  };

  // Handle back dari payment method selection
  const handleBackFromPaymentMethod = () => {
    setShowPaymentMethodSelection(false);
    setShowPaymentConfirmation(true); // Kembali ke payment confirmation
  };

  // Handle payment completion
  const handlePay = (paymentData) => {
    if (!notaryToConsult) {
      alert('Data notaris tidak ditemukan');
      return;
    }

    // Format tanggal dan waktu
    const now = new Date();
    const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    
    const dayName = days[now.getDay()];
    const day = now.getDate();
    const month = months[now.getMonth()];
    const formattedDate = `${dayName}, ${day} ${month}`;
    
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')} ${ampm}`;

    // Buat konsultasi baru
    const newConsultation = {
      notaryId: notaryToConsult.id,
      notaryName: notaryToConsult.name,
      notarySpecialization: notaryToConsult.categories[0] || 'Notaris',
      notaryImage: null,
      date: formattedDate,
      time: formattedTime,
      location: '-', // Online consultation
      paymentAmount: paymentData.totalAmount,
      paymentMethod: paymentData.paymentMethod || 'Unknown'
    };

    // Tambahkan konsultasi ke Redux store
    dispatch(addConsultation(newConsultation));

    // Set success message
    setSuccessMessage(`Pembayaran sebesar Rp ${paymentData.totalAmount.toLocaleString('id-ID')} berhasil! Konsultasi dengan ${notaryToConsult.name} akan segera dimulai.`);

    // Reset states
    setShowPaymentMethodSelection(false);
    setNotaryToConsult(null);
    setSelectedNotary(null);
    setShowCategoryGrid(false);
    
    // Tampilkan success modal
    setShowSuccessModal(true);
  };

  // Handle success modal confirm (redirect to konsultasi aktif)
  const handleSuccessConfirm = () => {
    setShowSuccessModal(false);
    navigate('/konsultasi-aktif');
  };

  // Handle setelah login berhasil
  const handleLoginSuccess = () => {
    setIsLoginModalOpen(false);
    // Jika ada pending notary, langsung start konsultasi
    if (pendingNotary) {
      handleStartConsultation(pendingNotary);
      setPendingNotary(null);
    }
  };

  // Handle klik card notaris untuk melihat detail
  const handleNotaryCardClick = (notary) => {
    setSelectedNotary(notary);
  };

  // Handle back dari detail
  const handleBackFromDetail = () => {
    setSelectedNotary(null);
  };
  
  // Cek apakah lokasi sudah dipilih (hanya dari selectedLocation, karena ini di-set setelah button diklik)
  // JANGAN gunakan Redux state langsung, harus melalui button "Cari Notaris" dulu
  const isLocationSelected = Boolean(
    selectedLocation && selectedLocation.province && selectedLocation.regency
  );

  // Function untuk check apakah kategori tersedia di lokasi yang dipilih
  const isCategoryAvailable = (categoryTitle) => {
    if (!isLocationSelected || !selectedLocation) return false; // Jika lokasi belum dipilih (belum klik button), kategori tidak available
    
    if (!selectedLocation.province || !selectedLocation.regency) {
      return false;
    }
    
    return checkCategoryAvailability(
      notaries,
      selectedLocation.province,
      selectedLocation.regency,
      selectedLocation.district || null,
      categoryTitle
    );
  };

  return (
    <div className="relative min-h-screen">
      <div className="flex flex-col w-full relative z-10 py-8 px-4 sm:px-6 lg:px-8 xl:px-12 space-y-6">
        {/* Row 1: Main Heading & Why Choose Section */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left: Main Heading */}
          <div className="lg:w-1/2 space-y-6">
            <div>
              <h1 className="text-xl sm:text-4xl lg:text-2xl font-black text-brand-dark dark:text-brand-light leading-tight">
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
          </div>

          {/* Right: Why Choose Section */}
          <div className="lg:w-1/2 space-y-4">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-dark dark:text-brand-light">
              Mengapa Cari Notaris di NotaryID?
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary text-white">
                  <FileText size={24} />
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
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary text-white">
                  <CheckCircle size={24} />
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
                <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-full bg-brand-primary text-white">
                  <Shield size={24} />
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

        {/* Row 2: Search Sections & Categories */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-start">
          {/* Left: Search Bar & Region Search (Flex Column) */}
          <div className="lg:w-1/2 flex flex-col gap-6 w-full">
            {/* Search Bar */}
            <div className="rounded-2xl bg-brand-surface dark:bg-brand-dark shadow-sm border border-brand-muted/30 dark:border-brand-light/10 p-6">
              <h3 className="text-lg sm:text-xl font-bold text-brand-dark dark:text-brand-light mb-4">
                Cari Notaris atau Layanan
              </h3>
              <SearchBar
                placeholder="Cari notaris, spesialis atau layanan"
                onSearch={handleSearch}
              />
            </div>

            {/* Region Search */}
            <div className="rounded-2xl bg-brand-surface dark:bg-brand-dark shadow-sm border border-brand-muted/30 dark:border-brand-light/10 p-6">
              <h3 className="text-lg sm:text-xl font-bold text-brand-dark dark:text-brand-light mb-2">
                Cari Berdasarkan Lokasi
              </h3>
              <p className="text-sm text-brand-muted dark:text-brand-light/70 mb-4">
                Pilih provinsi, kota/kabupaten, dan kecamatan (opsional) untuk menemukan notaris di wilayah Anda
              </p>
              <RegionSearchBar 
                onSearch={handleRegionSearch} 
                onLocationChange={handleLocationChange}
                isSearching={isSearching}
              />
              {isLocationSelected && !isSearching && (
                <div className="mt-4 rounded-lg bg-status-success/10 dark:bg-status-success/20 border border-status-success/30 dark:border-status-success/40 px-3 py-2 text-xs text-brand-dark dark:text-brand-light/80">
                  ✓ Lokasi sudah dipilih. Silakan pilih kategori layanan di sebelah kanan.
                </div>
              )}
              {isSearching && (
                <div className="mt-4 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/30 dark:border-brand-primary/40 px-3 py-2 text-xs text-brand-dark dark:text-brand-light/80 flex items-center gap-2">
                  <Loader2 size={14} className="animate-spin text-brand-primary" />
                  <span>Mencari notaris di lokasi yang dipilih...</span>
                </div>
              )}
            </div>
          </div>

          {/* Right: Categories Grid or Notary Results */}
          <div className="lg:w-1/2 w-full">
            {showCategoryGrid ? (
            <div className="rounded-2xl bg-brand-surface dark:bg-brand-dark shadow-sm border border-brand-muted/30 dark:border-brand-light/10 p-6 h-full flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg sm:text-xl font-bold text-brand-dark dark:text-brand-light">
                Kategori Layanan
              </h3>
                </div>
                {!isLocationSelected ? (
                  <div className="flex-1 flex flex-col items-center justify-center py-12 px-4 text-center">
                    <MapPin size={64} className="text-brand-muted dark:text-brand-light/30 mb-4" />
                    <h4 className="text-lg font-semibold text-brand-dark dark:text-brand-light mb-2">
                      {selectedProvince && selectedRegency 
                        ? 'Klik "Cari Notaris" untuk Melanjutkan'
                        : 'Pilih Lokasi Terlebih Dahulu'}
                    </h4>
                    <p className="text-sm text-brand-muted dark:text-brand-light/70 max-w-sm">
                      {selectedProvince && selectedRegency 
                        ? 'Silakan klik tombol "Cari Notaris" di form pencarian lokasi untuk melihat kategori layanan yang tersedia.'
                        : 'Silakan pilih provinsi dan kota/kabupaten di form pencarian lokasi, lalu klik tombol "Cari Notaris" untuk melihat kategori layanan yang tersedia.'}
                    </p>
                    {selectedProvince && selectedRegency && !isSearching && (
                      <div className="mt-4 px-4 py-2 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 border border-brand-primary/30">
                        <p className="text-xs text-brand-primary font-medium">
                          Lokasi siap: {selectedProvince.name} → {selectedRegency.name}
                          {selectedDistrict && ` → ${selectedDistrict.name}`}
                        </p>
                      </div>
                    )}
                  </div>
                ) : (
              <div className="flex-1 overflow-y-auto pr-2 pt-2 z-10">
                    <div className="mb-4 rounded-lg bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 dark:border-brand-primary/30 px-4 py-3">
                      <p className="text-xs text-brand-dark dark:text-brand-light/80 mb-1">
                        <span className="font-semibold">Lokasi dipilih:</span>
                      </p>
                      <p className="text-xs text-brand-muted dark:text-brand-light/70">
                        {selectedLocation.province.name} → {selectedLocation.regency.name}
                        {selectedLocation.district && ` → ${selectedLocation.district.name}`}
                      </p>
                    </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
                      {categories.map((item) => {
                        const isAvailable = isCategoryAvailable(item.title);
                        const isUnavailable = isLocationSelected && !isAvailable;
                        
                        return (
                    <CategoryCard
                      key={item.title}
                      icon={item.icon}
                      title={item.title}
                      desc={item.desc}
                            onClick={() => handleCategoryClick(item.title)}
                            isSelected={selectedCategory === item.title}
                            disabled={isUnavailable}
                            unavailableMessage={isUnavailable ? "Tidak ada notaris di kategori ini untuk lokasi yang dipilih" : undefined}
                          />
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="rounded-2xl bg-brand-surface dark:bg-brand-dark shadow-sm border border-brand-muted/30 dark:border-brand-light/10 p-6 h-full flex flex-col">
                {showPaymentMethodSelection && paymentTotal > 0 ? (
                  /* Payment Method Selection View */
                  <div className="flex-1 overflow-y-auto pr-2 pt-2 z-10">
                    <button
                      onClick={handleBackFromPaymentMethod}
                      className="flex items-center gap-2 text-sm text-brand-primary hover:opacity-80 transition mb-4"
                    >
                      <ArrowLeft size={18} />
                      Kembali
                    </button>
                    <div className="bg-white dark:bg-brand-dark rounded-xl border border-brand-muted/20 dark:border-brand-light/10 p-6">
                      <PaymentMethodSelection
                        totalAmount={paymentTotal}
                        onBack={handleBackFromPaymentMethod}
                        onPay={handlePay}
                        isCompact={true}
                      />
                    </div>
                  </div>
                ) : showPaymentConfirmation && notaryToConsult && user ? (
                  /* Payment Confirmation View */
                  <div className="flex-1 overflow-y-auto pr-2 pt-2 z-10">
                    <button
                      onClick={handleBackFromPayment}
                      className="flex items-center gap-2 text-sm text-brand-primary hover:opacity-80 transition mb-4"
                    >
                      <ArrowLeft size={18} />
                      Kembali ke Detail Notaris
                    </button>
                    <div className="bg-white dark:bg-brand-dark rounded-xl border border-brand-muted/20 dark:border-brand-light/10 p-6">
                      <PaymentConfirmation
                        notary={notaryToConsult}
                        user={user}
                        onBack={handleBackFromPayment}
                        onConfirm={handlePaymentConfirm}
                        isCompact={true}
                      />
                    </div>
                  </div>
                ) : selectedNotary ? (
                  /* Detail Notaris View */
                  <div className="flex-1 overflow-y-auto pr-2 pt-2 z-10">
                    <button
                      onClick={handleBackFromDetail}
                      className="flex items-center gap-2 text-sm text-brand-primary hover:opacity-80 transition mb-4"
                    >
                      <ArrowLeft size={18} />
                      Kembali ke Daftar Notaris
                    </button>
                    <div className="bg-white dark:bg-brand-dark rounded-xl border border-brand-muted/20 dark:border-brand-light/10 p-6">
                      <NotaryDetail
                        notary={selectedNotary}
                        onBack={handleBackFromDetail}
                        onConsultationClick={handleConsultationClick}
                        isCompact={true}
                      />
                    </div>
                  </div>
                ) : (
                  /* List Notaris View */
                  <>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-lg sm:text-xl font-bold text-brand-dark dark:text-brand-light">
                          {selectedCategory ? `Notaris - ${selectedCategory}` : 'Hasil Pencarian Notaris'}
                        </h3>
                        <p className="text-xs text-brand-muted dark:text-brand-light/70 mt-1">
                          {(selectedLocation || {})?.province?.name || selectedProvince?.name} → {(selectedLocation || {})?.regency?.name || selectedRegency?.name}
                        </p>
                      </div>
                      <button
                        onClick={handleBackToCategories}
                        className="text-sm text-brand-primary hover:opacity-80 transition flex items-center gap-2 px-3 py-2 rounded-lg border border-brand-primary/20 hover:bg-brand-primary/5"
                      >
                        ← Kembali ke Kategori
                      </button>
                    </div>
                    <div className="flex-1 overflow-y-auto pr-2 pt-2 z-10">
                      {filteredNotaries.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
                          {filteredNotaries.map((notary) => (
                            <div
                              key={notary.id}
                              onClick={() => handleNotaryCardClick(notary)}
                              className="rounded-2xl bg-white dark:bg-brand-dark border border-brand-muted/20 dark:border-brand-light/10 p-5 hover:shadow-xl hover:-translate-y-1 transition-all relative cursor-pointer"
                            >
                          {/* Profile Section */}
                          <div className="flex gap-4 mb-4">
                            {/* Profile Picture */}
                            <div className="flex-shrink-0 relative">
                              <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/40 dark:from-brand-primary/30 dark:to-brand-primary/50 flex items-center justify-center overflow-hidden shadow-sm">
                                <Building2 size={36} className="text-brand-primary" />
                              </div>
                              {notary.verified && (
                                <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-brand-primary flex items-center justify-center border-2 border-white dark:border-brand-dark shadow-sm">
                                  <CheckCircle size={14} className="text-white fill-white" />
                                </div>
                              )}
                            </div>

                            {/* Name and Info */}
                            <div className="flex-1 min-w-0">
                              <h4 className="text-base font-bold text-brand-dark dark:text-brand-light mb-1 line-clamp-1">
                                {notary.name}
                              </h4>
                              <p className="text-xs font-medium text-brand-primary mb-2 line-clamp-1">
                                {notary.categories[0] || 'Notaris'}
                              </p>
                              
                              {/* Experience and Rating */}
                              <div className="flex items-center gap-4 text-xs mt-3">
                                <div className="flex items-center gap-1.5">
                                  <Briefcase size={14} className="text-brand-muted dark:text-brand-light/60" />
                                  <span className="text-brand-muted dark:text-brand-light/70 font-medium">{notary.experience}</span>
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

                          {/* Location */}
                          <div className="flex items-start gap-2 mb-4 text-xs bg-brand-muted/5 dark:bg-brand-muted/10 rounded-lg p-2.5">
                            <MapPin size={14} className="text-brand-muted dark:text-brand-light/60 mt-0.5 flex-shrink-0" />
                            <span className="text-brand-muted dark:text-brand-light/70 line-clamp-2 leading-relaxed">
                              {notary.address}, {notary.district.name}, {notary.regency.name}
                            </span>
                          </div>

                          {/* Categories Tags */}
                          <div className="flex flex-wrap gap-1.5 mb-4">
                            {notary.categories.slice(0, 2).map((category) => (
                              <span
                                key={category}
                                className={`px-2.5 py-1 rounded-lg text-xs font-semibold ${
                                  category === selectedCategory
                                    ? 'bg-brand-primary text-white shadow-sm'
                                    : 'bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary border border-brand-primary/20'
                                }`}
                              >
                                {category}
                              </span>
                            ))}
                            {notary.categories.length > 2 && (
                              <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-brand-muted/20 dark:bg-brand-muted/30 text-brand-muted dark:text-brand-light/70 border border-brand-muted/30">
                                +{notary.categories.length - 2}
                              </span>
                            )}
                          </div>

                          {/* Action Button */}
                          <div className="pt-4 border-t border-brand-muted/20" onClick={(e) => e.stopPropagation()}>
                            <button
                              type="button"
                              onClick={() => handleConsultationClick(notary)}
                              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-primary hover:bg-brand-primary/90 active:bg-brand-primary/95 text-white font-bold text-sm transition-all shadow-md hover:shadow-lg"
                            >
                              <MessageCircle size={18} className="fill-white" />
                              Konsultasi
                            </button>
                          </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                          <Building2 size={64} className="text-brand-muted dark:text-brand-light/30 mb-4" />
                          <h4 className="text-lg font-semibold text-brand-dark dark:text-brand-light mb-2">
                            Tidak ada notaris ditemukan
                          </h4>
                          <p className="text-sm text-brand-muted dark:text-brand-light/70 mb-4 max-w-sm">
                            Tidak ada notaris yang ditemukan untuk kategori "{selectedCategory}" di wilayah yang dipilih.
                          </p>
                          <button
                            onClick={handleBackToCategories}
                            className="px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-semibold hover:opacity-90 transition"
                          >
                            Pilih Kategori Lain
                          </button>
                        </div>
                      )}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Informational Content Section */}
      <div className="w-full mt-12 lg:mt-16">
        <div className="w-full px-4 sm:px-6 lg:px-8 xl:px-12">
          {/* Mobile: Collapsible Header */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsContentExpanded(!isContentExpanded)}
              className="w-full flex items-center justify-between p-4 rounded-xl bg-brand-surface dark:bg-brand-dark border border-brand-muted/30 dark:border-brand-light/10 shadow-sm"
            >
              <h2 className="text-lg font-bold text-brand-dark dark:text-brand-light">
                Informasi Layanan Notaris & PPAT
              </h2>
              {isContentExpanded ? (
                <ChevronUp className="text-brand-primary" size={20} />
              ) : (
                <ChevronDown className="text-brand-primary" size={20} />
              )}
            </button>
          </div>

          {/* Content Container */}
          <div
            className={`${
              isContentExpanded ? 'block' : 'hidden'
            } lg:block mt-4 lg:mt-0 rounded-2xl bg-brand-surface dark:bg-brand-dark border border-brand-muted/30 dark:border-brand-light/10 shadow-sm p-6 sm:p-8 lg:p-10`}
          >
            <div className="prose prose-sm sm:prose-sm lg:prose-base max-w-none dark:prose-invert">
              {/* Main Title */}
              <h1 className="text-xl sm:text-2xl lg:text-2xl font-black text-brand-dark dark:text-brand-light mb-4 lg:mb-6">
                Tanya Notaris dan PPAT Terpercaya di NotaryID
              </h1>

              {/* Introduction */}
              <p className="text-sm sm:text-base text-brand-muted dark:text-brand-light/80 leading-relaxed mb-6">
                Kini kamu bisa konsultasi hukum dan pengurusan dokumen otentik langsung dari website NotaryID. Layanan legalitas online terpercaya di Indonesia ini memiliki daftar Notaris dan PPAT pilihan terbaik yang ahli di bidangnya masing-masing. Mulai dari Notaris Umum yang membantu urusan legalisir dan surat kuasa, hingga PPAT berpengalaman untuk urusan pertanahan.
              </p>

              <p className="text-sm sm:text-base text-brand-muted dark:text-brand-light/80 leading-relaxed mb-8">
                Tersedia berbagai spesialisasi layanan, mulai dari pendirian badan usaha (PT/CV), pengurusan AJB dan Sertifikat Tanah, hingga hukum waris dan perjanjian pranikah. Semua Notaris akan memberikan solusi legalitas yang kamu butuhkan untuk memberikan kepastian hukum atas aset dan bisnis kamu. Jangan tunggu sampai muncul sengketa, langsung konsultasikan rencana hukum kamu agar ditangani secara tepat hanya di NotaryID!
              </p>

              {/* Why Choose Section */}
              <h2 className="text-lg sm:text-xl lg:text-xl font-bold text-brand-dark dark:text-brand-light mt-8 mb-4">
                Mengapa Pilih Tanya Notaris di NotaryID?
              </h2>

              <p className="text-sm sm:text-base text-brand-muted dark:text-brand-light/80 leading-relaxed mb-6">
                Memilih NotaryID akan mempertemukan kamu dengan pejabat publik profesional secara cepat. Tidak perlu repot mencari kantor Notaris terdekat dan terjebak macet. Kami memastikan kamu mendapatkan pelayanan terbaik dari tim Notaris dan PPAT di seluruh Indonesia yang terhubung langsung secara online.
              </p>

              <p className="text-sm sm:text-base text-brand-muted dark:text-brand-light/80 leading-relaxed mb-6">
                Fasilitas ini bisa kamu gunakan untuk menjawab pelbagai masalah legalitas yang sering dialami seperti Pendirian PT/CV, Pembuatan Akta Jual Beli (AJB), hingga Balik Nama Sertifikat. Selain itu, kamu juga bisa memastikan keamanan transaksi besar seperti sewa-menyewa properti, pembuatan Akta Hibah, hingga pengurusan Hak Tanggungan untuk jaminan bank. Masalah yang sering menjadi pertanyaan seperti pembagian Waris, pembuatan Yayasan, hingga pendaftaran Merek dan Hak Cipta juga bisa dikonsultasikan di sini.
              </p>

              <p className="text-sm sm:text-base text-brand-muted dark:text-brand-light/80 leading-relaxed mb-8">
                Kamu bisa melakukan diskusi hukum, menanyakan syarat-syarat dokumen, estimasi biaya (PNBP), hingga rekomendasi struktur organisasi perusahaan yang baik sebagai upaya perlindungan hukum terhadap bisnis maupun aset pribadi kamu.
              </p>

              {/* Features Grid */}
              <div className="grid sm:grid-cols-2 gap-6 mb-8">
                <div className="p-6 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 dark:border-brand-primary/30">
                  <h3 className="text-base font-bold text-brand-dark dark:text-brand-light mb-2">
                    Pejabat Publik Berpengalaman di Seluruh Indonesia
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-light/70">
                    Notaris di NotaryID adalah praktisi hukum resmi yang terverifikasi oleh Kemenkumham dan Ikatan Notaris Indonesia (INI). Kamu bisa terhubung langsung dengan cepat dan mudah, serta tidak perlu meragukan keabsahan dokumen dan saran hukum yang diberikan.
                  </p>
                </div>

                <div className="p-6 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 dark:border-brand-primary/30">
                  <h3 className="text-base font-bold text-brand-dark dark:text-brand-light mb-2">
                    Privasi dan Kerahasiaan Dokumen Terjaga
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-light/70">
                    Tak perlu khawatir, sesuai dengan UU Jabatan Notaris, semua percakapan dan draf dokumen hukummu akan terjaga kerahasiaannya. Kami menggunakan enkripsi tingkat tinggi untuk memastikan data sensitif kamu tetap aman.
                  </p>
                </div>
              </div>

              {/* Additional Services */}
              <h3 className="text-base sm:text-lg lg:text-lg font-bold text-brand-dark dark:text-brand-light mt-8 mb-4">
                Layanan Legalitas Online Terbaik di Indonesia
              </h3>

              <p className="text-sm sm:text-base text-brand-muted dark:text-brand-light/80 leading-relaxed mb-8">
                Tidak sebatas tanya Notaris saja, NotaryID juga menyajikan berbagai artikel edukasi hukum dan berita regulasi terkini (seperti aturan terbaru OSS RBA atau perpajakan tanah). Ada banyak kategori informasi untuk tips bisnis, panduan properti, hingga pengetahuan umum yang bermanfaat agar kamu lebih waspada dan sadar hukum.
              </p>

              {/* How to Contact */}
              <h3 className="text-base sm:text-lg lg:text-lg font-bold text-brand-dark dark:text-brand-light mt-8 mb-4">
                Cara Menghubungi Notaris Online
              </h3>

              <p className="text-sm sm:text-base text-brand-muted dark:text-brand-light/80 leading-relaxed mb-6">
                Konsultasi dengan Notaris secara online bisa dilakukan dengan cepat. Hanya dengan tiga langkah mudah, kamu bisa terhubung dengan ahli hukum yang kamu butuhkan 24 jam.
              </p>

              <div className="space-y-4 mb-8">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary text-white font-bold text-base">
                    1
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base text-brand-dark dark:text-brand-light font-medium mb-1">
                      Pilih Notaris/PPAT Terbaik
                    </p>
                    <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-light/70">
                      Pilih dari daftar Notaris/PPAT terbaik yang tersedia berdasarkan wilayah jabatan atau spesialisasi yang sesuai dengan kebutuhan legalitasmu.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary text-white font-bold text-base">
                    2
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base text-brand-dark dark:text-brand-light font-medium mb-1">
                      Kirim Permintaan Konsultasi
                    </p>
                    <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-light/70">
                      Notaris atau staf ahli akan menyetujui permintaan kamu segera untuk memulai sesi diskusi.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 rounded-full bg-brand-primary text-white font-bold text-base">
                    3
                  </div>
                  <div className="flex-1">
                    <p className="text-sm sm:text-base text-brand-dark dark:text-brand-light font-medium mb-1">
                      Bicara dengan Notaris
                    </p>
                    <p className="text-xs sm:text-sm text-brand-muted dark:text-brand-light/70">
                      Jelaskan kebutuhanmu, unggah foto dokumen pendukung jika diperlukan, dan dapatkan arahan hukum yang jelas serta jadwal pertemuan untuk tanda tangan akta.
                    </p>
                  </div>
                </div>
              </div>

              {/* Important Note */}
              <div className="p-4 rounded-xl bg-status-warning/10 dark:bg-status-warning/20 border border-status-warning/30 dark:border-status-warning/40">
                <p className="text-sm sm:text-base text-brand-dark dark:text-brand-light font-medium">
                  <strong>Catatan Penting:</strong> Tanda tangan akta wajib dilakukan secara tatap muka sesuai dengan undang-undang yang berlaku.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => {
          setIsLoginModalOpen(false);
          setPendingNotary(null);
        }}
        onLoginSuccess={handleLoginSuccess}
      />

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        title="Pembayaran Berhasil!"
        message={successMessage}
        buttonText="OK"
        onConfirm={handleSuccessConfirm}
      />
    </div>
  );
};

export default UserHome;

