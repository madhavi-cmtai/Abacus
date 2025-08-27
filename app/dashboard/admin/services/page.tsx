"use client";

import { useEffect, useState, useMemo, ChangeEvent } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  fetchServices,
  createService,
  updateService,
  deleteService,
  selectServices,
  selectLoading as selectServicesLoading,
  selectError as selectServicesError,
  selectPagination as selectServicesPagination,
  setCurrentPage as setServicesCurrentPage,
  Service,
} from "@/lib/redux/serviceSlice";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Helper for status badge
const getStatusBadgeVariant = (status?: string) => {
  switch (status) {
    case "active":
      return "bg-green-500 hover:bg-green-500/90";
    case "inactive":
      return "bg-gray-400 hover:bg-gray-400/90";
    default:
      return "bg-gray-500 hover:bg-gray-500/90";
  }
};

type ServiceFormData = {
  title: string;
  description: string;
  status: "active" | "inactive";
  price: string;
  category: string;
  image: string;
};

function ManageServicesPage() {
  const dispatch = useDispatch<AppDispatch>();

  // Redux State
  const services = useSelector(selectServices);
  const { currentPage, totalPages } = useSelector(selectServicesPagination);
  const isLoading = useSelector(selectServicesLoading);
  const reduxError = useSelector(selectServicesError);

  // Local State
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  // Loading states for add, update, delete
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const initialFormState: ServiceFormData = {
    title: "",
    description: "",
    status: "active",
    price: "",
    category: "",
    image: "",
  };
  const [addForm, setAddForm] = useState<ServiceFormData>(initialFormState);
  const [editForm, setEditForm] = useState<ServiceFormData>(initialFormState);

  // Fetch services on mount/page change
  useEffect(() => {
    dispatch(fetchServices({ page: currentPage }));
  }, [dispatch, currentPage]);

  const filteredServices = useMemo(() => {
    if (statusFilter === "All") return services;
    return services.filter(
      (service) => service.status === statusFilter.toLowerCase()
    );
  }, [services, statusFilter]);

  // Form change handlers
  const handleAddFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setAddForm({ ...addForm, [e.target.id.replace("add-", "")]: e.target.value });
  };

  const handleEditFormChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditForm({ ...editForm, [e.target.id.replace("edit-", "")]: e.target.value });
  };

  // Open dialogs
  const handleEditOpen = (service: Service) => {
    setSelectedService(service);
    setEditForm({
      title: service.title || "",
      description: service.description || "",
      status: service.status || "active",
      price: service.price !== undefined ? String(service.price) : "",
      category: service.category || "",
      image: service.image || "",
    });
    setIsEditDialogOpen(true);
  };

  const handleDeleteOpen = (service: Service) => {
    setSelectedService(service);
    setIsDeleteDialogOpen(true);
  };

  const handleAddOpen = () => {
    setAddForm(initialFormState);
    setIsAddDialogOpen(true);
  };

  // --- UPDATED HANDLERS WITH LOADING ---
  const confirmDelete = async () => {
    if (selectedService?.id) {
      setIsDeleting(true);
      try {
        await dispatch(deleteService(selectedService.id));
        // The state cleanup is now handled by the onOpenChange prop of the dialog
      } catch (error) {
        console.error('Delete error:', error);
      }
      setIsDeleting(false);
    }
    setIsDeleteDialogOpen(false); // This will trigger onOpenChange
  };

  const handleUpdateService = async () => {
    // Use _id from selectedService if present, otherwise fallback to id
    const serviceId = selectedService?._id || selectedService?.id;
    if (!serviceId) {
      console.error("❌ No service ID provided for update");
      return;
    }

    setIsUpdating(true);

    let serviceData: FormData | Record<string, any>;
    if (editForm.image && typeof editForm.image !== "string") {
      serviceData = new FormData();
      Object.entries(editForm).forEach(([key, value]) => {
        if (key === 'image') {
          serviceData.append('image', value);
        } else if (value) {
          serviceData.append(key, String(value));
        }
      });
    } else {
      serviceData = {
        title: editForm.title.trim(),
        description: editForm.description.trim(),
        status: editForm.status,
        category: editForm.category.trim() || undefined,
        price: editForm.price ? parseFloat(editForm.price) : undefined,
        image: editForm.image?.trim() || selectedService.image || undefined,
      };
      Object.keys(serviceData).forEach((key) => {
        if (serviceData[key as keyof typeof serviceData] === undefined) {
          delete serviceData[key as keyof typeof serviceData];
        }
      });
    }

    const result = await dispatch(
      updateService({ id: serviceId, serviceData })
    );

    setIsUpdating(false);

    if (updateService.fulfilled.match(result)) {
      setIsEditDialogOpen(false);
    } else {
      // Optionally show error
    }
  };

  const handleAddService = async () => {
    setIsAdding(true);
    const serviceData = {
      ...addForm,
      price: addForm.price ? parseFloat(addForm.price) : undefined,
    };
    await dispatch(createService(serviceData));
    setIsAdding(false);
    setIsAddDialogOpen(false);
  };

  // Form validation
  const isAddFormValid = () => {
    return addForm.title.trim() && addForm.description.trim() && addForm.category.trim();
  };

  const isEditFormValid = () => {
    return editForm.title.trim() && editForm.description.trim() && editForm.category.trim();
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setServicesCurrentPage(newPage));
  };

  // Spinner SVG for loading indication
  const Spinner = (
    <svg
      className="animate-spin h-4 w-4 text-white inline-block mr-2"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      style={{ verticalAlign: "middle" }}
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      ></circle>
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      ></path>
    </svg>
  );

  return (
    <div className="container mx-auto py-6 px-2 sm:px-4 md:px-6 lg:px-8 max-w-full">
      {/* Header and Filters */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-center sm:text-left w-full sm:w-auto">Services</h1>
        <div className="flex flex-col sm:flex-row gap-2 items-center w-full sm:w-auto">
          <div className="w-full sm:w-[180px]">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by status..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Statuses</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button className="w-full sm:w-auto" onClick={handleAddOpen}>Add Service</Button>
        </div>
      </div>

      {isLoading && services.length === 0 && <p className="text-center">Loading services...</p>}
      {reduxError && <p className="text-red-500 text-center">Error: {reduxError}</p>}

      {/* Services Grid */}
      <div
        className="
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            gap-4
            md:gap-6
            mb-8
          "
      >
        {filteredServices.length > 0 ? (
          filteredServices.map((service) => (
            <div
              key={service.id}
              className="
                  bg-white
                  rounded-lg
                  shadow
                  border
                  p-4
                  md:p-6
                  flex
                  flex-col
                  justify-between
                  h-full
                  min-w-0
                  transition
                  hover:shadow-lg
                  focus-within:ring-2
                  focus-within:ring-primary
                "
            >
              {service.image && (
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-36 sm:h-40 object-cover rounded mb-3"
                  style={{ objectFit: "cover" }}
                />
              )}
              <div className="flex-1 min-h-0">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 truncate">{service.title}</h2>
                <p className="text-gray-700 mb-2 line-clamp-3">{service.description}</p>
                {service.category && (
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">Category: </span>
                    <span className="text-sm">{service.category}</span>
                  </div>
                )}
                {service.price !== undefined && (
                  <div className="mb-2">
                    <span className="text-xs text-gray-500">Price: </span>
                    <span className="text-sm">₹{service.price}</span>
                  </div>
                )}
                <div className="mb-2">
                  <span className="text-xs text-gray-500">Created: </span>
                  <span className="text-sm">
                    {new Date(service.createdOn).toLocaleDateString()}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-xs text-gray-500">Updated: </span>
                  <span className="text-sm">
                    {new Date(service.updatedOn).toLocaleDateString()}
                  </span>
                </div>
                <Badge className={getStatusBadgeVariant(service.status)}>
                  {service.status}
                </Badge>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => handleEditOpen(service)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  className="w-full sm:w-auto"
                  onClick={() => handleDeleteOpen(service)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            No services found for the selected filter.
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-end space-y-2 sm:space-y-0 sm:space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <span className="mx-2 text-center">
          Page {currentPage} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          className="w-full sm:w-auto"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>

      {/* Add Service Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent className="max-w-full w-[95vw] sm:w-[480px]">
          <DialogHeader>
            <DialogTitle>Add Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="add-title">Title *</Label>
              <Input id="add-title" value={addForm.title} onChange={handleAddFormChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-description">Description *</Label>
              <Textarea id="add-description" value={addForm.description} onChange={handleAddFormChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-status">Status</Label>
              <Select value={addForm.status} onValueChange={(v) => setAddForm({ ...addForm, status: v as "active" | "inactive" })}>
                <SelectTrigger id="add-status"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-price">Price</Label>
              <Input id="add-price" type="number" value={addForm.price} onChange={handleAddFormChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-category">Category *</Label>
              <Input id="add-category" value={addForm.category} onChange={handleAddFormChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-image">Image URL</Label>
              <Input id="add-image" value={addForm.image} onChange={handleAddFormChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)} disabled={isAdding}>
              Cancel
            </Button>
            <Button onClick={handleAddService} disabled={!isAddFormValid() || isAdding}>
              {isAdding ? (
                <>
                  {Spinner}
                  Adding...
                </>
              ) : (
                "Add Service"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent className="max-w-full w-[95vw] sm:w-[480px]">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title *</Label>
              <Input id="edit-title" value={editForm.title} onChange={handleEditFormChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-description">Description *</Label>
              <Textarea id="edit-description" value={editForm.description} onChange={handleEditFormChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select value={editForm.status} onValueChange={(v) => setEditForm({ ...editForm, status: v as "active" | "inactive" })}>
                <SelectTrigger id="edit-status"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-price">Price</Label>
              <Input id="edit-price" type="number" value={editForm.price} onChange={handleEditFormChange} />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category *</Label>
              <Input id="edit-category" value={editForm.category} onChange={handleEditFormChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input id="edit-image" value={editForm.image} onChange={handleEditFormChange} />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)} disabled={isUpdating}>
              Cancel
            </Button>
            <Button onClick={handleUpdateService} disabled={!isEditFormValid() || isUpdating}>
              {isUpdating ? (
                <>
                  {Spinner}
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent className="max-w-full w-[95vw] sm:w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the service {selectedService?.title}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedService(null)} disabled={isDeleting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-destructive hover:bg-destructive/90"
              disabled={isDeleting}
              style={isDeleting ? { pointerEvents: "none", opacity: 0.8 } : {}}
            >
              {isDeleting ? (
                <>
                  {Spinner}
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

export default ManageServicesPage;
