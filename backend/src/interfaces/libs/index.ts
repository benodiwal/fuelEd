export interface ISendEmail {
  email: string;
  inviteId: string;
  token: string;
  data: {
    subject: string;
    role: Role;
  };
}

export enum Role {
  VENDOR,
  GUEST,
}
