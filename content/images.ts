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
  | { name: string; handle: string; source: "X"; url: string }
  /** Free-licence photo (CC BY / CC BY-SA / CC0 / public domain); `url` is the file page, `licence` its short name ("CC BY-SA 4.0"). */
  | { name: string; source: "Wikimedia Commons" | "Flickr"; url: string; licence: string };
export type SiteImage = {
  src: string;
  alt: string;
  credit?: ImageCredit;
  /** Where a credit-free (CC0 / public domain) photo came from. Provenance only; never rendered. */
  source?: string;
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
    /* Everything below: CC0 / public-domain photos (no credit required), self-hosted from photos/materials/.
       `source` records where each came from; it is never rendered. */
    concreteBlocks: {
      src: photo("materials/concrete-blocks"),
      alt: "Stacked hollow concrete blocks in sunlight",
      source: "https://commons.wikimedia.org/wiki/File:Close-Up_of_Stacked_Concrete_Blocks_in_Sunlight.jpg",
    },
    aacBlocks: {
      src: photo("materials/aac-blocks"),
      alt: "Stacks of building blocks on a housing site, with block-walled flats behind",
      source: "https://commons.wikimedia.org/wiki/File:Straat_met_nieuwbouwwoningen_-_flats_-_in_de_stad_Dimona_bij_de_Dode_zee._Arbeid,_Bestanddeelnr_255-3559.jpg",
    },
    tiles: {
      src: photo("materials/tiles"),
      alt: "Patterned ceramic floor tiles",
      source: "https://wordpress.org/photos/photo/77168e783f/",
    },
    plumbing: {
      src: photo("materials/plumbing"),
      alt: "A stack of white PVC pipes seen end-on",
      source: "https://www.flickr.com/photos/10836653@N05/4460986239",
    },
    electrical: {
      src: photo("materials/electrical"),
      alt: "Insulated electrical wires in yellow, blue, brown and red",
      source: "https://www.rawpixel.com/image/5924439/photo-image-white-background-public-domain-line",
    },
    sanitary: {
      src: photo("materials/sanitary"),
      alt: "Wall-mounted white wash basin with a chrome tap",
      source: "https://wordpress.org/photos/photo/251622a36c/",
    },
    doorsWindows: {
      src: photo("materials/doors-windows"),
      alt: "White casement window with louvred shutter, fitted in a wall",
      source: "https://commons.wikimedia.org/wiki/File:Windowfort_windows.png",
    },
    waterproofing: {
      src: photo("materials/waterproofing"),
      alt: "Bituminous waterproofing membrane laid in overlapping strips on a flat roof",
      source: "https://commons.wikimedia.org/wiki/File:Bituminous_waterproofing_on_flat_roof_2.jpg",
    },
    paints: {
      src: photo("materials/paints"),
      alt: "Four open tins of paint seen from above",
      source: "https://stocksnap.io/photo/paint-can-QLGZGI5CHV",
    },
    glassArch: {
      src: photo("materials/glass-arch"),
      alt: "Glass facades of modern office towers",
      source: "https://www.rawpixel.com/image/3303621/free-photo-image-apartment-building-architecture",
    },
    wallCladding: {
      src: photo("materials/wall-cladding"),
      alt: "Sandstone block wall cladding",
      source: "https://www.flickr.com/photos/61023765@N04/21421924065",
    },
    adhesivesChem: {
      src: photo("materials/adhesives-chem"),
      alt: "Trowel resting in a bucket of mortar",
      source: "https://commons.wikimedia.org/wiki/File:Throwel_in_a_bucket.JPG",
    },
    otherMaterials: {
      src: photo("materials/other-materials"),
      alt: "Building site with a material silo and scaffolding",
      source: "https://www.flickr.com/photos/104736837@N03/11210939694",
    },
    plywood: {
      src: photo("materials/plywood"),
      alt: "Close-up of a plywood sheet's wood grain",
      source: "https://commons.wikimedia.org/wiki/File:Plywood_texture.JPG",
    },
    laminates: {
      src: photo("materials/laminates"),
      alt: "Fan of decorative laminate samples in stone and wood finishes",
      source: "https://commons.wikimedia.org/wiki/File:Decorative_laminate_07831.jpg",
    },
    kitchenHardware: {
      src: photo("materials/kitchen-hardware"),
      alt: "Modular kitchen with wood-finish drawers and cabinets",
      source: "https://www.rawpixel.com/image/5924472/photo-image-public-domain-kitchen-room",
    },
    handles: {
      src: photo("materials/handles"),
      alt: "Display of cabinet handles and knobs on drawer fronts",
      source: "https://commons.wikimedia.org/wiki/File:Kitchen_cabinet_hardware_2009.jpg",
    },
    interiorGlass: {
      src: photo("materials/interior-glass"),
      alt: "Bathroom with a glass shower enclosure and vanity mirror",
      source: "https://www.flickr.com/photos/96511847@N04/10798221476",
    },
    pvcWpc: {
      src: photo("materials/pvc-wpc"),
      alt: "Fan of coloured decorative panel samples",
      source: "https://commons.wikimedia.org/wiki/File:Decorative_laminate_07842.jpg",
    },
    falseCeiling: {
      src: photo("materials/false-ceiling"),
      alt: "Curved gypsum false ceiling with cove lighting and downlights",
      source: "https://commons.wikimedia.org/wiki/File:False_ceiling.jpg",
    },
    profilesMetal: {
      src: photo("materials/profiles-metal"),
      alt: "Light-gauge metal stud framing for interior partitions",
      source: "https://commons.wikimedia.org/wiki/File:Light_gage_metal_framing.JPG",
    },
    countertops: {
      src: photo("materials/countertops"),
      alt: "Kitchen island with a marble-finish stone countertop",
      source: "https://commons.wikimedia.org/wiki/File:Kitchen_Countertop_Installation_%26_Custom_Stone_Fitting.jpg",
    },
    adhesivesConsumables: {
      src: photo("materials/adhesives-consumables"),
      alt: "Pile of steel screws",
      source: "https://www.rawpixel.com/image/5907188/pile-screws-free-public-domain-cc0-photo",
    },
    flooringPanels: {
      src: photo("materials/flooring-panels"),
      alt: "Wood-effect laminate flooring",
      source: "https://commons.wikimedia.org/wiki/File:Laminaat.jpg",
    },
    lighting: {
      src: photo("materials/lighting"),
      alt: "Bright LED lights set into a ceiling",
      source: "https://commons.wikimedia.org/wiki/File:!_Bright_Lights_Ceiling_!.jpg",
    },
    furnitureMaterials: {
      src: photo("materials/furniture-materials"),
      alt: "Bolts of patterned fabric standing side by side",
      source: "https://commons.wikimedia.org/wiki/File:Bolts_of_fabric._(15012162252).jpg",
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

/**
 * Whether the licence obliges us to show the credit on the page. The Unsplash Licence, CC0 and public
 * domain do not (owner's call, 02-Oct-2026: show no credit unless the licence requires it); CC BY /
 * CC BY-SA do, and a reposted X photo keeps its credit as a condition of the permission.
 */
export function creditRequired(credit: ImageCredit) {
  if (credit.source === "Unsplash") return false;
  if ("licence" in credit) return /^CC BY/i.test(credit.licence);
  return true;
}

/** CC licence deed for a short name like "CC BY-SA 4.0"; null for public domain / CC0 (no deed link required). */
function licenceUrl(licence: string) {
  const m = /^CC (BY(?:-SA)?) ([\d.]+)/i.exec(licence);
  return m ? `https://creativecommons.org/licenses/${m[1].toLowerCase()}/${m[2]}/` : null;
}

/** Where the credit's links go. Unsplash asks for referral parameters on its links. */
export function creditLinks(credit: ImageCredit): { photographer: string; source: string; licence?: string | null } {
  if (credit.source === "X") {
    return { photographer: `https://x.com/${credit.handle}`, source: credit.url };
  }
  if ("licence" in credit) {
    return { photographer: credit.url, source: credit.url, licence: licenceUrl(credit.licence) };
  }
  const utm = "utm_source=dudeandco&utm_medium=referral";
  return {
    photographer: `https://unsplash.com/@${credit.handle}?${utm}`,
    source: `https://unsplash.com/?${utm}`,
  };
}
