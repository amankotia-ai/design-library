import {screenCompositionLayouts} from './product-screen-composition-data';

export const skillCollections = [
  {
    id: 'product-screen-compositions',
    title: 'Product Screen Compositions',
    category: 'Product screens',
    cover: screenCompositionLayouts[0].thumbnail,
    coverPosition: '24% center',
    layouts: screenCompositionLayouts,
    itemName: 'study',
    resourceIds: ['composition-atlas'],
    summary: 'Choose a layout for a full product viewport, a focused feature, or a screen framed by artwork.',
  },
  {
    id: 'product-renders',
    title: 'Product Renders',
    category: 'Brand showcases',
    coverId: 'arco',
    itemName: 'example',
    summary: 'Apply brand artwork to packaging, apparel, print, and photographed devices.',
    guidance: [
      ['Choose the scene', 'Use a fixed photograph when the angle already works. Use a modeled scene when the camera, lighting, or physical interaction needs to change.'],
      ['Fit the artwork', 'Match the artwork to the actual screen or print surface. Preserve logos and typography as separate assets.'],
      ['Check the finish', 'Review the whole frame and then inspect the edges, masks, occlusion, and fine text at full size.'],
    ],
  },
  {
    id: 'mockup-templates',
    title: 'Mockup Templates',
    category: 'Mockup templates',
    cover: '/render-assets/oak-retail/02.jpg',
    itemName: 'pack',
    summary: 'Download reusable scenes and placement guides for devices, brand applications, and retail surfaces.',
    guidance: [
      ['Choose a surface', 'Pick a scene whose camera angle and subject match the artwork you want to show.'],
      ['Use the supplied guides', 'Open the source pack for placement coordinates, masks, or a Blender scene. Match the artwork to the named surface.'],
      ['Keep the source intact', 'Work from a copy. Check the result at its original size before exporting another crop.'],
    ],
  },
  {
    id: 'ruled',
    title: 'Ruled',
    entryId: 'ruled',
    coverId: 'ruled',
    summary: 'Study alignment, offsets, and responsive composition in an interactive grid playground.',
  },
  {
    id: 'film-motion',
    title: 'Film & Motion',
    cover: '/film-motion/wolo/posters/slash-global.jpg',
    href: '/?panel=films',
    summary: 'Explore directing lessons, motion studies, and breakdowns of reference films.',
  },
];
