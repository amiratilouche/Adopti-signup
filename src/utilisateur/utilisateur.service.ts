import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUtilisateurDto } from './dto/create-utilisateur.dto';
import { UpdateUtilisateurDto } from './dto/update-utilisateur.dto';
import { Utilisateur } from './entities/utilisateur.entity';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UtilisateurService {
  constructor(
    @InjectRepository(Utilisateur)
    private readonly utilisateurRepository: Repository<Utilisateur>,
  ) {}

  async create(createUtilisateurDto: CreateUtilisateurDto): Promise<Utilisateur> {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(createUtilisateurDto.password, saltOrRounds);
    const utilisateur = new Utilisateur();
    utilisateur.nom = createUtilisateurDto.nom;
    utilisateur.email = createUtilisateurDto.email;
    utilisateur.adresse = createUtilisateurDto.adresse;
    utilisateur.ville = createUtilisateurDto.ville;
    utilisateur.password = hashedPassword;
    return this.utilisateurRepository.save(utilisateur);
  }

  async findAll(): Promise<Utilisateur[]> {
    return this.utilisateurRepository.find();
  }

  async findOne(id: number): Promise<Utilisateur> {
    return this.utilisateurRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<Utilisateur> {
    return this.utilisateurRepository.findOne({ email });
  }

  async update(id: number, updateUtilisateurDto: UpdateUtilisateurDto): Promise<Utilisateur> {
    const utilisateur = await this.utilisateurRepository.findOne(id);
    utilisateur.nom = updateUtilisateurDto.nom || utilisateur.nom;
    utilisateur.email = updateUtilisateurDto.email || utilisateur.email;
    utilisateur.adresse = updateUtilisateurDto.adresse || utilisateur.adresse;
    utilisateur.ville = updateUtilisateurDto.ville || utilisateur.ville;
    utilisateur.password = updateUtilisateurDto.password || utilisateur.password;
    return this.utilisateurRepository.save(utilisateur);
  }

  async remove(id: number): Promise<void> {
    await this.utilisateurRepository.delete(id);
  }
}
