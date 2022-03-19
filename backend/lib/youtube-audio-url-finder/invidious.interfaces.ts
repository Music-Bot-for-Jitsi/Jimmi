export interface InvidiousData {
  type: string;
  api: boolean;
  uri: string;
}

export type InvidiousInstance = [string, InvidiousData];

export interface AudioFileAdaptiveFormat {
  index: string;
  bitrate: string;
  init: string;
  url: string;
  itag: string;
  type: string;
  clen: string;
  lmt: string;
  projectionType: string;
  fps: number;
  container: string;
  encoding: string;
}

export interface AudioFileData {
  adaptiveFormats: AudioFileAdaptiveFormat[];
}
