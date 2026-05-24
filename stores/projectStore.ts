"use client";

import { makeAutoObservable, runInAction } from "mobx";
import { api } from "@/lib/api";
import { projects, type Project } from "@/lib/data";

export type ProjectFilter = "All" | "React Native" | "Flutter" | "React.js" | "Node Js" | "PHP";

class ProjectStore {
  projects: Project[] = projects;
  selectedFilters: ProjectFilter[] = ["All"];
  loading = false;

  constructor() {
    makeAutoObservable(this);
  }

  get filters(): ProjectFilter[] {
    return ["All", "React Native", "Flutter", "React.js", "Node Js", "PHP"];
  }

  get filter() {
    return this.selectedFilters.includes("All") ? "All" : this.selectedFilters[0] || "All";
  }

  get visibleProjects() {
    const sorted = [...this.projects].filter((project) => project.visible).sort((a, b) => a.order - b.order);
    if (this.selectedFilters.includes("All")) {
      return sorted;
    }
    return sorted.filter((project) => {
      const projFilters = Array.isArray(project.filter) ? project.filter : [project.filter];
      return projFilters.some((f) => this.selectedFilters.includes(f as ProjectFilter));
    });
  }

  setFilter(filter: ProjectFilter) {
    if (filter === "All") {
      this.selectedFilters = ["All"];
    } else {
      this.selectedFilters = this.selectedFilters.filter((f) => f !== "All");
      if (this.selectedFilters.includes(filter)) {
        this.selectedFilters = this.selectedFilters.filter((f) => f !== filter);
        if (this.selectedFilters.length === 0) {
          this.selectedFilters = ["All"];
        }
      } else {
        this.selectedFilters.push(filter);
      }
    }
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
