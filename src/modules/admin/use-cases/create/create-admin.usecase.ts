import { inject, injectable } from 'inversify';

import { AdminEntity } from '@core/db/entities';
import { IAdminRepository } from '@core/db/repositories';
import Types from '@core/types';

import { CreateAdminDTO } from '@modules/admin/dtos/create-admin.dto';
import { ICreateAdminUseCase } from '@modules/admin/use-cases/create/create-admin.interface';

import { AdminRole } from '@shared/enumerators';
import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class CreateAdminUseCase implements ICreateAdminUseCase {
  constructor (
    @inject(Types.AdminRepository)
    private readonly adminRepository: IAdminRepository
  ) {}

  async execute (dto: CreateAdminDTO, actor: AdminEntity): Promise<AdminEntity> {
    const exists = await this.adminRepository.selectOneByOptions({
      where: [ { email: dto.email, document: dto.document } ],
    });

    if (exists) {
      throw new BusinessError(BusinessErrorCodes.ADMIN_ALREADY_REGISTERED);
    }

    try {
      const adminCreated = await this.adminRepository.create({
        name: dto.name,
        email: dto.email,
        document: dto.document,
        birthDate: !dto.birthDate ? null : new Date(dto.birthDate),
        phone: dto.phone,
        adminRole: dto.adminRole ?? AdminRole.ADMIN_WRITE_READ,
        createdBy: (actor && actor.id) || 'SYSTEM',
        updatedBy: (actor && actor.id) || 'SYSTEM',
      });

      return adminCreated;
    } catch (err) {
      console.log(`⚠️ Operation error: ${JSON.stringify(err)}`);
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
