import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_BASE_URL = 'https://www.emsifa.com/api-wilayah-indonesia/api';

// Async thunks untuk fetch data dari API
export const fetchProvinces = createAsyncThunk(
  'region/fetchProvinces',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/provinces.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch provinces');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchRegencies = createAsyncThunk(
  'region/fetchRegencies',
  async (provinceId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/regencies/${provinceId}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch regencies');
      }
      const data = await response.json();
      return { provinceId, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const fetchDistricts = createAsyncThunk(
  'region/fetchDistricts',
  async (regencyId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_BASE_URL}/districts/${regencyId}.json`);
      if (!response.ok) {
        throw new Error('Failed to fetch districts');
      }
      const data = await response.json();
      return { regencyId, data };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  provinces: [],
  regencies: {},
  districts: {},
  selectedProvince: null,
  selectedRegency: null,
  selectedDistrict: null,
  loading: {
    provinces: false,
    regencies: false,
    districts: false
  },
  error: {
    provinces: null,
    regencies: null,
    districts: null
  }
};

const regionSlice = createSlice({
  name: 'region',
  initialState,
  reducers: {
    setSelectedProvince: (state, action) => {
      state.selectedProvince = action.payload;
      // Reset regency dan district saat provinsi berubah
      state.selectedRegency = null;
      state.selectedDistrict = null;
      // Clear regencies dan districts cache
      if (action.payload) {
        // Keep regencies for selected province, clear others
        const provinceId = action.payload.id;
        Object.keys(state.regencies).forEach((key) => {
          if (key !== provinceId) {
            delete state.regencies[key];
          }
        });
      } else {
        state.regencies = {};
      }
      state.districts = {};
    },
    setSelectedRegency: (state, action) => {
      state.selectedRegency = action.payload;
      // Reset district saat regency berubah
      state.selectedDistrict = null;
      // Clear districts cache
      if (action.payload) {
        const regencyId = action.payload.id;
        Object.keys(state.districts).forEach((key) => {
          if (key !== regencyId) {
            delete state.districts[key];
          }
        });
      } else {
        state.districts = {};
      }
    },
    setSelectedDistrict: (state, action) => {
      state.selectedDistrict = action.payload;
    },
    clearSelection: (state) => {
      state.selectedProvince = null;
      state.selectedRegency = null;
      state.selectedDistrict = null;
    }
  },
  extraReducers: (builder) => {
    // Fetch Provinces
    builder
      .addCase(fetchProvinces.pending, (state) => {
        state.loading.provinces = true;
        state.error.provinces = null;
      })
      .addCase(fetchProvinces.fulfilled, (state, action) => {
        state.loading.provinces = false;
        state.provinces = action.payload;
      })
      .addCase(fetchProvinces.rejected, (state, action) => {
        state.loading.provinces = false;
        state.error.provinces = action.payload;
      });

    // Fetch Regencies
    builder
      .addCase(fetchRegencies.pending, (state) => {
        state.loading.regencies = true;
        state.error.regencies = null;
      })
      .addCase(fetchRegencies.fulfilled, (state, action) => {
        state.loading.regencies = false;
        const { provinceId, data } = action.payload;
        state.regencies[provinceId] = data;
      })
      .addCase(fetchRegencies.rejected, (state, action) => {
        state.loading.regencies = false;
        state.error.regencies = action.payload;
      });

    // Fetch Districts
    builder
      .addCase(fetchDistricts.pending, (state) => {
        state.loading.districts = true;
        state.error.districts = null;
      })
      .addCase(fetchDistricts.fulfilled, (state, action) => {
        state.loading.districts = false;
        const { regencyId, data } = action.payload;
        state.districts[regencyId] = data;
      })
      .addCase(fetchDistricts.rejected, (state, action) => {
        state.loading.districts = false;
        state.error.districts = action.payload;
      });
  }
});

export const { setSelectedProvince, setSelectedRegency, setSelectedDistrict, clearSelection } = regionSlice.actions;
export default regionSlice.reducer;

