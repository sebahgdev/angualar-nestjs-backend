import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
       forbidNonWhitelisted: true,
      })
  );

  const config = new DocumentBuilder()
  .setTitle('Medical assistance - Resfull API')
  .setDescription('Medical assistance - Endpoints')
  .setVersion('1.0')
/*   .addTag('cats') */
  .build();
const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api', app, document);


  app.setGlobalPrefix('api')
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
