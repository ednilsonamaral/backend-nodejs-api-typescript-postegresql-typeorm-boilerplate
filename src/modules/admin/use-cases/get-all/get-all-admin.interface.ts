import { ISearchParamAdmin } from '@src/core/models/pagination';

import { AdminEntity } from '@core/db/entities';

export interface IGetAllAdminsUseCase {
  execute(searchParameter: ISearchParamAdmin): Promise<AdminEntity[]>;
}
