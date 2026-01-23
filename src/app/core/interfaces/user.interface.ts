export interface User {
  id: number;
  name: string;
  email: string;
  profileImage: string | null;
  createdAt: string;
}

export interface UsersResponse {
  status: number;
  count: number;
  data: User[];
}
