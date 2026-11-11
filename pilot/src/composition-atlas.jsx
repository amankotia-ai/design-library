import React, {useState} from 'react';
import {atlasLayouts} from './composition-atlas-data';
import {withBase} from './base';
import './composition-atlas.css';

const layoutNumber = index => String(index + 1).padStart(2, '0');
const canvasSize = layout => `${layout.width} × ${layout.height}`;

function LayoutFiles({layout}) {
  return <div className="atlas-layout-files">
    <a href={withBase(layout.image)} target="_blank" rel="noreferrer" aria-label={`Open ${layout.title} full size`}>Full size ↗</a>
    <a href={withBase(layout.definition)} download aria-label={`Download ${layout.title} definition`}>Layout JSON ↓</a>
  </div>;
}

export function CompositionLayoutDetail({title, summary, layouts, back, backLabel, download, resource}) {
  const [selected, setSelected] = useState(0);
  const layout = layouts[selected];

  return <main className="system-panel panel-heading system-detail atlas-detail">
    <div className="system-detail-intro">
      <div className="detail-utility">
        <a className="back-to-systems" href={back}>← {backLabel}</a>
        {download && <a className="atlas-download" href={withBase(download)} download>Download atlas ↓</a>}
      </div>
      <h1>{title}</h1>
      <p className="system-description">{summary}</p>
    </div>

    <aside className="system-detail-preview-pane atlas-preview-pane" id="atlas-selected-layout" aria-label="Selected layout preview">
      <div className="atlas-preview-panel">
        <header className="atlas-preview-heading" aria-live="polite">
          <p className="atlas-layout-index">Layout {layoutNumber(selected)} / {layouts.length}</p>
          <h2>{layout.title}</h2>
          <p>{layout.summary}</p>
        </header>
        <figure className="atlas-preview-image">
          <img src={withBase(layout.image)} alt={`${layout.title} layout map`} width={layout.width} height={layout.height}/>
        </figure>
        <div className="atlas-preview-footer">
          <span>{canvasSize(layout)}</span>
          <LayoutFiles layout={layout}/>
        </div>
      </div>
    </aside>

    <div className="system-detail-copy">
      <section className="atlas-layouts" aria-labelledby="atlas-layouts-title">
        <h2 id="atlas-layouts-title" className="detail-label">Layouts <span>{layouts.length}</span></h2>
        <fieldset className="atlas-layout-grid">
          <legend className="sr-only">Choose a layout to preview</legend>
          {layouts.map((item, index) => <div key={item.id} className="atlas-layout-item">
            <label className="atlas-layout-option">
              <input type="radio" name="atlas-layout" value={item.id} checked={index === selected}
                onChange={() => setSelected(index)} aria-label={item.title} aria-controls="atlas-selected-layout"/>
              <span className={item.height > item.width ? 'atlas-thumbnail atlas-thumbnail-portrait' : 'atlas-thumbnail'}>
                <img src={withBase(item.thumbnail)} alt="" width={item.width} height={item.height} loading={index < 4 ? 'eager' : 'lazy'}/>
              </span>
              <span className="atlas-layout-name"><span>{layoutNumber(index)}</span>{item.title}</span>
              <span className="atlas-canvas-size">{canvasSize(item)}</span>
            </label>
            <div className="atlas-layout-inline">
              <p>{item.summary}</p>
              <LayoutFiles layout={item}/>
            </div>
          </div>)}
        </fieldset>
      </section>

      {resource && <section className="detail-row" aria-labelledby="atlas-resources">
        <h2 id="atlas-resources" className="detail-label">Resources</h2>
        <div className="detail-content">
          {resource.note && <p>{resource.note}</p>}
          <a className="study-link" href={withBase(resource.href)}
            target={resource.newTab ? '_blank' : undefined} rel={resource.newTab ? 'noreferrer' : undefined}>{resource.label} ↗</a>
        </div>
      </section>}
    </div>
  </main>;
}

export function CompositionAtlas({entry, back}) {
  return <CompositionLayoutDetail title={entry.title} summary={entry.summary} layouts={atlasLayouts}
    back={back} backLabel="Product Screen Compositions" download={entry.download}
    resource={{href: entry.study, label: 'Open composition atlas', note: entry.note, newTab: true}}/>;
}
