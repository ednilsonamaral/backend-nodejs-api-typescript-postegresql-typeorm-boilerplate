import { inject, injectable } from 'inversify';

import { AdminEntity } from '@core/db/entities';
import { getAdminFilter, IAdminRepository } from '@core/db/repositories';
import { serializeEntity } from '@core/db/utils';
import { ISearchParamAdmin } from '@core/models/pagination';
import Types from '@core/types';

import { IGetAllAdminsUseCase } from '@modules/admin/use-cases/get-all/get-all-admin.interface';

import { BusinessError, BusinessErrorCodes } from '@shared/errors';

@injectable()
export class GetAllAdminsUseCase implements IGetAllAdminsUseCase {
  constructor (
    @inject(Types.AdminRepository)
    private readonly adminRepository: IAdminRepository
  ) { }

  async execute (searchParameter: ISearchParamAdmin): Promise<AdminEntity[]> {
    const { where } = getAdminFilter(searchParameter);

    try {
      const admins = await this.adminRepository.selectByOptions({ where });

      return admins.map(admin => serializeEntity<AdminEntity>(AdminEntity, admin));
    } catch (err) {
      throw new BusinessError(err?.code || BusinessErrorCodes.INTERNAL_SERVER_ERROR);
    }
  }
}
