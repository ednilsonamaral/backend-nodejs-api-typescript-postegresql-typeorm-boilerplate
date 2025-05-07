import { inject, injectable } from 'inversify';
import { Not } from 'typeorm';

import { AdminEntity } from '@core/db/entities';
import { IAdminRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import Types from '@core/types';

import { UpdateAdminDTO } from '@modules/admin/dtos/update-admin.dto';
import { IUpdateAdminUseCase } from '@modules/admin/use-cases/update/update-admin.interface';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class UpdateAdminUseCase implements IUpdateAdminUseCase {
  constructor (
    @inject(Types.AdminRepository)
    private readonly adminRepository: IAdminRepository
  ) {}

  async execute (id: string, dto: UpdateAdminDTO, actor: AdminEntity): Promise<AdminEntity> {
    const admin = await this.adminRepository.selectById(id);

    if (!admin) throw new BusinessError(BusinessErrorCodes.ADMIN_NOT_FOUND);

    const hasEmailChanged = dto.email && admin.email !== dto.email;

    if (hasEmailChanged) {
      const hasSameEmail = await this.adminRepository.selectByWhere({
        email: dto.email,
        id: Not(id),
      });

      if (hasSameEmail) throw new BusinessError(BusinessErrorCodes.ADMIN_ALREADY_REGISTERED);
    }

    try {
      await this.adminRepository.updateById(id, {
        ...dto.name && { name: dto.name },
        ...dto.email && { email: dto.email },
        document: admin.document,
        birthDate: !admin.birthDate ? null : new Date(admin.birthDate),
        phone: admin.phone,
        ...dto.adminRole && { adminRole: dto.adminRole },
        updatedBy: (actor && actor.id) || 'SYSTEM',
      });

      const adminUpdated = await this.adminRepository.selectById(id);

      return serializeEntity<AdminEntity>(AdminEntity, adminUpdated);
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
