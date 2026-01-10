import { createSlice } from '@reduxjs/toolkit';

// Dummy data notaris dengan lokasi dan kategori layanan
const dummyNotaries = [
  // Jakarta - Akta Perusahaan
  {
    id: 'n001',
    name: 'Dr. Ahmad Rizki, S.H., M.Kn.',
    email: 'ahmad.rizki@notaris.id',
    phone: '021-12345678',
    address: 'Jl. Sudirman No. 45, Jakarta Pusat',
    province: { id: '31', name: 'DKI Jakarta' },
    regency: { id: '3173', name: 'Jakarta Pusat' },
    district: { id: '317301', name: 'Gambir' },
    categories: ['Akta Perusahaan', 'Korporasi & Kontrak'],
    experience: '15 tahun',
    rating: 4.8,
    verified: true,
    description: 'Spesialis pendirian PT, CV, yayasan dan perubahan anggaran dasar.'
  },
  {
    id: 'n002',
    name: 'Dra. Siti Nurhaliza, S.H., M.Kn.',
    email: 'siti.nurhaliza@notaris.id',
    phone: '021-87654321',
    address: 'Jl. Thamrin No. 12, Jakarta Pusat',
    province: { id: '31', name: 'DKI Jakarta' },
    regency: { id: '3173', name: 'Jakarta Pusat' },
    district: { id: '317301', name: 'Gambir' },
    categories: ['Akta Perusahaan', 'Korporasi & Kontrak', 'Pembiayaan & Fidusia'],
    experience: '12 tahun',
    rating: 4.9,
    verified: true,
    description: 'Ahli dalam pendirian badan usaha dan perjanjian komersial.'
  },
  {
    id: 'n003',
    name: 'Budi Santoso, S.H., M.Kn.',
    email: 'budi.santoso@notaris.id',
    phone: '021-23456789',
    address: 'Jl. Kuningan No. 88, Jakarta Selatan',
    province: { id: '31', name: 'DKI Jakarta' },
    regency: { id: '3174', name: 'Jakarta Selatan' },
    district: { id: '317401', name: 'Kebayoran Baru' },
    categories: ['Akta Tanah & Properti', 'Legalisasi & Waarmerking'],
    experience: '18 tahun',
    rating: 4.7,
    verified: true,
    description: 'Expert dalam transaksi properti dan legalisasi dokumen.'
  },
  {
    id: 'n004',
    name: 'Indah Permata, S.H., M.Kn.',
    email: 'indah.permata@notaris.id',
    phone: '021-34567890',
    address: 'Jl. Kemang Raya No. 15, Jakarta Selatan',
    province: { id: '31', name: 'DKI Jakarta' },
    regency: { id: '3174', name: 'Jakarta Selatan' },
    district: { id: '317402', name: 'Kebayoran Lama' },
    categories: ['Akta Tanah & Properti', 'Perdata Keluarga'],
    experience: '10 tahun',
    rating: 4.6,
    verified: true,
    description: 'Spesialis jual beli tanah dan akta waris keluarga.'
  },
  {
    id: 'n005',
    name: 'Dr. Hendra Wijaya, S.H., M.Kn.',
    email: 'hendra.wijaya@notaris.id',
    phone: '021-45678901',
    address: 'Jl. Gajah Mada No. 30, Jakarta Barat',
    province: { id: '31', name: 'DKI Jakarta' },
    regency: { id: '3172', name: 'Jakarta Barat' },
    district: { id: '317201', name: 'Taman Sari' },
    categories: ['Legalisasi & Waarmerking', 'Hukum Umum'],
    experience: '20 tahun',
    rating: 4.9,
    verified: true,
    description: 'Layanan legalisasi dan konsultasi hukum umum.'
  },
  {
    id: 'n006',
    name: 'Ratna Dewi, S.H., M.Kn.',
    email: 'ratna.dewi@notaris.id',
    phone: '021-56789012',
    address: 'Jl. Cikini Raya No. 25, Jakarta Pusat',
    province: { id: '31', name: 'DKI Jakarta' },
    regency: { id: '3173', name: 'Jakarta Pusat' },
    district: { id: '317304', name: 'Menteng' },
    categories: ['Perdata Keluarga', 'Mediasi & Arbitrase'],
    experience: '14 tahun',
    rating: 4.8,
    verified: true,
    description: 'Ahli dalam masalah keluarga dan penyelesaian sengketa.'
  },
  {
    id: 'n007',
    name: 'Dr. Agus Setiawan, S.H., M.Kn.',
    email: 'agus.setiawan@notaris.id',
    phone: '021-67890123',
    address: 'Jl. HR Rasuna Said No. 50, Jakarta Selatan',
    province: { id: '31', name: 'DKI Jakarta' },
    regency: { id: '3174', name: 'Jakarta Selatan' },
    district: { id: '317403', name: 'Setiabudi' },
    categories: ['Pembiayaan & Fidusia', 'Hukum Pidana'],
    experience: '16 tahun',
    rating: 4.7,
    verified: true,
    description: 'Spesialis pembiayaan, fidusia dan hukum pidana.'
  },
  {
    id: 'n008',
    name: 'Maya Sari, S.H., M.Kn.',
    email: 'maya.sari@notaris.id',
    phone: '021-78901234',
    address: 'Jl. Senopati No. 8, Jakarta Selatan',
    province: { id: '31', name: 'DKI Jakarta' },
    regency: { id: '3174', name: 'Jakarta Selatan' },
    district: { id: '317401', name: 'Kebayoran Baru' },
    categories: ['Korporasi & Kontrak', 'Hukum Perburuhan'],
    experience: '11 tahun',
    rating: 4.6,
    verified: true,
    description: 'Expert dalam kontrak bisnis dan hukum ketenagakerjaan.'
  },
  {
    id: 'n009',
    name: 'Dr. Joko Susilo, S.H., M.Kn.',
    email: 'joko.susilo@notaris.id',
    phone: '021-89012345',
    address: 'Jl. Pluit Raya No. 20, Jakarta Utara',
    province: { id: '31', name: 'DKI Jakarta' },
    regency: { id: '3171', name: 'Jakarta Utara' },
    district: { id: '317101', name: 'Penjaringan' },
    categories: ['Hukum Pidana', 'Hukum Pajak'],
    experience: '19 tahun',
    rating: 4.8,
    verified: true,
    description: 'Ahli dalam hukum pidana dan perpajakan.'
  },
  {
    id: 'n010',
    name: 'Sari Indrawati, S.H., M.Kn.',
    email: 'sari.indrawati@notaris.id',
    phone: '021-90123456',
    address: 'Jl. Panglima Polim No. 5, Jakarta Selatan',
    province: { id: '31', name: 'DKI Jakarta' },
    regency: { id: '3174', name: 'Jakarta Selatan' },
    district: { id: '317401', name: 'Kebayoran Baru' },
    categories: ['Hukum Perburuhan', 'Hukum Kesehatan'],
    experience: '13 tahun',
    rating: 4.7,
    verified: true,
    description: 'Spesialis hukum ketenagakerjaan dan kesehatan.'
  },
  {
    id: 'n011',
    name: 'Dr. Rudi Hartono, S.H., M.Kn.',
    email: 'rudi.hartono@notaris.id',
    phone: '021-01234567',
    address: 'Jl. Kebon Jeruk No. 33, Jakarta Barat',
    province: { id: '31', name: 'DKI Jakarta' },
    regency: { id: '3172', name: 'Jakarta Barat' },
    district: { id: '317202', name: 'Tambora' },
    categories: ['Hukum Pajak', 'Mediasi & Arbitrase'],
    experience: '17 tahun',
    rating: 4.9,
    verified: true,
    description: 'Expert dalam hukum pajak dan arbitrase komersial.'
  },
  {
    id: 'n012',
    name: 'Lina Kusuma, S.H., M.Kn.',
    email: 'lina.kusuma@notaris.id',
    phone: '021-12345098',
    address: 'Jl. Fatmawati No. 42, Jakarta Selatan',
    province: { id: '31', name: 'DKI Jakarta' },
    regency: { id: '3174', name: 'Jakarta Selatan' },
    district: { id: '317404', name: 'Cilandak' },
    categories: ['Hukum Kesehatan', 'Hukum Umum'],
    experience: '15 tahun',
    rating: 4.6,
    verified: true,
    description: 'Ahli dalam hukum kesehatan dan konsultasi umum.'
  },
  
  // Bandung - Notaris untuk berbagai kategori
  {
    id: 'n013',
    name: 'Dr. Dedi Kurniawan, S.H., M.Kn.',
    email: 'dedi.kurniawan@notaris.id',
    phone: '022-12345678',
    address: 'Jl. Dago No. 100, Bandung',
    province: { id: '32', name: 'Jawa Barat' },
    regency: { id: '3273', name: 'Kota Bandung' },
    district: { id: '327301', name: 'Coblong' },
    categories: ['Akta Perusahaan', 'Korporasi & Kontrak'],
    experience: '14 tahun',
    rating: 4.8,
    verified: true,
    description: 'Spesialis pendirian perusahaan di Bandung dan sekitarnya.'
  },
  {
    id: 'n014',
    name: 'Sari Wahyuni, S.H., M.Kn.',
    email: 'sari.wahyuni@notaris.id',
    phone: '022-23456789',
    address: 'Jl. Asia Afrika No. 150, Bandung',
    province: { id: '32', name: 'Jawa Barat' },
    regency: { id: '3273', name: 'Kota Bandung' },
    district: { id: '327302', name: 'Sukajadi' },
    categories: ['Akta Tanah & Properti', 'Legalisasi & Waarmerking'],
    experience: '16 tahun',
    rating: 4.7,
    verified: true,
    description: 'Expert dalam transaksi properti di Jawa Barat.'
  },
  {
    id: 'n015',
    name: 'Dr. Andi Pratama, S.H., M.Kn.',
    email: 'andi.pratama@notaris.id',
    phone: '022-34567890',
    address: 'Jl. Setiabudi No. 200, Bandung',
    province: { id: '32', name: 'Jawa Barat' },
    regency: { id: '3273', name: 'Kota Bandung' },
    district: { id: '327303', name: 'Cidadap' },
    categories: ['Perdata Keluarga', 'Mediasi & Arbitrase'],
    experience: '12 tahun',
    rating: 4.9,
    verified: true,
    description: 'Ahli dalam hukum keluarga dan mediasi.'
  },
  
  // Surabaya - Notaris untuk berbagai kategori
  {
    id: 'n016',
    name: 'Dr. Bambang Sutrisno, S.H., M.Kn.',
    email: 'bambang.sutrisno@notaris.id',
    phone: '031-12345678',
    address: 'Jl. Diponegoro No. 55, Surabaya',
    province: { id: '35', name: 'Jawa Timur' },
    regency: { id: '3578', name: 'Kota Surabaya' },
    district: { id: '357801', name: 'Genteng' },
    categories: ['Akta Perusahaan', 'Pembiayaan & Fidusia'],
    experience: '18 tahun',
    rating: 4.8,
    verified: true,
    description: 'Spesialis perusahaan dan pembiayaan di Surabaya.'
  },
  {
    id: 'n017',
    name: 'Dewi Lestari, S.H., M.Kn.',
    email: 'dewi.lestari@notaris.id',
    phone: '031-23456789',
    address: 'Jl. Pemuda No. 77, Surabaya',
    province: { id: '35', name: 'Jawa Timur' },
    regency: { id: '3578', name: 'Kota Surabaya' },
    district: { id: '357802', name: 'Bubutan' },
    categories: ['Akta Tanah & Properti', 'Hukum Perburuhan'],
    experience: '15 tahun',
    rating: 4.7,
    verified: true,
    description: 'Expert dalam properti dan hukum ketenagakerjaan.'
  },
  {
    id: 'n018',
    name: 'Dr. Eko Prasetyo, S.H., M.Kn.',
    email: 'eko.prasetyo@notaris.id',
    phone: '031-34567890',
    address: 'Jl. Raya Darmo No. 90, Surabaya',
    province: { id: '35', name: 'Jawa Timur' },
    regency: { id: '3578', name: 'Kota Surabaya' },
    district: { id: '357803', name: 'Wonokromo' },
    categories: ['Hukum Pidana', 'Hukum Pajak'],
    experience: '20 tahun',
    rating: 4.9,
    verified: true,
    description: 'Ahli dalam hukum pidana dan perpajakan.'
  },
  
  // Yogyakarta - Notaris untuk berbagai kategori
  {
    id: 'n019',
    name: 'Dr. Fitri Handayani, S.H., M.Kn.',
    email: 'fitri.handayani@notaris.id',
    phone: '0274-1234567',
    address: 'Jl. Malioboro No. 1, Yogyakarta',
    province: { id: '34', name: 'DI Yogyakarta' },
    regency: { id: '3471', name: 'Kota Yogyakarta' },
    district: { id: '347101', name: 'Gondomanan' },
    categories: ['Legalisasi & Waarmerking', 'Hukum Umum'],
    experience: '13 tahun',
    rating: 4.8,
    verified: true,
    description: 'Layanan legalisasi dan konsultasi hukum umum di Yogyakarta.'
  },
  {
    id: 'n020',
    name: 'Guntur Wijaya, S.H., M.Kn.',
    email: 'guntur.wijaya@notaris.id',
    phone: '0274-2345678',
    address: 'Jl. Solo No. 25, Yogyakarta',
    province: { id: '34', name: 'DI Yogyakarta' },
    regency: { id: '3471', name: 'Kota Yogyakarta' },
    district: { id: '347102', name: 'Danurejan' },
    categories: ['Perdata Keluarga', 'Hukum Kesehatan'],
    experience: '11 tahun',
    rating: 4.6,
    verified: true,
    description: 'Spesialis hukum keluarga dan kesehatan.'
  },
  
  // Medan - Notaris untuk berbagai kategori
  {
    id: 'n021',
    name: 'Dr. Heru Santoso, S.H., M.Kn.',
    email: 'heru.santoso@notaris.id',
    phone: '061-1234567',
    address: 'Jl. Gatot Subroto No. 88, Medan',
    province: { id: '12', name: 'Sumatera Utara' },
    regency: { id: '1275', name: 'Kota Medan' },
    district: { id: '127501', name: 'Medan Kota' },
    categories: ['Akta Perusahaan', 'Korporasi & Kontrak'],
    experience: '17 tahun',
    rating: 4.8,
    verified: true,
    description: 'Spesialis perusahaan dan kontrak bisnis di Medan.'
  },
  {
    id: 'n022',
    name: 'Intan Permata, S.H., M.Kn.',
    email: 'intan.permata@notaris.id',
    phone: '061-2345678',
    address: 'Jl. SM Raja No. 50, Medan',
    province: { id: '12', name: 'Sumatera Utara' },
    regency: { id: '1275', name: 'Kota Medan' },
    district: { id: '127502', name: 'Medan Sunggal' },
    categories: ['Akta Tanah & Properti', 'Mediasi & Arbitrase'],
    experience: '14 tahun',
    rating: 4.7,
    verified: true,
    description: 'Expert dalam properti dan penyelesaian sengketa.'
  }
];

