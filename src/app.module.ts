import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { StatusModule } from './status/status.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
     TypeOrmModule.forRoot({
       type: 'postgres',
       host: process.env.DB_HOST ?? 'localhost',
      port: parseInt(process.env.DB_PORT ?? '5432', 10),
       username: process.env.DB_USERNAME ?? 'ups',
       password: process.env.DB_PASSWORD ?? 'ups123',
       database: process.env.DB_NAME ?? 'devdb-nest',
       entities: [__dirname + '/**/*.entity{.ts,.js}'],
       synchronize: (process.env.NODE_ENV ?? 'development') === 'development',
       logging: (process.env.NODE_ENV ?? 'development') === 'development',
    }),
    UsersModule,
    ProductsModule,
    AuthModule,
    StatusModule,
    
  ],
})
export class AppModule {}