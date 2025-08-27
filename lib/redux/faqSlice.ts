// lib/redux/slice/faqSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { AppDispatch, RootState } from "../store";

export interface FAQ {
    id: string;
    question: string;
    answer: string;
    category?: string;
    createdOn: string;
    updatedOn: string;
}

interface FAQState {
    faqs: FAQ[];
    loading: boolean;
    error: string | null;
    selectedFAQ: FAQ | null;
}

const initialState: FAQState = {
    faqs: [],
    loading: false,
    error: null,
    selectedFAQ: null,
};

const faqSlice = createSlice({
    name: "faq",
    initialState,
    reducers: {
        setFAQs: (state, action: PayloadAction<FAQ[]>) => {
            state.faqs = action.payload;
        },
        addFAQ: (state, action: PayloadAction<FAQ>) => {
            state.faqs.push(action.payload);
        },
        updateFAQ: (state, action: PayloadAction<FAQ>) => {
            const index = state.faqs.findIndex((faq) => faq.id === action.payload.id);
            if (index !== -1) {
                state.faqs[index] = action.payload;
            }
        },
        deleteFAQ: (state, action: PayloadAction<string>) => {
            state.faqs = state.faqs.filter((faq) => faq.id !== action.payload);
        },
        setSelectedFAQ: (state, action: PayloadAction<FAQ | null>) => {
            state.selectedFAQ = action.payload;
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
    setFAQs,
    addFAQ,
    updateFAQ,
    deleteFAQ,
    setSelectedFAQ,
    setLoading,
    setError,
} = faqSlice.actions;

export default faqSlice.reducer;

// ---------- Async Thunks ----------

// Fetch all FAQs
export const fetchFAQs = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await axios.get<FAQ[]>("/api/routes/faqs");
        dispatch(setFAQs(res.data));
        dispatch(setError(null));
    } catch {
        dispatch(setError("Failed to fetch FAQs"));
    } finally {
        dispatch(setLoading(false));
    }
};

// Add FAQ
export const createFAQ = (faqData: FormData) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await axios.post<FAQ>("/api/routes/faqs", faqData, {
            headers: { "Content-Type": "application/json" },
        });
        dispatch(addFAQ(res.data));
        dispatch(setError(null));
    } catch {
        dispatch(setError("Failed to add FAQ"));
    } finally {
        dispatch(setLoading(false));
    }
};

// Update FAQ
export const editFAQ = (id: string, faqData: Partial<FAQ>) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await axios.put<FAQ>(`/api/routes/faqs/${id}`, faqData, {
            headers: { "Content-Type": "application/json" },
        });
        dispatch(updateFAQ(res.data));
        dispatch(setError(null));
    } catch {
        dispatch(setError("Failed to update FAQ"));
    } finally {
        dispatch(setLoading(false));
    }
};

// Delete FAQ
export const removeFAQ = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        await axios.delete(`/api/routes/faqs/${id}`);
        dispatch(deleteFAQ(id));
        dispatch(setError(null));
    } catch {
        dispatch(setError("Failed to delete FAQ"));
    } finally {
        dispatch(setLoading(false));
    }
};

// ---------- Selectors ----------
export const selectFAQs = (state: RootState) => state.faq.faqs;
export const selectFAQ = (state: RootState) => state.faq.selectedFAQ;
export const selectFAQLoading = (state: RootState) => state.faq.loading;
export const selectFAQError = (state: RootState) => state.faq.error;
