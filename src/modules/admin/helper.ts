import { AdminRole } from '@src/shared/enumerators/admin-role';

import { ICustomRequest } from '@core/models/custom-request';
import { ISearchParamAdmin } from '@core/models/pagination';

import { controllerPaginationHelper } from '@shared/utils';

export const getAdminFilter = (req: ICustomRequest, pagination = true) => {
  const searchParameter: ISearchParamAdmin = {
    ...(req.query &&
      req.query.name && {
      name: req.query.name.toString(),
    }),
    ...(req.query &&
      req.query.email && {
      email: req.query.email.toString(),
    }),
    ...(req.query &&
      req.query.document && {
      document: req.query.document.toString(),
    }),
    ...(req.query &&
      req.query.adminRole && {
      adminRole: req.query.adminRole as AdminRole,
    }),
    ...controllerPaginationHelper(req.query),
  };

  if (!pagination) {
    delete searchParameter.offset;
    delete searchParameter.limit;
  }

  return { searchParameter };
};
