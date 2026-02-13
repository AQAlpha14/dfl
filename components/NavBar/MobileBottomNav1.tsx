"use client";
import React from "react";
import { Home, Search, MessageCircle, User, Building2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

/**
 * MobileBottomNav (TypeScript)
 *
 * TailwindCSS mobile bottom navigation with center floating action button
 * similar to the provided design.
 *
 * Requirements:
 * - TailwindCSS configured
 * - lucide-react installed for icons
 *
 * Usage:
 * <MobileBottomNav />
 */

const MobileBottomNav: React.FC = () => {
  const router = useRouter();
  const pathname = usePathname();

  const navItems = [
    { icon: Home, label: "Home", href: "/", id: "home" },
    { icon: Search, label: "Search", href: "/", id: "search" },
    { icon: MessageCircle, label: "Chat", href: "/", id: "chat" },
    { icon: User, label: "Account", href: "/", id: "account" },
  ];

  const isActive = (href: string) => {
    return pathname === href || pathname.includes(href.replace("/", ""));
  };

  const handleNavigation = (href: string) => {
    router.push(href);
  };

  return (
    <div className="fixed bottom-0 left-0 w-full z-50 sm:hidden">
      {/* Background container */}
      <div className="relative w-full">
        {/* Nav bar */}
        <div className="relative bg-white rounded-t-3xl  px-4 pt-3 pb-4">
          {/* Center notch illusion */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-24 h-16 rounded-b-full " />

          {/* Items */}
          <div className="grid grid-cols-5 items-end text-center text-sm">
            <NavItem
              icon={<Home size={24} />}
              label="Home"
              onClick={() => handleNavigation("/")}
              isActive={isActive("/")}
            />
            <NavItem
              icon={<Search size={24} />}
              label="Search"
              onClick={() => handleNavigation("/search")}
              isActive={isActive("/")}
            />
            <div />

            <NavItem
              icon={<MessageCircle size={24} />}
              label="Chat"
              onClick={() => handleNavigation("/chat")}
              isActive={isActive("/")}
            />
            <NavItem
              icon={<User size={24} />}
              label="Account"
              onClick={() => handleNavigation("/signin")}
              isActive={isActive("/signin")}
            />
          </div>
        </div>

        {/* Floating center button */}
        <div className="absolute -top-10 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <button
            type="button"
            onClick={() => handleNavigation("/list-property")}
            className="w-18 h-18 rounded-full bg-linear-to-b from-primaryL to-primary text-white flex items-center justify-center active:scale-95 transition-transform duration-200"
          >
            <Building2 size={28} strokeWidth={1.5} />
          </button>
          <p className="text-xs mt-2 text-center text-primary font-semibold">
            List Property
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileBottomNav;

/* -------------------------------------------------------------------------- */
/*    Nav Item                                    */
/* -------------------------------------------------------------------------- */

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  isActive?: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  icon,
  label,
  onClick,
  isActive,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex flex-col items-center gap-1 transition-colors duration-200 active:scale-95 ${
        isActive ? "text-primary" : "text-gray-600 hover:text-primary"
      }`}
    >
      <div
        className={`transition-colors ${isActive ? "text-primary" : "text-gray-600"}`}
      >
        {icon}
      </div>
      <span
        className={`text-xs font-medium ${isActive ? "text-primary" : "text-gray-600"}`}
      >
        {label}
      </span>
    </button>
  );
};
