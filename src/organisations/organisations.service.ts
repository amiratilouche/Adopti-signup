import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateOrganisationDto } from './dto/create-organisation.dto';
import { UpdateOrganisationDto } from './dto/update-organisation.dto';
import { Organisation } from './entities/organisation.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class OrganisationsService {
  organisationsRepository: any;
  constructor(
    @InjectRepository(Organisation)
    private OrganisationRepository: Repository<Organisation>,
  ) {}



  async create(createOrganisationDto: CreateOrganisationDto) {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(createOrganisationDto.password, saltRounds);
    const organisation = new Organisation();
    organisation.nom = createOrganisationDto.nom;
    organisation.email = createOrganisationDto.email;
    organisation.siret = createOrganisationDto.siret;
    organisation.adresse = createOrganisationDto.adresse;
    organisation.ville = createOrganisationDto.ville;
    organisation.tel = createOrganisationDto.tel;
    organisation.password = hashedPassword;
    return this.organisationsRepository.save(organisation);
  }
  
  

  findAll() {
    return `This action returns all organisations`;
  }

  findOne(id: number) {
    return `This action returns a #${id} organisation`;
  }

  update(id: number, updateOrganisationDto: UpdateOrganisationDto) {
    return `This action updates a #${id} organisation`;
  }

  remove(id: number) {
    return `This action removes a #${id} organisation`;
  }

  async findByEmail(email: string): Promise<Organisation> {
    return this.organisationsRepository.findOne({ email });
  }

  async findBySiret(siret: string): Promise<Organisation> {
    return this.organisationsRepository.findOne({ where: { siret } });
  }
  
}
