import { assertEquals, assertThrows } from 'std/testing/asserts.ts';
import { Stub, stub } from 'mock/mod.ts';
import { assertSpyCall } from 'mock/mod.ts';

import InvidiousInstanceFinder from '../../../lib/youtube-audio-url-finder/invidious-instance-finder.ts';
import { InvidiousData } from '../../../lib/youtube-audio-url-finder/invidious.interfaces.ts';
import { Errors } from '../../../lib/youtube-audio-url-finder/errors.ts';

Deno.test('that the InvidiousInstanceFinder constructor sets the provided instanceListUrl', function testConstructor() {
  const testInstanceListUrl = 'https://sometestinstancelisturl.com';
  const invidiousInstanceFinder: InvidiousInstanceFinder = new InvidiousInstanceFinder(
    testInstanceListUrl,
  );

  assertEquals(invidiousInstanceFinder['instanceListUrl'], testInstanceListUrl);
});

Deno.test('that the findInvidiousInstanceUrl makes function calls wth the correct arguments and returns a correct invidious instance url', async function testFindInvidiousInstanceUrl() {
  const invidiousInstanceFinder: InvidiousInstanceFinder = new InvidiousInstanceFinder('');

  const testInstanceList: InvidiousData[] = [{
    type: 'https',
    api: true,
    uri: 'https://testuri.com',
  }];

  const _findInvidiousInstanceUrl: Stub<InvidiousInstanceFinder> = stub(
    invidiousInstanceFinder,
    'fetchInstanceList',
    () => {
      return testInstanceList;
    },
  );

  const extractFilteredOrderedInstances: Stub<InvidiousInstanceFinder> = stub(
    invidiousInstanceFinder,
    'extractFilteredOrderedInstances',
    () => {
      return testInstanceList;
    },
  );

  const extractSingleInstance: Stub<InvidiousInstanceFinder> = stub(
    invidiousInstanceFinder,
    'extractSingleInstance',
    () => {
      return testInstanceList[0];
    },
  );

  const extractSingleInstanceUrl: Stub<InvidiousInstanceFinder> = stub(
    invidiousInstanceFinder,
    'extractSingleInstanceUrl',
    () => {
      return testInstanceList[0].uri;
    },
  );

  assertEquals(
    await invidiousInstanceFinder['findInvidiousInstanceUrl'](),
    testInstanceList[0].uri,
  );

  assertSpyCall(extractFilteredOrderedInstances, 0, {
    args: [testInstanceList],
    self: invidiousInstanceFinder,
    returned: testInstanceList,
  });

  assertSpyCall(extractSingleInstance, 0, {
    args: [testInstanceList],
    self: invidiousInstanceFinder,
    returned: testInstanceList[0],
  });

  assertSpyCall(extractSingleInstanceUrl, 0, {
    args: [testInstanceList[0]],
    self: invidiousInstanceFinder,
    returned: testInstanceList[0].uri,
  });
});

Deno.test('that the setInstanceListUrl function sets the provided instance list url', function testSetInstanceListUrl() {
  const invidiousInstanceFinder: InvidiousInstanceFinder = new InvidiousInstanceFinder('');

  const testUrl = 'https://api.invidious.io/instances.json';

  invidiousInstanceFinder.setInstanceListUrl(testUrl);
  assertEquals(invidiousInstanceFinder['instanceListUrl'], testUrl);
});

Deno.test('that the extractFilteredOrderedInstances correctly filters an instance list', function testExtractFilteredOrderedInstances() {
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

Deno.test('that the extractSingleInstanceFunction extracts a single instace from an instance list and errors out if given an empty list', function testExtractSingleInstance() {
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

Deno.test('that the extractSingleInstanceUrl extracts the correct url from a single instance', function testExtractSingleInstanceUrl() {
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

Deno.test('that the isValidInstance function correctly decides if an instance is valid', function isValidInstance() {
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
