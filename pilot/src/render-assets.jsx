import React from 'react';
import catalog from './render-assets-data.json';
import {skillCollections} from './skill-collections';
import {CompositionAtlas, CompositionLayoutDetail} from './composition-atlas';
import {withBase} from './base';
import './render-assets.css';

const {entries} = catalog;
const entriesById = new Map(entries.map(entry => [entry.id, entry]));
const sizeInMb = bytes => `${(bytes / 1024 / 1024).toFixed(1)} MB`;

function skillUrl(collection, entry) {
  const params = new URLSearchParams({panel: 'skills'});
  if (collection) params.set('collection', collection);
  if (entry) params.set('entry', entry);
  return withBase(`/?${params}`);
}

function belongsToCollection(entry, collection) {
  return collection.entryId
    ? entry.id === collection.entryId
    : entry.category === collection.category || collection.resourceIds?.includes(entry.id);
}

function collectionEntries(collection) {
  return entries.filter(entry => belongsToCollection(entry, collection));
}

function collectionFor(entry) {
  return skillCollections.find(collection => belongsToCollection(entry, collection));
}

function plural(count, noun) {
  return `${count} ${count === 1 ? noun : noun === 'study' ? 'studies' : `${noun}s`}`;
}

function CollectionCard({title, summary, href, image, imageFit, imagePosition, meta, eager}) {
  return <article className="system-card render-card">
    <a className="render-cover" href={href} aria-label={`Explore ${title}`}>
      <img src={withBase(image)} alt="" loading={eager ? 'eager' : 'lazy'} decoding="async" style={{objectFit: imageFit, objectPosition: imagePosition}}/>
    </a>
    <div className="system-card-body">
      <p className="render-meta">{meta}</p>
      <h2><a href={href}>{title}</a></h2>
      <p className="render-summary">{summary}</p>
    </div>
  </article>;
}

function SkillIndex() {
  return <main className="system-home skill-index">
    <div className="catalog-heading render-heading">
      <div><h1>Skills</h1><p>Study a technique, explore finished examples, or start with a reusable template.</p></div>
    </div>
    <div className="system-cards render-cards">
      {skillCollections.map((collection, index) => {
        const cover = collection.cover
          ? {preview: collection.cover, previewPosition: collection.coverPosition}
          : entriesById.get(collection.coverId) || collectionEntries(collection)[0];
        const {preview: image, previewPosition: imagePosition} = cover || {};
        if (!image) return null;
        const href = collection.href ? withBase(collection.href) : skillUrl(collection.id);
        const meta = collection.layouts
          ? plural(collection.layouts.length, 'layout')
          : collection.itemName ? plural(collectionEntries(collection).length, collection.itemName) : collection.entryId ? 'Interactive study' : 'Lessons & studies';
        return <CollectionCard key={collection.id} {...{href, image, imagePosition, meta}} imageFit="cover" title={collection.title} summary={collection.summary} eager={index < 3}/>;
      })}
    </div>
  </main>;
}

function SkillGallery({collection}) {
  const items = collectionEntries(collection);

  return <main className="system-home skill-gallery">
    <a className="detail-back" href={skillUrl()}>← Skills</a>
    <div className="catalog-heading render-heading"><div><h1>{collection.title}</h1><p>{collection.summary}</p></div></div>
    <details className="skill-guidance">
      <summary>How to use this collection</summary>
      <ol>{collection.guidance.map(([title, description]) => <li key={title}><strong>{title}</strong><p>{description}</p></li>)}</ol>
    </details>
    <div className="system-cards render-cards">
      {items.map((entry, index) => <CollectionCard key={entry.id} title={entry.title} summary={entry.summary}
        href={skillUrl(collection.id, entry.id)} image={entry.preview} imageFit={entry.previewFit} imagePosition={entry.previewPosition}
        meta={plural(entry.images.length, 'preview')} eager={index < 3}/>)}
    </div>
  </main>;
}

