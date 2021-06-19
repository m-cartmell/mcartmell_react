import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Image from './Image';

// Pages w light_box images – SS / Refali / PJ / JJ / GBC / CMJ
export default function LightBoxImage({ images, client, id, image }) {
  const [open, setOpen] = useState(false);
  const imageIndex = () => images.findIndex((item) => item.src === image.src);
  const [index, setIndex] = useState(imageIndex());
  const nextIndex = (index + 1) % images.length;
  const prevIndex = (index + images.length - 1) % images.length;
  const format = (index) => (images[index].format ? 'gif' : 'jpg');

  return (
    <>
      <a className="lightbox" onClick={() => setOpen(true)}>
        <Image client={client} id={id} image={image} />
      </a>

      {open && (
        <Lightbox
          mainSrc={`/images/${id}/${id}-${images[index].src}-${
            images[index].widths[2]
          }.${format(index)}`}
          prevSrc={`/images/${id}/${id}-${images[prevIndex].src}-${
            images[prevIndex].widths[2]
          }.${format(prevIndex)}`}
          nextSrc={`/images/${id}/${id}-${images[nextIndex].src}-${
            images[nextIndex].widths[2]
          }.${format(nextIndex)}`}
          onCloseRequest={() => setOpen(false)}
          onMovePrevRequest={() => setIndex(prevIndex)}
          onMoveNextRequest={() => setIndex(nextIndex)}
        />
      )}
    </>
  );
}
