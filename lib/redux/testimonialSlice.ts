// lib/redux/slice/testimonialSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import axios from "axios";

export interface Testimonial {
  id: string;
  name: string;
  message: string;
  rating: number;
  image?: string;  
  city?: string;    
  createdOn: string;
  updatedOn: string;
}

interface TestimonialState {
  data: Testimonial[];
  selectedTestimonial: Testimonial | null;
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialState = {
  data: [],
  selectedTestimonial: null,
  loading: false,
  error: null,
};

const testimonialSlice = createSlice({
  name: "testimonials",
  initialState,
  reducers: {
    setTestimonials: (state, action: PayloadAction<Testimonial[]>) => {
      state.data = action.payload;
    },
    addTestimonial: (state, action: PayloadAction<Testimonial>) => {
      state.data.push(action.payload);
    },
    updateTestimonial: (state, action: PayloadAction<Testimonial>) => {
      state.data = state.data.map((item) =>
        item.id === action.payload.id ? action.payload : item
      );
    },
    deleteTestimonial: (state, action: PayloadAction<string>) => {
      state.data = state.data.filter((item) => item.id !== action.payload);
    },
    selectTestimonial: (state, action: PayloadAction<Testimonial | null>) => {
      state.selectedTestimonial = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  selectTestimonial,
  setLoading,
  setError,
} = testimonialSlice.actions;

// ---- Async Thunks ----
export const fetchTestimonials = () => async (dispatch: AppDispatch) => {
  dispatch(setLoading(true));
  try {
    const res = await axios.get<Testimonial[]>("/api/routes/testimonials");
    dispatch(setTestimonials(res.data));
    dispatch(setError(null));
  } catch (err: any) {
      console.error("Fetch testimonials error:", err);
      dispatch(setError(err?.message || "Failed to fetch testimonials"));
  } finally {
    dispatch(setLoading(false));
  }
};

export const createTestimonial =
  (testimonial: FormData) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axios.post<Testimonial>(
        "/api/routes/testimonials",
        testimonial,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      dispatch(addTestimonial(res.data));
      dispatch(setError(null));
    } catch (err) {
        console.error("Fetch testimonials error:", err);
      dispatch(setError("Failed to add testimonial"));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const editTestimonial =
  (id: string, testimonial: FormData) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      const res = await axios.put<Testimonial>(
        `/api/routes/testimonials/${id}`,
        testimonial,
        { headers: { "Content-Type": "multipart/form-data" } }
      );
      dispatch(updateTestimonial(res.data));
      dispatch(setError(null));
    } catch (err) {
        console.error("Fetch testimonials error:", err);
      dispatch(setError("Failed to update testimonial"));
    } finally {
      dispatch(setLoading(false));
    }
  };

export const removeTestimonial =
  (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
      await axios.delete(`/api/routes/testimonials/${id}`);
      dispatch(deleteTestimonial(id));
      dispatch(setError(null));
    } catch (err) {
        console.error("Fetch testimonials error:", err);
      dispatch(setError("Failed to delete testimonial"));
    } finally {
      dispatch(setLoading(false));
    }
  };

// ---- Selectors ----
export const selectTestimonials = (state: RootState) => state.testimonials.data;
export const selectSelectedTestimonial = (state: RootState) =>
  state.testimonials.selectedTestimonial;
export const selectTestimonialLoading = (state: RootState) =>
  state.testimonials.loading;
export const selectTestimonialError = (state: RootState) =>
  state.testimonials.error;

export default testimonialSlice.reducer;
