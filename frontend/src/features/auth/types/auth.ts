// Auth-related types
export interface User {
  _id: string;
  id?: string;
  email: string;
  name: {
    firstName: string;
    lastName: string;
  };
  mobileNumber?: number;
  upiId?: string;
  createdAt?: string;
}

export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupPayload extends AuthCredentials {
  firstName: string;
  lastName: string;
  mobileNumber?: number;
  upiId?: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
}
