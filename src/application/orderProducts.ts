import { TCart } from '../domain/cart';
import { createOrder, TOrder } from '../domain/order';
import { TUser } from '../domain/user';
import { useDateTime } from '../services/dateTimeAdapter';
import { useNotifier } from '../services/notificationAdapter';
import { usePayment } from '../services/paymentAdapter';
import { useCartStorage, useOrdersStorage } from '../services/storageAdapter';
import {
  ICartStorageService,
  IDateTimeService,
  INotificationService,
  IOrdersStorageService,
  IPaymentsService,
} from './ports';

export function useOrderProducts() {
  const payment: IPaymentsService = usePayment();
  const notifier: INotificationService = useNotifier();
  const cartStorage: ICartStorageService = useCartStorage();
  const orderStorage: IOrdersStorageService = useOrdersStorage();
  const dateTime: IDateTimeService = useDateTime();

  async function orderProducts(user: TUser, cart: TCart): Promise<void> {
    const order: TOrder = createOrder(user, cart, dateTime.currentDateTime());

    const paid: boolean = await payment.tryPay(order.total);
    if (!paid) return notifier.notify('OOPS! Payment fails!');

    const { orders }: IOrdersStorageService = orderStorage;
    orderStorage.updateOrders([...orders, order]);
    cartStorage.emptyCart();
  }

  return { orderProducts };
}
