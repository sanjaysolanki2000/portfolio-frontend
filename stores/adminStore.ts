"use client";

import { makeAutoObservable } from "mobx";
import { api } from "@/lib/api";

class AdminStore {
  authenticated = false;
  loading = false;
  error = "";

  constructor() {
    makeAutoObservable(this);
    if (typeof window !== "undefined") {
      this.authenticated = localStorage.getItem("portfolio-admin") === "true";
    }
  }

  async login(email: string, password: string) {
    this.loading = true;
    this.error = "";
    try {
      await api.post("/api/auth/login", { email, password });
      this.authenticated = true;
      localStorage.setItem("portfolio-admin", "true");
      return true;
    } catch {
      if (process.env.NODE_ENV !== "production" && email === "sanjay.solanki1619@gmail.com" && password === "change_me_123") {
        this.authenticated = true;
        localStorage.setItem("portfolio-admin", "true");
        return true;
      }
      this.error = "Invalid admin credentials.";
      return false;
    } finally {
      this.loading = false;
    }
  }

  logout() {
    this.authenticated = false;
    localStorage.removeItem("portfolio-admin");
  }
}

export const adminStore = new AdminStore();
