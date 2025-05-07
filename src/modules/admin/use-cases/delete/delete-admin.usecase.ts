import { inject, injectable } from 'inversify';

import { AdminEntity } from '@core/db/entities';
import { IAdminRepository } from '@core/db/repositories';
import Types from '@core/types';

import { IDeleteAdminUseCase } from '@modules/admin/use-cases/delete/delete-admin.interface';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class DeleteAdminUseCase implements IDeleteAdminUseCase {
  constructor (
    @inject(Types.AdminRepository)
    private readonly userRepository: IAdminRepository
  ) {}

  async execute (id: string, actor: AdminEntity): Promise<void> {
    try {
      const admin = await this.userRepository.selectById(id);

      if (!admin) throw new BusinessError(BusinessErrorCodes.ADMIN_NOT_FOUND);

      admin.deletedAt = new Date();
      admin.deletedBy = (actor && actor.id) || 'SYSTEM';

      await this.userRepository.updateById(id, admin);

      await this.userRepository.deleteById(id);
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
