/**
 * Every photograph on the site, keyed by where it is used.
 *
 * Own photos live as originals under photos/ and are referenced as "/photos/<key>"; `pnpm photos`
 * renders the WebP sizes the loader serves (see scripts/photos.mjs). Everything still marked
 * Unsplash is stock — a stop-gap until dude & Co. supplies its own site photography. Stock
 * photos carry a visible credit, which ImageWithCredit / Credit renders; a `caption` is shown
 * in the same chip with or without a credit.
 *
 * To replace a stock photo with a real one: drop the original in photos/<area>/, run
 * `pnpm photos`, point `src` at "/photos/<area>/<name>" and remove `credit`.
 */
export type ImageCredit =
  | { name: string; handle: string; source: "Unsplash" }
  /** A photo reposted from X with the poster's permission (to confirm); `url` is the post. */
  | { name: string; handle: string; source: "X"; url: string };
export type SiteImage = {
  src: string;
  alt: string;
  credit?: ImageCredit;
  /** Short factual caption shown with the credit — what and where, nothing promotional. */
  caption?: string;
};

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=70`;
const by = (name: string, handle: string): ImageCredit => ({ name, handle, source: "Unsplash" });
const photo = (key: string) => `/photos/${key}`;

/**
 * Home hero: Foxconn's "Project Elephant" campus, Bengaluru, photographed 18-Apr-2025.
 * Source: https://x.com/IndexKarnataka/status/1913074229421158648 (Karnataka Development Index).
 * X serves them at ~1270 px wide at most, so that is the largest rendition available.
 * The on-page photographer credit was removed at the owner's request on 18-Sep-2026; reuse
 * permission is still to confirm with the poster before launch (README → Photography).
 */
const foxconnCaption = "Project Elephant, Foxconn — Bengaluru";

export const images = {
  /** Slideshow order; the first slide is the LCP image and is preloaded. */
  heroSlides: [
    {
      src: photo("hero/foxconn-elephant-01"),
      alt: "Foxconn Project Elephant, Bengaluru: the D-series building's facade nearing completion, with cement bags and site machinery in the foreground",
      caption: foxconnCaption,
    },
    {
      src: photo("hero/foxconn-elephant-02"),
      alt: "Two blocks of the Project Elephant campus under construction against a clear blue sky",
      caption: foxconnCaption,
    },
    {
      src: photo("hero/foxconn-elephant-03"),
      alt: "Tower cranes above the Project Elephant site, with several blocks rising in the distance",
      caption: foxconnCaption,
    },
    {
      src: photo("hero/foxconn-elephant-04"),
      alt: "A Project Elephant block seen past a tree and the site's blue hoarding",
      caption: foxconnCaption,
    },
  ],
  civilBanner: {
    src: unsplash("1531834685032-c34bf0d84c77", 2000),
    alt: "Residential building under construction, wide view of the site",
    credit: by("Josue Isai Ramos Figueroa", "jramos10"),
  },
  quality: {
    src: unsplash("1504307651254-35680f356dfd"),
    alt: "Concrete being poured on site with reinforcement steel in place",
    credit: by("Etienne Girardet", "etiennegirardet"),
  },
  ctaBand: {
    src: unsplash("1541888946425-d81bb19240f5", 2000),
    alt: "Ready-mix concrete being poured on a construction site",
    credit: by("Scott Blake", "sunburned_surveyor"),
  },
  materials: {
    cement: {
      src: unsplash("1773394089934-3e29f2a3d6a9"),
      alt: "Cement bags stacked in storage",
      credit: by("Khanh Do", "donguyenkhanhs"),
    },
    tmtSteel: {
      src: unsplash("1580810734898-5e1753f23337"),
      alt: "TMT reinforcement bars bundled on site",
      credit: by("Mikita Yo", "mikitayo"),
    },
    mSand: {
      src: unsplash("1747103829872-097b322aa09f"),
      alt: "Close-up of manufactured sand",
      credit: by("Kenny", "kennyzhang29"),
    },
    riverSand: {
      src: unsplash("1534171472159-edb6d1e0b63c"),
      alt: "River sand heap at a supply yard",
      credit: by("jim gade", "jimgade"),
    },
    aggregates: {
      src: unsplash("1670789741624-9cdf7006b38c"),
      alt: "Close-up of granite aggregate stones",
      credit: by("Arya Dubey", "aryasphotodiary"),
    },
    redBricks: {
      src: unsplash("1627882206813-8c1ffd86efec"),
      alt: "Wire-cut red bricks stacked",
      credit: by("Mufid Majnun", "mufidpwt"),
    },
    rmc: {
      src: unsplash("1695414628474-d21608bbe0c7"),
      alt: "Ready-mix concrete truck pouring concrete",
      credit: by("Floris Andréa", "florisand"),
    },
  },
  /** Placeholder project photos — only rendered when flags.projects is on. */
  projects: {
    "courtyard-residence": {
      src: unsplash("1621511075938-f03482369feb"),
      alt: "Exterior of a residential house",
      credit: by("Design Hills", "designhills"),
    },
    "hillside-villa": {
      src: unsplash("1536895058696-a69b1c7ba34f"),
      alt: "Modern villa exterior with landscaping",
      credit: by("Nathan Waters", "nathangwaters"),
    },
    "grid-office-block": {
      src: unsplash("1565008447742-97f6f38c985c"),
      alt: "Commercial office building facade",
      credit: by("C Dustin", "dianamia"),
    },
    "terrace-apartments": {
      src: unsplash("1587582423116-ec07293f0395"),
      alt: "Apartment building under construction",
      credit: by("Josh Olalde", "josholalde"),
    },
    "legacy-home-retrofit": {
      src: unsplash("1591955506264-3f5a6834570a"),
      alt: "Home renovation interior work in progress",
      credit: by("Ben Allan", "ballonandon"),
    },
    "warehouse-shell": {
      src: unsplash("1601074231509-dce351c05199"),
      alt: "Industrial warehouse construction shell",
      credit: by("Ryunosuke Kikuno", "ryunosuke_kikuno"),
    },
  },
} satisfies {
  heroSlides: readonly SiteImage[];
  civilBanner: SiteImage;
  quality: SiteImage;
  ctaBand: SiteImage;
  materials: Record<string, SiteImage>;
  projects: Record<string, SiteImage>;
};

export type MaterialImageKey = keyof typeof images.materials;
export type ProjectImageKey = keyof typeof images.projects;

/** Where the credit's two links go. Unsplash asks for referral parameters on its links. */
export function creditLinks(credit: ImageCredit) {
  if (credit.source === "X") {
    return { photographer: `https://x.com/${credit.handle}`, source: credit.url };
  }
  const utm = "utm_source=dudeandco&utm_medium=referral";
  return {
    photographer: `https://unsplash.com/@${credit.handle}?${utm}`,
    source: `https://unsplash.com/?${utm}`,
  };
}
