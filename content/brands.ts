/**
 * Brand groups for "Brands & Product Options". Rendered only when flags.brandOptions is on.
 * The prototype code carried a candidate list (UltraTech, ACC, Ambuja, Dalmia Bharat, Birla A1, JSW Cement /
 * TATA Tiscon, JSW Neosteel, Jindal Panther, Kamdhenu, SAIL / Asian Paints, Berger, Dr. Fixit, Kajaria, Somany,
 * Jaquar, Hindware, Astral, Supreme, Finolex, Havells, Anchor). Naming a brand implies a supplier relationship,
 * so the arrays stay empty until dude & Co. confirms which brands it actually supplies. To confirm.
 */
export type BrandGroup = { title: string; brands: readonly string[] };

export const brandGroups: readonly BrandGroup[] = [
  { title: "CEMENT", brands: [] },
  { title: "STEEL", brands: [] },
  { title: "PAINTS & FINISHING", brands: [] },
  { title: "PLUMBING & ELECTRICAL", brands: [] },
];
