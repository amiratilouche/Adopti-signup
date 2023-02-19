import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UtilisateurModule } from './utilisateur/utilisateur.module';
import { OrganisationsModule } from './organisations/organisations.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Utilisateur } from './utilisateur/entities/utilisateur.entity';
import { Organisation } from './organisations/entities/organisation.entity';

@Module({
  imports: [UtilisateurModule, OrganisationsModule,
   TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'amira',
      password: 'Amiratilouch.30',
      database: 'db_signup',
      entities: [Utilisateur, Organisation],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Utilisateur, Organisation]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
