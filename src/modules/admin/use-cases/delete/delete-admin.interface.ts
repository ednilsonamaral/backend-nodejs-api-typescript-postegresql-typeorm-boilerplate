import { AdminEntity } from '@core/db/entities';

export interface IDeleteAdminUseCase {
  execute(id: string, actor: AdminEntity): Promise<void>;
}
