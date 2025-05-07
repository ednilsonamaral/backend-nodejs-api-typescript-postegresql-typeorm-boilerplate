import { AdminEntity } from '@core/db/entities';

import { CreateAdminDTO } from '@modules/admin/dtos';

export interface ICreateAdminUseCase {
  execute(dto: CreateAdminDTO, actor: AdminEntity): Promise<AdminEntity>;
}
