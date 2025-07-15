import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  purchasedReports: [],
  currentUserProfile: null,
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
      state.purchasedReports = [];
      state.currentUserProfile = null;
    },
    addPurchasedReport: (state, action) => {
      state.purchasedReports.push(action.payload);
    },
    setCurrentUserProfile: (state, action) => {
      state.currentUserProfile = action.payload;
    },
  },
});

export const { setUser, clearUser, addPurchasedReport, setCurrentUserProfile } = userSlice.actions;
export default userSlice.reducer;