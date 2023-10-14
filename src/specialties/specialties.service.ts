import { Injectable } from '@nestjs/common';
import { CreateSpecialtyDto } from './dto/create-specialty.dto';
import { UpdateSpecialtyDto } from './dto/update-specialty.dto';
import { Specialty } from './entities/specialty.entity';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SpecialtiesService {

  constructor(
    @InjectModel(Specialty.name)
    private readonly specialtyModel:Model<Specialty>
  ){}
  async create(createSpecialtyDto: CreateSpecialtyDto) {
     // createSpecialtyDto.name = createSpecialtyDto.name.toLocaleLowerCase();
      const specialty = await this.specialtyModel.create(createSpecialtyDto);
      
     return specialty;
  }

  findAll() {
    return `This action returns all specialties`;
  }

  findOne(id: number) {
    return `This action returns a #${id} specialty`;
  }

  update(id: number, updateSpecialtyDto: UpdateSpecialtyDto) {
    return `This action updates a #${id} specialty`;
  }

  remove(id: number) {
    return `This action removes a #${id} specialty`;
  }
}
