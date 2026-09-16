/**
 * Every photograph on the site, keyed by where it is used.
 *
 * All current photos are Unsplash stock — a stop-gap until dude & Co. supplies its own
 * site photography. Unsplash requires a visible credit, which ImageWithCredit renders.
 * To replace a photo with a real one: drop the file in public/photos/, point `src` at it
 * and remove `credit`. Nothing else needs to change.
 */
export type ImageCredit = { name: string; handle: string; source: "Unsplash" };
export type SiteImage = { src: string; alt: string; credit?: ImageCredit };

const unsplash = (id: string, width = 1600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=70`;
const by = (name: string, handle: string): ImageCredit => ({ name, handle, source: "Unsplash" });

export const images = {
  hero: {
    src: unsplash("1533378890784-b2a5b0a59d40", 2000),
    alt: "Reinforcement bars being laid in a grid on a construction site",
    credit: by("Saad Salim", "saadx"),
  },
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
  hero: SiteImage;
  civilBanner: SiteImage;
  quality: SiteImage;
  ctaBand: SiteImage;
  materials: Record<string, SiteImage>;
  projects: Record<string, SiteImage>;
};

export type MaterialImageKey = keyof typeof images.materials;
export type ProjectImageKey = keyof typeof images.projects;

/** Unsplash asks for referral parameters on credit links. */
export function creditLinks(credit: ImageCredit) {
  const utm = "utm_source=dudeandco&utm_medium=referral";
  return {
    photographer: `https://unsplash.com/@${credit.handle}?${utm}`,
    source: `https://unsplash.com/?${utm}`,
  };
}
