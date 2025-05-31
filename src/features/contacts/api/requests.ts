import api from "@/lib/api";
import { Contact, NewContactInput } from "./types";
import { CONTACTS_ENDPOINTS } from "./endpoints";

export async function getContacts(): Promise<Contact[]> {
  const { data } = await api.get(CONTACTS_ENDPOINTS.list);
  return data;
}

export async function getContactByGid(gid: string): Promise<Contact> {
  const { data } = await api.get(CONTACTS_ENDPOINTS.detail(gid));
  return data;
}
export async function createContact(data: NewContactInput): Promise<Contact> {
  const response = await api.post(CONTACTS_ENDPOINTS.create, data);
  return response.data;
}

export async function updateContact(
  gid: string,
  data: Contact
): Promise<Contact> {
  const { data: contact } = await api.patch(
    CONTACTS_ENDPOINTS.update(gid),
    data
  );
  return contact;
}
export async function deleteContact(gid: string): Promise<void> {
  await api.delete(CONTACTS_ENDPOINTS.delete(gid));
}
