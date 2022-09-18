import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: ['http://localhost:2050'],
  });
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();

/* 
JSON.stringify(Array.from(document.querySelector("#divProductsGrid").children).map(value =>  ({"name" : value.children[0]?.querySelector("#dealGridItem").children[0].alt, images : value.children[0]?.querySelector("#dealGridItem").children[0].images})))
*/
