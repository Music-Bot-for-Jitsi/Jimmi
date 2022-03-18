import { assertEquals, assertThrows } from 'std/testing/asserts.ts';
import { Stub, stub } from 'mock/mod.ts';
import { assertSpyCall } from 'mock/mod.ts';
import AudioFileUrlFinder from '../../../lib/youtube-audio-url-finder/audio-file-url-finder.ts';
import { AudioFileData } from '../../../lib/youtube-audio-url-finder/invidious.interfaces.ts';
import { testAudioFileData } from './test-audio-file-data.ts';
import { Errors } from '../../../lib/youtube-audio-url-finder/errors.ts';

Deno.test(function testConstructor() {
  const audioFileUrlFinder: AudioFileUrlFinder = new AudioFileUrlFinder();
  assertEquals(audioFileUrlFinder['invidiousVideoUrl'], '');
});

Deno.test(function testSetInvidiousVideoUrl() {
  const testInvidiousVideoUrl = 'https://sometestinvidiousvideourl';
  const audioFileUrlFinder: AudioFileUrlFinder = new AudioFileUrlFinder();

  audioFileUrlFinder.setInvidiousVideoUrl(testInvidiousVideoUrl);

  assertEquals(audioFileUrlFinder['invidiousVideoUrl'], testInvidiousVideoUrl);
});

Deno.test(async function testFindAudioFileUrl() {
  const testAudioFileUrl = 'https://sometestaudiofileourl';
  const audioFileUrlFinder: AudioFileUrlFinder = new AudioFileUrlFinder();

  const _findInvidiousInstanceUrl: Stub<AudioFileUrlFinder> = stub(
    audioFileUrlFinder,
    'fetchAudioFileData',
    () => {
      return testAudioFileData;
    },
  );

  const extractAudioFileUrl: Stub<AudioFileUrlFinder> = stub(
    audioFileUrlFinder,
    'extractAudioFileUrl',
    () => {
      return testAudioFileUrl;
    },
  );

  assertEquals(await audioFileUrlFinder.findAudioFileUrl(), testAudioFileUrl);
  assertSpyCall(extractAudioFileUrl, 0, {
    args: [testAudioFileData],
    self: audioFileUrlFinder,
    returned: testAudioFileUrl,
  });
});

Deno.test(function testExtractAudioFileUrl() {
  const expectedUrl = testAudioFileData['adaptiveFormats'][0].url;
  const testEmptyAudioFileData: AudioFileData = { adaptiveFormats: [] };
  const audioFileUrlFinder: AudioFileUrlFinder = new AudioFileUrlFinder();
  assertEquals(
    audioFileUrlFinder['extractAudioFileUrl'](testAudioFileData),
    expectedUrl,
  );

  assertThrows(
    () => audioFileUrlFinder['extractAudioFileUrl'](testEmptyAudioFileData),
    (error: Error) => {
      assertEquals(error.name, Errors.NO_SUITABLE_ADAPTIVE_FORMATS);
    },
  );
});
