export interface Alert {
  type: 'success' | 'warning' | 'error';
  message: string;
  link?: {
    text: string;
    url: string;
  };
  timeout?: number;
  keepAfterRouterChange?: boolean;
  id?: string;
}
