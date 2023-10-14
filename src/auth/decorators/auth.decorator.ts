import { UseGuards, applyDecorators } from '@nestjs/common';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { ValidRoles } from 'src/auth/interface';
import { AuthGuard } from '@nestjs/passport';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';

export function Auth(...roles: ValidRoles[]) {
  return applyDecorators(
       RoleProtected(...roles),
       UseGuards(AuthGuard(),UserRoleGuard)
  );
}