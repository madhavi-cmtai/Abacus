"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import {
  fetchBlogs,
  createBlog,
  updateBlog,
  deleteBlog,
  selectBlogs,
  selectLoading as selectBlogsLoading,
  selectError as selectBlogsError,
  selectPagination as selectBlogsPagination,
  setCurrentPage as setBlogsCurrentPage,
  Blog,
} from "@/lib/redux/blogSlice";
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
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

// Helper to get MongoDB _id from blog object
function getBlogId(blog: any): string {
  // Prefer _id if present, fallback to id
  return (blog && (blog._id || blog.id)) ?? "";
}

const ManageBlogsPage = () => {
  const dispatch = useDispatch<AppDispatch>();

  // Redux State
  const blogs = useSelector(selectBlogs);
  const { currentPage, totalPages } = useSelector(selectBlogsPagination);
  const isLoading = useSelector(selectBlogsLoading);
  const reduxError = useSelector(selectBlogsError);

  // Component State
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  // Edit form state
  const [editTitle, setEditTitle] = useState<string>("");
  const [editSubtitle, setEditSubtitle] = useState<string>("");
  const [editSummary, setEditSummary] = useState<string>("");
  const [editImage, setEditImage] = useState<string>("");

  // Add form state
  const [addTitle, setAddTitle] = useState<string>("");
  const [addSubtitle, setAddSubtitle] = useState<string>("");
  const [addSummary, setAddSummary] = useState<string>("");
  const [addImage, setAddImage] = useState<string>("");

  // Fetch blogs on mount/page change
  useEffect(() => {
    dispatch(fetchBlogs({ page: currentPage }));
  }, [dispatch, currentPage]);

  // Handlers
  const handleEditOpen = (blog: Blog) => {
    setSelectedBlog(blog);
    setEditTitle(blog.title || "");
    setEditSubtitle(blog.subtitle || "");
    setEditSummary(blog.summary || "");
    setEditImage(blog.image || "");
    setIsEditDialogOpen(true);
  };

  const handleDeleteOpen = (blog: Blog) => {
    setSelectedBlog(blog);
    setIsDeleteDialogOpen(true);
  };

  const handleAddOpen = () => {
    setAddTitle("");
    setAddSubtitle("");
    setAddSummary("");
    setAddImage("");
    setIsAddDialogOpen(true);
  };

  const confirmDelete = async () => {
    const blogId = getBlogId(selectedBlog);
    if (selectedBlog && blogId) {
      await dispatch(deleteBlog(blogId));
      dispatch(fetchBlogs({ page: currentPage }));
    }
    setIsDeleteDialogOpen(false);
    setSelectedBlog(null);
  };

  const handleUpdateBlog = async () => {
    const blogId = getBlogId(selectedBlog);
    if (!blogId) {
      console.error("❌ No blog ID provided for update");
      return;
    }

    // Prepare the data
    const blogData: Partial<Omit<Blog, "id" | "createdOn">> = {
      title: editTitle.trim(),
      subtitle: editSubtitle?.trim() || undefined,
      summary: editSummary.trim(),
      image: editImage?.trim() || undefined,
    };

    // Dispatch update
    const result = await dispatch(updateBlog({ id: blogId, blogData }));

    // Check if update was successful
    if (updateBlog.fulfilled.match(result)) {
      console.log("✅ Blog updated:", result.payload);
      // Refetch blogs to refresh list
      dispatch(fetchBlogs({ page: currentPage }));
      setIsEditDialogOpen(false);
      setSelectedBlog(null);
    } else {
      console.error("❌ Blog update failed:", result.payload);
    }
  };

  const handleAddBlog = async () => {
    const newBlog = {
      title: addTitle,
      subtitle: addSubtitle,
      summary: addSummary,
      image: addImage,
    };
    await dispatch(createBlog(newBlog));
    dispatch(fetchBlogs({ page: currentPage }));
    setIsAddDialogOpen(false);
  };

  const handlePageChange = (newPage: number) => {
    dispatch(setBlogsCurrentPage(newPage));
  };

  return (
    <div className="container mx-auto py-10">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold">Blogs</h1>
        <Button onClick={handleAddOpen}>Add Blog</Button>
      </div>

      {isLoading && blogs.length === 0 && <p>Loading blogs...</p>}
      {/* Custom error message for failed fetch */}
      {reduxError && (
        <p className="text-red-500">
          Error: Failed to fetch blogs
        </p>
      )}

      {/* Blogs as Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {blogs.length > 0 ? (
          blogs.map((blog) => (
            <div
              key={getBlogId(blog)}
              className="bg-white rounded-lg shadow border p-6 flex flex-col justify-between"
            >
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-40 object-cover rounded mb-4"
                />
              )}
              <div className="flex-1">
                <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
                {blog.subtitle && (
                  <div className="text-gray-500 text-sm mb-2">{blog.subtitle}</div>
                )}
                <p className="text-gray-700 mb-2">{blog.summary}</p>
                <div className="mb-2">
                  <span className="text-xs text-gray-500">Created: </span>
                  <span className="text-sm">
                    {blog.createdOn
                      ? new Date(blog.createdOn).toLocaleDateString()
                      : ""}
                  </span>
                </div>
                <div className="mb-2">
                  <span className="text-xs text-gray-500">Updated: </span>
                  <span className="text-sm">
                    {blog.updatedOn
                      ? new Date(blog.updatedOn).toLocaleDateString()
                      : ""}
                  </span>
                </div>
              </div>
              <div className="flex gap-2 mt-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleEditOpen(blog)}
                >
                  Edit
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleDeleteOpen(blog)}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 py-12">
            No blogs found.
          </div>
        )}
      </div>

      {/* Pagination Controls */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage <= 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages || 1}
        </span>
        <Button
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
        >
          Next
        </Button>
      </div>

      {/* Add Blog Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Blog</DialogTitle>
            <DialogDescription>
              Fill in the details to add a new blog.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="add-title">Title</Label>
              <Input
                id="add-title"
                value={addTitle}
                onChange={(e) => setAddTitle(e.target.value)}
                placeholder="Blog title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-subtitle">Subtitle</Label>
              <Input
                id="add-subtitle"
                value={addSubtitle}
                onChange={(e) => setAddSubtitle(e.target.value)}
                placeholder="Blog subtitle"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-summary">Summary</Label>
              <Textarea
                id="add-summary"
                value={addSummary}
                onChange={(e) => setAddSummary(e.target.value)}
                placeholder="Blog summary"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="add-image">Image URL</Label>
              <Input
                id="add-image"
                value={addImage}
                onChange={(e) => setAddImage(e.target.value)}
                placeholder="Image URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddBlog}>Add Blog</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Blog Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Blog</DialogTitle>
            <DialogDescription>
              Update the details for {selectedBlog?.title}.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                placeholder="Blog title"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-subtitle">Subtitle</Label>
              <Input
                id="edit-subtitle"
                value={editSubtitle}
                onChange={(e) => setEditSubtitle(e.target.value)}
                placeholder="Blog subtitle"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-summary">Summary</Label>
              <Textarea
                id="edit-summary"
                value={editSummary}
                onChange={(e) => setEditSummary(e.target.value)}
                placeholder="Blog summary"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-image">Image URL</Label>
              <Input
                id="edit-image"
                value={editImage}
                onChange={(e) => setEditImage(e.target.value)}
                placeholder="Image URL"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateBlog}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the blog {selectedBlog?.title}. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setSelectedBlog(null)}>
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

export default ManageBlogsPage;
