export interface GetEnvironmentsResponse {
  result: {
    name: string;
    product: string;
    version: string;
  }[];
  status: number;
}
