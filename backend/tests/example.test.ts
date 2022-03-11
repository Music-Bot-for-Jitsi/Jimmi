import { assertEquals } from 'std/testing/asserts.ts';

// Exemplary test taken from https://deno.land/manual@v1.19.0/testing
Deno.test(function helloWorld3() {
  const x = 1 + 2;
  assertEquals(x, 3);
});
