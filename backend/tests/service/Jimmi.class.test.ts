import Jimmi from "../../src/service/Jimmi.class.ts"
import { spy, stub, assertSpyCall, assertSpyCallAsync, resolvesNext } from "https://deno.land/x/mock@0.15.0/mod.ts";
import type { Page } from 'puppeteer/mod.ts';
import config from '../../src/configuration/environment.ts';
import { assertEquals, assert } from "https://deno.land/std@0.130.0/testing/asserts.ts";


Deno.test("Jimmi instance constructor", () => {
  const fakePage: Page = {1:2} as unknown as Page;
  const jimmi = new Jimmi(fakePage);
  assert(jimmi !== undefined);
  assert(jimmi.id !== undefined);
})

Deno.test("Jimmi instance initialization", async () => {
  const fakePage: Page = {goto: () => {}} as unknown as Page;
  const pageGotoMock = stub(fakePage, "goto", resolvesNext([undefined]));
  const jimmi = new Jimmi(fakePage);

  jimmi.init();

  await assertSpyCallAsync(pageGotoMock, 0, {
    args: [config.browser.bridge, { waitUntil: 'load' }]
  });
})

Deno.test("Jimmi join function", async () => {
  const fakePage: Page = {evaluate: () => {}, exposeFunction: () => {}} as unknown as Page;
  const domain = "https://myTestDomain.de";
  const room = "myTestRoom";
  const pageEvaluateMock = stub(fakePage, "evaluate", resolvesNext(Array(3).fill(undefined)));
  stub(fakePage, "exposeFunction", resolvesNext(Array(2).fill(undefined)));
  const jimmi = new Jimmi(fakePage);

  const result = await jimmi.join(domain, room);

  assert(result === jimmi);

  await assertSpyCallAsync(pageEvaluateMock, 0, {
    args: [`joinConference('${domain}', '${room}', '${config.botname}', ${config.gain})`]
  });
})

