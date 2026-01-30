"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Breadcrumb = () => {
  const path = usePathname();
  const crumbs = getPathCrumbs(path);

  if (path === "/blog") {
    return null;
  }
  return (
    <div className="lg:pt-10 pt-6">
      <div className="container">
        <nav aria-label="breadcrumb">
          <div className="flex flex-1 sm:items-center items-start">
            {crumbs.map((crumb, index) => (
              <span key={index} className="flex sm:items-center items-start">
                {index !== 0 && <span className="mx-1">{"/"}</span>}
                {crumb.href ? (
                  <Link
                    href={crumb.href}
                    className="px-4 py-1 bg-[#F5F5F5] rounded-full text-xs"
                  >
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="px-4 py-1 bg-[#E0E0E0] rounded-full text-xs">
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

const getPathCrumbs = (path) => {
  const crumbs = [];
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

const capitalize = (s) =>
  s.charAt(0).toUpperCase() + s.slice(1).replace(/-/g, " ");

export default Breadcrumb;
