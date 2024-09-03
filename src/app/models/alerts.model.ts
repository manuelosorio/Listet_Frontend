export interface Alert extends AlertParams {
  type: 'success' | 'warning' | 'error';
}
//TODO: Implement the params into the actual function
export interface AlertParams {
  message: string;
  link?: {
    text: string;
    url: string;
  } | null;
  timeout?: number;
  keepAfterRouterChange?: boolean;
  id?: string;
}
