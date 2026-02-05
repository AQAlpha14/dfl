import { ReactNode } from "react";
// import BottomStickyCall from "@/components/BottomStickyCall";
import Footer from "@/components/Footer";
import { StickyNavbar } from "@/components/StickyNavbar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <StickyNavbar />
      {children}
      <Footer />
      {/* <BottomStickyCall /> */}
    </div>
  );
}
