"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { JSX } from "react/jsx-runtime";

interface Crumb {
  label: string;
  href: string | null;
}

const Breadcrumb = (): JSX.Element | null => {
  const path = usePathname();
  const crumbs = getPathCrumbs(path);

  if (path === "/listing" || path === "/blog") {
    return null;
  }

  return (
    <div className="pb-4">
      <div className="container">
        <nav aria-label="breadcrumb">
          <div className="flex flex-1 sm:items-center items-start">
            {crumbs.map((crumb, index) => (
              <span key={index} className="flex sm:items-center items-start">
                {index !== 0 && <span className="mx-1">/</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="text-xs"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-xs">
                    {crumb.label}
                  </span>
                )}
              </span>
            ))}
          </div>
        </nav>
      </div>
    </div>
  );
};

const getPathCrumbs = (path: string): Crumb[] => {
  const crumbs: Crumb[] = [];

  const pathParts = path.split("/").filter((part) => part !== "");

  pathParts.forEach((part, index) => {
    const href = `/${pathParts.slice(0, index + 1).join("/")}`;

    crumbs.push({
      label: capitalize(part),
      href: index < pathParts.length - 1 ? href : null,
    });
  });

  return crumbs;
};

const capitalize = (s: string): string =>
  s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");

export default Breadcrumb;
