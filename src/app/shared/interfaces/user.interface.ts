export interface IUsers {
  id: number;
  name: string;
  email: string;
  role?: string;
  profileImage: string | null;
  createdAt?: string;
}
