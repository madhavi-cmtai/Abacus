
"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  fetchLeads,
  createLead,
  editLead,
  removeLead,
  selectLeads,
  selectLeadLoading,
  selectLeadError,
} from "@/lib/redux/leadSlice";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const LeadsTablePage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const leads = useSelector(selectLeads);
  const isLoading = useSelector(selectLeadLoading);
  const error = useSelector(selectLeadError);

  // Add Lead Dialog State
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [addName, setAddName] = useState("");
  const [addEmail, setAddEmail] = useState("");
  const [addSubject, setAddSubject] = useState("");
  const [addMessage, setAddMessage] = useState("");

  // Edit Lead Dialog State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editMessage, setEditMessage] = useState("");

  // Delete Lead Dialog State
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [deleteName, setDeleteName] = useState<string>("");

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  // Handlers for Add
  const handleAddOpen = () => {
    setAddName("");
    setAddEmail("");
    setAddSubject("");
    setAddMessage("");
    setIsAddDialogOpen(true);
  };

  const handleAddLead = async () => {
    if (!addName || !addEmail || !addSubject || !addMessage) return;
    await dispatch(
      createLead({
        name: addName,
        email: addEmail,
        subject: addSubject,
        message: addMessage,
      })
    );
    setIsAddDialogOpen(false);
  };

  // Handlers for Edit
  const handleEditOpen = (lead: any) => {
    setEditId(lead.id);
    setEditName(lead.name);
    setEditEmail(lead.email);
    setEditSubject(lead.subject);
    setEditMessage(lead.message);
    setIsEditDialogOpen(true);
  };

  const handleEditLead = async () => {
    if (!editId) return;
    await dispatch(
      editLead(editId, {
        name: editName,
        email: editEmail,
        subject: editSubject,
        message: editMessage,
      })
    );
    setIsEditDialogOpen(false);
  };

  // Handlers for Delete
  const handleDeleteOpen = (lead: any) => {
    setDeleteId(lead.id);
    setDeleteName(lead.name);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteLead = async () => {
    if (!deleteId) return;
    await dispatch(removeLead(deleteId));
    setIsDeleteDialogOpen(false);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Leads</h1>
        <Button onClick={handleAddOpen}>Add Lead</Button>
      </div>
      {isLoading && <p>Loading leads...</p>}
      {error && <p className="text-red-500 mb-4">Error: {error}</p>}
      <div className="overflow-x-auto rounded-lg shadow border bg-white">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
              {/* Message column removed */}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Created On</th>
              {/* Updated On column removed */}
              <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-100">
            {leads.length === 0 && !isLoading ? (
              <tr>
                <td colSpan={5} className="px-4 py-6 text-center text-gray-500">
                  No leads found.
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id}>
                  <td className="px-4 py-3 whitespace-nowrap">{lead.name}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{lead.email}</td>
                  <td className="px-4 py-3 whitespace-nowrap">{lead.subject}</td>
                  {/* Message cell removed */}
                  <td className="px-4 py-3 whitespace-nowrap">
                    {new Date(lead.createdOn).toLocaleString()}
                  </td>
                  {/* Updated On cell removed */}
                  <td className="px-4 py-3 whitespace-nowrap flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEditOpen(lead)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDeleteOpen(lead)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add Lead Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Lead</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new lead.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="add-name">Name</Label>
              <Input
                id="add-name"
                value={addName}
                onChange={(e) => setAddName(e.target.value)}
                placeholder="Lead name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-email">Email</Label>
              <Input
                id="add-email"
                type="email"
                value={addEmail}
                onChange={(e) => setAddEmail(e.target.value)}
                placeholder="Lead email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-subject">Subject</Label>
              <Input
                id="add-subject"
                value={addSubject}
                onChange={(e) => setAddSubject(e.target.value)}
                placeholder="Lead subject"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-message">Message</Label>
              <Textarea
                id="add-message"
                value={addMessage}
                onChange={(e) => setAddMessage(e.target.value)}
                placeholder="Lead message"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddLead}>Add Lead</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Lead Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Lead</DialogTitle>
            <DialogDescription>
              Update the details for this lead.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-name">Name</Label>
              <Input
                id="edit-name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                placeholder="Lead name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editEmail}
                onChange={(e) => setEditEmail(e.target.value)}
                placeholder="Lead email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-subject">Subject</Label>
              <Input
                id="edit-subject"
                value={editSubject}
                onChange={(e) => setEditSubject(e.target.value)}
                placeholder="Lead subject"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-message">Message</Label>
              <Textarea
                id="edit-message"
                value={editMessage}
                onChange={(e) => setEditMessage(e.target.value)}
                placeholder="Lead message"
                readOnly
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditLead}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Lead Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the lead {deleteName}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setDeleteId(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDeleteLead}
              className="bg-destructive hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default LeadsTablePage;
