export interface User {
  _id: string;
  balance: number;
  transactions: Move[];
  phone?: string;
  name: string;
  email?: string;
}
export interface Move {
  amount: number;
  to: string;
  toId: string | undefined;
  at: Date | number | string;
}
