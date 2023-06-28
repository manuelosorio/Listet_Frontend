import { EndpointResponse } from './response/endpoint.response';

export interface UserModel {
  firstName: string;
  lastName: string;
  email?: string;
  username: string;
  avatar?: string;
}

export interface UserResponse extends UserModel, EndpointResponse {
  authenticated: boolean;
  verified?: boolean;
}
