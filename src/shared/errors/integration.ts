import { CustomError } from 'ts-custom-error';

export class IntegrationError extends CustomError {
  isIntegrationError = true;
  mechanism: string;
  options: unknown;

  constructor (mechanism: string, options: unknown) {
    super();
    this.mechanism = mechanism;
    this.options = options;

    console.log('⚠️ Integration error:', JSON.stringify({
      origin: 'integration',
      mechanism,
      type: 'error',
      err: options,
    }));
  }
}
