export interface SearchEntry {
  type: "video",
  title: string,
  videoId: string,
  author: string,
  authorId: string,
  authorUrl: string,
  videoThumbnails: [
    {
      quality: string,
      url: string,
      width: number,
      height: number
    }
  ],
  description: string,
  descriptionHtml: string,
  viewCount: number,
  published: number,
  publishedText: string,
  lengthSeconds: number,
  liveNow: boolean,
  paid: boolean,
  premium: boolean
}
