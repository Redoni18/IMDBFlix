export type Role = 'USER' | 'ADMIN';

export interface User {
    username: string
    email: string;
    password: string;
    bio?: string | null;
    profileImage?: string | null;
    type?: Role;
}

export interface Register {
    username: string
    email: string;
    password: string;
}

export interface Login {
    email: string;
    password: string;
}

export interface RegisterRequest {
    body: Register
}

export interface RegisterResponse {
    status: number;
    body: User | { error: string }
}

export interface LoginRequest {
    body: Login
}

export interface LoginResponse {
    status: number;
    body: Omit<User, 'password'> | { error: string }
}