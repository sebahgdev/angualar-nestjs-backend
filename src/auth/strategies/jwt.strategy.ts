import { Super } from './../../../node_modules/@types/estree/index.d';
import { ExtractJwt, Strategy } from 'passport-jwt';
import {  Injectable,UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from 'src/auth/entities/user.entity';
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){

  constructor(
    @InjectModel(User.name)
    private readonly userModel:Model<User>,
    configService:ConfigService
  ){
    
    super({
      secretOrKey: configService.get('JWT_SECRET'),
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

    async validate(payload:JwtPayload): Promise<User>{
        const {id} = payload;

        console.log(payload)


        const user = await this.userModel.findOne({ id }, { email: 1,isActive: 1,roles: 1 });

        if(!user){
          throw new  UnauthorizedException('Token not valid');
        }

     
        if(!user.isActive){
          throw new  UnauthorizedException('User is inactive, talk with an admin');
        }

      /*   console.log({user}); */

        return user;

    }

}