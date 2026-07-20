export type ToastType = 'success' | 'error';

export interface ToastState {
  id: number;
  message: string;
  type: ToastType;
}
