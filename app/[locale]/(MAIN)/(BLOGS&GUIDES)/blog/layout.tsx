import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}
export default async function RootLayout({ children }: LayoutProps) {
  return (
    <>
      {/* <Breadcrumb  /> */}
      {children}
    </>
  );
}
