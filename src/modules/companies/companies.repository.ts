import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from './entities/company.entity';
import { Repository } from 'typeorm';
import { CreateCompanyDto } from './dto/create-company.dto';
import { User } from '../users/entities/user.entity';

@Injectable()
export class CompaniesRepository {
  constructor(
    @InjectRepository(Company)
    private readonly companiesRepository: Repository<Company>,
  ) {}

  async create(
    createCompanyDto: CreateCompanyDto,
    user: User,
    logotype: string,
  ) {
    const createdCompany = this.companiesRepository.create({
      ...createCompanyDto,
      responsible: user,
      logotype,
    });

    return await this.companiesRepository.save(createdCompany);
  }

  async findByCnpj(cnpj: string) {
    return await this.companiesRepository.findOneBy({ cnpj });
  }

  async findOneById(id: number) {
    return await this.companiesRepository.findOneBy({ id });
  }
}
