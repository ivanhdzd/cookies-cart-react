import { IDateTimeService } from '../application/ports';
import { currentDateTime } from '../lib/datetime';

export function useDateTime(): IDateTimeService {
  return {
    currentDateTime,
  };
}