const initialState = {
  notaries: dummyNotaries,
  filteredNotaries: [],
  searchParams: null
};

const notarySlice = createSlice({
  name: 'notary',
  initialState,
  reducers: {
    searchNotaries: (state, action) => {
      const { province, regency, district, category } = action.payload;
      
      let filtered = [...state.notaries];
      
      // Filter berdasarkan provinsi
      if (province) {
        filtered = filtered.filter(
          (notary) => notary.province.id === province.id || notary.province.name === province.name
        );
      }
      
      // Filter berdasarkan kota/kabupaten
      if (regency) {
        filtered = filtered.filter(
          (notary) => notary.regency.id === regency.id || notary.regency.name === regency.name
        );
      }
      
      // Filter berdasarkan kecamatan (jika dipilih)
      if (district) {
        filtered = filtered.filter(
          (notary) => notary.district.id === district.id || notary.district.name === district.name
        );
      }
      
      // Filter berdasarkan kategori (jika dipilih)
      if (category) {
        filtered = filtered.filter((notary) =>
          notary.categories.includes(category)
        );
      }
      
      state.filteredNotaries = filtered;
      state.searchParams = { province, regency, district, category };
    },
    clearSearch: (state) => {
      state.filteredNotaries = [];
      state.searchParams = null;
    },
    getAllNotaries: (state) => {
      state.filteredNotaries = state.notaries;
    }
  }
});

// Helper function untuk check apakah kategori tersedia di lokasi tertentu
export const checkCategoryAvailability = (notaries, province, regency, district, category) => {
  let filtered = [...notaries];
  
  // Filter berdasarkan provinsi
  if (province) {
    filtered = filtered.filter(
      (notary) => notary.province.id === province.id || notary.province.name === province.name
    );
  }
  
  // Filter berdasarkan kota/kabupaten
  if (regency) {
    filtered = filtered.filter(
      (notary) => notary.regency.id === regency.id || notary.regency.name === regency.name
    );
  }
  
  // Filter berdasarkan kecamatan (jika dipilih)
  if (district) {
    filtered = filtered.filter(
      (notary) => notary.district.id === district.id || notary.district.name === district.name
    );
  }
  
  // Filter berdasarkan kategori
  if (category) {
    filtered = filtered.filter((notary) =>
      notary.categories.includes(category)
    );
  }
  
  return filtered.length > 0;
};

export const { searchNotaries, clearSearch, getAllNotaries } = notarySlice.actions;
export default notarySlice.reducer;
