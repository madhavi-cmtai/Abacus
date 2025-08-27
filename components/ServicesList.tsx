import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '@/lib/store';
import { fetchServices, selectServices, selectLoading, selectError } from '@/lib/redux/serviceSlice';
import ServiceCard from './ServiceCard';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

interface ServicesListProps {
  category?: string;
  status?: 'active' | 'inactive';
  limit?: number;
  showActions?: boolean;
  onEdit?: (service: any) => void;
  onDelete?: (service: any) => void;
  className?: string;
}

const ServicesList: React.FC<ServicesListProps> = ({
  category,
  status = 'active',
  limit,
  showActions = false,
  onEdit,
  onDelete,
  className = '',
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const services = useSelector(selectServices);
  const loading = useSelector(selectLoading);
  const error = useSelector(selectError);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(fetchServices({ 
      page: currentPage, 
      limit: limit || 10,
      category,
      status 
    }));
  }, [dispatch, currentPage, limit, category, status]);

  // Filter services based on props
  const filteredServices = services.filter(service => {
    if (status && service.status !== status) return false;
    if (category && service.category !== category) return false;
    return true;
  });

  if (loading && services.length === 0) {
    return (
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ${className}`}>
        {Array.from({ length: limit || 6 }).map((_, index) => (
          <div key={index} className="space-y-4">
            <Skeleton className="h-48 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Alert className="mb-6">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>
          Error loading services: {error}
        </AlertDescription>
      </Alert>
    );
  }

  if (filteredServices.length === 0) {
    return (
      <div className="text-center py-12">
        <h3 className="text-lg font-medium text-gray-900 mb-2">No services found</h3>
        <p className="text-gray-500">
          {category ? `No services found in the "${category}" category.` : 'No services available at the moment.'}
        </p>
      </div>
    );
  }

  return (
    <div className={className}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            showActions={showActions}
            onEdit={onEdit}
            onDelete={onDelete}
          />
        ))}
      </div>

      {/* Load More Button */}
      {limit && filteredServices.length >= limit && (
        <div className="text-center mt-8">
          <Button
            variant="outline"
            onClick={() => setCurrentPage(prev => prev + 1)}
            disabled={loading}
          >
            {loading ? 'Loading...' : 'Load More Services'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default ServicesList;




