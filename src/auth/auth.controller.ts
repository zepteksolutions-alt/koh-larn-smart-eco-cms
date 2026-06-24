import { Body, Controller, Get, Post, Query, Render, Req, Res } from '@nestjs/common';
import * as store from '../data/store';

@Controller()
export class AuthController {
  @Get('/')
  root(@Req() req: any, @Res() res: any) {
    const u = req.session?.user;
    if (u) return res.redirect(u.role === 'officer' ? '/officer' : '/operator');
    return res.redirect('/login');
  }

  @Get('login')
  @Render('login')
  loginPage(@Query('error') error: string, @Query('ok') ok: string) {
    return { error, ok };
  }

  @Post('login')
  doLogin(@Body() body: any, @Req() req: any, @Res() res: any) {
    const role = body.role;

    if (role === 'officer') {
      const off = store.findOfficerByUsername(body.username);
      if (!off || off.password !== body.password) {
        return res.redirect('/login?error=officer');
      }
      req.session.user = { role: 'officer', id: off.id, name: off.name };
      return res.redirect('/officer');
    }

    // operator — เข้าด้วยอีเมล + รหัสผ่าน
    const op = store.findOperatorByEmail(body.email);
    if (!op || op.password !== body.password) {
      return res.redirect('/login?error=op');
    }
    req.session.user = { role: 'operator', id: op.id, name: op.name };
    return res.redirect('/operator');
  }

  @Get('register')
  @Render('register')
  registerPage(@Query('error') error: string) {
    return { error };
  }

  @Post('register')
  doRegister(@Body() body: any, @Req() req: any, @Res() res: any) {
    const name = (body.name || '').trim();
    const email = (body.email || '').trim();
    const password = body.password || '';

    if (!name || !email || !password) {
      return res.redirect('/register?error=missing');
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      return res.redirect('/register?error=email');
    }
    if (password.length < 6) {
      return res.redirect('/register?error=pwd');
    }
    if (store.findOperatorByEmail(email)) {
      return res.redirect('/register?error=dup');
    }

    const op = store.addOperator({ name, email, password, contact: body.contact });
    req.session.user = { role: 'operator', id: op.id, name: op.name };
    return res.redirect('/operator');
  }

  @Get('logout')
  logout(@Req() req: any, @Res() res: any) {
    req.session?.destroy(() => undefined);
    return res.redirect('/login');
  }
}
