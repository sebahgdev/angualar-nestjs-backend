import { Module } from '@nestjs/common';
import { SpecialtiesService } from './specialties.service';
import { SpecialtiesController } from './specialties.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Specialty, SpecialtySchema } from 'src/specialties/entities/specialty.entity';

@Module({
  controllers: [SpecialtiesController],
  providers: [SpecialtiesService],
  imports:[
    MongooseModule.forFeature([
      {
        name: Specialty.name,
        schema:SpecialtySchema
      }
    ])
  ]
})
export class SpecialtiesModule {}
