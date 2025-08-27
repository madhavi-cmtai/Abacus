// lib/redux/slice/leadSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppDispatch, RootState } from "../store";
import axios from "axios";

export interface Lead {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    createdOn: string;
    updatedOn: string;
}

interface LeadState {
    leads: Lead[];
    selectedLead: Lead | null;
    loading: boolean;
    error: string | null;
}

const initialState: LeadState = {
    leads: [],
    selectedLead: null,
    loading: false,
    error: null,
};

const leadSlice = createSlice({
    name: "leads",
    initialState,
    reducers: {
        setLeads: (state, action: PayloadAction<Lead[]>) => {
            state.leads = action.payload;
        },
        addLead: (state, action: PayloadAction<Lead>) => {
            state.leads.push(action.payload);
        },
        updateLead: (state, action: PayloadAction<Lead>) => {
            const index = state.leads.findIndex((lead) => lead.id === action.payload.id);
            if (index !== -1) state.leads[index] = action.payload;
        },
        deleteLead: (state, action: PayloadAction<string>) => {
            state.leads = state.leads.filter((lead) => lead.id !== action.payload);
        },
        setSelectedLead: (state, action: PayloadAction<Lead | null>) => {
            state.selectedLead = action.payload;
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
    setLeads,
    addLead,
    updateLead,
    deleteLead,
    setSelectedLead,
    setLoading,
    setError,
} = leadSlice.actions;

export default leadSlice.reducer;

// ----------------- Async Thunks -----------------

// Fetch all leads
export const fetchLeads = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await axios.get<Lead[]>("/api/routes/leads");
        dispatch(setLeads(res.data));
        dispatch(setError(null));
    } catch {
        dispatch(setError("Failed to fetch leads"));
    } finally {
        dispatch(setLoading(false));
    }
};

// Add new lead
export const createLead = (leadData: Omit<Lead, "id" | "createdOn" | "updatedOn">) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await axios.post<Lead>("/api/routes/leads", leadData);
        dispatch(addLead(res.data));
        dispatch(setError(null));
    } catch {
        dispatch(setError("Failed to create lead"));
    } finally {
        dispatch(setLoading(false));
    }
};

// Update lead
export const editLead = (id: string, leadData: Partial<Lead>) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        const res = await axios.put<Lead>(`/api/routes/leads/${id}`, leadData);
        dispatch(updateLead(res.data));
        dispatch(setError(null));
    } catch {
        dispatch(setError("Failed to update lead"));
    } finally {
        dispatch(setLoading(false));
    }
};

// Delete lead
export const removeLead = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading(true));
    try {
        await axios.delete(`/api/routes/leads/${id}`);
        dispatch(deleteLead(id));
        dispatch(setError(null));
    } catch {
        dispatch(setError("Failed to delete lead"));
    } finally {
        dispatch(setLoading(false));
    }
};

// ----------------- Selectors -----------------
export const selectLeads = (state: RootState) => state.leads.leads;
export const selectSelectedLead = (state: RootState) => state.leads.selectedLead;
export const selectLeadLoading = (state: RootState) => state.leads.loading;
export const selectLeadError = (state: RootState) => state.leads.error;
