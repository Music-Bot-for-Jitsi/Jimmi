import { assertEquals, assertThrows } from 'std/testing/asserts.ts';
import { Stub, stub } from 'mock/mod.ts';
import { assertSpyCall } from 'mock/mod.ts';
import AudioFileUrlFinder from '../../../lib/youtube-audio-url-finder/audio-file-url-finder.ts';
import { AudioFileData } from '../../../lib/youtube-audio-url-finder/invidious.interfaces.ts';
import { testAudioFileData } from './test-audio-file-data.ts';
import { Errors } from '../../../lib/youtube-audio-url-finder/errors.ts';

Deno.test('that the AudioFileUrlFinder constructor sets an empty invidiousVideoUrl', function testConstructor() {
  const audioFileUrlFinder: AudioFileUrlFinder = new AudioFileUrlFinder();
  assertEquals(audioFileUrlFinder['invidiousVideoUrl'], '');
});

Deno.test('that the setter method for InvidiousVideoUrl sets an InvidiousVideourl', function testSetInvidiousVideoUrl() {
  const testInvidiousVideoUrl = 'https://sometestinvidiousvideourl';
  const audioFileUrlFinder: AudioFileUrlFinder = new AudioFileUrlFinder();

  audioFileUrlFinder.setInvidiousVideoUrl(testInvidiousVideoUrl);

  assertEquals(audioFileUrlFinder['invidiousVideoUrl'], testInvidiousVideoUrl);
});

Deno.test('that the findAudioUrlFunction makes function calls with correct arguments and returns the correct AudioFileUrl ', async function testFindAudioFileUrl() {
  const testAudioFileUrl = 'https://sometestaudiofileourl';
  const audioFileUrlFinder: AudioFileUrlFinder = new AudioFileUrlFinder();

  const _fetchAudioFileData: Stub<AudioFileUrlFinder> = stub(
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

Deno.test('that the extractAudioFileUrl function returns an audio file url from an adaptiveFormat list and errors out if given an empty list', function testExtractAudioFileUrl() {
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
