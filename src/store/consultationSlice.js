import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  consultations: [
    // Dummy data untuk contoh
    {
      id: 'KRG9VX-5099',
      notaryId: 'notary-1',
      notaryName: 'Dr. Verawaty Erni MPHM',
      notarySpecialization: 'General Practitioner',
      notaryImage: null, // Akan menggunakan placeholder
      date: 'Selasa, 22 Juli',
      time: '04:55 PM',
      location: '-', // Online consultation
      status: 'CLOSED', // ACTIVE, CLOSED, PENDING
      createdAt: new Date('2024-07-22T16:55:00').toISOString()
    }
  ],
  activeConsultations: [] // Konsultasi yang masih aktif
};

const consultationSlice = createSlice({
  name: 'consultation',
  initialState,
  reducers: {
    addConsultation: (state, action) => {
      const newConsultation = {
        ...action.payload,
        id: `KRG${Math.random().toString(36).substring(2, 8).toUpperCase()}-${Date.now().toString().slice(-4)}`,
        createdAt: new Date().toISOString(),
        status: 'ACTIVE'
      };
      state.consultations.unshift(newConsultation);
      state.activeConsultations.push(newConsultation);
    },
    updateConsultationStatus: (state, action) => {
      const { id, status } = action.payload;
      const consultation = state.consultations.find(c => c.id === id);
      if (consultation) {
        consultation.status = status;
        if (status === 'CLOSED') {
          state.activeConsultations = state.activeConsultations.filter(c => c.id !== id);
        }
      }
    },
    setConsultations: (state, action) => {
      state.consultations = action.payload;
      state.activeConsultations = action.payload.filter(c => c.status === 'ACTIVE');
    },
    clearConsultations: (state) => {
      state.consultations = [];
      state.activeConsultations = [];
    }
  }
});

export const { addConsultation, updateConsultationStatus, setConsultations, clearConsultations } = consultationSlice.actions;
export default consultationSlice.reducer;
