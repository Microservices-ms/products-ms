import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {

  const logger = new Logger('Main');

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
      options: {
        port: envs.port
      }
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Asegurar de que las properties vengan como se dice que deben venir o lanza errores
      forbidNonWhitelisted: true,
    }),
  );

  // await app.listen(process.env.PORT || envs.port || 3000);
  await app.listen();

  // await app.startAllMicroservices(); // Para que sea un hibrido

  logger.log( `Products Microservice running on port ${envs.port}` );
}
bootstrap();