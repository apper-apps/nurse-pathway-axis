import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
purchasedReports: [],
  currentUserProfile: null,
  paymentStatus: false
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      // CRITICAL: Always use deep cloning to avoid reference issues
      state.user = JSON.parse(JSON.stringify(action.payload));
      state.isAuthenticated = !!action.payload;
    },
    clearUser: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.currentUserProfile = null;
    },
    setCurrentUserProfile: (state, action) => {
      state.currentUserProfile = action.payload;
    },
    clearCurrentUserProfile: (state) => {
      state.currentUserProfile = null;
    },
setPurchasedReports: (state, action) => {
      state.purchasedReports = action.payload;
    },
    addPurchasedReport: (state, action) => {
      state.purchasedReports.push(action.payload);
    },
    setPaymentStatus: (state, action) => {
      state.paymentStatus = action.payload;
    },
    clearPaymentStatus: (state) => {
      state.paymentStatus = false;
    }
  },
});

export const { 
  setUser, 
  clearUser, 
  setCurrentUserProfile, 
  clearCurrentUserProfile,
  setPurchasedReports,
  addPurchasedReport,
  setPaymentStatus,
  clearPaymentStatus
} = userSlice.actions;

export default userSlice.reducer;