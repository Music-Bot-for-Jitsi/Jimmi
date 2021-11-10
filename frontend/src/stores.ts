import { writable } from "svelte/store";
import type { Video } from "./models/Video";

export const queue = writable<Video[]>(['' as any]);
