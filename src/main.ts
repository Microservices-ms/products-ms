import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Asegurar de que las properties vengan como se dice que deben venir o lanza errores
      forbidNonWhitelisted: true,
    }),
  );

  // await app.listen(process.env.PORT || envs.port || 3000);
  await app.listen(envs.port || 3000);
  console.log(`App running on port ${envs.port || 3000}`);
  console.log( `App running on ports ${envs.port}` );
}
bootstrap();