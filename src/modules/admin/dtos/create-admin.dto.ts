import { IsOptional, IsString, Matches, MinLength } from 'class-validator';

import { AdminRole } from '@shared/enumerators';
import { IsDocument } from '@shared/validations/class-validator/IsDocument';

export class CreateAdminDTO {
  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsString()
  @IsDocument()
  public document: string;

  @IsString()
  @IsOptional()
  public birthDate?: string;

  @IsString()
  public phone: string;

  @IsString()
  public adminRole: AdminRole;

  @IsString()
  @MinLength(6)
  @Matches(/^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/, { message: 'The password must contain at least one capital letter, one number, one special character and be at least 6 characters long' })
  public password: string;
}
