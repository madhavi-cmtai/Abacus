import React from 'react';
import { Service } from '@/lib/redux/serviceSlice';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Tag, DollarSign } from 'lucide-react';

interface ServiceCardProps {
  service: Service;
  onEdit?: (service: Service) => void;
  onDelete?: (service: Service) => void;
  showActions?: boolean;
  className?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({
  service,
  onEdit,
  onDelete,
  showActions = false,
  className = '',
}) => {
  const getStatusBadgeVariant = (status?: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500 hover:bg-green-500/90';
      case 'inactive':
        return 'bg-gray-400 hover:bg-gray-400/90';
      default:
        return 'bg-gray-500 hover:bg-gray-500/90';
    }
  };

  return (
    <Card className={`h-full flex flex-col ${className}`}>
      {service.image && (
        <div className="relative h-48 overflow-hidden rounded-t-lg">
          <img
            src={service.image}
            alt={service.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-2 right-2">
            <Badge className={getStatusBadgeVariant(service.status)}>
              {service.status}
            </Badge>
          </div>
        </div>
      )}
      
      <CardHeader className="flex-1">
        <CardTitle className="text-xl font-semibold line-clamp-2">
          {service.title}
        </CardTitle>
        <CardDescription className="line-clamp-3">
          {service.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="flex-1">
        <div className="space-y-2 text-sm text-gray-600">
          {service.category && (
            <div className="flex items-center gap-2">
              <Tag className="h-4 w-4" />
              <span>{service.category}</span>
            </div>
          )}
          
          {service.price !== undefined && (
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              <span>${service.price}</span>
            </div>
          )}
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Created: {new Date(service.createdOn).toLocaleDateString()}</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Updated: {new Date(service.updatedOn).toLocaleDateString()}</span>
          </div>
        </div>
      </CardContent>

      {showActions && (onEdit || onDelete) && (
        <CardFooter className="flex gap-2 pt-4">
          {onEdit && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onEdit(service)}
              className="flex-1"
            >
              Edit
            </Button>
          )}
          {onDelete && (
            <Button
              variant="destructive"
              size="sm"
              onClick={() => onDelete(service)}
              className="flex-1"
            >
              Delete
            </Button>
          )}
        </CardFooter>
      )}
    </Card>
  );
};

export default ServiceCard;




