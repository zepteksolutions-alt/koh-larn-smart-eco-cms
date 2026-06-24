import { Controller, Get } from '@nestjs/common';
import * as store from '../data/store';

/**
 * Public API — ให้แอปมือถือดึงเฉพาะข้อมูลที่ "อนุมัติ/เผยแพร่" แล้ว
 */
@Controller('api')
export class ApiController {
  @Get('places')
  places() {
    return store.listPlaces('approved').map((p) => ({
      id: p.id,
      type: p.type,
      name: p.name,
      area: p.area,
      price: p.price,
      description: p.description,
      image: p.image,
    }));
  }

  @Get('news')
  news() {
    return store.listNews('published').map((n) => ({
      id: n.id,
      title: n.title,
      category: n.category,
      body: n.body,
      image: n.image,
      author: n.author,
      createdAt: n.createdAt,
    }));
  }
}
