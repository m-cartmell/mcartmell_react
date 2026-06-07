import { useRef, ReactNode } from 'react';
import Header from '@/Components/Layout/Header';
import Footer from '@/Components/Layout/Footer';
import ContactButtons from '@/Components/Assembly/ContactButtons';
import useRevealAnimations from '@/hooks/useRevealAnimations';

interface LayoutProps {
  children: ReactNode;
  revealKey: string;
}

export default function Layout({ children, revealKey }: LayoutProps) {
  const animRef = useRef<HTMLDivElement | null>(null);

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
