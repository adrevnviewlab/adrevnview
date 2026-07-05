export type InvoiceStatus = "draft" | "sent" | "paid" | "overdue";

export type InvoiceLineItem = {
  id: string;
  description: string;
  quantity: number;
  rate: number;
};

export type Invoice = {
  id: string;
  number: string;
  clientName: string;
  clientEmail: string;
  clientAddress: string;
  issueDate: string;
  dueDate: string;
  status: InvoiceStatus;
  items: InvoiceLineItem[];
  taxRate: number;
  notes: string;
  createdAt: string;
  updatedAt: string;
};

export type CompanySettings = {
  name: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  taxId: string;
  invoicePrefix: string;
  defaultTaxRate: number;
  paymentTerms: string;
};

export type ClientNote = {
  clientSlug: string;
  contactEmail: string;
  contactPhone: string;
  notes: string;
  updatedAt: string;
};

export type AdminStats = {
  clientCount: number;
  invoiceCount: number;
  draftCount: number;
  paidTotal: number;
  outstandingTotal: number;
};
