export type Role = 'USER' | 'ADMIN';

export interface User {
    username: string
    email: string;
    password: string;
    bio?: string;
    profileImage?: string;
    type?: Role;
}

export interface Register extends User {
    username: string
    email: string;
    password: string;
}

export interface Login extends User {
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
    body: User | { error: string }
}