import Jimmi from '../../src/service/Jimmi.class.ts';

Deno.test('that JIMMI can perform a play action', function testPlay() {
  const jimmi: Jimmi = new Jimmi();
  jimmi.play();
});

Deno.test('that JIMMI can perform a pause action', function testPause() {
  const jimmi: Jimmi = new Jimmi();
  jimmi.pause();
});

Deno.test('that JIMMI can perform a stop action', function testStop() {
  const jimmi: Jimmi = new Jimmi();
  jimmi.stop();
});

Deno.test('that JIMMI can perform a change music url action', function testChangeMusicUrl() {
  const jimmi: Jimmi = new Jimmi();
  const testUrl = 'test.test';
  jimmi.changeMusicUrl(testUrl);
});

Deno.test('that JIMMI can perform a get queue action', function testGetMusicInfo() {
  const jimmi: Jimmi = new Jimmi();
  jimmi.getQueue;
});
