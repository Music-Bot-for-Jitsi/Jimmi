import Jimmi from "../../src/service/Jimmi.class.ts"
import { spy, stub, assertSpyCall, assertSpyCallAsync, resolvesNext } from "https://deno.land/x/mock@0.15.0/mod.ts";
import type { Page } from 'puppeteer/mod.ts';
import config from '../../src/configuration/environment.ts';
import { assertEquals, assert } from "https://deno.land/std@0.130.0/testing/asserts.ts";


Deno.test("Jimmi instance constructor", () => {
  const fakePage: Page = {} as unknown as Page;
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

Deno.test("Jimmi status property", () => {
  const fakePage: Page = {} as unknown as Page;
  const jimmi = new Jimmi(fakePage);
  const expected = {
    conference: {
      instance: null,
      name: config.botname,
      room: null,
    },
    currentTrack: null,
    id: jimmi.id,
    isPlaying: false,
    queueLength: 0,
  };

  assertEquals(jimmi.status, expected);
})

Deno.test("Jimmi music property", () => {
  const fakePage: Page = {} as unknown as Page;
  const jimmi = new Jimmi(fakePage);
  const expected = {
    status: "stopped",
    queue: [],
    current: null,
  };

  assertEquals(jimmi.music, expected);
})

Deno.test("Jimmi conference property", () => {
  const fakePage: Page = {} as unknown as Page;
  const jimmi = new Jimmi(fakePage);
  const expected = {
    instance: null,
    name: config.botname,
    room: null,
  };

  assertEquals(jimmi.conference, expected);
})

Deno.test("Jimmi audio controls", async () => {
  const fakePage: Page = {evaluate: () => {}} as unknown as Page;
  const url = "https://youtu.be/myVideo";
  const expected = [
    `playAudio('${url}')`,
    'void audio.play()',
    `playAudio('${url}')`,
    'void audio.pause()',
    'stopAudio()'
  ]
  const pageEvaluateMock = stub(fakePage, "evaluate", resolvesNext(Array(expected.length).fill(undefined)));
  const jimmi = new Jimmi(fakePage);

  assert(await jimmi.play(url) === jimmi);
  assert(await jimmi.play(undefined) === jimmi);
  assert(await jimmi.addToQueue(url) === jimmi);
  assert(await jimmi.playNextSong() === jimmi);
  assert(await jimmi.pause() === jimmi);
  assert(await jimmi.stop() === jimmi);
  assert(jimmi.removeFromQueue(0) === jimmi);
  assert(jimmi.clearQueue() === jimmi);

  for (let index = 0; index < expected.length; index++) {
    await assertSpyCallAsync(pageEvaluateMock, index, {
      args: [expected[index]]
    });
  }
})



