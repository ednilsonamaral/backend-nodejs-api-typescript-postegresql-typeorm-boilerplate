import { ILike } from 'typeorm';

import { ISearchParamAdmin } from '@core/models/pagination';

export const getAdminFilter = (searchParameter: ISearchParamAdmin) => {
  let where = {};

  if (searchParameter.name) {
    where = { ...where, name: ILike(`%${searchParameter.name}%`) };
  }

  if (searchParameter.email) {
    where = { ...where, email: ILike(`%${searchParameter.email}%`) };
  }

  if (searchParameter.document) {
    where = { ...where, document: ILike(`%${searchParameter.document}%`) };
  }

  return { where };
};
