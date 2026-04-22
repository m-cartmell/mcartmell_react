import 'lazysizes';

export default function CustomImage({ client, image, slug }) {
  const { src, alt, format, widths, heights, limit_width } = image;

  const largest = (arr) => arr[arr.length - 1];
  const finalFormat = format || 'jpg';
  const width = largest(widths);
  const height = largest(heights);

  const buildSrc = (type, imgWidth) => {
    if (format === 'svg') {
      return `/images/${slug}/${slug}-${src}.svg`;
    }

    return `/images/${slug}/${slug}-${src}-${imgWidth}.${type}`;
  };

  const buildSrcSet = (type) =>
    widths
      .map((imgWidth) => `${buildSrc(type, imgWidth)} ${imgWidth}w`)
      .join(', ');

  const imgProps = {
    className: 'lazyload',
    'data-limit-width': limit_width ? '' : undefined,
    height,
    width,
  };

  const placeholder = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${width} ${height}'/%3E`;

  if (format === 'svg') {
    return (
      <>
        <img
          alt={`${client} ${alt}`}
          data-src={buildSrc('svg')}
          src={placeholder}
          {...imgProps}
        />
        <noscript>
          <img
            src={buildSrc('svg')}
            alt={`${client} ${alt}`}
            width={width}
            height={height}
            data-limit-width={limit_width ? '' : undefined}
          />
        </noscript>
      </>
    );
  }

  return (
    <>
      <picture>
        {!format && (
          <source type="image/webp" data-srcset={buildSrcSet('webp')} />
        )}

        <source
          type={`image/${finalFormat}`}
          data-srcset={buildSrcSet(finalFormat)}
        />

        <img
          alt={`${client} ${alt}`}
          data-sizes="auto"
          data-src={buildSrc(finalFormat, width)}
          src={placeholder}
          {...imgProps}
        />
      </picture>

      <noscript>
        <picture>
          {!format && <source type="image/webp" srcSet={buildSrcSet('webp')} />}

          <source
            type={`image/${finalFormat}`}
            srcSet={buildSrcSet(finalFormat)}
          />

          <img
            src={buildSrc(finalFormat, width)}
            alt={`${client} ${alt}`}
            data-limit-width={limit_width ? '' : undefined}
            {...{ height, width }}
          />
        </picture>
      </noscript>
    </>
  );
}
