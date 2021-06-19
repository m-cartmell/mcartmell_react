import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import Image from './Image';
import ExpandIcon from './Icons/ExpandIcon';

export default function LightBoxImage({
  client,
  id,
  image,
  lightBoxClass,
  iconClass,
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a className={`lightbox ${lightBoxClass}`} onClick={() => setOpen(true)}>
        <Image client={client} id={id} image={image} />
        <ExpandIcon customClass={iconClass} />
      </a>

      {open && (
        <Lightbox
          mainSrc={`/images/${id}/oxfam-creative-concept.jpg`}
          onCloseRequest={() => setOpen(false)}
        />
      )}
    </>
  );
}
