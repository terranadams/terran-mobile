export interface GetEnvironmentsResponse {
  result: {
    name: string;
    product: string;
    version: string;
  }[];
  status: number;
}

export interface AccessTokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  refresh_token: string;
  scope: string;
}

export interface RecordItem {
  customId: string;
  id: string;
  type: string;
  assignedUser: string;
  status: string;
  value: string;
}
