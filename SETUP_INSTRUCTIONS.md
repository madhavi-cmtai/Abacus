# Services Feature Setup Guide

## Overview
This project includes a complete services management system with:
- Redux state management for services
- MongoDB backend with Mongoose models
- RESTful API endpoints
- Admin dashboard for CRUD operations
- TypeScript support

## Environment Variables
Create a `.env.local` file in your project root with the following variables:

```env
# MongoDB Configuration
MONGODB_URI=mongodb://localhost:27017/abacus

# Next.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here-make-it-long-and-random

# JWT Configuration
JWT_SECRET=your-jwt-secret-key-here-make-it-long-and-random

# API Configuration
API_BASE_URL=http://localhost:3000/api

# Environment
NODE_ENV=development
```

## Dependencies Installation

Install the required dependencies:

```bash
npm install mongoose
```

## Database Setup

1. **Install MongoDB** (if not already installed):
   - Download from: https://www.mongodb.com/try/download/community
   - Or use MongoDB Atlas (cloud service)

2. **Start MongoDB**:
   ```bash
   # Local MongoDB
   mongod
   
   # Or if using MongoDB as a service
   sudo systemctl start mongod
   ```

3. **Create Database**:
   The database will be created automatically when you first connect.

## API Endpoints

### Services API

- `GET /api/services` - Get all services with pagination
- `POST /api/services` - Create a new service
- `GET /api/services/[id]` - Get a specific service
- `PUT /api/services/[id]` - Update a service
- `DELETE /api/services/[id]` - Delete a service

### Query Parameters for GET /api/services:
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `category` - Filter by category
- `status` - Filter by status (active/inactive)

## Service Interface

```typescript
interface Service {
  id: string;
  title: string;
  description: string;
  image?: string;
  price?: number;
  category?: string;
  createdOn: string;
  updatedOn: string;
  status?: "active" | "inactive";
}
```

## Redux Store

The services slice is already integrated into the Redux store with the following features:

### Actions:
- `createService` - Create a new service
- `fetchServices` - Fetch services with pagination and filters
- `fetchServiceById` - Fetch a single service
- `updateService` - Update a service
- `deleteService` - Delete a service

### Selectors:
- `selectServices` - Get all services
- `selectLoading` - Get loading state
- `selectError` - Get error state
- `selectPagination` - Get pagination info
- `selectSelectedService` - Get selected service

## Dashboard Features

The admin dashboard (`/dashboard/admin/services`) includes:

1. **Service List View**:
   - Card-based layout
   - Image display
   - Service details (title, description, price, category)
   - Status badges
   - Creation and update dates

2. **Filtering**:
   - Filter by status (All, Active, Inactive)

3. **Pagination**:
   - Navigate through pages
   - Configurable items per page

4. **CRUD Operations**:
   - **Create**: Add new services with all fields
   - **Read**: View service details
   - **Update**: Edit existing services
   - **Delete**: Remove services with confirmation

5. **Form Validation**:
   - Required fields validation
   - Price validation (non-negative)
   - Image URL validation

## Usage Examples

### Creating a Service
```typescript
import { useDispatch } from 'react-redux';
import { createService } from '@/lib/redux/serviceSlice';

const dispatch = useDispatch();

const newService = {
  title: "Web Development",
  description: "Professional web development services",
  price: 1000,
  category: "Technology",
  status: "active",
  image: "https://example.com/image.jpg"
};

dispatch(createService(newService));
```

### Fetching Services
```typescript
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, selectServices } from '@/lib/redux/serviceSlice';

const dispatch = useDispatch();
const services = useSelector(selectServices);

useEffect(() => {
  dispatch(fetchServices({ page: 1, limit: 10 }));
}, [dispatch]);
```

## File Structure

```
lib/
├── redux/
│   └── serviceSlice.ts          # Redux slice for services
├── models/
│   └── Service.ts               # Mongoose model
├── mongodb.ts                   # Database connection
└── store.ts                     # Redux store configuration

app/
├── api/
│   └── services/
│       ├── route.ts             # GET/POST services
│       └── [id]/
│           └── route.ts         # GET/PUT/DELETE individual service
└── dashboard/
    └── admin/
        └── services/
            └── page.tsx         # Admin dashboard
```

## Troubleshooting

### Common Issues:

1. **MongoDB Connection Error**:
   - Ensure MongoDB is running
   - Check MONGODB_URI in .env.local
   - Verify network connectivity

2. **API Errors**:
   - Check server logs for detailed error messages
   - Verify API routes are properly configured
   - Ensure all required fields are provided

3. **Redux State Issues**:
   - Check if serviceSlice is properly registered in store
   - Verify action creators are correctly implemented
   - Check for TypeScript errors

## Development

### Adding New Features:

1. **New Fields**: Update the Service interface and Mongoose schema
2. **New API Endpoints**: Add routes in the API directory
3. **New Redux Actions**: Add to serviceSlice.ts
4. **UI Components**: Update the dashboard page

### Testing:

1. Test API endpoints using tools like Postman
2. Test Redux actions and state changes
3. Test UI interactions and form validations
4. Test pagination and filtering

## Production Deployment

1. **Environment Variables**: Set production values in your hosting platform
2. **Database**: Use MongoDB Atlas or production MongoDB instance
3. **Build**: Run `npm run build` for production build
4. **Deploy**: Deploy to your preferred hosting platform (Vercel, Netlify, etc.)

## Security Considerations

1. **Input Validation**: All inputs are validated on both client and server
2. **Authentication**: Implement proper authentication for admin routes
3. **Rate Limiting**: Consider adding rate limiting for API endpoints
4. **CORS**: Configure CORS settings for production
5. **Environment Variables**: Never commit sensitive data to version control




