import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './auth/entities/User';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'password',
      database: 'DatabaseName',
      entities: [User],
      synchronize: true,

    }),
    AuthModule
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
