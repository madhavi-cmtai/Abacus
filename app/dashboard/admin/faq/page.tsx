"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  fetchFAQs,
  createFAQ,
  editFAQ,
  removeFAQ,
  selectFAQs,
  selectFAQLoading,
  selectFAQError,
} from "@/lib/redux/faqSlice";
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
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

const ManageFAQPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux state
  const faqs = useSelector(selectFAQs);
  const isLoading = useSelector(selectFAQLoading);
  const reduxError = useSelector(selectFAQError);

  // Local state
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState<any>(null);

  // Add form state
  const [addQuestion, setAddQuestion] = useState("");
  const [addAnswer, setAddAnswer] = useState("");
  const [addCategory, setAddCategory] = useState("");

  // Edit form state
  const [editQuestion, setEditQuestion] = useState("");
  const [editAnswer, setEditAnswer] = useState("");
  const [editCategory, setEditCategory] = useState("");

  useEffect(() => {
    dispatch(fetchFAQs());
  }, [dispatch]);

  // Handlers
  const handleAddOpen = () => {
    setAddQuestion("");
    setAddAnswer("");
    setAddCategory("");
    setIsAddDialogOpen(true);
  };

  const handleEditOpen = (faq: any) => {
    setSelectedFAQ(faq);
    setEditQuestion(faq.question || "");
    setEditAnswer(faq.answer || "");
    setEditCategory(faq.category || "");
    setIsEditDialogOpen(true);
  };

  const handleDeleteOpen = (faq: any) => {
    setSelectedFAQ(faq);
    setIsDeleteDialogOpen(true);
  };

  const handleAddFAQ = async () => {
    if (!addQuestion || !addAnswer) return;
    const faqData = new FormData();
    faqData.append("question", addQuestion);
    faqData.append("answer", addAnswer);
    if (addCategory) faqData.append("category", addCategory);
    await dispatch(createFAQ(faqData));
    setIsAddDialogOpen(false);
  };

  const handleEditFAQ = async () => {
    if (!selectedFAQ || !editQuestion || !editAnswer) return;
    const faqData = {
      question: editQuestion,
      answer: editAnswer,
      category: editCategory,
    };
    await dispatch(editFAQ(selectedFAQ.id, faqData));
    setIsEditDialogOpen(false);
    setSelectedFAQ(null);
  };

  const confirmDelete = async () => {
    if (selectedFAQ && selectedFAQ.id) {
      await dispatch(removeFAQ(selectedFAQ.id));
    }
    setIsDeleteDialogOpen(false);
    setSelectedFAQ(null);
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">FAQs</h1>
        <Button onClick={handleAddOpen}>Add FAQ</Button>
      </div>

      {isLoading && faqs.length === 0 && <p>Loading FAQs...</p>}
      {reduxError && <p className="text-red-500">Error: {reduxError}</p>}

      {/* FAQs as Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {faqs.length > 0 ? (
          faqs.map((faq) => (
            <div
              key={faq.id}
              className="bg-white rounded-lg shadow border p-6 flex flex-col justify-between"
            >
              <div className="flex-1">
                <div className="mb-2 text-lg font-semibold text-red-600">{faq.question}</div>
                <div className="mb-2 text-base text-black">{faq.answer}</div>
                {faq.category && (
                  <div className="mb-1 text-xs text-gray-500">Category: {faq.category}</div>
                )}
                <div className="mb-1 text-xs text-gray-400">
                  Created: {new Date(faq.createdOn).toLocaleDateString()}
                </div>
                <div className="mb-1 text-xs text-gray-400">
                  Updated: {new Date(faq.updatedOn).toLocaleDateString()}
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditOpen(faq)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteOpen(faq)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            No FAQs found.
          </div>
        )}
      </div>

      {/* Add FAQ Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add FAQ</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new FAQ.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="add-question">Question</Label>
              <Input
                id="add-question"
                value={addQuestion}
                onChange={(e) => setAddQuestion(e.target.value)}
                placeholder="FAQ question"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-answer">Answer</Label>
              <Textarea
                id="add-answer"
                value={addAnswer}
                onChange={(e) => setAddAnswer(e.target.value)}
                placeholder="FAQ answer"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-category">Category</Label>
              <Input
                id="add-category"
                value={addCategory}
                onChange={(e) => setAddCategory(e.target.value)}
                placeholder="FAQ category (optional)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddFAQ}>Add FAQ</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit FAQ Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit FAQ</DialogTitle>
            <DialogDescription>
              Update the details for this FAQ.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-question">Question</Label>
              <Input
                id="edit-question"
                value={editQuestion}
                onChange={(e) => setEditQuestion(e.target.value)}
                placeholder="FAQ question"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-answer">Answer</Label>
              <Textarea
                id="edit-answer"
                value={editAnswer}
                onChange={(e) => setEditAnswer(e.target.value)}
                placeholder="FAQ answer"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-category">Category</Label>
              <Input
                id="edit-category"
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
                placeholder="FAQ category (optional)"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditFAQ}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the FAQ: {selectedFAQ?.question}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedFAQ(null)}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
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

export default ManageFAQPage;
