const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const initialState = {
  currentUser: undefined,
  isAuthenticated: false,
};

export const fetchCurrentUser = createAsyncThunk('auth/fetchCurrentUser', async () => {});

export const fetchUserRegister = createAsyncThunk('auth/fetchUserRegister', async () => {});

export const fetchUserLogin = createAsyncThunk('auth/fetchUserLogin', async () => {});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCurrentUser.fulfilled, (state, { payload }) => {});
    builder.addCase(fetchUserLogin.fulfilled, (state, { payload }) => {});
    builder.addCase(fetchUserRegister.fulfilled, (state, { payload }) => {});
  },
});

export const selectIsAuthenticated = (state) => state.auth.isAuthenticated;

export default authSlice.reducer;
