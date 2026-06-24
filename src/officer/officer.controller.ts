import { Body, Controller, Get, Param, Post, Render, Res } from '@nestjs/common';
import * as store from '../data/store';

@Controller('officer')
export class OfficerController {
  @Get()
  @Render('officer/dashboard')
  dashboard() {
    const all = store.listPlaces();
    return {
      title: 'ภาพรวมระบบ',
      active: 'home',
      pendingCount: store.pendingCount(),
      stats: {
        pending: store.listPlaces('pending').length,
        approved: store.listPlaces('approved').length,
        places: all.length,
        published: store.listNews('published').length,
      },
      pending: store.listPlaces('pending'),
    };
  }

  @Get('approvals')
  @Render('officer/approvals')
  approvals() {
    return {
      title: 'อนุมัติสถานที่',
      active: 'approvals',
      pendingCount: store.pendingCount(),
      places: store.listPlaces('pending'),
    };
  }

  @Post('approvals/:id/approve')
  approve(@Param('id') id: string, @Res() res: any) {
    store.setPlaceStatus(+id, 'approved');
    return res.redirect('/officer/approvals');
  }

  @Post('approvals/:id/reject')
  reject(@Param('id') id: string, @Body() b: any, @Res() res: any) {
    store.setPlaceStatus(+id, 'rejected', b.reason);
    return res.redirect('/officer/approvals');
  }

  @Get('places')
  @Render('officer/places')
  places() {
    return {
      title: 'สถานที่ทั้งหมด',
      active: 'places',
      pendingCount: store.pendingCount(),
      places: store.listPlaces(),
    };
  }

  @Post('places/:id/delete')
  placeDelete(@Param('id') id: string, @Res() res: any) {
    store.deletePlace(+id);
    return res.redirect('/officer/places');
  }

  // ---------- news ----------
  @Get('news')
  @Render('officer/news')
  news() {
    return {
      title: 'จัดการข่าวสาร',
      active: 'news',
      pendingCount: store.pendingCount(),
      news: store.listNews(),
    };
  }

  @Get('news/new')
  @Render('officer/news_form')
  newsNew() {
    return {
      title: 'เพิ่มข่าวสาร',
      active: 'news',
      pendingCount: store.pendingCount(),
      item: null,
      action: '/officer/news',
    };
  }

  @Post('news')
  newsCreate(@Body() b: any, @Res() res: any) {
    store.addNews({
      title: b.title,
      category: b.category,
      body: b.body,
      image: b.image,
      status: b.status,
      author: 'เจ้าหน้าที่เทศบาลเมืองพัทยา',
    });
    return res.redirect('/officer/news');
  }

  @Get('news/:id/edit')
  @Render('officer/news_form')
  newsEdit(@Param('id') id: string) {
    return {
      title: 'แก้ไขข่าวสาร',
      active: 'news',
      pendingCount: store.pendingCount(),
      item: store.findNews(+id),
      action: `/officer/news/${id}`,
    };
  }

  @Post('news/:id')
  newsUpdate(@Param('id') id: string, @Body() b: any, @Res() res: any) {
    store.updateNews(+id, {
      title: b.title,
      category: b.category,
      body: b.body,
      image: b.image,
      status: b.status,
    });
    return res.redirect('/officer/news');
  }

  @Post('news/:id/toggle')
  newsToggle(@Param('id') id: string, @Res() res: any) {
    const n = store.findNews(+id);
    if (n) store.updateNews(+id, { status: n.status === 'published' ? 'draft' : 'published' });
    return res.redirect('/officer/news');
  }

  @Post('news/:id/delete')
  newsDelete(@Param('id') id: string, @Res() res: any) {
    store.deleteNews(+id);
    return res.redirect('/officer/news');
  }
}
