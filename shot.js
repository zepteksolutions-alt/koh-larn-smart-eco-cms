const { chromium } = require('playwright');

const base = 'http://localhost:3000';
const out = '/sessions/funny-confident-planck/mnt/outputs/slide_assets/';

async function shot(page, name) {
  await page.waitForTimeout(1000);
  await page.screenshot({ path: out + name + '.png', fullPage: true });
  console.log('shot', name);
}

(async () => {
  const browser = await chromium.launch();
  const vp = { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 };

  // ---- OFFICER ----
  const ctx = await browser.newContext(vp);
  const page = await ctx.newPage();
  await page.goto(base + '/login', { waitUntil: 'networkidle' });
  await shot(page, 'login');
  await page.click('#tabOff');
  await page.fill('#formOff input[name=username]', 'admin');
  await page.fill('#formOff input[name=password]', 'admin1234');
  await Promise.all([page.waitForURL('**/officer'), page.click('#formOff button[type=submit]')]);
  await page.waitForLoadState('networkidle');
  await shot(page, 'officer_dashboard');
  for (const [path, name] of [
    ['/officer/approvals', 'officer_approvals'],
    ['/officer/places', 'officer_places'],
    ['/officer/news', 'officer_news'],
    ['/officer/news/new', 'officer_news_form'],
  ]) {
    await page.goto(base + path, { waitUntil: 'networkidle' });
    await shot(page, name);
  }

  // ---- OPERATOR ----
  const ctx2 = await browser.newContext(vp);
  const p2 = await ctx2.newPage();
  await p2.goto(base + '/login', { waitUntil: 'networkidle' });
  await p2.fill('#formOp input[name=email]', 'seaview@kohlarn.app');
  await p2.fill('#formOp input[name=password]', '123456');
  await Promise.all([p2.waitForURL('**/operator'), p2.click('#formOp button[type=submit]')]);
  await p2.waitForLoadState('networkidle');
  await shot(p2, 'operator_dashboard');
  await p2.goto(base + '/operator/places/new', { waitUntil: 'networkidle' });
  await shot(p2, 'operator_place_form');
  await p2.goto(base + '/register', { waitUntil: 'networkidle' });
  await shot(p2, 'register');

  await browser.close();
  console.log('DONE');
})();
