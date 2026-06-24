import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const user = req.session?.user || null;
    res.locals.user = user;

    const path: string = (req.originalUrl || req.url || '').split('?')[0];

    if (path.startsWith('/officer')) {
      if (!user || user.role !== 'officer') return res.redirect('/login');
    }
    if (path.startsWith('/operator')) {
      if (!user || user.role !== 'operator') return res.redirect('/login');
    }
    next();
  }
}
