export const ROLES = {
  admin:  { password: "EDITOR", path: "/admin",  label: "ADMIN"      },
  mama:   { password: "VOGUE",  path: "/mama",   label: "MAMÁ"       },
  pareja: { password: "PRADA",  path: "/pareja", label: "MI PAREJA"  },
} as const;

export type Role = keyof typeof ROLES;

export function setSession(role: Role): void {
  if (typeof window === "undefined") return;
  localStorage.setItem("dvlm_role", role);
}

export function getSession(): Role | null {
  if (typeof window === "undefined") return null;
  const role = localStorage.getItem("dvlm_role") as Role | null;
  return role && ROLES[role] ? role : null;
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem("dvlm_role");
}
