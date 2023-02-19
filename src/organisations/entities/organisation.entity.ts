import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Organisation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  siret: string;

  @Column()
  adresse: string;

  @Column()
  ville: string;

  @Column()
  tel: string;

  @Column()
  mot_de_passe: string;
  password: any;
}