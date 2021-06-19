import 'lazysizes';

export default function Image({ client, id, image }) {
  const { src, alt, format, widths, heights, limit_width, light_box } = image;

  const size = (dms) => (dms.length < 3 ? dms[dms.length - 1] : dms[2]);
  const setSize = format === 'svg' ? '' : `-${size(widths)}`;
  const setFormat = !format ? 'jpg' : format;

  const setImg = () => {
    return (
      <img
        className="lazyload"
        data-sizes="auto"
        src={`data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size(
          widths,
        )} ${size(heights)}"%3E%3C/svg%3E`}
        data-src={`/images/${id}/${id}-${src}${setSize}.${setFormat}`}
        alt={`${client} ${alt}`}
        width={`${size(widths)}`}
        height={`${size(heights)}`}
        limit_width={limit_width ? '' : undefined}
        data-gallery={light_box}
      />
    );
  };

  const srcSet = (id, type) => {
    const line = [];
    widths.forEach((size) => {
      line.push(`/images/${id}/${id}-${src}-${size}.${type} ${size}w`);
    });
    return line.toString();
  };

  const setSource = (type) => {
    return (
      <source
        type={`image/${type}`}
        data-sizes="auto"
        data-srcset={`${srcSet(id, type)}`}
      />
    );
  };

  if (format === 'svg') return setImg();
  else {
    return (
      <picture>
        {!format && setSource('webp')}
        {setSource(!format ? 'jpg' : format)}
        {setImg()}
      </picture>
    );
  }
}
