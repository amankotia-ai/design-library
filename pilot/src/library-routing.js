export const isPage=section=>section.id.endsWith('page');

export function isCompositionLayoutDetail(search) {
  const params = new URLSearchParams(search);
  const entry = params.get('entry');
  const collection = params.get('collection');
  if (!entry) return collection === 'composition-atlas' || collection === 'product-screen-compositions';
  return entry === 'composition-atlas' &&
    (!collection || collection === 'composition-atlas' || collection === 'product-screen-compositions');
}
