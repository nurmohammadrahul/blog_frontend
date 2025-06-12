import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import BlogService from "./BlogService";

const initialState = {
  blogs: [],
  isLoading: false,
  isError: false,
  isSuccess: false,
  message: "",
};

// Fetch all blogs
export const getBlogs = createAsyncThunk(`blogs/getAll`, async (_, thunkAPI) => {
  try {
    return await BlogService.getBlogs();
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

// Create a blog
export const createBlog = createAsyncThunk("blogs/create", async (data, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await BlogService.createBlog(data, token);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});

// Edit/Update a blog
export const editBlog = createAsyncThunk(
  "blogs/edit",
  async ({ id, blogData }, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await BlogService.updateBlog(id, blogData, token);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data || err.message);
    }
  }
);
export const getMyBlogs = createAsyncThunk("blogs/getMyBlogs", async (_, thunkAPI) => {
  try {
    const token = thunkAPI.getState().auth.user.token;
    return await BlogService.getMyBlogs(token);
  } catch (err) {
    return thunkAPI.rejectWithValue(err.response?.data || err.message);
  }
});
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isError = false;
      state.isSuccess = false;
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.blogs = action.payload;
      })
      .addCase(getBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(createBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs.push(action.payload);
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(editBlog.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(editBlog.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // Update the edited blog in the state
        const index = state.blogs.findIndex(blog => blog._id === action.payload._id);
        if (index !== -1) {
          state.blogs[index] = action.payload;
        }
      })
      .addCase(getMyBlogs.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMyBlogs.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.blogs = action.payload;
      })
      .addCase(getMyBlogs.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })      
      .addCase(editBlog.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      });
      
  },
});

export const { reset } = blogSlice.actions;
export default blogSlice.reducer;
