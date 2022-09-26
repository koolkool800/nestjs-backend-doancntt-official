import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { RoleEnum } from 'src/constants/enum';
import { AdminService } from 'src/modules/admin/admin.service';
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private adminService: AdminService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requireRoles = this.reflector.get<RoleEnum[]>(
      'roles',
      context.getHandler(),
    );
    const request = context.switchToHttp().getRequest();

    if (!requireRoles) {
      return true;
    }

    if (request?.user) {
      const { id } = request.user;

      const user = await this.adminService.getAdminById(id);

      return requireRoles.includes(user.role);
    }
  }
}
