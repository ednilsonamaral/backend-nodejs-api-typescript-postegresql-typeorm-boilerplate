import { Container } from 'inversify';

import {
  AdminRepository,
  IAdminRepository,
  IUserRepository,
  UserRepository,
} from '@core/db/repositories';

import Types from '@core/types';

import {
  AdminController,
  HealthController,
} from '@modules';

import {
  CreateAdminUseCase,
  DeleteAdminUseCase,
  GetAdminUseCase,
  GetAllAdminsUseCase,
  ICreateAdminUseCase,
  IDeleteAdminUseCase,
  IGetAdminUseCase,
  IGetAllAdminsUseCase,
  IUpdateAdminUseCase,
  UpdateAdminUseCase,
} from '@modules/admin/use-cases';

const container: Container = new Container();

// Repositories
container
  .bind<IAdminRepository>(Types.AdminRepository)
  .to(AdminRepository);
container
  .bind<IUserRepository>(Types.UserRepository)
  .to(UserRepository);

// Controllers
container
  .bind(HealthController)
  .toSelf();
container
  .bind(AdminController)
  .toSelf();

// Admin Use Cases
container
  .bind<ICreateAdminUseCase>(Types.CreateAdminUseCase)
  .to(CreateAdminUseCase);
container
  .bind<IGetAllAdminsUseCase>(Types.GetAllAdminsUseCase)
  .to(GetAllAdminsUseCase);
container
  .bind<IGetAdminUseCase>(Types.GetAdminUseCase)
  .to(GetAdminUseCase);
container
  .bind<IUpdateAdminUseCase>(Types.UpdateAdminUseCase)
  .to(UpdateAdminUseCase);
container
  .bind<IDeleteAdminUseCase>(Types.DeleteAdminUseCase)
  .to(DeleteAdminUseCase);

export { container };
