import { inject } from 'inversify';
import {
  BaseHttpController,
  controller,
  httpDelete,
  httpGet,
  httpPost,
  httpPut,
  IHttpActionResult,
  interfaces,
} from 'inversify-express-utils';

import { AdminEntity } from '@core/db/entities';
import { ICustomRequest } from '@core/models/custom-request';
import Types from '@core/types';

import { CreateAdminDTO, UpdateAdminDTO } from '@modules/admin/dtos';
import { getAdminFilter } from '@modules/admin/helper';
import {
  ICreateAdminUseCase, IDeleteAdminUseCase, IGetAdminUseCase, IGetAllAdminsUseCase, IUpdateAdminUseCase,
} from '@modules/admin/use-cases';

import { validateDTO } from '@shared/middlewares';

@controller('/backoffice/admin')
export class AdminController extends BaseHttpController implements interfaces.Controller {
  constructor (
    @inject(Types.CreateAdminUseCase)
      private createAdminUseCase: ICreateAdminUseCase,

    @inject(Types.UpdateAdminUseCase)
      private updateAdminUseCase: IUpdateAdminUseCase,

      @inject(Types.GetAdminUseCase)
      private getAdminUseCase: IGetAdminUseCase,

      @inject(Types.GetAdminUseCase)
      private getAllAdminsUseCase: IGetAllAdminsUseCase,

      @inject(Types.DeleteAdminUseCase)
      private deleteAdminUseCase: IDeleteAdminUseCase
  ) {
    super();
  }

  @httpPost(
    '/',
    validateDTO(CreateAdminDTO)
  )
  public async create (req: ICustomRequest): Promise<AdminEntity> {
    return this.createAdminUseCase.execute(
      req.body as CreateAdminDTO,
      req.session as AdminEntity
    );
  }

  @httpGet(
    '/all'
  )
  public async getAllAdmins (req: ICustomRequest): Promise<AdminEntity[]> {
    const { searchParameter } = getAdminFilter(req, false);
    return this.getAllAdminsUseCase.execute(searchParameter);
  }

  @httpGet(
    '/:id'
  )
  public async getAdminById (req: ICustomRequest): Promise<AdminEntity> {
    return this.getAdminUseCase.execute(req.params.id);
  }

  @httpPut(
    '/:id',
    validateDTO(UpdateAdminDTO)
  )
  public async updateById (req: ICustomRequest): Promise<AdminEntity> {
    return this.updateAdminUseCase.execute(
      req.params.id,
      req.body as UpdateAdminDTO,
      req.session as AdminEntity
    );
  }

  @httpDelete(
    '/:id'
  )
  public async deleteById (req: ICustomRequest): Promise<IHttpActionResult> {
    await this.deleteAdminUseCase.execute(
      req.params.id,
      req.session as AdminEntity
    );

    return this.ok();
  }
}
