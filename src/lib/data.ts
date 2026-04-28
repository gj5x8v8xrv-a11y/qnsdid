import "server-only";

import { getAdminSupabaseClient } from "@/lib/supabase/admin";
import { mockInquiries, mockProjects } from "@/lib/mock-data";
import type { Inquiry, Project, ProjectImage, ProjectStatus, ProjectWithImages } from "@/lib/types";
import { isSupabaseConfigured } from "@/lib/utils";

type ProjectRow = {
  id: string;
  name: string;
  slug: string;
  status: ProjectStatus;
  location: string;
  household_count: string;
  unit_plan: string;
  expected_move_in: string;
  sales_conditions: string;
  premium_summary: string;
  location_description: string;
  cover_image_url: string | null;
  cover_image_path: string | null;
  contact_phone: string;
  reservation_url: string | null;
  created_at: string;
  updated_at: string;
};

type ProjectImageRow = {
  id: string;
  project_id: string;
  image_url: string;
  image_path: string | null;
  sort_order: number;
  created_at: string;
};

type InquiryRow = {
  id: string;
  name: string;
  phone: string;
  message: string;
  project_id: string | null;
  status: Inquiry["status"];
  created_at: string;
  projects:
    | null
    | {
        name: string;
      }
    | Array<{
        name: string;
      }>;
};

function mapProject(row: ProjectRow): Project {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    status: row.status,
    location: row.location,
    householdCount: row.household_count,
    unitPlan: row.unit_plan,
    expectedMoveIn: row.expected_move_in,
    salesConditions: row.sales_conditions,
    premiumSummary: row.premium_summary,
    locationDescription: row.location_description,
    coverImageUrl: row.cover_image_url,
    coverImagePath: row.cover_image_path,
    contactPhone: row.contact_phone,
    reservationUrl: row.reservation_url,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  };
}

function mapImage(row: ProjectImageRow): ProjectImage {
  return {
    id: row.id,
    projectId: row.project_id,
    imageUrl: row.image_url,
    imagePath: row.image_path,
    sortOrder: row.sort_order,
    createdAt: row.created_at
  };
}

function mapInquiry(row: InquiryRow): Inquiry {
  const projectName = Array.isArray(row.projects)
    ? row.projects[0]?.name || null
    : row.projects?.name || null;

  return {
    id: row.id,
    name: row.name,
    phone: row.phone,
    message: row.message,
    projectId: row.project_id,
    projectName,
    status: row.status,
    createdAt: row.created_at
  };
}

function getFallbackProjects(status?: ProjectStatus) {
  return mockProjects
    .filter((project) => (status ? project.status === status : true))
    .map(({ gallery, ...project }) => project);
}

function getFallbackProjectBySlug(slug: string) {
  return mockProjects.find((project) => project.slug === slug) || null;
}

function getFallbackProjectById(projectId: string) {
  return mockProjects.find((project) => project.id === projectId) || null;
}

function getFallbackInquiries(limit?: number) {
  return typeof limit === "number" ? mockInquiries.slice(0, limit) : mockInquiries;
}

function logDataReadWarning(scope: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[data:${scope}] ${message}`);
}

export async function getProjects(status?: ProjectStatus) {
  if (!isSupabaseConfigured()) {
    return getFallbackProjects(status);
  }

  try {
    const supabase = getAdminSupabaseClient();
    let query = supabase.from("projects").select("*").order("created_at", {
      ascending: false
    });

    if (status) {
      query = query.eq("status", status);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return (data as ProjectRow[]).map(mapProject);
  } catch (error) {
    logDataReadWarning("projects", error);
    return getFallbackProjects(status);
  }
}

export async function getProjectBySlug(slug: string) {
  if (!isSupabaseConfigured()) {
    return getFallbackProjectBySlug(slug);
  }

  try {
    const supabase = getAdminSupabaseClient();
    const { data: projectRow, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();

    if (projectError) throw new Error(projectError.message);
    if (!projectRow) return null;

    const { data: imageRows, error: imageError } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_id", projectRow.id)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (imageError) throw new Error(imageError.message);

    return {
      ...mapProject(projectRow as ProjectRow),
      gallery: (imageRows as ProjectImageRow[]).map(mapImage)
    } satisfies ProjectWithImages;
  } catch (error) {
    logDataReadWarning("projectBySlug", error);
    return getFallbackProjectBySlug(slug);
  }
}

export async function getProjectById(projectId: string) {
  if (!isSupabaseConfigured()) {
    return getFallbackProjectById(projectId);
  }

  try {
    const supabase = getAdminSupabaseClient();
    const { data: projectRow, error: projectError } = await supabase
      .from("projects")
      .select("*")
      .eq("id", projectId)
      .maybeSingle();

    if (projectError) throw new Error(projectError.message);
    if (!projectRow) return null;

    const { data: imageRows, error: imageError } = await supabase
      .from("project_images")
      .select("*")
      .eq("project_id", projectId)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (imageError) throw new Error(imageError.message);

    return {
      ...mapProject(projectRow as ProjectRow),
      gallery: (imageRows as ProjectImageRow[]).map(mapImage)
    } satisfies ProjectWithImages;
  } catch (error) {
    logDataReadWarning("projectById", error);
    return getFallbackProjectById(projectId);
  }
}

export async function getAdminDashboardData() {
  const [projects, inquiries] = await Promise.all([getProjects(), getInquiries()]);

  return {
    activeCount: projects.filter((project) => project.status === "active").length,
    completedCount: projects.filter((project) => project.status === "completed").length,
    inquiryCount: inquiries.length,
    projects,
    inquiries
  };
}

export async function getInquiries(limit?: number) {
  if (!isSupabaseConfigured()) {
    return getFallbackInquiries(limit);
  }

  try {
    const supabase = getAdminSupabaseClient();
    let query = supabase
      .from("inquiries")
      .select("id, name, phone, message, project_id, status, created_at, projects(name)")
      .order("created_at", { ascending: false });

    if (typeof limit === "number") {
      query = query.limit(limit);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);

    return (data as InquiryRow[]).map(mapInquiry);
  } catch (error) {
    logDataReadWarning("inquiries", error);
    return getFallbackInquiries(limit);
  }
}
