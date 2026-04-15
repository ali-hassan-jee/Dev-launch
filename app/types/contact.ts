// types/contact.ts
export interface Contact {
  _id?: string;
  name: string;
  email: string;
  message: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface ApiResponse {
  success: boolean;
  data: Contact[];
  error?: string;
}