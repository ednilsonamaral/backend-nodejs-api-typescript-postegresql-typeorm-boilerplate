import { AdminEntity } from '@core/db/entities';

import { UpdateAdminDTO } from '@modules/admin/dtos';

export interface IUpdateAdminUseCase {
  execute(id: string, dto: UpdateAdminDTO, actor: AdminEntity): Promise<AdminEntity>;
}