function EntryDetail({entry, collection}) {
  const standalone = Boolean(collection.entryId);
  const related = collectionEntries(collection).filter(item => item.id !== entry.id).slice(0, 4);
  const back = standalone ? skillUrl() : skillUrl(collection.id);
  const heading = standalone ? collection.title : entry.title;
  return <main className="render-detail">
    <a className="detail-back" href={back}>← {standalone ? 'Skills' : collection.title}</a>
    <header className="render-detail-heading">
      <div>
        {!standalone && <p className="eyebrow">{collection.title}</p>}
        <h1>{heading}</h1>
        <p className="render-intro">{entry.summary}</p>
      </div>
      <div className="render-actions">
        {entry.study && <a className="render-open-study" href={withBase(entry.study)} target="_blank" rel="noreferrer">{entry.studyLabel || 'Open interactive study'} ↗</a>}
        {entry.download && <a className="render-download" href={withBase(entry.download)} download={`${entry.id}.zip`}>{entry.downloadLabel} <span>{sizeInMb(entry.downloadBytes)} ↓</span></a>}
      </div>
    </header>
    {entry.note && <p className="render-context">{entry.note}</p>}
    <section aria-labelledby="render-scenes-heading">
      <div className="render-scenes-heading">
        <h2 id="render-scenes-heading">{standalone ? 'Study previews' : 'Scenes & compositions'}</h2>
        <p>{plural(entry.images.length, 'image')} · original file dimensions</p>
      </div>
      <div className="render-scene-grid">
        {entry.images.map((image, index) => <figure key={image.src}>
          <a href={withBase(image.src)} target="_blank" rel="noreferrer" aria-label={`Open larger preview: ${image.title}`}>
            <img src={withBase(image.src)} alt={`${entry.title}: ${image.title}`} width={image.width} height={image.height} loading={index < 2 ? 'eager' : 'lazy'} decoding="async"/>
          </a>
          <figcaption><span>{image.title}</span><span>{image.width} × {image.height}</span></figcaption>
        </figure>)}
      </div>
    </section>
    <details className="render-source">
      <summary>Project notes &amp; source details</summary>
      <p>From Render Assets / {entry.sourcePath}. Gallery images are optimized JPEG previews. The downloads contain source files and notes for the listed work.</p>
      {entry.readme && <a href={withBase(entry.readme)} target="_blank" rel="noreferrer">Read original project notes ↗</a>}
    </details>
    {related.length > 0 && <nav className="render-related" aria-label="Related examples">
      <h2>More {collection.itemName === 'study' ? 'studies' : `${collection.itemName}s`}</h2>
      {related.map(item => <a href={skillUrl(collection.id, item.id)} key={item.id}>{item.title} ↗</a>)}
    </nav>}
  </main>;
}

export function SkillCollections({search}) {
  const params = new URLSearchParams(search);
  const collectionId = params.get('collection');
  const collection = skillCollections.find(item => item.id === collectionId);
  const legacyResourceId = skillCollections.some(item => item.resourceIds?.includes(collectionId))
    ? collectionId
    : undefined;
  const entryId = params.get('entry') || collection?.entryId || legacyResourceId;
  const entry = entriesById.get(entryId);
  const parent = entry && collectionFor(entry);

  if (parent && (!collectionId || collection === parent || legacyResourceId === entry.id)) {
    if (entry.id === 'composition-atlas') return <CompositionAtlas entry={entry} back={skillUrl(parent.id)}/>;
    return <EntryDetail entry={entry} collection={parent}/>;
  }
  if (entryId || (collectionId && !collection)) {
    return <main className="render-detail"><a className="detail-back" href={skillUrl()}>← Skills</a><h1>Collection item not found</h1><p>Choose a study or template from the Skills index.</p></main>;
  }
  if (collection?.layouts) {
    return <CompositionLayoutDetail title={collection.title} layouts={collection.layouts}
      summary={`${collection.summary} Each placeholder shows where the screen, artwork, and supporting layers go.`}
      back={skillUrl()} backLabel="Skills"
      resource={{href: skillUrl(collection.id, 'composition-atlas'), label: 'Original Composition Atlas',
        note: 'Viewport presets show starter geometry. Measure your actual capture to calculate its placement.'}}/>;
  }
  if (collection?.guidance) return <SkillGallery collection={collection}/>;
  return <SkillIndex/>;
}
