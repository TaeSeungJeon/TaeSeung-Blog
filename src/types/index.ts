export interface Post {
    title: string;
    date: string;
    description: string;
    filename: string;
    category: string; // 카테고리 추가
}

export interface PostDetail extends Post {
    content: string;
}

export interface GuestbookItem {
    id: number;
    title: string;
    content: string;
    author: string;
    avatarUrl: string;
    createdAt: string;
}

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