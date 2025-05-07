import { AdminEntity } from '@core/db/entities';

export interface IGetAdminUseCase {
  execute(id: string): Promise<AdminEntity>;
}
