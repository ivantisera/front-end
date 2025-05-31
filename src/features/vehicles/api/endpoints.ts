export const VEHICLES_ENDPOINTS = {
  list: "/vehicles/",
  detail: (id: string) => `/vehicles/${id}`,
  create: "/vehicles",
  update: (id: string) => `/vehicles/${id}`,
  delete: (id: string) => `/vehicles/${id}`,
};
