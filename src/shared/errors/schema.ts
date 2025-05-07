import { Result, ValidationError } from 'express-validator';
import { CustomError } from 'ts-custom-error';

export class SchemaError extends CustomError {
  public readonly message: string;
  public readonly validation: Result<ValidationError>;
  isSchemaError = true;

  constructor (validation: Result<ValidationError>, message?: string) {
    super();
    this.validation = validation;
    this.message = message;
  }
}

export const SchemaErrorCodes = {
  INVALID_EMAIL_FORMAT: 'invalid_email_format',
  INVALID_PHONE_FORMAT: 'invalid_phone_format',
  INVALID_NAME_FORMAT: 'invalid_name_format',
  INVALID_BUSINESS_DOCUMENT_FORMAT: 'invalid_business_document_format',
  INVALID_PERSONAL_DOCUMENT_FORMAT: 'invalid_personal_document_format',
  INVALID_USER_ID_FORMAT: 'invalid_user_id_format',
  INVALID_PASSWORD_FORMAT: 'invalid_password_format',
  INVALID_KEY_FORMAT: 'invalid_key_format',
  INVALID_VALUE_FORMAT: 'invalid_value_format',
  INVALID_DATA_TYPE_FORMAT: 'invalid_data_type_format',
  INVALID_TERMS_URL_FORMAT: 'invalid_terms_url_format',
  INVALID_RECOVERY_TOKEN_FORMAT: 'invalid_recovery_token_format',
  INVALID_ACCESS_TOKEN_FORMAT: 'invalid_access_token_format',
  INVALID_REFRESH_TOKEN_FORMAT: 'invalid_refresh_token_format',
};
