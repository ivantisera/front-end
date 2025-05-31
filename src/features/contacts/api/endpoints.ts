export const CONTACTS_ENDPOINTS = {
  list: "/contacts/",
  detail: (id: string) => `/contacts/${id}`,
  create: "/contacts",
  update: (id: string) => `/contacts/${id}`,
  delete: (id: string) => `/contacts/${id}`,
};
