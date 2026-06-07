export interface ContentImage {
  alt: string;
  caption?: string;
  format?: 'jpg' | 'jpeg' | 'png' | 'webp' | 'svg';
  heights: number[];
  limit_width?: boolean;
  src: string;
  widths: number[];
}
