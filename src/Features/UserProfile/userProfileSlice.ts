import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export interface UserProfile {
  fullName: string;
  email: string;
  contactPhone: string;
  address: string;
}

export interface UserProfileState {
  data: UserProfile | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserProfileState = {
  data: null,
  loading: false,
  error: null,
};

// Fetch user profile with authorization header
export const fetchUserProfile = createAsyncThunk<UserProfile, void, { rejectValue: string }>(
  'userProfile/fetchUserProfile',
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Adjust based on how you store the token
      const response = await axios.get<UserProfile>('http://localhost:8080/api/Users', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue('Failed to fetch user profile.');
    }
  }
);

// Update user profile with authorization header
export const updateUserProfile = createAsyncThunk<UserProfile, UserProfile, { rejectValue: string }>(
  'userProfile/updateUserProfile',
  async (updatedProfile, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem('token'); // Adjust based on how you store the token
      const response = await axios.put<UserProfile>('http://localhost:8080/api/Users', updatedProfile, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      return rejectWithValue('Failed to update user profile.');
    }
  }
);

const userProfileSlice = createSlice({
  name: 'userProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on fetch start
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(fetchUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure action.payload is typed as string
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null; // Reset error state on update start
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
        state.error = null;
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string; // Ensure action.payload is typed as string
      });
  },
});

export default userProfileSlice.reducer;
