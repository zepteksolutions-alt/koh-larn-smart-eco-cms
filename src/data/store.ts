/**
 * Mock data store (in-memory) — ข้อมูลจำลองทั้งหมดอยู่ในหน่วยความจำ
 * รีสตาร์ตเซิร์ฟเวอร์แล้วข้อมูลจะกลับเป็นค่าเริ่มต้น (เหมาะกับ mockup/เดโม)
 */

export type Role = 'officer' | 'operator';
export type PlaceType = 'hotel' | 'restaurant' | 'place';
export type PlaceStatus = 'pending' | 'approved' | 'rejected';
export type NewsCategory = 'city' | 'utility' | 'event';
export type NewsStatus = 'draft' | 'published';

export interface Operator {
  id: string;
  name: string;
  email: string;
  password: string;
  contact: string;
}

export interface Place {
  id: number;
  type: PlaceType;
  name: string;
  area: string;
  price?: string;
  description: string;
  image: string;
  mapUrl?: string;
  status: PlaceStatus;
  ownerId: string;
  ownerName: string;
  rejectReason?: string;
  createdAt: string;
}

export interface News {
  id: number;
  title: string;
  category: NewsCategory;
  body: string;
  image: string;
  status: NewsStatus;
  author: string;
  createdAt: string;
}

export interface Officer {
  id: string;
  username: string;
  password: string;
  name: string;
}

// บัญชีเจ้าหน้าที่ (เข้าระบบด้วย Username + Password)
export const officers: Officer[] = [
  { id: 'off1', username: 'admin', password: 'admin1234', name: 'เจ้าหน้าที่เทศบาลเมืองพัทยา' },
  { id: 'off2', username: 'pr', password: 'pr123456', name: 'เจ้าหน้าที่ประชาสัมพันธ์' },
];

export const findOfficerByUsername = (username: string) =>
  officers.find((o) => o.username.toLowerCase() === (username || '').trim().toLowerCase());

export const operators: Operator[] = [
  { id: 'op1', name: 'Sea View Resort', email: 'seaview@kohlarn.app', password: '123456', contact: 'คุณสมชาย 081-111-1111' },
  { id: 'op2', name: 'ร้านป้าแดง ซีฟู้ด', email: 'padaeng@kohlarn.app', password: '123456', contact: 'คุณแดง 082-222-2222' },
  { id: 'op3', name: 'Larn Beach Hotel', email: 'larnbeach@kohlarn.app', password: '123456', contact: 'คุณนภา 083-333-3333' },
];
let operatorSeq = operators.length;

const now = () => new Date().toISOString();

export const places: Place[] = [
  {
    id: 1, type: 'hotel', name: 'Sea View Resort', area: 'หาดตาแหวน', price: '1500',
    description: 'รีสอร์ตริมหาดวิวทะเล ห้องพักสะอาด พร้อมสระว่ายน้ำ',
    image: 'https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=500&q=60',
    status: 'approved', ownerId: 'op1', ownerName: 'Sea View Resort', createdAt: now(),
  },
  {
    id: 2, type: 'restaurant', name: 'ร้านป้าแดง ซีฟู้ด', area: 'หาดหน้าบ้าน', price: '',
    description: 'อาหารทะเลสดใหม่ทุกวัน เมนูเด็ดกุ้งเผา ปูผัดผงกะหรี่',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=60',
    status: 'pending', ownerId: 'op2', ownerName: 'ร้านป้าแดง ซีฟู้ด', createdAt: now(),
  },
  {
    id: 3, type: 'hotel', name: 'Larn Beach Hotel', area: 'หาดทองหลาง', price: '1200',
    description: 'โรงแรมติดหาด เดินทางสะดวก ใกล้ท่าเรือ',
    image: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&w=500&q=60',
    status: 'pending', ownerId: 'op3', ownerName: 'Larn Beach Hotel', createdAt: now(),
  },
  {
    id: 4, type: 'place', name: 'จุดชมวิวเขานม', area: 'เกาะล้าน', price: '',
    description: 'จุดชมวิวพระอาทิตย์ตกที่สวยที่สุดของเกาะ',
    image: 'https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=500&q=60',
    status: 'rejected', ownerId: 'op1', ownerName: 'Sea View Resort',
    rejectReason: 'รูปภาพไม่ชัดเจน กรุณาแนบรูปใหม่และระบุพิกัดให้ครบ', createdAt: now(),
  },
];

