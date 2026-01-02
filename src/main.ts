import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { AllExceptionsFilter } from './exception/filters/all-exceptions.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


    // Registrar el filter global
  app.useGlobalFilters(new AllExceptionsFilter());

    app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // elimina propiedades no permitidas
      forbidNonWhitelisted: true, // error si envían campos extra
      transform: true,        // transforma tipos
    }),
  );

  await app.listen(process.env.PORT ?? 3000);

  
}
bootstrap();


