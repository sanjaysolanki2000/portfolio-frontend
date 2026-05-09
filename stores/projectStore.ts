"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { api } from "@/lib/api";
import { projects, type Project } from "@/lib/data";

export type ProjectFilter = "All" | "React Native" | "Flutter" | "React.js" | "PHP";

class ProjectStore {
  projects: Project[] = projects;
  filter: ProjectFilter = "All";
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get filters(): ProjectFilter[] {
    return ["All", "React Native", "Flutter", "React.js", "PHP"];
  }

  get visibleProjects() {
    const sorted = [...this.projects].filter((project) => project.visible).sort((a, b) => a.order - b.order);
    if (this.filter === "All") {
      return sorted;
    }
    return sorted.filter((project) => project.filter === this.filter);
  }

  setFilter(filter: ProjectFilter) {
    this.filter = filter;
  }

  async loadProjects() {
    this.loading = true;
    try {
      const response = await api.get<Project[]>("/api/projects");
      runInAction(() => {
        this.projects = response.data.length ? response.data : projects;
      });
    } catch {
      runInAction(() => {
        this.projects = readLocalProjects();
      });
    } finally {
      runInAction(() => {
        this.loading = false;
      });
    }
  }
}

export const projectStore = new ProjectStore();

function readLocalProjects(): Project[] {
  if (typeof window === "undefined") return projects;
  const stored = localStorage.getItem("portfolio-admin-projects");
  if (!stored) return projects;
  try {
    return JSON.parse(stored) as Project[];
  } catch {
    return projects;
  }
}
