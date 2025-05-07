import { inject, injectable } from 'inversify';

import { AdminEntity } from '@core/db/entities';
import { IAdminRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import Types from '@core/types';

import { IGetAdminUseCase } from '@modules/admin/use-cases/get/get-admin.interface';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class GetAdminUseCase implements IGetAdminUseCase {
  constructor (
    @inject(Types.AdminRepository)
    private readonly adminRepository: IAdminRepository
  ) { }

  async execute (id: string): Promise<AdminEntity> {
    try {
      const admin = await this.adminRepository.selectById(id);

      if (!admin) throw new BusinessError(BusinessErrorCodes.ADMIN_NOT_FOUND);

      return serializeEntity<AdminEntity>(AdminEntity, admin);
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
