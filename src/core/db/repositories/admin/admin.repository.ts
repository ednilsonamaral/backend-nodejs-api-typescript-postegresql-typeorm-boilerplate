import { injectable } from 'inversify';
import {
  DeleteResult,
  FindConditions,
  FindManyOptions,
  getRepository,
  Repository,
  UpdateResult,
} from 'typeorm';

import { AdminEntity } from '@core/db/entities';
import { getAdminFilter } from '@core/db/repositories/admin/admin.filter';
import { IAdminRepository } from '@core/db/repositories/admin/admin.interface';
import { ICount, ISearchParamAdmin, Pagination } from '@core/models/pagination';

import { PersistenceError, PersistenceErrorCodes } from '@shared/errors';

@injectable()
export class AdminRepository implements IAdminRepository {
  private adminRepository: Repository<AdminEntity> = getRepository(AdminEntity);

  async selectPagination (searchParameter: ISearchParamAdmin): Promise<Pagination<AdminEntity>> {
    let response: Pagination<AdminEntity> | null = null;

    const { where } = getAdminFilter(searchParameter);

    try {
      const [ rows, count ] = await this.adminRepository.findAndCount({
        where,
        skip: searchParameter.offset,
        take: searchParameter.limit,
        order: {
          [searchParameter.orderBy]: searchParameter.isDESC ? 'DESC' : 'ASC',
        },
      });

      response = {
        rows,
        count,
      };
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.PAGINATION_ENTITY, err);
    }

    return response;
  }

  async create (admin: AdminEntity): Promise<AdminEntity> {
    let response: AdminEntity | null = null;

    try {
      response = await this.adminRepository.save(admin);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.CREATE_ENTITY, err);
    }

    return response;
  }

  async selectById (id: string): Promise<AdminEntity | null> {
    let response: AdminEntity | null = null;

    try {
      response = await this.adminRepository.findOne({ where: { id } });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async updateById (id: string, admin: AdminEntity): Promise<UpdateResult> {
    let response: UpdateResult | null = null;

    try {
      response = await this.adminRepository.update(id, admin);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.UPDATE_ENTITY, err);
    }

    return response;
  }

  async updateByWhere (where: FindConditions<AdminEntity>, admin:AdminEntity): Promise<UpdateResult> {
    let response: UpdateResult | null = null;

    try {
      response = await this.adminRepository.update(where, admin);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.UPDATE_ENTITY, err);
    }

    return response;
  }

  async selectByWhere (where: FindConditions<AdminEntity>): Promise<AdminEntity | null> {
    let response: AdminEntity | null = null;

    try {
      response = await this.adminRepository.findOne({ where });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async selectByOptions (options?: FindManyOptions<AdminEntity>): Promise<(AdminEntity | null)[]> {
    let response: AdminEntity[] | null = null;

    try {
      response = await this.adminRepository.find(options);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async selectOneByOptions (options?: FindManyOptions<AdminEntity>): Promise<AdminEntity | null> {
    let response: AdminEntity | null = null;

    try {
      const [ admin ] = await this.adminRepository.find({ ...options, take: 1 });
      response = admin;

    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.GET_ENTITY, err);
    }

    return response;
  }

  async deleteById (id: string): Promise<DeleteResult> {
    let response: DeleteResult | null = null;

    try {
      response = await this.adminRepository.softDelete({ id });
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.DELETE_ENTITY, err);
    }

    return response;
  }

  async deleteByWhere (where: FindConditions<AdminEntity>): Promise<DeleteResult> {
    let response: DeleteResult | null = null;

    try {
      response = await this.adminRepository.softDelete(where);
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.DELETE_ENTITY, err);
    }

    return response;
  }

  async selectCount (searchParameter: ISearchParamAdmin): Promise<ICount> {
    let response: ICount | null = null;

    const { where } = getAdminFilter(searchParameter);

    try {
      const count = await this.adminRepository.count({ where });
      response = { count };
    } catch (err) {
      throw new PersistenceError(PersistenceErrorCodes.COUNT_ENTITY, err);
    }

    return response;
  }
}
