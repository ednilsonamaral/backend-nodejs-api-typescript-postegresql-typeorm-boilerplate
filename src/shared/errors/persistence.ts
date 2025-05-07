import { CustomError } from 'ts-custom-error';

import { Dictionary } from '@core/models/dictionary';

export class PersistenceError extends CustomError {
  code: string;
  options: Dictionary<string | number | boolean>;
  isPersistenceError = true;

  constructor (code: string, options?: Dictionary<string | number | boolean>) {
    super(code);
    this.code = code;
    this.options = options;

    console.log('⚠️ App error:', JSON.stringify({
      origin: 'app',
      type: 'error',
      err: {
        code,
        options,
      },
    }));
  }
}

export const PersistenceErrorCodes = {
  PAGINATION_ENTITY: 'pagination_entity',
  CREATE_ENTITY: 'create_entity',
  BULK_INSERT_ENTITY: 'bulk_insert_entity',
  UPDATE_ENTITY: 'update_entity',
  GET_ENTITY: 'get_entity',
  DELETE_ENTITY: 'delete_entity',
  COUNT_ENTITY: 'count_entity',
  CHANGE_COLUMN: 'change_column',
};
