import { createClient } from "@supabase/supabase-js";

/**
 * Read-only content layer over the existing Supabase tables (blog_posts,
 * team_members). Both have public read policies for published/active rows.
 *
 * Queries run on the server, so the anon key is never needed in the browser.
 * When Supabase is not configured the helpers return empty results and the
 * pages render their empty state rather than failing the build.
 */

const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const client = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;

export const contentConfigured = Boolean(client);

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  category: string | null;
  author: string | null;
  meta_title: string | null;
  meta_description: string | null;
  read_time: string | null;
  featured: boolean | null;
  created_at: string;
  updated_at: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string | null;
  linkedin_url: string | null;
  photo_url: string | null;
  display_order: number | null;
}

export async function getPublishedPosts(): Promise<BlogPost[]> {
  if (!client) return [];
  const { data, error } = await client
    .from("blog_posts")
    .select("*")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Failed to load blog posts:", error.message);
    return [];
  }
  return (data ?? []) as BlogPost[];
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!client) return null;
  const { data, error } = await client
    .from("blog_posts")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();
  if (error) {
    console.error("Failed to load blog post:", error.message);
    return null;
  }
  return (data as BlogPost) ?? null;
}

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!client) return [];
  const { data, error } = await client
    .from("team_members")
    .select("id,name,role,bio,linkedin_url,photo_url,display_order")
    .eq("active", true)
    .order("display_order", { ascending: true });
  if (error) {
    console.error("Failed to load team members:", error.message);
    return [];
  }
  return (data ?? []) as TeamMember[];
}
