import {
  args,
  createJimmi,
  getAllJimmiIds,
  getJimmiBy,
  initializeBrowser,
} from '../../src/service/Jimmi.service.ts';
import { assert, assertEquals, assertRejects } from 'std/testing/asserts.ts';
import { assertSpyCallAsync, resolvesNext, stub } from 'mock/mod.ts';
import puppeteer from 'puppeteer/mod.ts';
import config from '../../src/configuration/environment.ts';

Deno.test('Jimmi service methods', async () => {
  const jimmi = await createJimmi();
  assert(jimmi !== undefined);
  assert(jimmi.id !== undefined);

  const ids = getAllJimmiIds();
  assert(ids[0] === jimmi.id);
  assert(ids.length === 1);

  assert(getJimmiBy(jimmi.id) === jimmi);
});

Deno.test('Jimmi service browser initialization', async () => {
  const fakeBrowser = { name: 'myFancyBrowser' };
  const puppeteerLaunchStub = stub(puppeteer, 'launch', resolvesNext([fakeBrowser]));
  const browser1 = await initializeBrowser(config, puppeteer);
  assertEquals(browser1, fakeBrowser);

  await assertSpyCallAsync(puppeteerLaunchStub, 0, {
    args: [{
      executablePath: config.browser.path,
      headless: true,
      args,
    }],
  });

  config.browser.wsEndpoint = 'someEndpoint';
  config.browser.noSandbox = true;
  const puppeteerConnectStub = stub(puppeteer, 'connect', resolvesNext([fakeBrowser]));
  const browser2 = await initializeBrowser(config, puppeteer);
  assertEquals(browser2, fakeBrowser);

  await assertSpyCallAsync(puppeteerConnectStub, 0, {
    args: [{
      browserWSEndpoint: config.browser.wsEndpoint,
    }],
  });

  await assertRejects(async () => {
    await initializeBrowser(config, {} as unknown as typeof puppeteer);
  });
});
