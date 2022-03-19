import { assertEquals } from 'std/testing/asserts.ts';
import ErrorGenerator from '../../../lib/youtube-audio-url-finder/error-generator.ts';

Deno.test('that the createdNamedError function returns a corrrectly named Error', function testCreateNamedError() {
  const name = 'testName';
  const errorGenerator: ErrorGenerator = new ErrorGenerator();
  const testError: Error = errorGenerator.createNamedError(name);
  const anotherError = new Error();
  anotherError.name = name;
  assertEquals(testError.name, name);
  assertEquals(testError, anotherError);
});

Deno.test('that the createdNamedError function returns a corrrectly named Error with the correct message set', function testCreateNamedErrorWithMessage() {
  const name = 'testName';
  const message = 'testMessage';
  const errorGenerator: ErrorGenerator = new ErrorGenerator();
  const testError: Error = errorGenerator.createNamedErrorWithMessage(
    name,
    message,
  );
  const anotherError = new Error();
  anotherError.name = name;
  anotherError.message = message;
  assertEquals(testError.name, name);
  assertEquals(testError.message, message);
  assertEquals(testError, anotherError);
});
