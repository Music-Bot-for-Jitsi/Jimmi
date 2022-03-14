import Jimmi from './Jimmi.class.ts';

const instances: Record<string, Jimmi> = {};

export const createJimmi = (): Jimmi => {
  const jimmi = new Jimmi();
  instances[jimmi.id] = jimmi;
  return jimmi;
};

export const getAllJimmiIds = (): string[] => {
  return Object.keys(instances);
};

export const getJimmiBy = (id: string): Jimmi | undefined => {
  return instances[id];
};
