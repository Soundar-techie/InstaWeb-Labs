import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import type { Meme } from '../types';

interface MemesState {
  items: Meme[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: MemesState = {
  items: [],
  status: 'idle',
  error: null,
};

export const fetchTrendingMemes = createAsyncThunk(
  'memes/fetchTrending',
  async () => {
    const response = await axios.get('https://api.imgflip.com/get_memes');
    return response.data.data.memes.map((meme: any) => ({
      id: meme.id,
      url: meme.url,
      title: meme.name,
      likes: Math.floor(Math.random() * 1000),
      comments: Math.floor(Math.random() * 100),
      createdAt: new Date().toISOString(),
      category: 'trending',
    }));
  }
);

const memesSlice = createSlice({
  name: 'memes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMemes.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTrendingMemes.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchTrendingMemes.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch memes';
      });
  },
});

export default memesSlice.reducer;