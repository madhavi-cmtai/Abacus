import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

// --- Types ---
export interface Service {
  id: string;
  _id?: string; // Allow _id for MongoDB-style objects
  title: string;
  description: string;
  image?: string;
  price?: number;
  category?: string;
  createdOn: string;
  updatedOn: string;
  status?: "active" | "inactive";
  [key: string]: any; // Allow extra keys like __v
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface Filters {
  category?: string;
  status?: "active" | "inactive";
}

interface ServiceState {
  services: Service[];
  loading: boolean;
  error: string | null;
  pagination: Pagination;
  selectedService: Service | null;
  filters: Filters;
}

const initialState: ServiceState = {
  services: [],
  loading: false,
  error: null,
  pagination: {
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10,
  },
  selectedService: null,
  filters: {},
};

// --- Helper Type Guard ---
const isFormData = (data: any): data is FormData => data instanceof FormData;

// --- Async Thunks ---

// Create a new service
export const createService = createAsyncThunk<
  Service,
  Omit<Service, "id" | "createdOn" | "updatedOn" | "_id"> | FormData,
  { rejectValue: string }
>("services/createService", async (serviceData, { rejectWithValue }) => {
  try {
    const res = await fetch("/api/routes/services", {
      method: "POST",
      headers: isFormData(serviceData) ? undefined : { "Content-Type": "application/json" },
      body: isFormData(serviceData) ? serviceData : JSON.stringify(serviceData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to create service");
    }

    const data = await res.json();
    // Normalize _id to id for frontend consistency
    const service = data.service;
    if (service && service._id && !service.id) {
      service.id = service._id;
    }
    return service;
  } catch (err: any) {
    return rejectWithValue(err.message || "Unknown error");
  }
});

// Fetch services with pagination & filters
export const fetchServices = createAsyncThunk<
  { services: Service[]; pagination: Pagination },
  { page?: number; limit?: number; category?: string; status?: string },
  { rejectValue: string }
>("services/fetchServices", async ({ page = 1, limit = 10, category, status }, { rejectWithValue }) => {
  try {
    const params = new URLSearchParams({
      page: String(page),
      limit: String(limit),
      ...(category ? { category } : {}),
      ...(status ? { status } : {}),
    });

    const res = await fetch(`/api/routes/services?${params.toString()}`);
    const data = await res.json();

    if (!res.ok) throw new Error(data.message || "Failed to fetch services");

    // Normalize _id to id for all services
    const services = (data.services || []).map((service: any) => {
      if (service && service._id && !service.id) {
        service.id = service._id;
      }
      return service;
    });

    return {
      services,
      pagination: data.pagination || {
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        itemsPerPage: 10,
      },
    };
  } catch (err: any) {
    return rejectWithValue(err.message || "Unknown error");
  }
});

// Fetch single service by ID (accepts either id or _id)
export const fetchServiceById = createAsyncThunk<Service, string, { rejectValue: string }>(
  "services/fetchServiceById",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/routes/services/${id}`);
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch service");
      // Normalize _id to id
      const service = data.service;
      if (service && service._id && !service.id) {
        service.id = service._id;
      }
      return service;
    } catch (err: any) {
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);

// Update a service (accepts either id or _id)
export const updateService = createAsyncThunk<
  Service,
  { id: string; serviceData: Partial<Omit<Service, "id" | "createdOn" | "_id">> | FormData },
  { rejectValue: string }
>("services/updateService", async ({ id, serviceData }, { rejectWithValue }) => {
  try {
    // Accept both id and _id for update
    const res = await fetch(`/api/routes/services/${id}`, {
      method: "PUT",
      body: isFormData(serviceData) ? serviceData : JSON.stringify(serviceData),
      headers: isFormData(serviceData) ? undefined : { "Content-Type": "application/json" },
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "Failed to update service");
    }

    const data = await res.json();
    // Normalize _id to id
    const service = data.service;
    if (service && service._id && !service.id) {
      service.id = service._id;
    }
    return service;
  } catch (err: any) {
    return rejectWithValue(err.message || "Unknown error");
  }
});

// Delete a service (accepts either id or _id)
export const deleteService = createAsyncThunk<string, string, { rejectValue: string }>(
  "services/deleteService",
  async (id, { rejectWithValue }) => {
    try {
      const res = await fetch(`/api/routes/services/${id}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete service");
      return id;
    } catch (err: any) {
      return rejectWithValue(err.message || "Unknown error");
    }
  }
);

// --- Slice ---
const serviceSlice = createSlice({
  name: "services",
  initialState,
  reducers: {
    setCurrentPage(state, action: PayloadAction<number>) {
      state.pagination.currentPage = action.payload;
    },
    setSelectedService(state, action: PayloadAction<Service | null>) {
      state.selectedService = action.payload;
    },
    clearError(state) {
      state.error = null;
    },
    setFilters(state, action: PayloadAction<Filters>) {
      state.filters = action.payload;
    },
  },
  extraReducers: (builder) => {
    // Create
    builder.addCase(createService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(createService.fulfilled, (state, action) => {
      state.loading = false;
      // Normalize _id to id for new service
      const newService = { ...action.payload };
      if (newService._id && !newService.id) {
        newService.id = newService._id;
      }
      state.services.unshift(newService);
      state.pagination.totalItems += 1;
    });
    builder.addCase(createService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to create service";
    });

    // Fetch
    builder.addCase(fetchServices.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchServices.fulfilled, (state, action) => {
      state.loading = false;
      // Normalize _id to id for all services
      state.services = action.payload.services.map((service) => {
        if (service._id && !service.id) {
          return { ...service, id: service._id };
        }
        return service;
      });
      state.pagination = action.payload.pagination;
    });
    builder.addCase(fetchServices.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch services";
    });

    // Fetch by ID
    builder.addCase(fetchServiceById.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchServiceById.fulfilled, (state, action) => {
      state.loading = false;
      // Normalize _id to id
      const service = { ...action.payload };
      if (service._id && !service.id) {
        service.id = service._id;
      }
      state.selectedService = service;
    });
    builder.addCase(fetchServiceById.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to fetch service";
    });

    // Update
    builder.addCase(updateService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateService.fulfilled, (state, action) => {
      state.loading = false;
      // Accept both id and _id for update
      const updatedService = { ...action.payload };
      const updateId = updatedService.id || updatedService._id;
      const idx = state.services.findIndex(
        (s) => s.id === updateId || s._id === updateId
      );
      if (idx !== -1) {
        state.services[idx] = { ...state.services[idx], ...updatedService, id: updateId };
      }
      if (
        state.selectedService &&
        (state.selectedService.id === updateId || state.selectedService._id === updateId)
      ) {
        state.selectedService = { ...updatedService, id: updateId };
      }
    });
    builder.addCase(updateService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to update service";
    });

    // Delete
    builder.addCase(deleteService.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(deleteService.fulfilled, (state, action) => {
      state.loading = false;
      // Remove by id or _id
      state.services = state.services.filter(
        (s) => s.id !== action.payload && s._id !== action.payload
      );
      state.pagination.totalItems -= 1;
      if (
        state.selectedService &&
        (state.selectedService.id === action.payload ||
          state.selectedService._id === action.payload)
      ) {
        state.selectedService = null;
      }
    });
    builder.addCase(deleteService.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Failed to delete service";
    });
  },
});

// --- Selectors ---
export const selectServices = (state: RootState) => state.services.services;
export const selectLoading = (state: RootState) => state.services.loading;
export const selectError = (state: RootState) => state.services.error;
export const selectPagination = (state: RootState) => state.services.pagination;
export const selectSelectedService = (state: RootState) => state.services.selectedService;
export const selectFilters = (state: RootState) => state.services.filters;

// --- Actions & Reducer ---
export const { setCurrentPage, setSelectedService, clearError, setFilters } = serviceSlice.actions;
export default serviceSlice.reducer;
