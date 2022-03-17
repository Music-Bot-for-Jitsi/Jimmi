import { assertEquals, assertThrows } from 'std/testing/asserts.ts';
import { Stub, stub } from 'mock/mod.ts';
import InvidiousInstanceFinder from '../../../lib/youtube-audio-url-finder/invidious-instance-finder.ts';
import { InvidiousData } from '../../../lib/youtube-audio-url-finder/invidious.interfaces.ts';
import { Errors } from '../../../lib/youtube-audio-url-finder/errors.ts';

Deno.test(function testConstructor() {
  const testInstanceListUrl = 'https://sometestinstancelisturl.com';
  const invidiousInstanceFinder: InvidiousInstanceFinder = new InvidiousInstanceFinder(
    testInstanceListUrl,
  );

  assertEquals(invidiousInstanceFinder['instanceListUrl'], testInstanceListUrl);
});

Deno.test(async function testFindInvidiousInstanceUrl() {
});

Deno.test(function testSetInstanceListUrl() {
  const invidiousInstanceFinder: InvidiousInstanceFinder = new InvidiousInstanceFinder('');

  const testUrl = 'https://api.invidious.io/instances.json';

  invidiousInstanceFinder.setInstanceListUrl(testUrl);
  assertEquals(invidiousInstanceFinder['instanceListUrl'], testUrl);
});

Deno.test(function testExtractFilteredOrderedInstances() {
  const testInstance1: InvidiousData = {
    type: 'https',
    api: true,
    uri: '',
  };
  const testInstance2: InvidiousData = {
    type: 'https',
    api: false,
    uri: '',
  };
  const testInstance3: InvidiousData = {
    type: 'onion',
    api: false,
    uri: '',
  };
  const testInstance4: InvidiousData = {
    type: 'onion',
    api: true,
    uri: '',
  };
  const testInstance5: InvidiousData = {
    type: 'https',
    api: false,
    uri: 'https://yewtu.be',
  };

  const instanceList: InvidiousData[] = [
    testInstance1,
    testInstance2,
    testInstance3,
    testInstance4,
    testInstance5,
  ];

  const expectedFilteredList: InvidiousData[] = [
    testInstance2,
  ];

  const invidiousInstanceFinder: InvidiousInstanceFinder = new InvidiousInstanceFinder('');

  const _isValidInstance: Stub<InvidiousInstanceFinder> = stub(
    invidiousInstanceFinder,
    'isValidInstance',
    (instance: InvidiousData) => {
      if (instance.type != 'https') {
        return false;
      }
      if (instance.api != false) {
        return false;
      }
      if (instance.uri === 'https://yewtu.be') {
        return false;
      }
      return true;
    },
  );

  assertEquals(
    invidiousInstanceFinder['extractFilteredOrderedInstances'](instanceList),
    expectedFilteredList,
  );
});

Deno.test(function testExtractSingleInstance() {
  const testInstance1: InvidiousData = {
    type: 'https',
    api: true,
    uri: '',
  };
  const instanceList: InvidiousData[] = [testInstance1];

  const invidiousInstanceFinder: InvidiousInstanceFinder = new InvidiousInstanceFinder('');

  assertEquals(
    invidiousInstanceFinder['extractSingleInstance'](instanceList),
    testInstance1,
  );

  const emptyInstanceList: InvidiousData[] = [];

  assertThrows(
    () => {
      invidiousInstanceFinder['extractSingleInstance'](emptyInstanceList);
    },
    (error: Error) => {
      assertEquals(error.name, Errors.NO_SUITABLE_INVIDIOUS_INSTANCE);
    },
  );
});

Deno.test(function testExtractSingleInstanceUrl() {
  const testUri = 'test.uri';

  const testInstance: InvidiousData = {
    type: 'https',
    api: false,
    uri: testUri,
  };

  const invidiousInstanceFinder: InvidiousInstanceFinder = new InvidiousInstanceFinder('');

  assertEquals(
    invidiousInstanceFinder['extractSingleInstanceUrl'](testInstance),
    testUri,
  );
});

Deno.test(function isValidInstance() {
  const testInstance1: InvidiousData = {
    type: 'https',
    api: true,
    uri: '',
  };
  const testInstance2: InvidiousData = {
    type: 'https',
    api: false,
    uri: '',
  };
  const testInstance3: InvidiousData = {
    type: 'onion',
    api: false,
    uri: '',
  };
  const testInstance4: InvidiousData = {
    type: 'onion',
    api: true,
    uri: '',
  };
  const testInstance5: InvidiousData = {
    type: 'https',
    api: false,
    uri: 'https://yewtu.be',
  };

  const invidiousInstanceFinder: InvidiousInstanceFinder = new InvidiousInstanceFinder('');

  assertEquals(
    invidiousInstanceFinder['isValidInstance'](testInstance1),
    false,
  );

  assertEquals(
    invidiousInstanceFinder['isValidInstance'](testInstance2),
    true,
  );

  assertEquals(
    invidiousInstanceFinder['isValidInstance'](testInstance3),
    false,
  );

  assertEquals(
    invidiousInstanceFinder['isValidInstance'](testInstance4),
    false,
  );

  assertEquals(
    invidiousInstanceFinder['isValidInstance'](testInstance5),
    false,
  );
});