export const news: News[] = [
  {
    id: 1, title: 'เมืองพัทยาประกาศปรับปรุงท่าเรือหน้าบ้าน 25–27 มิ.ย.', category: 'city',
    body: 'เทศบาลเมืองพัทยาแจ้งปรับปรุงท่าเรือหน้าบ้านระหว่างวันที่ 25–27 มิถุนายน ผู้โดยสารโปรดใช้ท่าเรือสำรอง',
    image: 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=500&q=60',
    status: 'published', author: 'เจ้าหน้าที่เทศบาล', createdAt: now(),
  },
  {
    id: 2, title: 'แจ้งดับไฟชั่วคราว โซนหาดตาแหวน 20 มิ.ย.', category: 'utility',
    body: 'การไฟฟ้าจะปรับปรุงระบบในวันที่ 20 มิถุนายน เวลา 13:00–15:00 น. บริเวณหาดตาแหวน',
    image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=500&q=60',
    status: 'published', author: 'เจ้าหน้าที่เทศบาล', createdAt: now(),
  },
  {
    id: 3, title: 'เชิญร่วมงานตลาดอาหารทะเลริมหาด 24 มิ.ย.', category: 'event',
    body: 'ชมรมผู้ประกอบการเกาะล้านเชิญร่วมงานตลาดอาหารทะเลริมหาด วันที่ 24 มิถุนายน ตั้งแต่ 17:00 น.',
    image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86bf6?auto=format&fit=crop&w=500&q=60',
    status: 'draft', author: 'เจ้าหน้าที่ PR', createdAt: now(),
  },
];

let placeSeq = places.length;
let newsSeq = news.length;

// ---------- operators ----------
export const findOperator = (id: string) => operators.find((o) => o.id === id);
export const findOperatorByEmail = (email: string) =>
  operators.find((o) => o.email.toLowerCase() === (email || '').trim().toLowerCase());

export function addOperator(data: { name: string; email: string; password: string; contact?: string }): Operator {
  const op: Operator = {
    id: 'op' + ++operatorSeq,
    name: data.name.trim(),
    email: data.email.trim(),
    password: data.password,
    contact: data.contact || '',
  };
  operators.push(op);
  return op;
}

// ---------- places ----------
export const listPlaces = (status?: PlaceStatus) =>
  status ? places.filter((p) => p.status === status) : [...places];
export const placesByOwner = (ownerId: string) => places.filter((p) => p.ownerId === ownerId);
export const findPlace = (id: number) => places.find((p) => p.id === id);

export function addPlace(data: Partial<Place>): Place {
  const p: Place = {
    id: ++placeSeq,
    type: (data.type as PlaceType) || 'place',
    name: data.name || '',
    area: data.area || '',
    price: data.price || '',
    description: data.description || '',
    image: data.image || 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=60',
    mapUrl: data.mapUrl || '',
    status: 'pending',
    ownerId: data.ownerId!,
    ownerName: data.ownerName!,
    createdAt: now(),
  };
  places.unshift(p);
  return p;
}

export function updatePlace(id: number, data: Partial<Place>) {
  const p = findPlace(id);
  if (!p) return;
  Object.assign(p, data);
}

export function deletePlace(id: number) {
  const i = places.findIndex((p) => p.id === id);
  if (i >= 0) places.splice(i, 1);
}

export function setPlaceStatus(id: number, status: PlaceStatus, reason?: string) {
  const p = findPlace(id);
  if (!p) return;
  p.status = status;
  p.rejectReason = status === 'rejected' ? reason || 'ไม่ระบุเหตุผล' : undefined;
}

// ---------- news ----------
export const listNews = (status?: NewsStatus) =>
  status ? news.filter((n) => n.status === status) : [...news];
export const findNews = (id: number) => news.find((n) => n.id === id);

export function addNews(data: Partial<News>): News {
  const n: News = {
    id: ++newsSeq,
    title: data.title || '',
    category: (data.category as NewsCategory) || 'city',
    body: data.body || '',
    image: data.image || 'https://images.unsplash.com/photo-1473116763249-2faaef81ccda?auto=format&fit=crop&w=500&q=60',
    status: (data.status as NewsStatus) || 'draft',
    author: data.author || 'เจ้าหน้าที่',
    createdAt: now(),
  };
  news.unshift(n);
  return n;
}

export function updateNews(id: number, data: Partial<News>) {
  const n = findNews(id);
  if (!n) return;
  Object.assign(n, data);
}

export function deleteNews(id: number) {
  const i = news.findIndex((n) => n.id === id);
  if (i >= 0) news.splice(i, 1);
}

// ---------- stats ----------
export const pendingCount = () => places.filter((p) => p.status === 'pending').length;
