import { CustomError } from 'ts-custom-error';

import { Dictionary } from '@core/models/dictionary';

export class BusinessError extends CustomError {
  code: string;
  options: Dictionary<string | number | boolean>;
  isBusinessError = true;

  constructor (code: string, options?: Dictionary<string | number | boolean>) {
    super(code);
    this.code = code;
    this.options = options;
  }
}

export const BusinessErrorCodes = {
  INVALID_ID: 'invalid_id',
  INTERNAL_SERVER_ERROR: 'internal_server_error',
  USER_NOT_FOUND: 'user_not_found',
  USER_ALREADY_REGISTERED: 'user_already_registered',
  ADMIN_ALREADY_REGISTERED: 'admin_already_registered',
  ADMIN_NOT_FOUND: 'admin_not_found',
  TEMPLATE_NOT_FOUND: 'template_not_found',
};
