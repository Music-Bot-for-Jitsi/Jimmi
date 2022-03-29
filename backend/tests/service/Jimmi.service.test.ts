import { createJimmi, getAllJimmiIds, getJimmiBy } from '../../src/service/Jimmi.service.ts';
import { assert } from 'std/testing/asserts.ts';

Deno.test('Jimmi service methods', async () => {
  const jimmi = await createJimmi();
  assert(jimmi !== undefined);
  assert(jimmi.id !== undefined);

  const ids = getAllJimmiIds();
  assert(ids[0] === jimmi.id);
  assert(ids.length === 1);

  assert(getJimmiBy(jimmi.id) === jimmi);
});
