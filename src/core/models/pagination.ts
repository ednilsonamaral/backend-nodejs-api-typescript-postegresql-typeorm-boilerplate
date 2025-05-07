export interface Pagination<T> {
  rows: T[];
  count: number;
}

export interface ICount {
  count: number;
}

export interface ISearchParamBase {
  offset?: number;
  limit?: number;
  orderBy?: string;
  isDESC?: boolean;
}

export interface ISearchParamUser extends ISearchParamBase {
  name?: string;
  email?: string;
}

export interface ISearchParamAdmin extends ISearchParamBase {
  name?: string;
  email?: string;
  document?: string;
}
