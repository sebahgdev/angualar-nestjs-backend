import { Module } from '@nestjs/common';
import {ConfigModule, ConfigService} from '@nestjs/config';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/auth/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
@Module({
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy ],
  imports:[
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    MongooseModule.forFeature(
      [
        {
          name: User.name,
          schema:UserSchema
        }
      ]
    ),
   

    JwtModule.registerAsync({
      imports:[ConfigModule],
      inject:[ConfigService],
      useFactory:(configService:ConfigService)=>{
                console.log('JWT Secret', configService.get('JWT_SECRET') )
         console.log('JWT SECRET', process.env.JWT_SECRET)
        return {
          secret: configService.get('JWT_SECRET'),
          signOptions:{
            expiresIn:'2h'
          }
        }
      } 
    })

  /*   JwtModule.register({
      secret:'dsf12jkl21jk3dfsa',
      signOptions:{
        expiresIn:'2h'
      }
    }) */

  ],
   exports: [JwtStrategy, PassportModule,JwtModule] 
})
export class AuthModule {}
