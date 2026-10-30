import { profile, intro } from '../data/profile.js'

export default function Portrait({ onLoad }) {
  // a cached image may finish before React attaches onLoad
  const checkCached = img => { if (img?.complete) onLoad() }

  return (
    <figure className="portrait">
      {/* frame matches the photo's box, so the caption stays on the jacket at any size */}
      <div className="photo" data-depth="10">
        <img
          ref={checkCached}
          className="person"
          src={profile.portrait}
          alt="Mr. Babji Neelam, Founder & CEO of Technical Hub"
          onLoad={onLoad}
          onError={onLoad}
        />
        <figcaption className="photo-text">
          <span className="q" aria-hidden="true">“</span>
          <p>{intro.text}</p>
        </figcaption>
      </div>
    </figure>
  )
}
