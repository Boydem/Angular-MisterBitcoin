export interface User {
  _id: string;
  balance: number;
  transactions: Array<{}>;
  phone: string;
  name: string;
  email: string;
}
