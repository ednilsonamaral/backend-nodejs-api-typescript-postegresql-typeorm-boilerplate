import { DeleteResult, FindConditions, FindManyOptions, UpdateResult } from 'typeorm';

import { AdminEntity } from '@core/db/entities';
import { ICount, ISearchParamAdmin, Pagination } from '@core/models/pagination';

export interface IAdminRepository {
  create(admin: AdminEntity): Promise<AdminEntity>;
  updateById(id: string, admin: AdminEntity): Promise<UpdateResult>;
  updateByWhere(where: FindConditions<AdminEntity>, admin: AdminEntity): Promise<UpdateResult>;
  selectById(id: string): Promise<AdminEntity | null>;
  selectByWhere(where: FindConditions<AdminEntity>): Promise<AdminEntity | null>;
  selectPagination(searchParameter: ISearchParamAdmin): Promise<Pagination<AdminEntity>>;
  selectByOptions(options?: FindManyOptions<AdminEntity>): Promise<(AdminEntity | null)[]>;
  selectOneByOptions(options?: FindManyOptions<AdminEntity>): Promise<AdminEntity | null>;
  deleteById(id: string): Promise<DeleteResult>;
  deleteByWhere(where: FindConditions<AdminEntity>): Promise<DeleteResult>;
  selectCount(searchParameter: ISearchParamAdmin): Promise<ICount>;
}
