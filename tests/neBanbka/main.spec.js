import { test, expect } from '@playwright/test';

const mainText_1 = "Зарабатывайте деньги легкоSmartInvest позволяет вам безопасно зарабатывать больше чем в депозитах без банков и растовщичества";
const mainText_2 = "В SmartInvest уже больше 100,000 сделок Оцените ваш возможный доход.Введите интересующие значения выше";
const sum_test_calc_invest_1 = 10_000;
const day_test_calc_invest_1 = 2;
const sum_test_calc_invest_neg = 1_000_000_000;
const day_test_calc_invest_neg = 1_000;

let page;

test.beforeEach(async ({ browser }) => {
  // Setup the page and navigate to the desired URL
  page = await browser.newPage();
  await page.goto('https://zanimayka.tratata.tech/login'); // Replace with your URL
});

test.afterEach(async () => {
  // Close the page after each test
  await page.close();
});

// function for testing first param - name test, second param - function for scenario
// function must be async always. All operation what get info from browser or expect must be await
test('has title NeBanka', async () => { 
   // goto url
  await expect(page).toHaveTitle('NeBanka'); // check title in page
});

test('check text on first slide', async () => {
  await expect(page.locator('#root')).toContainText(mainText_1);
});

test('check text on second slide', async () => {
  await page.getByRole('button', { name: 'Далее' }).click();
  const mainText_2_element = await page.locator('p.mx-auto');
  await expect(mainText_2_element).toContainText(mainText_2);
});

test('Check something first is visible', async () => {
  await expect(page.locator(".mx-auto.w-full").first()).toBeVisible();
});

test('Check something last is vivisible', async () => {
  await expect(page.locator(".mx-auto.w-full").last()).toBeVisible();
});

test('Check invest calc upper calc', async () => {
  await expect(page.locator('#root')).toContainText('Калькулятор инвестиций');
});

test('Check invest calc button in calc for money', async () => {
  await expect(page.locator('#root')).toContainText('Рублей');
});

test('Check invest calc button in calc for day', async () => {
  await expect(page.locator('#root')).toContainText('Дней');
});

test("Skip button route on last slide", async () => { 
  await expect(page.getByRole('img', { name: 'Картинка', exact: true })).toBeVisible();
});

test('Check invest calc for currect answer', async () => {
  await page.getByRole('button', { name: 'Далее' }).click();
  await page.getByRole('textbox', { name: 'Рублей' }).fill(`${sum_test_calc_invest_1}`);
  await page.getByRole('textbox', { name: 'Дней' }).fill(`${day_test_calc_invest_1}`);
  await expect(page.locator(".flex.h-full.w-full.items-center.justify-center")).toContainText(sum_test_calc_invest_1 / 1000 * 5 * day_test_calc_invest_1 + " Рублей");
});

test('Check invest calc for current answer when day >= 1000', async () => {
  await page.getByRole('button', { name: 'Далее' }).click();
  await page.getByRole('textbox', { name: 'Рублей' }).fill(`${sum_test_calc_invest_neg}`);
  await page.getByRole('textbox', { name: 'Дней' }).fill(`${day_test_calc_invest_neg}`);
  await expect(page.locator(".flex.h-full.w-full.items-center.justify-center")).toContainText(sum_test_calc_invest_neg / 1000 * 5 * day_test_calc_invest_neg + " Рублей");
});

