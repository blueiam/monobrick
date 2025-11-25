"use client";

import { useState, useEffect } from "react";
import { createSupabaseClient } from "@/lib/supabase-client";
import type { NewsItem } from "@/data/news";
import Image from "next/image";
import { RichTextEditor } from "@/components/rich-text-editor";

export default function AdminNewsPage() {
  const [posts, setPosts] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<NewsItem | null>(null);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    loadPosts();
  }, []);

  async function loadPosts() {
    try {
      const supabase = createSupabaseClient();
      const { data, error } = await supabase
        .from("posts")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPosts(
        (data || []).map((row) => ({
          id: String(row.id),
          title: row.title,
          content: row.content,
          category: row.category ?? "news",
          created_at: row.created_at ?? new Date().toISOString(),
          image_url: row.image_url,
          file_url: row.file_url,
        }))
      );
    } catch (error) {
      console.error("Error loading posts:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const supabase = createSupabaseClient();
      const { error } = await supabase.from("posts").delete().eq("id", id);
      if (error) throw error;
      loadPosts();
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Failed to delete post");
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-white">News Management</h1>
        <button
          onClick={() => {
            setEditingPost(null);
            setShowForm(true);
          }}
          className="rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white transition hover:bg-amber-600"
        >
          + New Post
        </button>
      </div>

      {showForm && (
        <PostForm
          post={editingPost}
          onClose={() => {
            setShowForm(false);
            setEditingPost(null);
          }}
          onSuccess={loadPosts}
        />
      )}

      {loading ? (
        <div className="text-center text-stone-400">Loading...</div>
      ) : (
        <div className="space-y-4">
          {posts.length === 0 ? (
            <div className="rounded-lg border border-white/10 bg-stone-900/60 p-8 text-center text-stone-400">
              No posts yet. Create your first post!
            </div>
          ) : (
            posts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onEdit={() => {
                  setEditingPost(post);
                  setShowForm(true);
                }}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      )}
    </div>
  );
}

function PostCard({
  post,
  onEdit,
  onDelete,
}: {
  post: NewsItem;
  onEdit: () => void;
  onDelete: (id: string) => void;
}) {
  return (
    <div className="rounded-lg border border-white/10 bg-stone-900/60 p-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h3 className="text-xl font-semibold text-white">{post.title}</h3>
            <span className="rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold text-amber-300">
              {post.category}
            </span>
          </div>
          <p className="mt-2 text-sm text-stone-400">
            {new Date(post.created_at).toLocaleDateString()}
          </p>
          <p className="mt-3 text-stone-300 line-clamp-2">{post.content}</p>
          {post.image_url && (
            <div className="mt-4 relative h-32 w-48 overflow-hidden rounded-lg">
              <Image
                src={post.image_url}
                alt={post.title}
                fill
                className="object-cover"
                sizes="192px"
              />
            </div>
          )}
          {post.file_url && (
            <a
              href={post.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm text-amber-400 hover:text-amber-300"
            >
              📄 View PDF
            </a>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={onEdit}
            className="rounded-lg border border-white/20 px-4 py-2 text-sm text-white transition hover:bg-white/10"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(post.id)}
            className="rounded-lg border border-red-500/20 px-4 py-2 text-sm text-red-400 transition hover:bg-red-500/10"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

function PostForm({
  post,
  onClose,
  onSuccess,
}: {
  post: NewsItem | null;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [title, setTitle] = useState(post?.title || "");
  const [content, setContent] = useState(post?.content || "");
  const [category, setCategory] = useState(post?.category || "news");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    post?.image_url || null
  );
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const supabase = createSupabaseClient();
      
      // Check authentication session before proceeding
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !session) {
        throw new Error("You are not authenticated. Please log in again.");
      }

      let imageUrl = post?.image_url || null;
      let fileUrl = post?.file_url || null;

      // Upload image
      if (imageFile) {
        try {
          const imageExt = imageFile.name.split(".").pop();
          const imageName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${imageExt}`;
          const { error: imageError } = await supabase.storage
            .from("news_images")
            .upload(imageName, imageFile);

          if (imageError) {
            if (imageError.message.includes("Bucket not found")) {
              throw new Error(
                "Storage bucket 'news_images' not found. Please create it in Supabase Dashboard > Storage."
              );
            }
            throw imageError;
          }

          const {
            data: { publicUrl: imagePublicUrl },
          } = supabase.storage.from("news_images").getPublicUrl(imageName);
          imageUrl = imagePublicUrl;
        } catch (err) {
          throw err;
        }
      }

      // Upload PDF
      if (pdfFile) {
        try {
          // Verify session before upload
          const { data: { session: uploadSession } } = await supabase.auth.getSession();
          if (!uploadSession) {
            throw new Error("Session expired. Please log in again.");
          }

          const pdfExt = pdfFile.name.split(".").pop();
          const pdfName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${pdfExt}`;
          
          const { data: uploadData, error: pdfError } = await supabase.storage
            .from("news_files")
            .upload(pdfName, pdfFile, {
              cacheControl: '3600',
              upsert: false
            });

          if (pdfError) {
            console.error("PDF upload error:", pdfError);
            if (pdfError.message.includes("Bucket not found")) {
              throw new Error(
                "Storage bucket 'news_files' not found. Please create it in Supabase Dashboard > Storage."
              );
            }
            if (pdfError.message.includes("row-level security") || pdfError.message.includes("RLS")) {
              throw new Error(
                "Storage RLS policy error. Please ensure Storage policies are set correctly. " +
                "Check README.md for Storage policy SQL commands. " +
                "Error: " + pdfError.message
              );
            }
            throw pdfError;
          }

          const {
            data: { publicUrl: pdfPublicUrl },
          } = supabase.storage.from("news_files").getPublicUrl(pdfName);
          fileUrl = pdfPublicUrl;
        } catch (err) {
          console.error("PDF upload failed:", err);
          throw err;
        }
      }

      // Create or update post
      const postData = {
        title,
        content,
        category,
        image_url: imageUrl,
        file_url: fileUrl,
        created_at: post?.created_at || new Date().toISOString(),
      };

      if (post) {
        const { error } = await supabase
          .from("posts")
          .update(postData)
          .eq("id", post.id);
        if (error) {
          if (error.message.includes("row-level security")) {
            throw new Error(
              "Row Level Security policy error. Please ensure RLS policies are set in Supabase. See README for SQL commands."
            );
          }
          throw error;
        }
      } else {
        const { data: insertData, error } = await supabase.from("posts").insert([postData]).select();
        if (error) {
          console.error("Insert error details:", error);
          if (error.message.includes("row-level security") || error.message.includes("RLS")) {
            throw new Error(
              "Row Level Security policy error. Please ensure you have run the SQL policies in Supabase SQL Editor. " +
              "Check README.md for the complete SQL commands. " +
              "Error: " + error.message
            );
          }
          throw error;
        }
        console.log("Post created successfully:", insertData);
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error saving post:", error);
      const message = error instanceof Error ? error.message : "Failed to save post";
      alert(message);
    } finally {
      setLoading(false);
    }
  }

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-2xl rounded-2xl border border-white/10 bg-stone-900 p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white">
            {post ? "Edit Post" : "New Post"}
          </h2>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-stone-300 mb-2">
              Title
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-stone-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-300 mb-2">
              Content
            </label>
            <RichTextEditor
              content={content}
              onChange={(html) => setContent(html)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-300 mb-2">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-lg border border-white/10 bg-stone-800 px-4 py-2 text-white focus:border-amber-500 focus:outline-none"
            >
              <option value="news">News</option>
              <option value="exhibition">Exhibition</option>
              <option value="studio">Studio</option>
              <option value="residency">Residency</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-300 mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-lg border border-white/10 bg-stone-800 px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-white hover:file:bg-amber-600"
            />
            {imagePreview && (
              <div className="mt-4 relative h-48 w-full overflow-hidden rounded-lg">
                <Image
                  src={imagePreview}
                  alt="Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 768px"
                />
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-stone-300 mb-2">
              PDF File
            </label>
            <input
              type="file"
              accept=".pdf"
              onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
              className="w-full rounded-lg border border-white/10 bg-stone-800 px-4 py-2 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-amber-500 file:text-white hover:file:bg-amber-600"
            />
          </div>

          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 rounded-lg bg-amber-500 px-4 py-2 font-semibold text-white transition hover:bg-amber-600 disabled:opacity-50"
            >
              {loading ? "Saving..." : post ? "Update" : "Create"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-white/20 px-4 py-2 text-white transition hover:bg-white/10"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

