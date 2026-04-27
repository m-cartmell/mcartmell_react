import { useRef } from 'react';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import ContactButtons from './Assembly/ContactButtons';
import useRevealAnimations from '../hooks/useRevealAnimations';

export default function Layout({ children, revealKey }) {
  const animRef = useRef();

  useRevealAnimations(animRef, revealKey);

  return (
    <>
      <Header />
      <main ref={animRef}>{children}</main>
      <div id="modal"></div>
      <ContactButtons />
      <Footer />
    </>
  );
}
