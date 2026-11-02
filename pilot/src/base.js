// Vite's base ('/design-library/' in builds and dev); '/' when data modules are imported by Node scripts.
const base=import.meta.env?.BASE_URL??'/';
const publicDirs=/(^|[\s"'(=,])\/(?=(?:assets|references|evidence|previews|blueprint-source|steel-source|conversion|interfere|plasticity)\/)/g;
// Root-relative app paths ('/assets/…', '/?panel=…', '/') resolved under the base.
export const withBase=path=>typeof path==='string'&&path.startsWith('/')&&!path.startsWith('//')&&!path.startsWith(base)?base+path.slice(1):path;
// Public-file paths inside captured markup, CSS or parsed JSON data.
export const rebase=value=>typeof value==='string'?value.replace(publicDirs,`$1${base}`):Array.isArray(value)?value.map(rebase):value&&typeof value==='object'?Object.fromEntries(Object.entries(value).map(([key,item])=>[key,rebase(item)])):value;
