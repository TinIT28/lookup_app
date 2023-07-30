/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { IoAdapter } from '@nestjs/platform-socket.io';
import { Server } from 'socket.io';
import session = require('express-session');
import passport = require('passport');
import cookieParser = require('cookie-parser');
import bodyParser = require('body-parser');
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const corsOptions: CorsOptions = {
    origin: 'https://lookup-app-frontend.vercel.app', // Replace this with your frontend's domain
    credentials: true, // Allow cookies to be sent to the frontend
  };
  app.enableCors(corsOptions);
  app.use(
    session({
      secret: 'jfaejlfhsdhafddksf',
      saveUninitialized: false,
      resave: false,
      cookie: {
        maxAge: 60000,
        sameSite: 'none',
      },
    }),
  );

  app.use(bodyParser.json({ limit: '20mb' }));
  app.use(bodyParser.urlencoded({ limit: '20mb', extended: true }));
  app.use(cookieParser());
  app.use(passport.initialize());
  app.use(passport.session());
  app.useWebSocketAdapter(new IoAdapter(app));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
