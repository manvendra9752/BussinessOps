export interface Followup {
  _id: string;

  leadId: any;

  message: string;

  status: "PENDING" | "COMPLETED" | "CANCELLED";

  followUpDate: string;

  createdAt: string;
}
