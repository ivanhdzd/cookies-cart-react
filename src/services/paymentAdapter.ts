import { IPaymentsService } from '../application/ports';
import { fakeApi } from './api';

export function usePayment(): IPaymentsService {
  return {
    tryPay(amount: TPriceCents): Promise<boolean> {
      return fakeApi<boolean>(true);
    },
  };
}
