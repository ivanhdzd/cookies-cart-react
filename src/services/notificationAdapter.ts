import { INotificationService } from '../application/ports';

export function useNotifier(): INotificationService {
  return {
    notify: (message: string): void => window.alert(message),
  };
}
