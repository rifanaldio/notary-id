import PropTypes from 'prop-types';
import { useState, useEffect, useRef } from 'react';
import { Search, MapPin, ChevronDown, Loader2 } from 'lucide-react';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';
import {
  fetchProvinces,
  fetchRegencies,
  fetchDistricts,
  setSelectedProvince,
  setSelectedRegency,
  setSelectedDistrict
} from '../../store/regionSlice';

const RegionSearchBar = ({ onSearch }) => {
  const dispatch = useAppDispatch();
  const {
    provinces,
    regencies,
    districts,
    selectedProvince,
    selectedRegency,
    selectedDistrict,
    loading,
    error
  } = useAppSelector((state) => state.region);

  const [isProvinceOpen, setIsProvinceOpen] = useState(false);
  const [isRegencyOpen, setIsRegencyOpen] = useState(false);
  const [isDistrictOpen, setIsDistrictOpen] = useState(false);
  const provinceRef = useRef(null);
  const regencyRef = useRef(null);
  const districtRef = useRef(null);

  // Fetch provinces on mount
  useEffect(() => {
    if (provinces.length === 0 && !loading.provinces && !error.provinces) {
      dispatch(fetchProvinces());
    }
  }, [dispatch, provinces.length, loading.provinces, error.provinces]);

  // Fetch regencies when province is selected
  useEffect(() => {
    if (selectedProvince && !regencies[selectedProvince.id] && !loading.regencies) {
      dispatch(fetchRegencies(selectedProvince.id));
    }
  }, [dispatch, selectedProvince, regencies, loading.regencies]);

  // Fetch districts when regency is selected
  useEffect(() => {
    if (selectedRegency && !districts[selectedRegency.id] && !loading.districts) {
      dispatch(fetchDistricts(selectedRegency.id));
    }
  }, [dispatch, selectedRegency, districts, loading.districts]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (provinceRef.current && !provinceRef.current.contains(event.target)) {
        setIsProvinceOpen(false);
      }
      if (regencyRef.current && !regencyRef.current.contains(event.target)) {
        setIsRegencyOpen(false);
      }
      if (districtRef.current && !districtRef.current.contains(event.target)) {
        setIsDistrictOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleProvinceSelect = (province) => {
    dispatch(setSelectedProvince(province));
    setIsProvinceOpen(false);
  };

  const handleRegencySelect = (regency) => {
    dispatch(setSelectedRegency(regency));
    setIsRegencyOpen(false);
  };

  const handleDistrictSelect = (district) => {
    dispatch(setSelectedDistrict(district));
    setIsDistrictOpen(false);
  };

  const handleSearch = () => {
    // Search bisa dilakukan setelah regency terpilih (district optional)
    if (selectedProvince && selectedRegency) {
      onSearch?.({
        province: selectedProvince,
        regency: selectedRegency,
        district: selectedDistrict || null
      });
    }
  };

  const availableRegencies = selectedProvince ? regencies[selectedProvince.id] || [] : [];
  const availableDistricts = selectedRegency ? districts[selectedRegency.id] || [] : [];

  const isSearchDisabled = !selectedProvince || !selectedRegency;

  return (
    <div className="space-y-4">
      <div className="flex flex-col lg:flex-row gap-3">
        {/* Provinsi Dropdown */}
        <div className="flex-1 relative" ref={provinceRef}>
          <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
            Provinsi
          </label>
          <button
            type="button"
            onClick={() => {
              setIsProvinceOpen(!isProvinceOpen);
              setIsRegencyOpen(false);
              setIsDistrictOpen(false);
            }}
            disabled={loading.provinces}
            className="w-full flex items-center justify-between rounded-xl border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark px-4 py-3 shadow-sm hover:border-brand-primary transition text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className={selectedProvince ? 'text-brand-dark dark:text-brand-light' : 'text-brand-muted'}>
              {loading.provinces ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Memuat provinsi...
                </span>
              ) : selectedProvince ? (
                selectedProvince.name
              ) : (
                'Pilih Provinsi'
              )}
            </span>
            <ChevronDown
              size={18}
              className={`text-brand-muted transition-transform ${isProvinceOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isProvinceOpen && provinces.length > 0 && (
            <div className="absolute z-20 w-full mt-1 max-h-60 overflow-auto rounded-xl border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark shadow-lg">
              {provinces.map((province) => (
                <button
                  key={province.id}
                  type="button"
                  onClick={() => handleProvinceSelect(province)}
                  className={`w-full px-4 py-3 text-left hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 transition ${
                    selectedProvince?.id === province.id
                      ? 'bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary font-semibold'
                      : 'text-brand-dark dark:text-brand-light'
                  }`}
                >
                  {province.name}
                </button>
              ))}
            </div>
          )}
          {error.provinces && (
            <p className="text-xs text-status-danger mt-1">{error.provinces}</p>
          )}
        </div>

        {/* Kota/Kabupaten Dropdown */}
        <div className="flex-1 relative" ref={regencyRef}>
          <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
            Kota/Kabupaten <span className="text-status-danger">*</span>
          </label>
          <button
            type="button"
            onClick={() => {
              if (selectedProvince) {
                setIsRegencyOpen(!isRegencyOpen);
                setIsProvinceOpen(false);
                setIsDistrictOpen(false);
              }
            }}
            disabled={!selectedProvince || loading.regencies}
            className="w-full flex items-center justify-between rounded-xl border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark px-4 py-3 shadow-sm hover:border-brand-primary transition text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className={selectedRegency ? 'text-brand-dark dark:text-brand-light' : 'text-brand-muted'}>
              {loading.regencies ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Memuat kota...
                </span>
              ) : selectedRegency ? (
                selectedRegency.name
              ) : (
                'Pilih Kota/Kabupaten'
              )}
            </span>
            <ChevronDown
              size={18}
              className={`text-brand-muted transition-transform ${isRegencyOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isRegencyOpen && availableRegencies.length > 0 && (
            <div className="absolute z-20 w-full mt-1 max-h-60 overflow-auto rounded-xl border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark shadow-lg">
              {availableRegencies.map((regency) => (
                <button
                  key={regency.id}
                  type="button"
                  onClick={() => handleRegencySelect(regency)}
                  className={`w-full px-4 py-3 text-left hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 transition ${
                    selectedRegency?.id === regency.id
                      ? 'bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary font-semibold'
                      : 'text-brand-dark dark:text-brand-light'
                  }`}
                >
                  {regency.name}
                </button>
              ))}
            </div>
          )}
          {error.regencies && (
            <p className="text-xs text-status-danger mt-1">{error.regencies}</p>
          )}
        </div>

        {/* Kecamatan Dropdown (Optional) */}
        <div className="flex-1 relative" ref={districtRef}>
          <label className="block text-sm font-semibold text-brand-dark dark:text-brand-light mb-2">
            Kecamatan <span className="text-xs text-brand-muted">(Opsional)</span>
          </label>
          <button
            type="button"
            onClick={() => {
              if (selectedRegency) {
                setIsDistrictOpen(!isDistrictOpen);
                setIsProvinceOpen(false);
                setIsRegencyOpen(false);
              }
            }}
            disabled={!selectedRegency || loading.districts}
            className="w-full flex items-center justify-between rounded-xl border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark px-4 py-3 shadow-sm hover:border-brand-primary transition text-left disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <span className={selectedDistrict ? 'text-brand-dark dark:text-brand-light' : 'text-brand-muted'}>
              {loading.districts ? (
                <span className="flex items-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Memuat kecamatan...
                </span>
              ) : selectedDistrict ? (
                selectedDistrict.name
              ) : (
                'Pilih Kecamatan (Opsional)'
              )}
            </span>
            <ChevronDown
              size={18}
              className={`text-brand-muted transition-transform ${isDistrictOpen ? 'rotate-180' : ''}`}
            />
          </button>
          {isDistrictOpen && availableDistricts.length > 0 && (
            <div className="absolute z-20 w-full mt-1 max-h-60 overflow-auto rounded-xl border border-brand-muted/40 dark:border-brand-light/20 bg-brand-surface dark:bg-brand-dark shadow-lg">
              {availableDistricts.map((district) => (
                <button
                  key={district.id}
                  type="button"
                  onClick={() => handleDistrictSelect(district)}
                  className={`w-full px-4 py-3 text-left hover:bg-brand-primary/10 dark:hover:bg-brand-primary/20 transition ${
                    selectedDistrict?.id === district.id
                      ? 'bg-brand-primary/10 dark:bg-brand-primary/20 text-brand-primary font-semibold'
                      : 'text-brand-dark dark:text-brand-light'
                  }`}
                >
                  {district.name}
                </button>
              ))}
            </div>
          )}
          {error.districts && (
            <p className="text-xs text-status-danger mt-1">{error.districts}</p>
          )}
        </div>
      </div>

      {/* Search Button */}
      <button
        type="button"
        onClick={handleSearch}
        disabled={isSearchDisabled}
        className="w-full lg:w-auto lg:px-8 flex items-center justify-center gap-2 rounded-xl bg-brand-primary px-6 py-3 text-white font-semibold shadow-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition"
      >
        <Search size={18} />
        Cari Notaris
      </button>

      {/* Selected Location Display */}
      {selectedProvince && selectedRegency && (
        <div className="flex items-center gap-2 text-sm text-brand-muted dark:text-brand-light/70">
          <MapPin size={16} />
          <span>
            {selectedProvince.name} → {selectedRegency.name}
            {selectedDistrict && ` → ${selectedDistrict.name}`}
          </span>
        </div>
      )}

      {/* Info Message */}
      {selectedProvince && selectedRegency && (
        <div className="rounded-lg bg-brand-primary/5 dark:bg-brand-primary/10 border border-brand-primary/20 dark:border-brand-primary/30 px-3 py-2 text-xs text-brand-dark dark:text-brand-light/80">
          ✓ Pencarian dapat dilakukan. Pilih kecamatan untuk hasil yang lebih akurat (opsional).
        </div>
      )}
    </div>
  );
};

RegionSearchBar.propTypes = {
  onSearch: PropTypes.func
};

RegionSearchBar.defaultProps = {
  onSearch: undefined
};

export default RegionSearchBar;

