import { ILike } from 'typeorm';

import { ISearchParamUser } from '@core/models/pagination';

export const getUserFilter = (searchParameter: ISearchParamUser) => {
  let where = {};

  if (searchParameter.name) {
    where = { ...where, name: ILike(`%${searchParameter.name}%`) };
  }

  if (searchParameter.email) {
    where = { ...where, email: ILike(`%${searchParameter.email}%`) };
  }

  return { where };
};
