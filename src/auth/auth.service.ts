
import { Injectable,BadRequestException, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto,LoginUserDto } from './dto';
import { User } from 'src/auth/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'src/auth/interface/jwt-payload.interface';


@Injectable()
export class AuthService {

constructor(
  @InjectModel(User.name)
  private readonly userModel:Model<User>,
  private readonly jwtService:JwtService
){}


  async create(createUserDto: CreateUserDto) {
    try{

      const {password, ...userData} = createUserDto;
      const user = await this.userModel.create({
        ...userData,
        password: bcrypt.hashSync(password,10)
      });

      delete user.password;
      
      return user;

    }catch (error){
      this.handleDBErrrors(error);
    }
  }


  async login(loginUserDto:LoginUserDto){
    const {password,email} = loginUserDto;
    const user = await this.userModel.findOne({ email }, { email: 1, password: 1,id:1 });
    if(!user){
      throw new  UnauthorizedException('Credentials are not valid (email)');
    }

    if(!bcrypt.compareSync(password,user.password))
    throw new  UnauthorizedException('Credentials are not valid (password)');

    console.log({"firmo":user.id})

    const token = this.getJwtToken({ id: user.id });

    const response = {
      user: {
        _id: user._id,
        email: user.email,
        password: user.password
      },
      token: token
    };
    
    return response;
  }

  private getJwtToken(payload:JwtPayload){
      const token = this.jwtService.sign( payload);
      return token;
  } 

  private handleDBErrrors(error:any) {
    if(error.code == '23505'){
      throw new BadRequestException(error.detail);
 /*      console.log(error) */
      throw new InternalServerErrorException('Please check server logs');
    }

  }


  findAll(): Promise<User[]>{
    return this.userModel.find();
  }


  ckeckToken(payload:JwtPayload){
    const token = this.jwtService.sign( payload);
    return token;
} 

async checkAuthStatus( user: User ){

  console.log('user'+user)

  const data = await this.userModel.findOne({ _id: user._id }).exec();

  console.log('data', data.id);


  ///console.log(data.id);
 /*  return {
    ...user,
    token: this.getJwtToken({ id: data.id })
  }; */


  const response = {
    user: {
      _id: data._id,
      email: data.email,
      password: data.password
    },
    token: this.getJwtToken({ id: data.id })
  };

  return response;

}

  

}
