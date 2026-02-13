import { ReactNode } from "react";
// import BottomStickyCall from "@/components/BottomStickyCall";
import Footer from "@/components/Footer";
import { StickyNavbar } from "@/components/NavBar/StickyNavbar";
import MobileBottomNav from "@/components/NavBar/MobileBottomNav";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div>
      <StickyNavbar />
      {children}
      <Footer />
      <MobileBottomNav />
    </div>
  );
}
