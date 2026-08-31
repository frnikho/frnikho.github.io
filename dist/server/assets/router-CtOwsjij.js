import { createRootRoute, Outlet, HeadContent, Scripts, createFileRoute, lazyRouteComponent, createRouter as createRouter$1 } from "@tanstack/react-router";
import { jsx, jsxs } from "react/jsx-runtime";
const Route$2 = createRootRoute({
  head: () => ({
    meta: [
      {
        charSet: "utf-8"
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1"
      },
      {
        title: "Nicolas SANS - Portfolio"
      },
      {
        name: "description",
        content: "Nicolas SANS, développeur web fullstack spécialisé dans la création de sites et d'applications web modernes et performants."
      },
      {
        name: "keywords",
        content: "Nicolas SANS, portfolio, développeur web, fullstack, sites web, applications web, développement web"
      },
      {
        name: "author",
        content: "Nicolas SANS"
      },
      {
        property: "og:title",
        content: "Nicolas SANS - Portfolio"
      },
      {
        property: "og:description",
        content: "Nicolas SANS, développeur web fullstack spécialisé dans la création de sites et d'applications web modernes et performants."
      },
      {
        property: "og:type",
        content: "website"
      },
      {
        property: "og:image",
        content: "/android-chrome-192x192.png"
      },
      {
        property: "og:url",
        content: "https://nikho.dev"
      },
      {
        name: "twitter:card",
        content: "summary_large_image"
      },
      {
        name: "twitter:title",
        content: "Nicolas SANS - Portfolio"
      },
      {
        name: "twitter:description",
        content: "Nicolas SANS, développeur web fullstack spécialisé dans la création de sites et d'applications web modernes et performants."
      },
      {
        name: "twitter:image",
        content: "/android-chrome-192x192.png"
      }
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&family=Nunito:ital,wght@0,200..1000;1,200..1000&display=swap" },
      { rel: "icon", href: "/android-chrome-192x192.ico" }
    ]
  }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsx(RootDocument, { children: /* @__PURE__ */ jsx(Outlet, {}) });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxs("html", { lang: "fr", children: [
    /* @__PURE__ */ jsx("head", { children: /* @__PURE__ */ jsx(HeadContent, {}) }),
    /* @__PURE__ */ jsxs("body", { children: [
      children,
      /* @__PURE__ */ jsx(Scripts, {})
    ] })
  ] });
}
const $$splitComponentImporter$1 = () => import("./index-DyPXmoQG.js");
const Route$1 = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("./branding-C3iJbpex.js");
const Route = createFileRoute("/branding")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const IndexRoute = Route$1.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$2
});
const BrandingRoute = Route.update({
  id: "/branding",
  path: "/branding",
  getParentRoute: () => Route$2
});
const rootRouteChildren = {
  IndexRoute,
  BrandingRoute
};
const routeTree = Route$2._addFileChildren(rootRouteChildren)._addFileTypes();
function createRouter() {
  return createRouter$1({
    routeTree,
    scrollRestoration: true,
    notFoundMode: "root",
    // Don't `throw redirect()` here — it throws a Response (307) inside
    // renderToReadableStream during SSR/prerender which React can't render.
    // TanStack Start only handles `redirect()` in loaders/beforeLoad.
    // For a static GH Pages site there is no server 307 anyway.
    defaultNotFoundComponent: () => {
      if (typeof window !== "undefined") {
        window.location.replace("/");
      }
      return null;
    }
  });
}
const getRouter = createRouter;
export {
  createRouter,
  getRouter
};
