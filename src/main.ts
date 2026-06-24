import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import session from 'express-session';
import hbs from 'hbs';
import { AppModule } from './app.module';
import { icon } from './icons';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(
    session({
      secret: 'koh-larn-cms-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 1000 * 60 * 60 * 8 }, // 8 ชั่วโมง
    }),
  );

  const root = join(__dirname, '..');
  app.useStaticAssets(join(root, 'public'));
  app.setBaseViewsDir(join(root, 'views'));
  hbs.registerPartials(join(root, 'views', 'partials'));
  app.setViewEngine('hbs');

  // helpers
  hbs.registerHelper('eq', (a: any, b: any) => a === b);
  hbs.registerHelper('money', (n: any) => (n ? Number(n).toLocaleString('th-TH') : ''));
  hbs.registerHelper('typeLabel', (t: string) =>
    t === 'hotel' ? 'โรงแรม' : t === 'restaurant' ? 'ร้านอาหาร' : 'สถานที่ท่องเที่ยว',
  );
  hbs.registerHelper('statusLabel', (s: string) =>
    s === 'approved' ? 'อนุมัติแล้ว' : s === 'rejected' ? 'ไม่อนุมัติ' : 'รออนุมัติ',
  );
  hbs.registerHelper('icon', (name: string) => icon(name));

  const port = process.env.PORT || 3000;
  // bind 0.0.0.0 เพื่อให้ Cloud Run / container เข้าถึงได้
  await app.listen(port, '0.0.0.0');
  // eslint-disable-next-line no-console
  console.log(`\n🏝️  Koh Larn CMS รันที่ http://localhost:${port}\n`);
}
bootstrap();
