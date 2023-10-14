/* import { join } from 'path';  */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
 import { ServeStaticModule } from '@nestjs/serve-static'; 
import { MongooseModule } from '@nestjs/mongoose';

import { SpecialtiesModule } from 'src/specialties/specialties.module';
import { AuthModule } from 'src/auth/auth.module';

/* import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm'; */
/* import { User } from './auth/user.entity'; 
import { AuthModule } from './auth/auth.module';
 */


@Module({
  imports: [
   // AuthModule,
 /*    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..','public'), 
    }), */
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI,{
      dbName: process.env.MONGO_DB_NAME
    }),

    SpecialtiesModule,
    AuthModule
  ],
  

/*   controllers: [AppController], */
/*   providers: [AppService], */
})
export class AppModule {
  constructor(){
    console.log(process.env)
  }
}
