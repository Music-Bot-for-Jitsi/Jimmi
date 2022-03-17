import { assertEquals, assertThrows } from 'std/testing/asserts.ts';
import { Stub, stub } from 'mock/mod.ts';
import { assertSpyCall } from 'mock/mod.ts';
import AudioFileUrlFinder from '../../../lib/youtube-audio-url-finder/audio-file-url-finder.ts';
import { Errors } from '../../../lib/youtube-audio-url-finder/errors.ts';
