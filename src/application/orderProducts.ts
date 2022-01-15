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

type TOrderProductsDeps = {
  payment: IPaymentsService;
  notifier: INotificationService;
  cartStorage: ICartStorageService;
  orderStorage: IOrdersStorageService;
  dateTime: IDateTimeService;
};

export function useOrderProducts(): (
  user: TUser,
  cart: TCart,
) => Promise<void> {
  const payment: IPaymentsService = usePayment();
  const notifier: INotificationService = useNotifier();
  const cartStorage: ICartStorageService = useCartStorage();
  const orderStorage: IOrdersStorageService = useOrdersStorage();
  const dateTime: IDateTimeService = useDateTime();

  return (user: TUser, cart: TCart): Promise<void> =>
    orderProducts(user, cart, {
      payment,
      notifier,
      cartStorage,
      orderStorage,
      dateTime,
    });
}

export async function orderProducts(
  user: TUser,
  cart: TCart,
  {
    payment,
    notifier,
    cartStorage,
    orderStorage,
    dateTime,
  }: TOrderProductsDeps,
): Promise<void> {
  const order: TOrder = createOrder(user, cart, dateTime.currentDateTime());

  const paid: boolean = await payment.tryPay(order.total);
  if (!paid) return notifier.notify('OOPS! Payment fails!');

  const { orders }: IOrdersStorageService = orderStorage;
  orderStorage.updateOrders([...orders, order]);
  cartStorage.emptyCart();
}
