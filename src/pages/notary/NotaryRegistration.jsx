import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, ChevronRight, ChevronLeft, Upload, X, FileText, Shield, Clock } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import { fetchProvinces, fetchRegencies, fetchDistricts } from '../../store/regionSlice';
import Dropdown from '../../components/common/Dropdown';

const NotaryRegistration = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { provinces, regencies, districts } = useAppSelector((state) => state.region);

  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const appEnv = import.meta.env.VITE_APP_ENV || import.meta.env.MODE;
  const DEV_MODE = appEnv === 'development';

  // Step 1: Akun & Informasi Dasar
  const [formData, setFormData] = useState({
    // Step 1
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    whatsapp: '',
    
    // Step 2
    province: null,
    regency: null,
    district: null,
    officeAddress: '',
    skNotaris: '',
    noAnggotaINI: '',
    isPPAT: false,
    skPPAT: '',
    
    // Step 3
    skNotarisFile: null,
    ktpFile: null,
    
    // Step 4
    specializations: [],
    operatingHours: {
      start: '08:00',
      end: '17:00'
    }
  });

  const [errors, setErrors] = useState({});
  const [dragActive, setDragActive] = useState({ skNotaris: false, ktp: false });

  // Specialization options - sama dengan categories di dummyNotaries
  // Maksimal 5 kategori yang bisa dipilih
  const specializationOptions = [
    'Akta Perusahaan',
    'Akta Tanah & Properti',
    'Legalisasi & Waarmerking',
    'Perdata Keluarga',
    'Korporasi & Kontrak'
  ];

  // Handle form input change
  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    // Clear error when user types
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle nested object change
  const handleNestedChange = (parent, field, value) => {
    setFormData(prev => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };

  // Handle file upload
  const handleFileUpload = (field, file) => {
    if (file) {
      // Validate file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [field]: 'File harus berupa PDF atau gambar (JPG/PNG)'
        }));
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors(prev => ({
          ...prev,
          [field]: 'Ukuran file maksimal 5MB'
        }));
        return;
      }

      handleChange(field, file);
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  // Handle drag and drop
  const handleDrag = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(prev => ({ ...prev, [field]: true }));
    } else if (e.type === 'dragleave') {
      setDragActive(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleDrop = (e, field) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(prev => ({ ...prev, [field]: false }));
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(field, e.dataTransfer.files[0]);
    }
  };

  // Handle specialization toggle
  // Maksimal 5 kategori yang bisa dipilih
  const toggleSpecialization = (spec) => {
    setFormData(prev => {
      if (prev.specializations.includes(spec)) {
        // Remove if already selected
        return {
          ...prev,
          specializations: prev.specializations.filter(s => s !== spec)
        };
      } else {
        // Add only if less than 5 selected
        if (prev.specializations.length >= 5) {
          // Show error or alert
          setErrors(prev => ({
            ...prev,
            specializations: 'Maksimal 5 spesialisasi yang dapat dipilih'
          }));
          return prev;
        }
        // Clear error if adding successfully
        setErrors(prev => {
          const newErrors = { ...prev };
          delete newErrors.specializations;
          return newErrors;
        });
        return {
          ...prev,
          specializations: [...prev.specializations, spec]
        };
      }
    });
  };

  // Validation
  const validateStep = (step) => {
    const newErrors = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email wajib diisi';
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        newErrors.email = 'Format email tidak valid';
      }
      
      if (!formData.password) newErrors.password = 'Password wajib diisi';
      else if (formData.password.length < 8) {
        newErrors.password = 'Password minimal 8 karakter';
      }
      
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Password tidak cocok';
      }
      
      if (!formData.fullName) newErrors.fullName = 'Nama lengkap wajib diisi';
      
      if (!formData.whatsapp) newErrors.whatsapp = 'No. WhatsApp wajib diisi';
      else if (!/^[0-9+\-\s()]+$/.test(formData.whatsapp)) {
        newErrors.whatsapp = 'Format nomor tidak valid';
      }
    }

    if (step === 2) {
      if (!formData.province) newErrors.province = 'Provinsi wajib dipilih';
      if (!formData.regency) newErrors.regency = 'Kota/Kabupaten wajib dipilih';
      if (!formData.officeAddress) newErrors.officeAddress = 'Alamat kantor wajib diisi';
      if (!formData.skNotaris) newErrors.skNotaris = 'No. SK Notaris wajib diisi';
      if (!formData.noAnggotaINI) newErrors.noAnggotaINI = 'No. Anggota INI wajib diisi';
      if (formData.isPPAT && !formData.skPPAT) {
        newErrors.skPPAT = 'No. SK PPAT wajib diisi jika Anda adalah PPAT';
      }
    }

    if (step === 3) {
      if (!formData.skNotarisFile) newErrors.skNotarisFile = 'File SK Notaris wajib diupload';
      if (!formData.ktpFile) newErrors.ktpFile = 'File KTP wajib diupload';
    }

    if (step === 4) {
      if (formData.specializations.length === 0) {
        newErrors.specializations = 'Pilih minimal 1 spesialisasi';
      } else if (formData.specializations.length > 5) {
        newErrors.specializations = 'Maksimal 5 spesialisasi yang dapat dipilih';
      }
    }

    // Step 5 (Review) doesn't need validation

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle next step
  const handleNext = () => {
    // Step 5 (review) doesn't need validation, directly submit
    if (currentStep === 5) {
      handleSubmit();
      return;
    }
    
    // Validate current step before moving forward
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(prev => prev + 1);
      } else {
        handleSubmit();
      }
    }
  };

  // Handle previous step
  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  // Handle direct step navigation (Development mode only)
  const handleStepClick = (step) => {
    if (DEV_MODE) {
      setCurrentStep(step);
    } else {
      // In production, only allow navigation to completed steps or next step
      if (step <= currentStep + 1) {
        // Validate current step before moving
        if (step > currentStep && !validateStep(currentStep)) {
          return; // Don't allow moving forward if current step is invalid
        }
        setCurrentStep(step);
      }
    }
  };

  // Handle form submit
  const handleSubmit = () => {
    // Step 5 is review, no validation needed
    // TODO: Submit to backend
    console.log('Form submitted:', formData);
    // Navigate to confirmation page with form data
    navigate('/notary/register/confirmation', { 
      state: { formData } 
    });
  };

  // Load regencies when province is selected
  const handleProvinceSelect = (province) => {
    handleChange('province', province);
    handleChange('regency', null);
    handleChange('district', null);
    if (province) {
      dispatch(fetchRegencies(province.id));
    }
  };

  // Load districts when regency is selected
  const handleRegencySelect = (regency) => {
    handleChange('regency', regency);
    handleChange('district', null);
    if (regency) {
      dispatch(fetchDistricts(regency.id));
    }
  };

  // Load provinces on mount
  useEffect(() => {
    if (provinces.length === 0) {
      dispatch(fetchProvinces());
    }
  }, [dispatch, provinces.length]);

  // Calculate progress
  const progress = (currentStep / totalSteps) * 100;

  // Format file name for display
  const formatFileName = (file) => {
    if (!file) return '-';
    return file.name;
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (!bytes) return '-';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen bg-brand-light dark:bg-brand-dark/50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-brand-dark dark:text-brand-light mb-2">
            Daftar sebagai Notaris
          </h1>
          <p className="text-brand-muted dark:text-brand-light/70">
            Lengkapi data Anda untuk bergabung dengan platform NotaryID
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          {/* Development Mode Indicator */}
          {DEV_MODE && (
            <div className="mb-4 p-3 rounded-xl bg-status-warning/10 border border-status-warning/20">
              <p className="text-xs font-semibold text-status-warning text-center">
                🔧 DEVELOPMENT MODE: Klik nomor step untuk navigasi langsung
                <br />
                <span className="text-[10px] opacity-75">
                  (MODE: {import.meta.env.MODE}, APP_ENV: {import.meta.env.VITE_APP_ENV || 'not set'})
                </span>
              </p>
            </div>
          )}
          
          <div className="flex items-center justify-between mb-2">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center flex-1">
                <div className="flex items-center">
                  <button
                    type="button"
                    onClick={() => handleStepClick(step)}
                    disabled={!DEV_MODE && step > currentStep + 1}
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition ${
                      step <= currentStep
                        ? 'bg-brand-primary text-white'
                        : 'bg-brand-muted/20 dark:bg-brand-muted/30 text-brand-muted dark:text-brand-light/50'
                    } ${
                      DEV_MODE
                        ? 'cursor-pointer hover:scale-110 hover:shadow-lg active:scale-95'
                        : step > currentStep + 1
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer hover:opacity-80'
                    } ${
                      step === currentStep ? 'ring-2 ring-brand-primary ring-offset-2' : ''
                    }`}
                    title={
                      DEV_MODE
                        ? `Klik untuk langsung ke Step ${step}`
                        : step > currentStep + 1
                        ? 'Lengkapi step sebelumnya terlebih dahulu'
                        : `Step ${step}`
                    }
                  >
                    {step < currentStep ? (
                      <CheckCircle size={20} />
                    ) : (
                      step
                    )}
                  </button>
                </div>
                {step < 4 && (
                  <div
                    className={`flex-1 h-1 mx-2 transition ${
                      step < currentStep
                        ? 'bg-brand-primary'
                        : 'bg-brand-muted/20 dark:bg-brand-muted/30'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="w-full bg-brand-muted/20 dark:bg-brand-muted/30 rounded-full h-2">
            <div
              className="bg-brand-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Form Card */}
        <div className="bg-white dark:bg-brand-dark rounded-2xl shadow-lg border border-brand-muted/30 dark:border-brand-light/10 p-6 sm:p-8">
          {/* Step 1: Akun & Informasi Dasar */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-brand-dark dark:text-brand-light mb-2">
                  Akun & Informasi Dasar
                </h2>
                <p className="text-sm text-brand-muted dark:text-brand-light/70">
                  Lengkapi informasi akun dan data pribadi Anda
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                    Email <span className="text-status-danger">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleChange('email', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.email
                        ? 'border-status-danger'
                        : 'border-brand-muted/40 dark:border-brand-light/20'
                    } bg-brand-surface dark:bg-brand-dark text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary/50`}
                    placeholder="nama@email.com"
                  />
                  {errors.email && (
                    <p className="text-xs text-status-danger mt-1">{errors.email}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                      Password <span className="text-status-danger">*</span>
                    </label>
                    <input
                      type="password"
                      value={formData.password}
                      onChange={(e) => handleChange('password', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.password
                          ? 'border-status-danger'
                          : 'border-brand-muted/40 dark:border-brand-light/20'
                      } bg-brand-surface dark:bg-brand-dark text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary/50`}
                      placeholder="Minimal 8 karakter"
                    />
                    {errors.password && (
                      <p className="text-xs text-status-danger mt-1">{errors.password}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                      Konfirmasi Password <span className="text-status-danger">*</span>
                    </label>
                    <input
                      type="password"
                      value={formData.confirmPassword}
                      onChange={(e) => handleChange('confirmPassword', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.confirmPassword
                          ? 'border-status-danger'
                          : 'border-brand-muted/40 dark:border-brand-light/20'
                      } bg-brand-surface dark:bg-brand-dark text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary/50`}
                      placeholder="Ulangi password"
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-status-danger mt-1">{errors.confirmPassword}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                    Nama Lengkap (dengan Gelar) <span className="text-status-danger">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.fullName
                        ? 'border-status-danger'
                        : 'border-brand-muted/40 dark:border-brand-light/20'
                    } bg-brand-surface dark:bg-brand-dark text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary/50`}
                    placeholder="Dr. Ahmad Rizki, S.H., M.Kn."
                  />
                  {errors.fullName && (
                    <p className="text-xs text-status-danger mt-1">{errors.fullName}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                    No. WhatsApp Aktif <span className="text-status-danger">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.whatsapp}
                    onChange={(e) => handleChange('whatsapp', e.target.value)}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.whatsapp
                        ? 'border-status-danger'
                        : 'border-brand-muted/40 dark:border-brand-light/20'
                    } bg-brand-surface dark:bg-brand-dark text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary/50`}
                    placeholder="+62 812 3456 7890"
                  />
                  {errors.whatsapp && (
                    <p className="text-xs text-status-danger mt-1">{errors.whatsapp}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Identitas Profesi & Yurisdiksi */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-brand-dark dark:text-brand-light mb-2">
                  Identitas Profesi & Yurisdiksi
                </h2>
                <p className="text-sm text-brand-muted dark:text-brand-light/70">
                  Informasi profesional dan wilayah jabatan Anda
                </p>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                      Provinsi <span className="text-status-danger">*</span>
                    </label>
                    <Dropdown
                      placeholder="Pilih Provinsi"
                      options={provinces.map(p => ({ id: p.id, name: p.name, value: p.id }))}
                      selectedValue={formData.province}
                      onSelect={handleProvinceSelect}
                      error={errors.province}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                      Kota/Kabupaten <span className="text-status-danger">*</span>
                    </label>
                    <Dropdown
                      placeholder="Pilih Kota/Kabupaten"
                      options={(regencies[formData.province?.id] || []).map(r => ({ id: r.id, name: r.name, value: r.id }))}
                      selectedValue={formData.regency}
                      onSelect={handleRegencySelect}
                      disabled={!formData.province}
                      error={errors.regency}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                      Kecamatan (Opsional)
                    </label>
                    <Dropdown
                      placeholder="Pilih Kecamatan"
                      options={(districts[formData.regency?.id] || []).map(d => ({ id: d.id, name: d.name, value: d.id }))}
                      selectedValue={formData.district}
                      onSelect={(district) => handleChange('district', district)}
                      disabled={!formData.regency}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                    Alamat Kantor Lengkap <span className="text-status-danger">*</span>
                  </label>
                  <textarea
                    value={formData.officeAddress}
                    onChange={(e) => handleChange('officeAddress', e.target.value)}
                    rows={3}
                    className={`w-full px-4 py-3 rounded-xl border ${
                      errors.officeAddress
                        ? 'border-status-danger'
                        : 'border-brand-muted/40 dark:border-brand-light/20'
                    } bg-brand-surface dark:bg-brand-dark text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary/50`}
                    placeholder="Jl. Contoh No. 123, RT/RW, Kelurahan, Kecamatan"
                  />
                  {errors.officeAddress && (
                    <p className="text-xs text-status-danger mt-1">{errors.officeAddress}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                      No. SK Notaris (Kemenkumham) <span className="text-status-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.skNotaris}
                      onChange={(e) => handleChange('skNotaris', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.skNotaris
                          ? 'border-status-danger'
                          : 'border-brand-muted/40 dark:border-brand-light/20'
                      } bg-brand-surface dark:bg-brand-dark text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary/50`}
                      placeholder="SK-XXXX-XXXX"
                    />
                    {errors.skNotaris && (
                      <p className="text-xs text-status-danger mt-1">{errors.skNotaris}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                      No. Anggota INI <span className="text-status-danger">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.noAnggotaINI}
                      onChange={(e) => handleChange('noAnggotaINI', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border ${
                        errors.noAnggotaINI
                          ? 'border-status-danger'
                          : 'border-brand-muted/40 dark:border-brand-light/20'
                      } bg-brand-surface dark:bg-brand-dark text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary/50`}
                      placeholder="INI-XXXX-XXXX"
                    />
                    {errors.noAnggotaINI && (
                      <p className="text-xs text-status-danger mt-1">{errors.noAnggotaINI}</p>
                    )}
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.isPPAT}
                      onChange={(e) => handleChange('isPPAT', e.target.checked)}
                      className="w-5 h-5 rounded border-brand-muted/40 dark:border-brand-light/20 text-brand-primary focus:ring-brand-primary"
                    />
                    <span className="text-sm font-semibold text-brand-dark dark:text-brand-light">
                      Apakah Anda juga pejabat PPAT?
                    </span>
                  </label>

                  {formData.isPPAT && (
                    <div className="mt-4">
                      <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                        No. SK PPAT <span className="text-status-danger">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.skPPAT}
                        onChange={(e) => handleChange('skPPAT', e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border ${
                          errors.skPPAT
                            ? 'border-status-danger'
                            : 'border-brand-muted/40 dark:border-brand-light/20'
                        } bg-brand-surface dark:bg-brand-dark text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary/50`}
                        placeholder="SK-PPAT-XXXX-XXXX"
                      />
                      {errors.skPPAT && (
                        <p className="text-xs text-status-danger mt-1">{errors.skPPAT}</p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Upload Dokumen */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-brand-dark dark:text-brand-light mb-2">
                  Upload Dokumen
                </h2>
                <p className="text-sm text-brand-muted dark:text-brand-light/70">
                  Upload dokumen verifikasi Anda (PDF atau gambar, maks. 5MB)
                </p>
              </div>

              <div className="space-y-6">
                {/* SK Notaris Upload */}
                <div>
                  <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                    File Scan SK Notaris <span className="text-status-danger">*</span>
                  </label>
                  <div
                    onDragEnter={(e) => handleDrag(e, 'skNotaris')}
                    onDragLeave={(e) => handleDrag(e, 'skNotaris')}
                    onDragOver={(e) => handleDrag(e, 'skNotaris')}
                    onDrop={(e) => handleDrop(e, 'skNotaris')}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition ${
                      dragActive.skNotaris
                        ? 'border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10'
                        : errors.skNotarisFile
                        ? 'border-status-danger bg-status-danger/5'
                        : 'border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark'
                    }`}
                  >
                    {formData.skNotarisFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText size={24} className="text-brand-primary" />
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-brand-dark dark:text-brand-light">
                            {formData.skNotarisFile.name}
                          </p>
                          <p className="text-xs text-brand-muted dark:text-brand-light/70">
                            {(formData.skNotarisFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleChange('skNotarisFile', null)}
                          className="p-2 rounded-lg hover:bg-brand-muted/20 dark:hover:bg-brand-muted/30 transition"
                        >
                          <X size={20} className="text-brand-muted" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload size={48} className="mx-auto mb-4 text-brand-muted" />
                        <p className="text-sm text-brand-dark dark:text-brand-light mb-2">
                          Drag & drop file di sini atau klik untuk memilih
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload('skNotarisFile', e.target.files[0])}
                          className="hidden"
                          id="skNotarisFile"
                        />
                        <label
                          htmlFor="skNotarisFile"
                          className="inline-block px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition"
                        >
                          Pilih File
                        </label>
                      </div>
                    )}
                  </div>
                  {errors.skNotarisFile && (
                    <p className="text-xs text-status-danger mt-1">{errors.skNotarisFile}</p>
                  )}
                </div>

                {/* KTP Upload */}
                <div>
                  <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
                    File Scan KTP <span className="text-status-danger">*</span>
                  </label>
                  <div
                    onDragEnter={(e) => handleDrag(e, 'ktp')}
                    onDragLeave={(e) => handleDrag(e, 'ktp')}
                    onDragOver={(e) => handleDrag(e, 'ktp')}
                    onDrop={(e) => handleDrop(e, 'ktp')}
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition ${
                      dragActive.ktp
                        ? 'border-brand-primary bg-brand-primary/5 dark:bg-brand-primary/10'
                        : errors.ktpFile
                        ? 'border-status-danger bg-status-danger/5'
                        : 'border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark'
                    }`}
                  >
                    {formData.ktpFile ? (
                      <div className="flex items-center justify-center gap-3">
                        <FileText size={24} className="text-brand-primary" />
                        <div className="flex-1 text-left">
                          <p className="text-sm font-medium text-brand-dark dark:text-brand-light">
                            {formData.ktpFile.name}
                          </p>
                          <p className="text-xs text-brand-muted dark:text-brand-light/70">
                            {(formData.ktpFile.size / 1024 / 1024).toFixed(2)} MB
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleChange('ktpFile', null)}
                          className="p-2 rounded-lg hover:bg-brand-muted/20 dark:hover:bg-brand-muted/30 transition"
                        >
                          <X size={20} className="text-brand-muted" />
                        </button>
                      </div>
                    ) : (
                      <div>
                        <Upload size={48} className="mx-auto mb-4 text-brand-muted" />
                        <p className="text-sm text-brand-dark dark:text-brand-light mb-2">
                          Drag & drop file di sini atau klik untuk memilih
                        </p>
                        <input
                          type="file"
                          accept=".pdf,.jpg,.jpeg,.png"
                          onChange={(e) => handleFileUpload('ktpFile', e.target.files[0])}
                          className="hidden"
                          id="ktpFile"
                        />
                        <label
                          htmlFor="ktpFile"
                          className="inline-block px-4 py-2 rounded-lg bg-brand-primary text-white text-sm font-semibold cursor-pointer hover:opacity-90 transition"
                        >
                          Pilih File
                        </label>
                      </div>
                    )}
                  </div>
                  {errors.ktpFile && (
                    <p className="text-xs text-status-danger mt-1">{errors.ktpFile}</p>
                  )}
                </div>

                {/* Disclaimer */}
                <div className="p-4 rounded-xl bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20">
                  <div className="flex items-start gap-3">
                    <Shield size={20} className="text-brand-primary mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-brand-muted dark:text-brand-light/70">
                      <p className="font-semibold text-brand-dark dark:text-brand-light mb-1">
                        Keamanan & Privasi Data
                      </p>
                      <p>
                        Semua dokumen yang Anda upload akan dienkripsi dan disimpan dengan aman. 
                        Data Anda hanya akan digunakan untuk keperluan verifikasi dan tidak akan 
                        dibagikan kepada pihak ketiga tanpa persetujuan Anda.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Spesialisasi & Operasional */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-brand-dark dark:text-brand-light mb-2">
                  Spesialisasi & Operasional
                </h2>
                <p className="text-sm text-brand-muted dark:text-brand-light/70">
                  Pilih spesialisasi dan tentukan jam operasional kantor Anda
                </p>
              </div>

              <div className="space-y-6">
                {/* Specializations */}
                <div>
                  <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-3">
                    Spesialisasi <span className="text-status-danger">*</span>
                    <span className="text-xs font-normal text-brand-muted dark:text-brand-light/70 ml-2">
                      (Pilih maksimal 5 kategori)
                    </span>
                  </label>
                  <div className="mb-2">
                    <p className="text-xs text-brand-muted dark:text-brand-light/70">
                      Dipilih: {formData.specializations.length} / 5
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {specializationOptions.map((spec) => {
                      const isSelected = formData.specializations.includes(spec);
                      const isDisabled = !isSelected && formData.specializations.length >= 5;
                      
                      return (
                        <button
                          key={spec}
                          type="button"
                          onClick={() => toggleSpecialization(spec)}
                          disabled={isDisabled}
                          className={`px-4 py-2 rounded-xl border-2 transition ${
                            isSelected
                              ? 'border-brand-primary bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary font-semibold'
                              : isDisabled
                              ? 'border-brand-muted/20 dark:border-brand-light/10 text-brand-muted dark:text-brand-light/30 cursor-not-allowed opacity-50'
                              : 'border-brand-muted/40 dark:border-brand-light/20 text-brand-dark dark:text-brand-light hover:border-brand-primary/50'
                          }`}
                          title={isDisabled ? 'Maksimal 5 spesialisasi yang dapat dipilih' : ''}
                        >
                          {spec}
                        </button>
                      );
                    })}
                  </div>
                  {errors.specializations && (
                    <p className="text-xs text-status-danger mt-1">{errors.specializations}</p>
                  )}
                </div>

                {/* Operating Hours */}
                <div>
                  <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-3">
                    Jam Operasional Kantor
                  </label>
                  <div className="flex items-center gap-4">
                    <div className="flex-1">
                      <label className="block text-xs text-brand-muted dark:text-brand-light/70 mb-1">
                        Mulai
                      </label>
                      <div className="relative">
                        <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                        <input
                          type="time"
                          value={formData.operatingHours.start}
                          onChange={(e) => handleNestedChange('operatingHours', 'start', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                        />
                      </div>
                    </div>
                    <div className="pt-6">
                      <span className="text-brand-muted">sampai</span>
                    </div>
                    <div className="flex-1">
                      <label className="block text-xs text-brand-muted dark:text-brand-light/70 mb-1">
                        Selesai
                      </label>
                      <div className="relative">
                        <Clock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" />
                        <input
                          type="time"
                          value={formData.operatingHours.end}
                          onChange={(e) => handleNestedChange('operatingHours', 'end', e.target.value)}
                          className="w-full pl-10 pr-4 py-3 rounded-xl border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark text-brand-dark dark:text-brand-light focus:outline-none focus:ring-2 focus:ring-brand-primary/50"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Review & Summary */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div>
                <h2 className="text-xl font-bold text-brand-dark dark:text-brand-light mb-2">
                  Review & Konfirmasi Data
                </h2>
                <p className="text-sm text-brand-muted dark:text-brand-light/70">
                  Periksa kembali data Anda. Klik "Edit" untuk mengubah data di step tertentu.
                </p>
              </div>

              <div className="space-y-6">
                {/* Step 1 Review */}
                <div className="p-6 rounded-xl border border-brand-muted/30 dark:border-brand-light/10 bg-brand-surface dark:bg-brand-dark">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-light">
                      Step 1: Akun & Informasi Dasar
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="text-sm text-brand-primary hover:underline font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-brand-muted dark:text-brand-light/70 mb-1">Email</p>
                      <p className="text-brand-dark dark:text-brand-light font-medium">{formData.email || '-'}</p>
                    </div>
                    <div>
                      <p className="text-brand-muted dark:text-brand-light/70 mb-1">Nama Lengkap</p>
                      <p className="text-brand-dark dark:text-brand-light font-medium">{formData.fullName || '-'}</p>
                    </div>
                    <div>
                      <p className="text-brand-muted dark:text-brand-light/70 mb-1">No. WhatsApp</p>
                      <p className="text-brand-dark dark:text-brand-light font-medium">{formData.whatsapp || '-'}</p>
                    </div>
                  </div>
                </div>

                {/* Step 2 Review */}
                <div className="p-6 rounded-xl border border-brand-muted/30 dark:border-brand-light/10 bg-brand-surface dark:bg-brand-dark">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-light">
                      Step 2: Identitas Profesi & Yurisdiksi
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="text-sm text-brand-primary hover:underline font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-brand-muted dark:text-brand-light/70 mb-1">Wilayah Jabatan</p>
                      <p className="text-brand-dark dark:text-brand-light font-medium">
                        {formData.province?.name || '-'}
                        {formData.regency && ` → ${formData.regency.name}`}
                        {formData.district && ` → ${formData.district.name}`}
                      </p>
                    </div>
                    <div>
                      <p className="text-brand-muted dark:text-brand-light/70 mb-1">Alamat Kantor</p>
                      <p className="text-brand-dark dark:text-brand-light font-medium">{formData.officeAddress || '-'}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-brand-muted dark:text-brand-light/70 mb-1">No. SK Notaris</p>
                        <p className="text-brand-dark dark:text-brand-light font-medium">{formData.skNotaris || '-'}</p>
                      </div>
                      <div>
                        <p className="text-brand-muted dark:text-brand-light/70 mb-1">No. Anggota INI</p>
                        <p className="text-brand-dark dark:text-brand-light font-medium">{formData.noAnggotaINI || '-'}</p>
                      </div>
                    </div>
                    {formData.isPPAT && (
                      <div>
                        <p className="text-brand-muted dark:text-brand-light/70 mb-1">No. SK PPAT</p>
                        <p className="text-brand-dark dark:text-brand-light font-medium">{formData.skPPAT || '-'}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* Step 3 Review */}
                <div className="p-6 rounded-xl border border-brand-muted/30 dark:border-brand-light/10 bg-brand-surface dark:bg-brand-dark">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-light">
                      Step 3: Upload Dokumen
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(3)}
                      className="text-sm text-brand-primary hover:underline font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-brand-muted dark:text-brand-light/70 mb-1">File SK Notaris</p>
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-brand-primary" />
                        <p className="text-brand-dark dark:text-brand-light font-medium">
                          {formatFileName(formData.skNotarisFile)}
                        </p>
                        <span className="text-brand-muted dark:text-brand-light/70 text-xs">
                          ({formatFileSize(formData.skNotarisFile?.size)})
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-brand-muted dark:text-brand-light/70 mb-1">File KTP</p>
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-brand-primary" />
                        <p className="text-brand-dark dark:text-brand-light font-medium">
                          {formatFileName(formData.ktpFile)}
                        </p>
                        <span className="text-brand-muted dark:text-brand-light/70 text-xs">
                          ({formatFileSize(formData.ktpFile?.size)})
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Step 4 Review */}
                <div className="p-6 rounded-xl border border-brand-muted/30 dark:border-brand-light/10 bg-brand-surface dark:bg-brand-dark">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-brand-dark dark:text-brand-light">
                      Step 4: Spesialisasi & Operasional
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(4)}
                      className="text-sm text-brand-primary hover:underline font-medium"
                    >
                      Edit
                    </button>
                  </div>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-brand-muted dark:text-brand-light/70 mb-2">Spesialisasi</p>
                      <div className="flex flex-wrap gap-2">
                        {formData.specializations.length > 0 ? (
                          formData.specializations.map((spec) => (
                            <span
                              key={spec}
                              className="px-3 py-1 rounded-full text-xs font-medium bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary border border-brand-primary/20"
                            >
                              {spec}
                            </span>
                          ))
                        ) : (
                          <span className="text-brand-muted dark:text-brand-light/70">-</span>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-brand-muted dark:text-brand-light/70 mb-1">Jam Operasional</p>
                      <p className="text-brand-dark dark:text-brand-light font-medium">
                        {formData.operatingHours.start} - {formData.operatingHours.end}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-brand-muted/20 dark:border-brand-light/10">
            <button
              type="button"
              onClick={currentStep === 1 ? () => navigate('/notary/login') : handlePrevious}
              className="flex items-center gap-2 px-6 py-3 rounded-xl border border-brand-muted/40 dark:border-brand-light/20 text-brand-dark dark:text-brand-light font-semibold hover:bg-brand-muted/10 dark:hover:bg-brand-muted/20 transition"
            >
              <ChevronLeft size={20} />
              {currentStep === 1 ? 'Batal' : 'Kembali'}
            </button>

            <button
              type="button"
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-primary text-white font-semibold hover:opacity-90 transition"
            >
              {currentStep === totalSteps ? 'Daftar' : 'Lanjut'}
              {currentStep < totalSteps && <ChevronRight size={20} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotaryRegistration;
