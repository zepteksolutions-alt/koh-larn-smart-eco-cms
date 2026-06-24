import { Body, Controller, Get, Param, Post, Render, Req, Res } from '@nestjs/common';
import * as store from '../data/store';

@Controller('operator')
export class OperatorController {
  @Get()
  @Render('operator/dashboard')
  dashboard(@Req() req: any) {
    const u = req.session.user;
    const mine = store.placesByOwner(u.id);
    return {
      title: 'สถานที่ของฉัน',
      active: 'home',
      places: mine,
      stats: {
        total: mine.length,
        approved: mine.filter((p) => p.status === 'approved').length,
        pending: mine.filter((p) => p.status === 'pending').length,
        rejected: mine.filter((p) => p.status === 'rejected').length,
      },
    };
  }

  @Get('places/new')
  @Render('operator/place_form')
  newForm() {
    return { title: 'เพิ่มสถานที่ใหม่', active: 'add', place: null, action: '/operator/places' };
  }

  @Post('places')
  create(@Body() b: any, @Req() req: any, @Res() res: any) {
    const u = req.session.user;
    store.addPlace({
      type: b.type,
      name: b.name,
      area: b.area,
      price: b.price,
      description: b.description,
      mapUrl: b.mapUrl,
      ownerId: u.id,
      ownerName: u.name,
    });
    return res.redirect('/operator');
  }

  @Get('places/:id/edit')
  @Render('operator/place_form')
  editForm(@Param('id') id: string, @Req() req: any) {
    const place = store.findPlace(+id);
    return {
      title: 'แก้ไขสถานที่',
      active: '',
      place,
      action: `/operator/places/${id}`,
    };
  }

  @Post('places/:id')
  update(@Param('id') id: string, @Body() b: any, @Res() res: any) {
    store.updatePlace(+id, {
      type: b.type,
      name: b.name,
      area: b.area,
      price: b.price,
      description: b.description,
      mapUrl: b.mapUrl,
      status: 'pending', // แก้ไขแล้วต้องส่งอนุมัติใหม่
      rejectReason: undefined,
    });
    return res.redirect('/operator');
  }

  @Post('places/:id/delete')
  remove(@Param('id') id: string, @Res() res: any) {
    store.deletePlace(+id);
    return res.redirect('/operator');
  }
}
