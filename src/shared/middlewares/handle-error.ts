/* eslint-disable @typescript-eslint/no-explicit-any */
import { Response } from 'express';
import httpStatus from 'http-status';

import { getEnv } from '@core/constants';
import { ICustomRequest } from '@core/models/custom-request';

import {
  BusinessError,
  ForbiddenError,
  SchemaError,
  UnauthorizedError,
} from '@shared/errors';

export function handleError (
  err: any,
  req: ICustomRequest,
  res: Response
) {
  if (err instanceof BusinessError && err.isBusinessError) {
    res.status(httpStatus.BAD_REQUEST).json({
      error: err.code,
      options: err.options,
    });

    return;
  }

  if (err instanceof UnauthorizedError && err.isUnauthorizedError) {
    res.sendStatus(httpStatus.UNAUTHORIZED);
    return;
  }

  if (err instanceof ForbiddenError && err.isForbiddenError) {
    res.sendStatus(httpStatus.FORBIDDEN);
    return;
  }

  if (err instanceof SchemaError && err.isSchemaError) {
    res.status(httpStatus.BAD_REQUEST).json({
      isSchemaError: err.isSchemaError,
      errors: err.validation.array({
        onlyFirstError: true,
      }),
    });

    return;
  }

  console.log('⚠️ Handling error: ', JSON.stringify({
    err,
    type: 'error',
    req: {
      requestId: req.headers['X-Request-ID'],
      originalUrl: req.originalUrl,
      baseUrl: req.baseUrl,
      method: req.method,
      urlPath: req.path,
      urlQuery: req.query,
    },
  }));

  if (getEnv().env !== 'production') {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      ...err,
      stack: err.stack,
      message: err.message,
    });

    return;
  }

  res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
}
