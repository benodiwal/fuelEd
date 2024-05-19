export interface ISendEmail {
  email: string;
  inviteId: string;
  eventId: string;
  data: {
    subject?: string;
    role: Role;
  };
}

export type Role = "guest" | "vendor"
