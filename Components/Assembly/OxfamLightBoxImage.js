import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import CustomImage from './CustomImage';
import ExpandIcon from './Icons/ExpandIcon';
import classNames from 'classnames';

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
      <a
        className={classNames('lightbox', lightBoxClass)}
        onClick={() => setOpen(true)}
      >
        <CustomImage client={client} id={id} image={image} />
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
