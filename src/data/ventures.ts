/** A venture card. The Home section renders only when this list has entries. */
export interface Venture {
  /** Letter shown before the solid dot in the mark. */
  initial: string;
  name: string;
  line: string;
  href?: string;
}

// Empty on purpose. Placeholder cards from the Figma frames are not shipped.
export const ventures: Venture[] = [];
