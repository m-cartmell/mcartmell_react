import { useEffect } from 'react';
import Header from './Layout/Header';
import Footer from './Layout/Footer';
import useRevealItems from '../hooks/useRevealItems';

export default function Layout({ children }) {
  const revealItems = useRevealItems();

  useEffect(() => {
    requestAnimationFrame(() => {
      revealItems();
    });
  }, [children, revealItems]);

  return (
    <>
      <Header />
      <main>{children}</main>
      <div id="modal"></div>
      <Footer />
    </>
  );
}
