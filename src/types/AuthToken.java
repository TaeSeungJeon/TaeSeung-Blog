export interface AuthToken {
  accessToken: string;
  username: string;
  avatarUrl: string;
}

export interface AuthState {
  isLoggedIn: boolean;
  username: string;
  avatarUrl: string;
}