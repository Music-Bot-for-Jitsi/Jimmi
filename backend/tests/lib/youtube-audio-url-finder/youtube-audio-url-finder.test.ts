import { assertEquals, assertThrows } from 'std/testing/asserts.ts';
import { Stub, stub } from 'mock/mod.ts';
import { assertSpyCall } from 'mock/mod.ts';
import YoutubeAudioUrlFinder from '../../../lib/youtube-audio-url-finder/youtube-audio-url-finder.ts';
import InvidiousInstanceFinder from '../../../lib/youtube-audio-url-finder/invidious-instance-finder.ts';
import AudioFileUrlFinder from '../../../lib/youtube-audio-url-finder/audio-file-url-finder.ts';
import { Errors } from '../../../lib/youtube-audio-url-finder/errors.ts';

Deno.test(function testConstructor() {
  const testInstanceListUrl = 'https://sometestinstanceurl.com';
  const youtubeAudioUrlFinder: YoutubeAudioUrlFinder = new YoutubeAudioUrlFinder(
    testInstanceListUrl,
  );

  assertEquals(
    youtubeAudioUrlFinder['invidiousInstanceFinder']['instanceListUrl'],
    testInstanceListUrl,
  );
});
Deno.test(async function testFindAudioFileUrl() {
  const testAudioFileUrl = 'https://sometesturl.org';
  const testYoutubeUrl = 'https://sometestyoutubeurl.com';
  const testInvidiousInstanceUrl = 'https://invidious.snopyta.org';
  const testInvidiousVideoUrl = 'https://invidious.snopyta.org/api/v1/videos/123456';

  const youtubeAudioUrlFinder: YoutubeAudioUrlFinder = new YoutubeAudioUrlFinder('');

  const _findInvidiousInstanceUrl: Stub<InvidiousInstanceFinder> = stub(
    youtubeAudioUrlFinder['invidiousInstanceFinder'],
    'findInvidiousInstanceUrl',
    () => {
      return testInvidiousInstanceUrl;
    },
  );

  const _buildInvidiousUrl: Stub<YoutubeAudioUrlFinder> = stub(
    youtubeAudioUrlFinder,
    'buildInvidiousUrl',
    () => {
      return testInvidiousVideoUrl;
    },
  );

  const findAudioFileUrl: Stub<AudioFileUrlFinder> = stub(
    youtubeAudioUrlFinder['audioFileUrlFinder'],
    'findAudioFileUrl',
    () => {
      return testAudioFileUrl;
    },
  );

  assertEquals(
    await youtubeAudioUrlFinder['findAudioFileUrl'](testYoutubeUrl),
    testAudioFileUrl,
  );

  assertEquals(
    youtubeAudioUrlFinder['audioFileUrlFinder']['invidiousVideoUrl'],
    testInvidiousVideoUrl,
  );

  assertSpyCall(findAudioFileUrl, 0, {
    args: [],
    self: youtubeAudioUrlFinder['audioFileUrlFinder'],
    returned: testAudioFileUrl,
  });
});

Deno.test(function testBuildInvidiousUrl() {
  const testInvidiousInstanceUrl = 'https://invidious.snopyta.org';
  const testVideoParameter = '123456';
  const expectedInvidiousUrl = 'https://invidious.snopyta.org/api/v1/videos/123456';

  const youtubeAudioUrlFinder: YoutubeAudioUrlFinder = new YoutubeAudioUrlFinder('');

  const _extractVideoParameter: Stub<YoutubeAudioUrlFinder> = stub(
    youtubeAudioUrlFinder,
    'extractVideoParameter',
    () => {
      return testVideoParameter;
    },
  );
  assertEquals(
    youtubeAudioUrlFinder['buildInvidiousUrl'](
      'somestring, this is mocked anyway',
      testInvidiousInstanceUrl,
    ),
    expectedInvidiousUrl,
  );
});

Deno.test(function testExtractVideoParameter() {
  const testUrl1 = 'https://www.youtube.com/watch?v=test&ab_channel=test';
  const testUrl2 = 'https://www.youtube?.com/watch?v=test&ab_channel=test';
  const testUrl3 = 'https://www.youtube.com/watch?test&ab_channel=test';

  const youtubeAudioUrlFinder: YoutubeAudioUrlFinder = new YoutubeAudioUrlFinder('');

  assertEquals(
    youtubeAudioUrlFinder['extractVideoParameter'](testUrl1),
    'test',
  );

  assertThrows(
    () => youtubeAudioUrlFinder['extractVideoParameter'](testUrl2),
    (error: Error) => {
      assertEquals(error.name, Errors.MALFORMED_YOUTUBE_URL);
    },
  );

  assertThrows(
    () => youtubeAudioUrlFinder['extractVideoParameter'](testUrl3),
    (error: Error) => {
      assertEquals(error.name, Errors.MALFORMED_YOUTUBE_URL);
    },
  );
});
