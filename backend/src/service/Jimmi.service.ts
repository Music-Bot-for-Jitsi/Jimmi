import Jimmi from './Jimmi.class.ts';

const instances: Record<string, Jimmi> = {};

/**
 * Creates a new Jimmi instance
 * @returns created Jimmi instance
 */
export function createJimmi(): Jimmi {
  const jimmi = new Jimmi();
  instances[jimmi.id] = jimmi;
  return jimmi;
}

/**
 * Returns the list of ids of available Jimmi instances
 * @returns list of ids
 */
export function getAllJimmiIds(): string[] {
  return Object.keys(instances);
}

/**
 * Returns Jimmi instance with the given id
 * @param id id of Jimmi instance
 * @returns Jimmi instance
 */
export function getJimmiBy(id: string): Jimmi | undefined {
  return instances[id];
}
