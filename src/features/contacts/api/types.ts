export interface Contact {
  isCompany: boolean;
  firstName?: string;
  lastName?: string;
  initials?: string;
  company?: string;
  phone?: string;
  email?: string;
  imageUrl?: string;
  role?: string;
  contactInCaseOfDeath: boolean;
  street?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  createdAt: string;
  updatedAt: string;
  gid: string;
}

export type NewContactInput = Omit<Contact, "createdAt" | "updatedAt" | "gid">;
