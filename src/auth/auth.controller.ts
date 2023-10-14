
import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req,Headers,SetMetadata,Request  } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto,LoginUserDto } from './dto';
import { AuthGuard} from '@nestjs/passport';

import { User } from 'src/auth/entities/user.entity';
import { RawHeaders,GetUser, Auth } from 'src/auth/decorators/index';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from 'src/auth/guards/user-role/user-role.guard';
import { RoleProtected } from 'src/auth/decorators/role-protected.decorator';
import { ValidRoles,LoginResponse } from 'src/auth/interface';

/* import { UpdateAuthDto } from './dto/update-auth.dto'; */

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }

  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @Get('private')
  @UseGuards( AuthGuard())
  testingPrivateRoute(
   /*  @Req() request: Express.Request */
   @GetUser() user:User,
   @GetUser('email') userEmail: string,
   @RawHeaders() rawHeaders:string[],
   @Headers() headers:IncomingHttpHeaders

   
  ){
   
    return {
      ok:true,
      message: 'Hola mundo',
      user,
      userEmail,
      rawHeaders,
      headers

    }
  }

/*   @SetMetadata('roles',['admin','super-user']) */
  @Get('private2')
  @RoleProtected(ValidRoles.admin)
  @UseGuards(AuthGuard(),UserRoleGuard)
  privateRoute2(
    @GetUser() user: User
  ){

    return {
      ok: true,
      user
    }
    
  }


  @Get('privatetest')
  @Auth(ValidRoles.admin) ///valida que este logeadoa
  privateTest(
    @GetUser() user: User
  ){

    return {
      ok: true,
      user
    }
    
  }


@Get()
@Auth()
findAll(){
  return this.authService.findAll();
}


 // LoginResponse

 @Get('check-token')
@Auth()
checkAuthStatus(
  @GetUser() user: User
) {
  return this.authService.checkAuthStatus( user );
}



 
}
