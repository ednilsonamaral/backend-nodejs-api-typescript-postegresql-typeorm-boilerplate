import { DeleteResult, FindConditions, FindManyOptions, UpdateResult } from 'typeorm';

import { UserEntity } from '@core/db/entities';
import { ICount, ISearchParamUser, Pagination } from '@core/models/pagination';

export interface IUserRepository {
  create(user: UserEntity): Promise<UserEntity>;
  updateById(id: string, user: UserEntity): Promise<UpdateResult>;
  updateByWhere(where: FindConditions<UserEntity>, user: UserEntity): Promise<UpdateResult>;
  selectById(id: string): Promise<UserEntity | null>;
  selectByWhere(where: FindConditions<UserEntity>): Promise<UserEntity | null>;
  selectPagination(searchParameter: ISearchParamUser): Promise<Pagination<UserEntity>>;
  selectByOptions(options?: FindManyOptions<UserEntity>): Promise<(UserEntity | null)[]>;
  selectOneByOptions(options?: FindManyOptions<UserEntity>): Promise<UserEntity | null>;
  deleteById(id: string): Promise<DeleteResult>;
  deleteByWhere(where: FindConditions<UserEntity>): Promise<DeleteResult>;
  selectCount(searchParameter: ISearchParamUser): Promise<ICount>;
}
