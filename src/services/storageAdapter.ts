import {
  ICartStorageService,
  IOrdersStorageService,
  IUserStorageService,
} from '../application/ports';
import { useStore } from './store';

export function useUserStorage(): IUserStorageService {
  return useStore();
}

export function useOrdersStorage(): IOrdersStorageService {
  return useStore();
}

export function useCartStorage(): ICartStorageService {
  return useStore();
}
