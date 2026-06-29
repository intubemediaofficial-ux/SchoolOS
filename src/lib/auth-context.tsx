"use client";

import { createContext, useContext, useEffect, useRef, useSyncExternalStore } from "react";
import { useRouter, usePathname } from "next/navigation";

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: "super_admin" | "school_admin" | "teacher" | "parent" | "student" | "driver" | "accountant" | "librarian" | "receptionist";
  school: { id: string; name: string; subdomain: string } | null;
}

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  token: null,
  loading: true,
  login: async () => ({ success: false }),
  logout: () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

function getDashboardPath(role: string): string {
  switch (role) {
    case "super_admin":
      return "/superadmin";
    case "school_admin":
    case "accountant":
    case "receptionist":
    case "librarian":
      return "/dashboard";
    case "teacher":
      return "/teacher";
    case "parent":
      return "/parent";
    case "student":
      return "/student";
    default:
      return "/dashboard";
  }
}

let authState: AuthState = { user: null, token: null, loading: true };
const listeners = new Set<() => void>();

function setAuthState(next: AuthState) {
  authState = next;
  listeners.forEach((l) => l());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

function getSnapshot() {
  return authState;
}

function getServerSnapshot(): AuthState {
  return { user: null, token: null, loading: true };
}

async function initAuth() {
  if (typeof window === "undefined") return;
  const storedToken = localStorage.getItem("schoolos_token");
  if (!storedToken) {
    setAuthState({ user: null, token: null, loading: false });
    return;
  }
  try {
    const res = await fetch("/api/auth/me", {
      headers: { Authorization: `Bearer ${storedToken}` },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.success) {
        setAuthState({ user: data.data, token: storedToken, loading: false });
        return;
      }
    }
  } catch {
    // ignore
  }
  localStorage.removeItem("schoolos_token");
  setAuthState({ user: null, token: null, loading: false });
}

let initPromise: Promise<void> | null = null;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const router = useRouter();
  const pathname = usePathname();
  const didInit = useRef(false);

  useEffect(() => {
    if (didInit.current) return;
    didInit.current = true;
    if (!initPromise) {
      initPromise = initAuth();
    }
  }, []);

  useEffect(() => {
    if (state.loading) return;

    const publicPaths = ["/", "/login", "/register"];
    const isPublic = publicPaths.includes(pathname);

    if (!state.user && !isPublic) {
      router.push("/login");
      return;
    }

    if (state.user && isPublic && pathname !== "/") {
      router.push(getDashboardPath(state.user.role));
      return;
    }

    if (state.user) {
      const isOnWrongDashboard =
        (state.user.role === "super_admin" && pathname.startsWith("/dashboard")) ||
        (state.user.role === "super_admin" && pathname.startsWith("/teacher")) ||
        (state.user.role === "school_admin" && pathname.startsWith("/superadmin")) ||
        (state.user.role === "school_admin" && pathname.startsWith("/teacher")) ||
        (state.user.role === "teacher" && pathname.startsWith("/superadmin")) ||
        (state.user.role === "teacher" && pathname.startsWith("/dashboard"));

      if (isOnWrongDashboard) {
        router.push(getDashboardPath(state.user.role));
      }
    }
  }, [state.user, state.loading, pathname, router]);

  const login = async (email: string, password: string) => {
    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "login", email, password }),
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem("schoolos_token", data.data.token);
        setAuthState({ user: data.data.user, token: data.data.token, loading: false });
        router.push(getDashboardPath(data.data.user.role));
        return { success: true };
      }
      return { success: false, error: data.error || "Login failed" };
    } catch {
      return { success: false, error: "Network error" };
    }
  };

  const logout = () => {
    if (state.token) {
      fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "logout", token: state.token }),
      }).catch(() => {});
    }
    localStorage.removeItem("schoolos_token");
    setAuthState({ user: null, token: null, loading: false });
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user: state.user, token: state.token, loading: state.loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
