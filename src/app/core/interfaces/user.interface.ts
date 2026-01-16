export interface IUsers {
  id: number;
  name: string;
  email: string;
  hasProfileImage?: boolean;
  profileImage: string | null;
  createdAt?: string;
}
