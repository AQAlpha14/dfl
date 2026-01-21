import { NextResponse } from "next/server";

const PUBLIC_FILE = /\.(.*)$/;
const locales = ["en", "ar"];

export function proxy(request) {
  const { pathname, search } = request.nextUrl;

  // Skip static files and Next.js internals
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-url", request.nextUrl.pathname);

  const pathnameSegments = pathname.split("/");
  const firstSegment = pathnameSegments[1];

  // If path already has locale, proceed and set custom header
  if (locales.includes(firstSegment)) {
    return NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });
  }

  // Detect preferred language
  const acceptLang = request.headers.get("accept-language") || "";
  const preferredLang = acceptLang.startsWith("ar") ? "ar" : "en";

  // Redirect with locale prefix
  const url = request.nextUrl.clone();
  url.pathname = `/${preferredLang}${pathname === "/" ? "" : pathname}`;
  url.search = search;

  return NextResponse.redirect(url);
}
