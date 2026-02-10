"use client";
import LeftSideBar from "@/components/LeftSideBar";
interface Props {
  children: React.ReactNode;
}
export default function AuthLayout({ children }: Props) {
  return (
    <section className="h-screen bg-primaryLight bg-[url('/icons/wm_03.svg')] bg-no-repeat bg-top-right">
      <div className="flex gap-8 h-full">
        <div className="hidden lg:block bg-primary">
          <LeftSideBar />
        </div>
        <div className="flex justify-center items-center w-full sm:px-6 px-4">
          <div className="max-w-sm w-full">{children}</div>
        </div>
      </div>
    </section>
  );
}
