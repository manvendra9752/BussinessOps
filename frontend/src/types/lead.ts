export interface Lead {
  _id: string;

  name: string;

  email: string;

  phone: string;

  company: string;

  source: string;

  status: "NEW" | "CONTACTED" | "FOLLOW_UP" | "CONVERTED" | "LOST";

  assignedTo: any;

  notes: string;

  createdAt: string;

  updatedAt: string;
}
