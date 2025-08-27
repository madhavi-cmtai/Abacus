import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// --- Types ---
export interface Blog {
  id: string;
  title: string;
  subtitle?: string;
  summary: string;
  image?: string;
  createdOn: string;
  updatedOn: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface BlogState {
  blogs: Blog[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
  selectedBlog: Blog | null;
}

const initialState: BlogState = {
  blogs: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
  selectedBlog: null,
};

// --- Async Thunks ---
// Create a new blog
export const createBlog = createAsyncThunk<
  Blog,
  Omit<Blog, "id" | "createdOn" | "updatedOn">,
  { rejectValue: string }
>("blogs/createBlog", async (blogData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/routes/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create blog");
    }
    const data = await res.json();
    return data.blog;
  } catch (err: any) {
    return rejectWithValue(err.message || "Unknown error");
  }
});

// Fetch blogs with pagination
export const fetchBlogs = createAsyncThunk<
  { blogs: Blog[]; pagination: Pagination },
  { page?: number; limit?: number; status?: string },
  { rejectValue: string }
>("blogs/fetchBlogs", async ({ page = 1, limit = 10, status }, { rejectWithValue }) => {
  try {
    let url = `/api/routes/blogs?page=${page}&limit=${limit}`;
    if (status) url += `&status=${status}`;
    const res = await fetch(url);
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to fetch blogs");
    }
    const data = await res.json();
    return {
      blogs: data.blogs,
      pagination: data.pagination,
    };
  } catch (err: any) {
    return rejectWithValue(err.message || "Unknown error");
  }
});

// Fetch single blog by ID
export const fetchBlogById = createAsyncThunk<Blog, string, { rejectValue: string }>(
  "blogs/fetchBlogById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/routes/blogs/${id}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch blog");
      }
      const data = await res.json();
      return data.blog;
    } catch (err: any) {
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);

// Update a blog
export const updateBlog = createAsyncThunk<
  Blog,
  { id: string; blogData: Partial<Omit<Blog, "id" | "createdOn">> },
  { rejectValue: string }
>("blogs/updateBlog", async ({ id, blogData }, { rejectWithValue }) => {
  try {
    const res = await fetch(`/api/routes/blogs/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blogData),
    });
    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update blog");
    }
    const data = await res.json();
    return data.blog;
  } catch (err: any) {
    return rejectWithValue(err.message || "Unknown error");
  }
});

// Delete a blog
export const deleteBlog = createAsyncThunk<string, string, { rejectValue: string }>(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/routes/blogs/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete blog");
      }
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);

// --- Slice ---
const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.pagination.currentPage = action.payload;
    },
    setSelectedBlog(state, action: PayloadAction<Blog | null>) {
      state.selectedBlog = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Create
      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs.unshift(action.payload);
        state.pagination.totalItems += 1;
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create blog";
      })
      // Fetch
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = action.payload.blogs;
        state.pagination = action.payload.pagination;
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch blogs";
      })
      // Fetch by ID
      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedBlog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch blog";
      })
      // Update
      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.blogs.findIndex((b) => b.id === action.payload.id);
        if (idx !== -1) state.blogs[idx] = action.payload;
        if (state.selectedBlog?.id === action.payload.id) state.selectedBlog = action.payload;
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to update blog";
      })
      // Delete
      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        state.blogs = state.blogs.filter((b) => b.id !== action.payload);
        state.pagination.totalItems -= 1;
        if (state.selectedBlog?.id === action.payload) state.selectedBlog = null;
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete blog";
      });
  },
});

// --- Selectors ---
export const selectBlogs = (state: RootState) => state.blogs.blogs;
export const selectLoading = (state: RootState) => state.blogs.loading;
export const selectError = (state: RootState) => state.blogs.error;
export const selectPagination = (state: RootState) => state.blogs.pagination;
export const selectSelectedBlog = (state: RootState) => state.blogs.selectedBlog;

// --- Actions & Reducer ---
export const { setCurrentPage, setSelectedBlog, clearError } = blogSlice.actions;
export default blogSlice.reducer;
