/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AppModule } from './app.module';
import { BadRequestException, ValidationError, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';
import fastifyCsrf from '@fastify/csrf-protection';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );
  
  await app.register(fastifyCsrf); //CSRF Protection

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (validationErrors: ValidationError[] = []) => {
        console.error(JSON.stringify(validationErrors));
        return new BadRequestException(validationErrors);
      },
      transform: true,
    }),
  );


  app.setGlobalPrefix('');

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Zippy Event Management API')
    .setDescription('The Zippy Event Management API description')
    .setVersion('1.0')
    .addTag('Event Management')
    .addBearerAuth({ type: 'http', schema: 'Bearer', bearerFormat: 'Token' } as SecuritySchemeObject, 'Bearer')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);


  await app.listen(6001, '0.0.0.0');
  console.log(`Main Service is running on: ${await app.getUrl()}`);

}
bootstrap();
