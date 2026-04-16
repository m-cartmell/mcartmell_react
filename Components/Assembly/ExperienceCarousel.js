import { useEffect, useState } from 'react';
import styles from '../../scss/assembly/Experience.module.scss';
import skillStyles from '../../scss/assembly/SkillTags.module.scss';
import classNames from 'classnames';
import { ChevronLeftIcon, ChevronRightIcon } from './Icons/ChevronIcons';
import useEmblaCarousel from 'embla-carousel-react';

const ExperienceCarousel = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false });
  const [index, setIndex] = useState(0);

  const goPrev = () => emblaApi?.scrollPrev();
  const goNext = () => emblaApi?.scrollNext();

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => setIndex(emblaApi.selectedScrollSnap());

    onSelect();
    emblaApi.on('select', onSelect);

    return () => emblaApi.off('select', onSelect);
  }, [emblaApi]);

  return (
    <div className={styles.container}>
      <h2 className={classNames(styles.h2, 'reveal-item')}>Experience</h2>

      <div
        className={classNames('reveal-item', styles['embla__viewport'])}
        ref={emblaRef}
      >
        <div className={styles['embla__container']}>
          {experience.map(
            ({ role, employer, start, end, summary, skills }, i) => (
              <div className={styles['embla__slide']} key={`experience-${i}`}>
                <p className={styles.heading}>
                  <span className={styles.item}>{role}</span>
                  {employer && (
                    <>
                      <span aria-hidden="true">•</span>
                      <span className={styles.item}>{employer}</span>
                    </>
                  )}
                  <span aria-hidden="true">•</span>
                  <span className={styles.item}>
                    {start} – {end}
                  </span>
                </p>

                <p>{summary}</p>

                <div
                  className={classNames(skillStyles.tags, styles['skill-tags'])}
                >
                  {skills.map((s) => (
                    <span key={s} className={skillStyles.tag}>
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      <div className={classNames(styles.nav, 'reveal-item')}>
        <button
          className={classNames(
            'plain',
            styles['nav-button'],
            styles['embla__prev'],
          )}
          disabled={index === 0}
          onClick={goPrev}
          type="button"
          aria-label="Previous experience"
        >
          <ChevronLeftIcon />
        </button>

        <div className={styles.dots}>
          {experience.map((_, i) => (
            <button
              key={`dot-${i}`}
              className={classNames('plain', styles.dot, {
                [styles['dot-active']]: i === index,
              })}
              onClick={() => emblaApi?.scrollTo(i)}
              type="button"
              aria-label={`Go to experience ${i + 1}`}
            />
          ))}
        </div>

        <button
          className={classNames(
            'plain',
            styles['nav-button'],
            styles['embla__next'],
          )}
          disabled={index === experience.length - 1}
          onClick={goNext}
          type="button"
          aria-label="Next experience"
        >
          <ChevronRightIcon />
        </button>
      </div>
    </div>
  );
};

const experience = [
  {
    role: 'Software Developer',
    employer: 'Escape Fitness',
    start: 'May 2022',
    end: 'Present',
    summary:
      'Led development of a global MERN-based platform and React Native app used across 300+ locations—improving performance, delivering new features, and building end-to-end solutions from design through to deployment and support.',
    skills: [
      'JavaScript',
      'React',
      'React Native',
      'Node.js',
      'GraphQL',
      'MongoDB',
      'AWS',
      'CI/CD',
    ],
  },
  {
    role: 'Freelance Designer & Developer',
    start: 'Jun 2021',
    end: 'Jun 2022',
    summary:
      'Delivered freelance work across design and email marketing, alongside rebuilding the MARS fitness app for Escape Fitness using React Native for Android.',
    skills: [
      'React Native',
      'Next.js',
      'Node.js',
      'Email Marketing',
      'HTML & CSS',
    ],
  },
  {
    role: 'Career Break',
    start: 'Jan 2018',
    end: 'Jun 2021',
    summary:
      'Travelled extensively before transitioning into software development, self-learning JavaScript, Node, and React, and building personal projects to develop practical skills.',
    skills: ['JavaScript', 'React', 'Node.js'],
  },
  {
    role: 'Digital Designer',
    employer: 'Facets Creative',
    start: 'Apr 2016',
    end: 'Dec 2017',
    summary:
      'Delivered B2C digital design across email, social media, and web, leading the design and launch of WordPress websites and contributing to Magento-based development projects.',
    skills: [
      'WordPress',
      'Magento',
      'HTML & CSS',
      'Email Design',
      'Adobe Creative Cloud',
    ],
  },
  {
    role: 'Graphic Designer',
    employer: 'MicroGraphix',
    start: 'Nov 2012',
    end: 'Apr 2016',
    summary:
      'Delivered a wide range of B2B design projects across print and digital, including branding, advertising, and web, while leading email marketing campaigns and developing early front-end and web development skills.',
    skills: [
      'Branding',
      'Print Design',
      'Email Marketing',
      'HTML & CSS',
      'Adobe Creative Cloud',
    ],
  },
];

export default ExperienceCarousel;
