import { Project } from "./data";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export async function getProjects(): Promise<Project[]> {
  try {
    const res = await fetch(`${API_URL}/api/projects`, { cache: "no-store" });
    if (!res.ok) return [];
    return res.json();
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") throw error;
    console.error("Failed to fetch projects", error);
    return [];
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    const res = await fetch(`${API_URL}/api/projects/${slug}`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") throw error;
    console.error("Failed to fetch project by slug", error);
    return null;
  }
}

export async function getProfile() {
  try {
    const res = await fetch(`${API_URL}/api/profile`, { cache: "no-store" });
    if (!res.ok) return null;
    return res.json();
  } catch (error: any) {
    if (error?.digest === "DYNAMIC_SERVER_USAGE") throw error;
    console.error("Failed to fetch profile", error);
    return null;
  }
}
