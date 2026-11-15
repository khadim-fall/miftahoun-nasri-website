// <define:import.meta.env>
var define_import_meta_env_default = {};

// _smoke.tsx
import { renderToString } from "react-dom/server";
import { Router } from "wouter";

// src/App.tsx
import { useEffect as useEffect6 } from "react";
import { Route, Switch, useLocation as useLocation2 } from "wouter";

// src/hooks/use-toast.ts
import * as React from "react";
var TOAST_LIMIT = 1;
var TOAST_REMOVE_DELAY = 1e6;
var count = 0;
function genId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER;
  return count.toString();
}
var toastTimeouts = /* @__PURE__ */ new Map();
var addToRemoveQueue = (toastId) => {
  if (toastTimeouts.has(toastId)) {
    return;
  }
  const timeout = setTimeout(() => {
    toastTimeouts.delete(toastId);
    dispatch({
      type: "REMOVE_TOAST",
      toastId
    });
  }, TOAST_REMOVE_DELAY);
  toastTimeouts.set(toastId, timeout);
};
var reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TOAST":
      return {
        ...state,
        toasts: [action.toast, ...state.toasts].slice(0, TOAST_LIMIT)
      };
    case "UPDATE_TOAST":
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === action.toast.id ? { ...t, ...action.toast } : t
        )
      };
    case "DISMISS_TOAST": {
      const { toastId } = action;
      if (toastId) {
        addToRemoveQueue(toastId);
      } else {
        state.toasts.forEach((toast2) => {
          addToRemoveQueue(toast2.id);
        });
      }
      return {
        ...state,
        toasts: state.toasts.map(
          (t) => t.id === toastId || toastId === void 0 ? {
            ...t,
            open: false
          } : t
        )
      };
    }
    case "REMOVE_TOAST":
      if (action.toastId === void 0) {
        return {
          ...state,
          toasts: []
        };
      }
      return {
        ...state,
        toasts: state.toasts.filter((t) => t.id !== action.toastId)
      };
  }
};
var listeners = [];
var memoryState = { toasts: [] };
function dispatch(action) {
  memoryState = reducer(memoryState, action);
  listeners.forEach((listener) => {
    listener(memoryState);
  });
}
function toast({ ...props }) {
  const id = genId();
  const update = (props2) => dispatch({
    type: "UPDATE_TOAST",
    toast: { ...props2, id }
  });
  const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id });
  dispatch({
    type: "ADD_TOAST",
    toast: {
      ...props,
      id,
      open: true,
      onOpenChange: (open) => {
        if (!open) dismiss();
      }
    }
  });
  return {
    id,
    dismiss,
    update
  };
}
function useToast() {
  const [state, setState] = React.useState(memoryState);
  React.useEffect(() => {
    listeners.push(setState);
    return () => {
      const index = listeners.indexOf(setState);
      if (index > -1) {
        listeners.splice(index, 1);
      }
    };
  }, [state]);
  return {
    ...state,
    toast,
    dismiss: (toastId) => dispatch({ type: "DISMISS_TOAST", toastId })
  };
}

// src/components/ui/toast.tsx
import * as React2 from "react";
import * as ToastPrimitives from "@radix-ui/react-toast";
import { cva } from "class-variance-authority";
import { X } from "lucide-react";

// src/lib/utils.ts
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
function cn(...inputs) {
  return twMerge(clsx(inputs));
}

// src/components/ui/toast.tsx
import { jsx } from "react/jsx-runtime";
var ToastProvider = ToastPrimitives.Provider;
var ToastViewport = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Viewport,
  {
    ref,
    className: cn(
      "fixed top-0 z-[100] flex max-h-screen w-full flex-col-reverse p-4 sm:bottom-0 sm:right-0 sm:top-auto sm:flex-col md:max-w-[420px]",
      className
    ),
    ...props
  }
));
ToastViewport.displayName = ToastPrimitives.Viewport.displayName;
var toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-center justify-between space-x-4 overflow-hidden rounded-md border p-6 pr-8 shadow-lg transition-all data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        default: "border bg-background text-foreground",
        destructive: "destructive group border-destructive bg-destructive text-destructive-foreground"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);
var Toast = React2.forwardRef(({ className, variant, ...props }, ref) => {
  return /* @__PURE__ */ jsx(
    ToastPrimitives.Root,
    {
      ref,
      className: cn(toastVariants({ variant }), className),
      ...props
    }
  );
});
Toast.displayName = ToastPrimitives.Root.displayName;
var ToastAction = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Action,
  {
    ref,
    className: cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border bg-transparent px-3 text-sm font-medium ring-offset-background transition-colors hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 group-[.destructive]:border-muted/40 group-[.destructive]:hover:border-destructive/30 group-[.destructive]:hover:bg-destructive group-[.destructive]:hover:text-destructive-foreground group-[.destructive]:focus:ring-destructive",
      className
    ),
    ...props
  }
));
ToastAction.displayName = ToastPrimitives.Action.displayName;
var ToastClose = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Close,
  {
    ref,
    className: cn(
      "absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600",
      className
    ),
    "toast-close": "",
    ...props,
    children: /* @__PURE__ */ jsx(X, { className: "h-4 w-4" })
  }
));
ToastClose.displayName = ToastPrimitives.Close.displayName;
var ToastTitle = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Title,
  {
    ref,
    className: cn("text-sm font-semibold", className),
    ...props
  }
));
ToastTitle.displayName = ToastPrimitives.Title.displayName;
var ToastDescription = React2.forwardRef(({ className, ...props }, ref) => /* @__PURE__ */ jsx(
  ToastPrimitives.Description,
  {
    ref,
    className: cn("text-sm opacity-90", className),
    ...props
  }
));
ToastDescription.displayName = ToastPrimitives.Description.displayName;

// src/components/ui/toaster.tsx
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
function Toaster() {
  const { toasts } = useToast();
  return /* @__PURE__ */ jsxs(ToastProvider, { children: [
    toasts.map(function({ id, title, description, action, ...props }) {
      return /* @__PURE__ */ jsxs(Toast, { ...props, children: [
        /* @__PURE__ */ jsxs("div", { className: "grid gap-1", children: [
          title && /* @__PURE__ */ jsx2(ToastTitle, { children: title }),
          description && /* @__PURE__ */ jsx2(ToastDescription, { children: description })
        ] }),
        action,
        /* @__PURE__ */ jsx2(ToastClose, {})
      ] }, id);
    }),
    /* @__PURE__ */ jsx2(ToastViewport, {})
  ] });
}

// src/pages/not-found.tsx
import { AlertCircle } from "lucide-react";

// src/components/LinkButton.tsx
import { Link } from "wouter";
import { ArrowRight } from "lucide-react";
import { jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var variants = {
  primary: "bg-primary text-white hover:bg-primary-light",
  gold: "bg-gold text-dark hover:bg-gold-light",
  white: "bg-white text-primary hover:bg-gray-100"
};
var LinkButton = ({ href, children, variant = "primary", arrow = false, className }) => /* @__PURE__ */ jsxs2(
  Link,
  {
    href,
    className: cn(
      "inline-flex items-center justify-center rounded-md px-6 py-3 font-medium transition-colors duration-300",
      variants[variant],
      className
    ),
    children: [
      /* @__PURE__ */ jsx3("span", { children }),
      arrow && /* @__PURE__ */ jsx3(ArrowRight, { className: "ml-2 h-5 w-5", "aria-hidden": "true" })
    ]
  }
);
var LinkButton_default = LinkButton;

// src/hooks/usePageMeta.ts
import { useEffect as useEffect2 } from "react";

// src/config/site.ts
var SITE = {
  name: "Dahira Miftahoun Nasri",
  shortName: "Miftahoun Nasri",
  locality: "Guediawaye-Notaire",
  tagline: "Une communaut\xE9 spirituelle d\xE9di\xE9e \xE0 l'enseignement et \xE0 la pratique des valeurs Mourides \xE0 Guediawaye-Notaire",
  description: "Dahira Miftahoun Nasri de Guediawaye-Notaire - Une communaut\xE9 spirituelle d\xE9di\xE9e \xE0 l'enseignement et \xE0 la pratique des valeurs Mourides",
  address: "Dahira Miftahoun Nasri, Quartier Notaire, Guediawaye, Dakar, S\xE9n\xE9gal",
  addressShort: "Quartier Notaire, Guediawaye, Dakar, S\xE9n\xE9gal",
  phones: [
    { display: "+221 77 762 18 06", tel: "+221777621806" },
    { display: "+221 33 800 00 00", tel: "+221338000000" }
  ],
  /** Numéro WhatsApp au format international sans "+" ni espaces. Laissez vide ("") pour masquer le bouton. */
  whatsapp: "221777621806",
  emails: ["sitedahira@gmail.com", "fall.khadim2803@gmail.com"],
  hours: [
    "Vendredi : 20:30 - 00:00",
    "Dimanche : 12:00 - 14:00 | 17:00 - 00:00"
  ],
  /**
   * Réseaux sociaux : renseignez les vraies adresses (https://...).
   * Une icône n'apparaît que si son lien est rempli (avant, tous les liens pointaient vers "#").
   */
  social: {
    facebook: "",
    twitter: "",
    instagram: "",
    youtube: ""
  },
  mapEmbedUrl: "https://www.google.com/maps/embed?pb=!4v1748543030523!6m8!1m7!1s6CYDT6qZPwPFkz9dfcBT4A!2m2!1d14.7742005239495!2d-17.38952665254646!3f19.8893690421542!4f-0.7589820127834912!5f2.071032434232568",
  /**
   * Calcul automatique des horaires de prière (API publique Aladhan).
   * method 3 = Ligue islamique mondiale. Comparez avec les horaires de votre mosquée de référence
   * et changez la méthode si besoin : https://aladhan.com/calculation-methods
   */
  prayer: {
    city: "Dakar",
    country: "Senegal",
    method: 3,
    timeZone: "Africa/Dakar"
  }
};

// src/hooks/usePageMeta.ts
function usePageMeta(title, description = SITE.description) {
  useEffect2(() => {
    document.title = title ? `${title} - ${SITE.name}` : `${SITE.name} - ${SITE.locality}`;
    document.querySelector('meta[name="description"]')?.setAttribute("content", description);
  }, [title, description]);
}

// src/pages/not-found.tsx
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
function NotFound() {
  usePageMeta("Page introuvable");
  return /* @__PURE__ */ jsxs3("div", { className: "container mx-auto px-4 py-24 text-center", children: [
    /* @__PURE__ */ jsx4(AlertCircle, { className: "mx-auto mb-4 h-12 w-12 text-primary", "aria-hidden": "true" }),
    /* @__PURE__ */ jsx4("h1", { className: "mb-3 font-lora text-3xl font-bold text-primary", children: "Page introuvable" }),
    /* @__PURE__ */ jsx4("p", { className: "mb-8 text-gray-600", children: "La page que vous cherchez n'existe pas ou a \xE9t\xE9 d\xE9plac\xE9e." }),
    /* @__PURE__ */ jsx4(LinkButton_default, { href: "/", children: "Retour \xE0 l'accueil" })
  ] });
}

// src/components/Header.tsx
import { useEffect as useEffect3, useState as useState2 } from "react";
import { Link as Link2, useLocation } from "wouter";
import { Menu, X as X2 } from "lucide-react";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
var navLinks = [
  { path: "/", label: "Accueil" },
  { path: "/a-propos", label: "\xC0 propos" },
  { path: "/activites", label: "Activit\xE9s" },
  { path: "/evenements", label: "\xC9v\xE9nements" },
  { path: "/galerie", label: "Galerie" },
  { path: "/contact", label: "Contact" }
];
var Header = () => {
  const [open, setOpen] = useState2(false);
  const [scrolled, setScrolled] = useState2(false);
  const [location] = useLocation();
  useEffect3(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect3(() => setOpen(false), [location]);
  useEffect3(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const linkClass2 = (path) => cn(
    "font-medium transition-colors",
    location === path ? "text-gold" : "text-white hover:text-gold-light"
  );
  return /* @__PURE__ */ jsx5("header", { className: cn("sticky top-0 z-50 bg-primary", scrolled && "shadow-md"), children: /* @__PURE__ */ jsxs4("div", { className: "container mx-auto px-4 py-4 md:px-6", children: [
    /* @__PURE__ */ jsxs4("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxs4(Link2, { href: "/", className: "font-lora text-2xl font-bold text-white md:text-3xl", children: [
        /* @__PURE__ */ jsx5("span", { className: "text-gold", children: "Dahira Miftahoun" }),
        " Nasri"
      ] }),
      /* @__PURE__ */ jsx5("nav", { "aria-label": "Navigation principale", className: "hidden space-x-8 md:flex", children: navLinks.map((link) => /* @__PURE__ */ jsx5(
        Link2,
        {
          href: link.path,
          className: linkClass2(link.path),
          "aria-current": location === link.path ? "page" : void 0,
          children: link.label
        },
        link.path
      )) }),
      /* @__PURE__ */ jsx5(
        "button",
        {
          type: "button",
          onClick: () => setOpen((v) => !v),
          className: "p-2 text-gold hover:text-gold-light md:hidden",
          "aria-label": open ? "Fermer le menu" : "Ouvrir le menu",
          "aria-expanded": open,
          "aria-controls": "mobile-menu",
          children: open ? /* @__PURE__ */ jsx5(X2, { size: 24, "aria-hidden": "true" }) : /* @__PURE__ */ jsx5(Menu, { size: 24, "aria-hidden": "true" })
        }
      )
    ] }),
    open && /* @__PURE__ */ jsx5("nav", { id: "mobile-menu", "aria-label": "Navigation mobile", className: "mt-4 pb-2 md:hidden", children: /* @__PURE__ */ jsx5("ul", { className: "flex flex-col", children: navLinks.map((link, i) => /* @__PURE__ */ jsx5(
      "li",
      {
        className: i < navLinks.length - 1 ? "border-b border-white/20" : "",
        children: /* @__PURE__ */ jsx5(
          Link2,
          {
            href: link.path,
            className: cn("block py-3", linkClass2(link.path)),
            "aria-current": location === link.path ? "page" : void 0,
            children: link.label
          }
        )
      },
      link.path
    )) }) })
  ] }) });
};
var Header_default = Header;

// src/components/Footer.tsx
import { Link as Link3 } from "wouter";
import { Mail, MapPin, Phone } from "lucide-react";

// src/lib/events.ts
function todayKey(now = /* @__PURE__ */ new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: SITE.prayer.timeZone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(now);
}
var capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
function formatDateParts(iso) {
  const d = /* @__PURE__ */ new Date(`${iso}T00:00:00Z`);
  const month = new Intl.DateTimeFormat("fr-FR", { month: "long", timeZone: "UTC" }).format(d);
  return {
    day: String(d.getUTCDate()),
    month: capitalize(month),
    year: String(d.getUTCFullYear())
  };
}
function formatLongDate(iso) {
  const { day, month, year } = formatDateParts(iso);
  return `${day} ${month.toLowerCase()} ${year}`;
}
function splitEvents(events2, today = todayKey()) {
  const upcoming = events2.filter((e) => e.date >= today).sort((a, b) => a.date.localeCompare(b.date));
  const past = events2.filter((e) => e.date < today).sort((a, b) => b.date.localeCompare(a.date));
  return { upcoming, past };
}

// src/lib/prayer.ts
var PRAYER_ORDER = ["fajr", "dhuhr", "asr", "maghrib", "isha"];
var PRAYER_NAMES = {
  fajr: { ar: "\u0627\u0644\u0641\u062C\u0631", fr: "Fajr" },
  dhuhr: { ar: "\u0627\u0644\u0638\u0647\u0631", fr: "Dhuhr" },
  asr: { ar: "\u0627\u0644\u0639\u0635\u0631", fr: "Asr" },
  maghrib: { ar: "\u0627\u0644\u0645\u063A\u0631\u0628", fr: "Maghrib" },
  isha: { ar: "\u0627\u0644\u0639\u0634\u0627\u0621", fr: "Isha" }
};
var FALLBACK_PRAYER_TIMES = {
  fajr: "05:30",
  dhuhr: "13:15",
  asr: "16:30",
  maghrib: "19:05",
  isha: "20:30"
};
var API_NAMES = {
  fajr: "Fajr",
  dhuhr: "Dhuhr",
  asr: "Asr",
  maghrib: "Maghrib",
  isha: "Isha"
};
function normalizeTime(value) {
  if (typeof value !== "string") return null;
  const m = /(\d{1,2}):(\d{2})/.exec(value);
  if (!m) return null;
  const h = Number(m[1]);
  const min = Number(m[2]);
  if (h > 23 || min > 59) return null;
  return `${String(h).padStart(2, "0")}:${m[2]}`;
}
function parseAladhanResponse(json) {
  const timings = json?.data?.timings;
  if (!timings || typeof timings !== "object") return null;
  const out = {};
  for (const key of PRAYER_ORDER) {
    const t = normalizeTime(timings[API_NAMES[key]]);
    if (!t) return null;
    out[key] = t;
  }
  return out;
}
function isPrayerTimes(v) {
  return !!v && typeof v === "object" && PRAYER_ORDER.every((k) => typeof v[k] === "string");
}
var CACHE_KEY = "dahira:prayer-times:v1";
function peekCachedPrayerTimes(now = /* @__PURE__ */ new Date()) {
  try {
    const raw = localStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    return entry.date === todayKey(now) && isPrayerTimes(entry.times) ? entry.times : null;
  } catch {
    return null;
  }
}
function writeCache(date, times) {
  try {
    localStorage.setItem(CACHE_KEY, JSON.stringify({ date, times }));
  } catch {
  }
}
async function fetchFromApi(date) {
  const { city, country, method } = SITE.prayer;
  const [y, m, d] = date.split("-");
  const url = `https://api.aladhan.com/v1/timingsByCity/${d}-${m}-${y}?city=${encodeURIComponent(city)}&country=${encodeURIComponent(country)}&method=${method}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 8e3);
  try {
    const res = await fetch(url, { signal: controller.signal });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const times = parseAladhanResponse(await res.json());
    if (!times) throw new Error("R\xE9ponse inattendue");
    return times;
  } finally {
    clearTimeout(timer);
  }
}
var inflight = null;
function loadPrayerTimes(now = /* @__PURE__ */ new Date()) {
  const date = todayKey(now);
  const cached = peekCachedPrayerTimes(now);
  if (cached) return Promise.resolve(cached);
  if (inflight?.date === date) return inflight.promise;
  const promise = fetchFromApi(date).then((times) => {
    writeCache(date, times);
    return times;
  }).finally(() => {
    if (inflight?.promise === promise) inflight = null;
  });
  inflight = { date, promise };
  return promise;
}
function minutesInDakar(now) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: SITE.prayer.timeZone,
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23"
  }).formatToParts(now);
  const h = Number(parts.find((p) => p.type === "hour")?.value);
  const m = Number(parts.find((p) => p.type === "minute")?.value);
  return h * 60 + m;
}
function getNextPrayer(times, now = /* @__PURE__ */ new Date()) {
  const current = minutesInDakar(now);
  for (const key of PRAYER_ORDER) {
    const [h, m] = times[key].split(":").map(Number);
    if (h * 60 + m > current) return key;
  }
  return "fajr";
}

// src/hooks/usePrayerTimes.ts
import { useEffect as useEffect4, useState as useState3 } from "react";
function usePrayerTimes() {
  const [state, setState] = useState3(() => {
    const cached = peekCachedPrayerTimes();
    return cached ? { times: cached, status: "live" } : { times: null, status: "loading" };
  });
  const [now, setNow] = useState3(() => /* @__PURE__ */ new Date());
  useEffect4(() => {
    let cancelled = false;
    loadPrayerTimes().then((times) => !cancelled && setState({ times, status: "live" })).catch(() => !cancelled && setState({ times: FALLBACK_PRAYER_TIMES, status: "fallback" }));
    return () => {
      cancelled = true;
    };
  }, []);
  useEffect4(() => {
    const id = setInterval(() => setNow(/* @__PURE__ */ new Date()), 6e4);
    return () => clearInterval(id);
  }, []);
  return {
    ...state,
    next: state.times ? getNextPrayer(state.times, now) : null
  };
}

// src/components/SocialLinks.tsx
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { jsx as jsx6 } from "react/jsx-runtime";
var NETWORKS = [
  { key: "facebook", label: "Facebook", Icon: Facebook },
  { key: "twitter", label: "Twitter", Icon: Twitter },
  { key: "instagram", label: "Instagram", Icon: Instagram },
  { key: "youtube", label: "YouTube", Icon: Youtube }
];
var SocialLinks = ({ className, linkClassName }) => {
  const items = NETWORKS.filter((n) => SITE.social[n.key]);
  if (items.length === 0) return null;
  return /* @__PURE__ */ jsx6("ul", { className: cn("flex space-x-4", className), children: items.map(({ key, label, Icon }) => /* @__PURE__ */ jsx6("li", { children: /* @__PURE__ */ jsx6(
    "a",
    {
      href: SITE.social[key],
      target: "_blank",
      rel: "noopener noreferrer",
      "aria-label": `${label} (nouvelle fen\xEAtre)`,
      className: linkClassName,
      children: /* @__PURE__ */ jsx6(Icon, { size: 18, "aria-hidden": "true" })
    }
  ) }, key)) });
};
var SocialLinks_default = SocialLinks;

// src/components/Footer.tsx
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var quickLinks = [
  { path: "/", label: "Accueil" },
  { path: "/a-propos", label: "\xC0 propos" },
  { path: "/activites", label: "Activit\xE9s" },
  { path: "/evenements", label: "\xC9v\xE9nements" },
  { path: "/galerie", label: "Galerie" },
  { path: "/contact", label: "Contact" }
];
var Footer = () => {
  const { times, status } = usePrayerTimes();
  return /* @__PURE__ */ jsx7("footer", { className: "bg-dark pb-8 pt-16 text-white", children: /* @__PURE__ */ jsxs5("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsxs5("div", { className: "mb-12 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4", children: [
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx7("h3", { className: "mb-6 font-lora text-2xl font-bold", children: SITE.shortName }),
        /* @__PURE__ */ jsxs5("p", { className: "mb-6 text-gray-400", children: [
          SITE.tagline,
          "."
        ] }),
        /* @__PURE__ */ jsx7(SocialLinks_default, { linkClassName: "text-white transition-colors duration-300 hover:text-gold" })
      ] }),
      /* @__PURE__ */ jsxs5("nav", { "aria-label": "Liens rapides", children: [
        /* @__PURE__ */ jsx7("h3", { className: "mb-6 font-lora text-xl font-bold", children: "Liens Rapides" }),
        /* @__PURE__ */ jsx7("ul", { className: "space-y-3", children: quickLinks.map((l) => /* @__PURE__ */ jsx7("li", { children: /* @__PURE__ */ jsx7(
          Link3,
          {
            href: l.path,
            className: "text-gray-400 transition-colors duration-300 hover:text-gold",
            children: l.label
          }
        ) }, l.path)) })
      ] }),
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx7("h3", { className: "mb-6 font-lora text-xl font-bold", children: "Horaires de Pri\xE8re" }),
        /* @__PURE__ */ jsx7("ul", { className: "space-y-3", children: PRAYER_ORDER.map((key) => /* @__PURE__ */ jsxs5("li", { className: "flex justify-between", children: [
          /* @__PURE__ */ jsx7("span", { lang: "ar", dir: "rtl", className: "text-gray-400", children: PRAYER_NAMES[key].ar }),
          /* @__PURE__ */ jsx7("span", { className: "text-gold", children: times ? times[key] : "--:--" })
        ] }, key)) }),
        status === "fallback" && /* @__PURE__ */ jsx7("p", { className: "mt-3 text-xs text-gray-400", children: "Horaires indicatifs (calcul en ligne indisponible)." })
      ] }),
      /* @__PURE__ */ jsxs5("div", { children: [
        /* @__PURE__ */ jsx7("h3", { className: "mb-6 font-lora text-xl font-bold", children: "Contact" }),
        /* @__PURE__ */ jsxs5("ul", { className: "space-y-3", children: [
          /* @__PURE__ */ jsxs5("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx7(MapPin, { className: "mr-3 mt-1 shrink-0 text-gold", size: 18, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx7("span", { className: "text-gray-400", children: SITE.addressShort })
          ] }),
          /* @__PURE__ */ jsxs5("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx7(Phone, { className: "mr-3 mt-1 shrink-0 text-gold", size: 18, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx7("a", { href: `tel:${SITE.phones[0].tel}`, className: "text-gray-400 hover:text-gold", children: SITE.phones[0].display })
          ] }),
          /* @__PURE__ */ jsxs5("li", { className: "flex items-start", children: [
            /* @__PURE__ */ jsx7(Mail, { className: "mr-3 mt-1 shrink-0 text-gold", size: 18, "aria-hidden": "true" }),
            /* @__PURE__ */ jsx7("a", { href: `mailto:${SITE.emails[0]}`, className: "break-all text-gray-400 hover:text-gold", children: SITE.emails[0] })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx7("div", { className: "border-t border-gray-800 pt-8 text-center text-gray-500", children: /* @__PURE__ */ jsxs5("p", { children: [
      "\xA9 ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " ",
      SITE.name,
      ". Tous droits r\xE9serv\xE9s."
    ] }) })
  ] }) });
};
var Footer_default = Footer;

// src/components/BackToTop.tsx
import { useEffect as useEffect5, useState as useState4 } from "react";
import { ChevronUp } from "lucide-react";
import { jsx as jsx8 } from "react/jsx-runtime";
var BackToTop = () => {
  const [visible, setVisible] = useState4(false);
  useEffect5(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return /* @__PURE__ */ jsx8(
    "button",
    {
      type: "button",
      onClick: () => window.scrollTo({ top: 0, behavior: "smooth" }),
      tabIndex: visible ? 0 : -1,
      "aria-hidden": !visible,
      "aria-label": "Retour en haut de la page",
      className: cn(
        "fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-all duration-300 hover:bg-primary-light",
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-10 opacity-0"
      ),
      children: /* @__PURE__ */ jsx8(ChevronUp, { size: 24, "aria-hidden": "true" })
    }
  );
};
var BackToTop_default = BackToTop;

// src/components/home/HeroSection.tsx
import { jsx as jsx9, jsxs as jsxs6 } from "react/jsx-runtime";
var HeroSection = () => /* @__PURE__ */ jsxs6("section", { id: "accueil", className: "relative h-[600px] bg-primary text-white", children: [
  /* @__PURE__ */ jsx9(
    "img",
    {
      src: "/images/page-title-bg.jpg",
      alt: "",
      className: "absolute inset-0 h-full w-full object-cover",
      decoding: "async"
    }
  ),
  /* @__PURE__ */ jsx9("div", { className: "absolute inset-0 bg-black/50", "aria-hidden": "true" }),
  /* @__PURE__ */ jsx9("div", { className: "relative z-10 flex h-full items-center justify-center", children: /* @__PURE__ */ jsxs6("div", { className: "px-4 text-center md:px-0", children: [
    /* @__PURE__ */ jsx9("h1", { className: "mb-4 font-lora text-4xl font-bold md:text-6xl", children: SITE.name }),
    /* @__PURE__ */ jsx9("p", { className: "mx-auto mb-8 max-w-3xl text-xl md:text-2xl", children: SITE.tagline }),
    /* @__PURE__ */ jsxs6("div", { className: "flex flex-col items-center justify-center gap-4 sm:flex-row", children: [
      /* @__PURE__ */ jsx9(LinkButton_default, { href: "/a-propos", variant: "gold", className: "px-8 text-lg font-bold", children: "D\xE9couvrir" }),
      /* @__PURE__ */ jsx9(LinkButton_default, { href: "/contact", variant: "white", className: "px-8 text-lg font-bold", children: "Nous Contacter" })
    ] })
  ] }) })
] });
var HeroSection_default = HeroSection;

// src/components/home/PrayerTimes.tsx
import { jsx as jsx10, jsxs as jsxs7 } from "react/jsx-runtime";
var PrayerTimes = () => {
  const { times, status, next } = usePrayerTimes();
  return /* @__PURE__ */ jsx10("section", { className: "bg-white py-8 md:py-12", "aria-labelledby": "prayer-title", children: /* @__PURE__ */ jsx10("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs7("div", { className: "flex flex-col items-center justify-between rounded-lg bg-primary p-6 shadow-lg md:flex-row md:p-8", children: [
    /* @__PURE__ */ jsxs7("div", { className: "mb-6 text-center text-white md:mb-0 md:text-left", children: [
      /* @__PURE__ */ jsx10("h2", { id: "prayer-title", className: "font-lora text-2xl font-bold md:text-3xl", children: "Horaires de Pri\xE8re" }),
      /* @__PURE__ */ jsx10("p", { className: "mt-2", children: "Rejoignez-nous pour les pri\xE8res quotidiennes" }),
      /* @__PURE__ */ jsxs7("p", { className: "mt-1 text-sm text-gray-200", children: [
        status === "live" && `${SITE.prayer.city} \xB7 ${formatLongDate(todayKey())}`,
        status === "loading" && "Chargement des horaires...",
        status === "fallback" && "Horaires indicatifs (calcul en ligne indisponible)"
      ] })
    ] }),
    /* @__PURE__ */ jsx10("ul", { className: "grid grid-cols-2 gap-4 text-center sm:grid-cols-3 md:grid-cols-5", children: PRAYER_ORDER.map((key) => /* @__PURE__ */ jsxs7(
      "li",
      {
        className: cn(
          "rounded-md bg-white p-4 text-primary",
          next === key && status !== "loading" && "ring-4 ring-gold"
        ),
        children: [
          /* @__PURE__ */ jsxs7("p", { lang: "ar", dir: "rtl", className: "font-medium", children: [
            PRAYER_NAMES[key].ar,
            /* @__PURE__ */ jsxs7("span", { className: "sr-only", children: [
              " (",
              PRAYER_NAMES[key].fr,
              ")"
            ] })
          ] }),
          /* @__PURE__ */ jsx10("p", { className: "text-xl font-bold", children: times ? times[key] : "--:--" })
        ]
      },
      key
    )) })
  ] }) }) });
};
var PrayerTimes_default = PrayerTimes;

// src/components/home/AboutSection.tsx
import { CheckCircle } from "lucide-react";

// src/components/SectionHeading.tsx
import { jsx as jsx11, jsxs as jsxs8 } from "react/jsx-runtime";
var SectionHeading = ({ title, description, className = "mb-12" }) => /* @__PURE__ */ jsxs8("div", { className: `text-center ${className}`, children: [
  /* @__PURE__ */ jsx11("h2", { className: "mb-4 font-lora text-3xl font-bold text-primary md:text-4xl", children: title }),
  description && /* @__PURE__ */ jsx11("p", { className: "mx-auto max-w-3xl text-gray-600", children: description }),
  /* @__PURE__ */ jsx11("div", { className: "mx-auto mt-4 h-1 w-20 bg-gold", "aria-hidden": "true" })
] });
var SectionHeading_default = SectionHeading;

// src/components/home/AboutSection.tsx
import { jsx as jsx12, jsxs as jsxs9 } from "react/jsx-runtime";
var values = [
  "Spiritualit\xE9 et d\xE9votion",
  "Service \xE0 la communaut\xE9",
  "Fraternit\xE9 et solidarit\xE9",
  "\xC9ducation et transmission du savoir"
];
var AboutSection = ({ fullPage = false }) => /* @__PURE__ */ jsx12("section", { id: "apropos", className: "bg-gray-50 py-16 md:py-24", children: /* @__PURE__ */ jsxs9("div", { className: "container mx-auto px-4 md:px-6", children: [
  /* @__PURE__ */ jsx12(SectionHeading_default, { title: "\xC0 Propos de Notre Dahira" }),
  /* @__PURE__ */ jsxs9("div", { className: "grid grid-cols-1 items-center gap-10 md:grid-cols-2", children: [
    /* @__PURE__ */ jsx12(
      "img",
      {
        src: "/images/page-title-bg.jpg",
        alt: "Communaut\xE9 Miftahoun Nasri",
        className: "h-auto w-full rounded-lg shadow-lg",
        loading: "lazy",
        decoding: "async"
      }
    ),
    /* @__PURE__ */ jsxs9("div", { children: [
      /* @__PURE__ */ jsx12("h3", { className: "mb-4 font-lora text-2xl font-semibold text-primary", children: "Notre Mission" }),
      /* @__PURE__ */ jsx12("p", { className: "mb-6 leading-relaxed text-gray-700", children: "La dahira Miftahoun Nasri de Guediawaye-Notaire est une communaut\xE9 spirituelle d\xE9di\xE9e \xE0 promouvoir les enseignements et valeurs du Mouridisme. Nous nous effor\xE7ons de cr\xE9er un espace de fraternit\xE9, d'apprentissage et de pratique religieuse pour tous nos membres." }),
      /* @__PURE__ */ jsx12("h3", { className: "mb-4 font-lora text-2xl font-semibold text-primary", children: "Notre Histoire" }),
      /* @__PURE__ */ jsx12("p", { className: "mb-6 leading-relaxed text-gray-700", children: "Fond\xE9e vers 2005-2006, notre dahira a grandi pour devenir un pilier important de la communaut\xE9 locale. Commen\xE7ant avec seulement quelques membres d\xE9vou\xE9s, nous avons maintenant une congr\xE9gation florissante qui continue \xE0 s'\xE9tendre gr\xE2ce \xE0 notre engagement envers les valeurs mourides et notre service \xE0 la communaut\xE9." }),
      /* @__PURE__ */ jsx12("h3", { className: "mb-4 font-lora text-2xl font-semibold text-primary", children: "Nos Valeurs" }),
      /* @__PURE__ */ jsx12("ul", { className: "mb-6 space-y-2 text-gray-700", children: values.map((value) => /* @__PURE__ */ jsxs9("li", { className: "flex items-start", children: [
        /* @__PURE__ */ jsx12(CheckCircle, { className: "mr-2 mt-1 shrink-0 text-gold", size: 20, "aria-hidden": "true" }),
        /* @__PURE__ */ jsx12("span", { children: value })
      ] }, value)) }),
      !fullPage && /* @__PURE__ */ jsx12("div", { className: "mt-8", children: /* @__PURE__ */ jsx12(LinkButton_default, { href: "/a-propos", arrow: true, children: "En savoir plus" }) })
    ] })
  ] })
] }) });
var AboutSection_default = AboutSection;

// src/components/home/LeadershipSection.tsx
import { Facebook as Facebook2, Instagram as Instagram2, Twitter as Twitter2 } from "lucide-react";

// src/data/content.ts
var PLACEHOLDER_IMAGE = "/images/page-title-bg.jpg";
var leaders = [
  {
    id: 1,
    name: "Dieuwrine Serigne Ousmane Fall",
    role: "Pr\xE9sident de la Dahira",
    description: "Coordonne toutes les activit\xE9s et repr\xE9sente notre congr\xE9gation dans la communaut\xE9.",
    image: "/images/membre-3.jpg"
  },
  {
    id: 2,
    name: "Serigne Khadim Fall",
    role: "Pr\xE9sident Culturel",
    description: "Organise et donne les cours de Coran, Xassida et Xam Xam tous les Dimanches.",
    image: "/images/khadim-fall.jpg"
  },
  {
    id: 3,
    name: "Sokhna Rouba Sow",
    role: "Dieuwrigne sokhna yi",
    description: "Organise les rencontres pour d\xE9velopper la connaissance religieuse."
    // Pas encore de photo : ajoutez-en une dans public/images puis indiquez son chemin ici.
  }
];
var activities = [
  {
    id: 1,
    title: "\xC9tude du Coran",
    description: "Sessions hebdomadaires d'\xE9tude et de r\xE9citation du Coran pour tous les \xE2ges, dirig\xE9es par Dieuwrigne Ousmane.",
    icon: "book",
    schedule: "Tous les dimanches | 12:00 - 14:00"
  },
  {
    id: 2,
    title: "Drouss - Kourel - Zikroulah",
    description: "Rassemblement spirituel pour les pri\xE8res et chants de louange collectifs dans la tradition mouride.",
    icon: "moon",
    schedule: "Vendredi soir | 21:00 - 23:30"
  },
  {
    id: 3,
    title: "Wakhtane et sogn\xE9",
    description: "Cours sur les enseignements de Cheikh Ahmadou Bamba et la spiritualit\xE9 mouride.",
    icon: "teaching",
    schedule: "Vendredi soir | 23:30 - 00:00"
  },
  {
    id: 4,
    title: "Service Communautaire",
    description: "Initiatives de bienfaisance pour aider les membres de la communaut\xE9 et les personnes dans le besoin.",
    icon: "charity",
    schedule: "Premier samedi du mois | 09:00 - 14:00"
  },
  {
    id: 5,
    title: "\xC9cole Coranique pour Enfants",
    description: "Cours adapt\xE9s aux enfants pour apprendre les bases de l'islam et les valeurs mourides.",
    icon: "children",
    schedule: "Mercredis & Samedis | 14:00 - 16:00"
  },
  {
    id: 6,
    title: "Groupes d'\xC9tude",
    description: "Cercles de discussion et d'\xE9tude pour approfondir les connaissances religieuses et les th\xE8mes d'actualit\xE9.",
    icon: "study",
    schedule: "Dimanche | 23:30 - 00:00"
  }
];
var weeklyProgram = [
  {
    day: "Dimanche",
    slots: [
      { time: "12:00 - 14:00", label: "\xC9cole Coranique pour les membres du dahira" },
      { time: "17:00 - 20:00", label: "\xC9cole Coranique pour les filles" },
      { time: "21:00 - 00:00", label: "R\xE9p\xE9tition Kourel Serigne Massamba" }
    ]
  },
  {
    day: "Vendredi",
    slots: [{ time: "21:00 - 00:00", label: "Dahira" }]
  }
];
var events = [
  {
    id: 1,
    title: "Grand Magal C\xE9l\xE9bration",
    description: "Comm\xE9moration annuelle du d\xE9part en exil de Cheikh Ahmadou Bamba avec pri\xE8res, chants et repas communautaire.",
    date: "2024-06-15",
    venue: "Dahira Miftahoun Nasri, Guediawaye-Notaire",
    time: "9:00 - 22:00"
  },
  {
    id: 2,
    title: "Conf\xE9rence Annuelle",
    description: "Conf\xE9rence sur l'h\xE9ritage spirituel de Cheikh Ahmadou Bamba avec des intervenants renomm\xE9s.",
    date: "2024-07-22",
    venue: "Centre Culturel, Guediawaye",
    time: "14:00 - 18:00"
  },
  {
    id: 3,
    title: "Journ\xE9e \xC9ducative",
    description: "S\xE9minaire intensif sur les enseignements et la doctrine Mouride pour tous les niveaux.",
    date: "2024-08-05",
    venue: "Dahira Miftahoun Nasri, Guediawaye-Notaire",
    time: "10:00 - 16:00"
  },
  {
    id: 4,
    title: "Action Caritative",
    description: "Distribution de repas et de fournitures scolaires aux familles d\xE9favoris\xE9es de notre communaut\xE9.",
    date: "2024-08-19",
    venue: "Place Publique, Guediawaye-Notaire",
    time: "9:00 - 13:00"
  },
  {
    id: 5,
    title: "Comm\xE9moration du Mawlid",
    description: "C\xE9l\xE9bration de la naissance du Proph\xE8te Muhammad (PSL) avec r\xE9citations et pri\xE8res.",
    date: "2024-01-15"
  },
  {
    id: 6,
    title: "S\xE9minaire sur le Mouridisme",
    description: "Conf\xE9rence \xE9ducative sur l'histoire et les principes du Mouridisme.",
    date: "2024-02-28"
  },
  {
    id: 7,
    title: "Journ\xE9e de Solidarit\xE9",
    description: "Distribution d'aide alimentaire et m\xE9dicale aux familles d\xE9favoris\xE9es.",
    date: "2024-03-20"
  }
];
var galleryImages = [
  { id: 1, src: PLACEHOLDER_IMAGE, alt: "C\xE9l\xE9bration religieuse", category: "\xC9v\xE9nements" },
  { id: 2, src: PLACEHOLDER_IMAGE, alt: "S\xE9ance d'enseignement", category: "\xC9ducation" },
  { id: 3, src: PLACEHOLDER_IMAGE, alt: "Distribution de nourriture", category: "Charit\xE9" },
  { id: 4, src: PLACEHOLDER_IMAGE, alt: "Lecture du Coran", category: "Spiritualit\xE9" },
  { id: 5, src: PLACEHOLDER_IMAGE, alt: "Rassemblement communautaire", category: "Communaut\xE9" },
  { id: 6, src: PLACEHOLDER_IMAGE, alt: "Cours pour enfants", category: "\xC9ducation" },
  { id: 7, src: PLACEHOLDER_IMAGE, alt: "C\xE9r\xE9monie spirituelle", category: "\xC9v\xE9nements" },
  { id: 8, src: PLACEHOLDER_IMAGE, alt: "Conf\xE9rence", category: "\xC9v\xE9nements" },
  { id: 9, src: PLACEHOLDER_IMAGE, alt: "Pri\xE8re collective", category: "Spiritualit\xE9" },
  { id: 10, src: PLACEHOLDER_IMAGE, alt: "\xC9tude religieuse", category: "\xC9ducation" },
  { id: 11, src: PLACEHOLDER_IMAGE, alt: "Activit\xE9 caritative", category: "Charit\xE9" },
  { id: 12, src: PLACEHOLDER_IMAGE, alt: "Rassemblement religieux", category: "Communaut\xE9" },
  { id: 13, src: PLACEHOLDER_IMAGE, alt: "Activit\xE9 sociale", category: "Communaut\xE9" },
  { id: 14, src: PLACEHOLDER_IMAGE, alt: "Rencontre spirituelle", category: "Spiritualit\xE9" },
  { id: 15, src: PLACEHOLDER_IMAGE, alt: "Atelier \xE9ducatif", category: "\xC9ducation" },
  { id: 16, src: PLACEHOLDER_IMAGE, alt: "Soutien aux d\xE9munis", category: "Charit\xE9" }
];
var videos = [
  {
    src: "/videos/video-1.mp4",
    title: "C\xE9l\xE9bration du Grand Magal",
    desc: "Moments forts de notre derni\xE8re c\xE9l\xE9bration du Grand Magal."
  },
  {
    src: "/videos/video-2.mp4",
    title: "Conf\xE9rence sur les enseignements",
    desc: "Conf\xE9rence sur les enseignements de Cheikh Ahmadou Bamba."
  },
  {
    src: "/videos/video-3.mp4",
    title: "R\xE9citation de po\xE8mes religieux",
    desc: "S\xE9ance de r\xE9citation des khassidas (po\xE8mes)."
  }
];
var VIDEO_POSTER = PLACEHOLDER_IMAGE;

// src/components/home/LeadershipSection.tsx
import { jsx as jsx13, jsxs as jsxs10 } from "react/jsx-runtime";
var initials = (name) => name.split(/\s+/).filter(Boolean).slice(-2).map((w) => w[0]?.toUpperCase()).join("");
var LeadershipSection = () => /* @__PURE__ */ jsx13("section", { className: "bg-white py-16 md:py-24", children: /* @__PURE__ */ jsxs10("div", { className: "container mx-auto px-4 md:px-6", children: [
  /* @__PURE__ */ jsx13(
    SectionHeading_default,
    {
      title: "Nos Responsables",
      description: "D\xE9couvrez les membres d\xE9vou\xE9s qui guident notre communaut\xE9 avec sagesse et compassion"
    }
  ),
  /* @__PURE__ */ jsx13("div", { className: "grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3", children: leaders.map((leader) => /* @__PURE__ */ jsxs10(
    "article",
    {
      className: "overflow-hidden rounded-lg bg-gray-50 shadow-md transition-transform hover:scale-105",
      children: [
        /* @__PURE__ */ jsx13("div", { className: "h-64 bg-gray-200", children: leader.image ? /* @__PURE__ */ jsx13(
          "img",
          {
            src: leader.image,
            alt: leader.name,
            className: "h-full w-full object-cover",
            loading: "lazy",
            decoding: "async"
          }
        ) : /* @__PURE__ */ jsx13(
          "div",
          {
            className: "flex h-full w-full items-center justify-center bg-primary-light text-6xl font-lora font-bold text-white",
            role: "img",
            "aria-label": leader.name,
            children: initials(leader.name)
          }
        ) }),
        /* @__PURE__ */ jsxs10("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx13("h3", { className: "mb-2 font-lora text-xl font-bold text-primary", children: leader.name }),
          /* @__PURE__ */ jsx13("p", { className: "mb-3 font-medium text-gold-dark", children: leader.role }),
          /* @__PURE__ */ jsx13("p", { className: "mb-4 text-gray-600", children: leader.description }),
          /* @__PURE__ */ jsxs10("div", { className: "flex space-x-3", children: [
            leader.socialLinks?.facebook && /* @__PURE__ */ jsx13("a", { href: leader.socialLinks.facebook, "aria-label": `Facebook de ${leader.name}`, className: "text-primary transition hover:text-gold-dark", children: /* @__PURE__ */ jsx13(Facebook2, { size: 18, "aria-hidden": "true" }) }),
            leader.socialLinks?.twitter && /* @__PURE__ */ jsx13("a", { href: leader.socialLinks.twitter, "aria-label": `Twitter de ${leader.name}`, className: "text-primary transition hover:text-gold-dark", children: /* @__PURE__ */ jsx13(Twitter2, { size: 18, "aria-hidden": "true" }) }),
            leader.socialLinks?.instagram && /* @__PURE__ */ jsx13("a", { href: leader.socialLinks.instagram, "aria-label": `Instagram de ${leader.name}`, className: "text-primary transition hover:text-gold-dark", children: /* @__PURE__ */ jsx13(Instagram2, { size: 18, "aria-hidden": "true" }) })
          ] })
        ] })
      ]
    },
    leader.id
  )) })
] }) });
var LeadershipSection_default = LeadershipSection;

// src/components/home/ActivitiesSection.tsx
import {
  BookOpen,
  Baby,
  Clock,
  GraduationCap,
  HeartHandshake,
  Moon,
  Users
} from "lucide-react";
import { jsx as jsx14, jsxs as jsxs11 } from "react/jsx-runtime";
var icons = {
  book: BookOpen,
  moon: Moon,
  teaching: GraduationCap,
  charity: HeartHandshake,
  children: Baby,
  study: Users
};
var ActivitiesSection = ({ fullPage = false }) => /* @__PURE__ */ jsx14("section", { id: "activites", className: "bg-gray-50 py-16 md:py-24", children: /* @__PURE__ */ jsxs11("div", { className: "container mx-auto px-4 md:px-6", children: [
  /* @__PURE__ */ jsx14(
    SectionHeading_default,
    {
      title: "Nos Activit\xE9s",
      description: "La Dahira Miftahoun Nasri organise diverses activit\xE9s pour nourrir l'esprit et renforcer notre communaut\xE9"
    }
  ),
  /* @__PURE__ */ jsx14("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3", children: activities.map((activity) => {
    const Icon = icons[activity.icon];
    return /* @__PURE__ */ jsxs11(
      "article",
      {
        className: "overflow-hidden rounded-lg bg-white shadow-md transition duration-300 hover:shadow-xl",
        children: [
          /* @__PURE__ */ jsx14("div", { className: "flex h-48 items-center justify-center bg-primary-light text-white", children: /* @__PURE__ */ jsx14(Icon, { size: 56, "aria-hidden": "true" }) }),
          /* @__PURE__ */ jsxs11("div", { className: "p-6", children: [
            /* @__PURE__ */ jsx14("h3", { className: "mb-3 font-lora text-xl font-bold text-primary", children: activity.title }),
            /* @__PURE__ */ jsx14("p", { className: "mb-4 text-gray-600", children: activity.description }),
            /* @__PURE__ */ jsxs11("div", { className: "flex items-center text-gray-600", children: [
              /* @__PURE__ */ jsx14(Clock, { className: "mr-2 shrink-0", size: 16, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx14("span", { children: activity.schedule })
            ] })
          ] })
        ]
      },
      activity.id
    );
  }) }),
  !fullPage && /* @__PURE__ */ jsx14("div", { className: "mt-12 text-center", children: /* @__PURE__ */ jsx14(LinkButton_default, { href: "/activites", arrow: true, children: "Voir toutes nos activit\xE9s" }) })
] }) });
var ActivitiesSection_default = ActivitiesSection;

// src/components/home/EventsSection.tsx
import { CalendarX, Clock as Clock2, MapPin as MapPin2 } from "lucide-react";
import { jsx as jsx15, jsxs as jsxs12 } from "react/jsx-runtime";
var EventsSection = ({ fullPage = false }) => {
  const { upcoming } = splitEvents(events);
  const displayed = fullPage ? upcoming : upcoming.slice(0, 2);
  return /* @__PURE__ */ jsx15("section", { id: "evenements", className: "bg-white py-16 md:py-24", children: /* @__PURE__ */ jsxs12("div", { className: "container mx-auto px-4 md:px-6", children: [
    /* @__PURE__ */ jsx15(
      SectionHeading_default,
      {
        title: "\xC9v\xE9nements \xE0 Venir",
        description: "Rejoignez-nous pour ces occasions sp\xE9ciales qui renforcent notre communaut\xE9"
      }
    ),
    displayed.length === 0 ? /* @__PURE__ */ jsxs12("div", { className: "mx-auto max-w-xl rounded-lg bg-gray-50 p-8 text-center shadow-md", children: [
      /* @__PURE__ */ jsx15(CalendarX, { className: "mx-auto mb-3 h-10 w-10 text-primary", "aria-hidden": "true" }),
      /* @__PURE__ */ jsx15("p", { className: "font-medium text-primary", children: "Aucun \xE9v\xE9nement n'est programm\xE9 pour le moment." }),
      /* @__PURE__ */ jsx15("p", { className: "mt-2 text-gray-600", children: "Abonnez-vous \xE0 la newsletter ou contactez-nous pour \xEAtre inform\xE9 des prochaines dates." })
    ] }) : /* @__PURE__ */ jsx15("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2", children: displayed.map((event) => {
      const { day, month, year } = formatDateParts(event.date);
      return /* @__PURE__ */ jsxs12(
        "article",
        {
          className: "flex flex-col overflow-hidden rounded-lg bg-gray-50 shadow-md md:flex-row",
          children: [
            /* @__PURE__ */ jsxs12("div", { className: "flex flex-col items-center justify-center bg-primary p-6 text-white md:w-1/3", children: [
              /* @__PURE__ */ jsx15("span", { className: "text-4xl font-bold", children: day }),
              /* @__PURE__ */ jsx15("span", { className: "text-xl", children: month }),
              /* @__PURE__ */ jsx15("span", { children: year })
            ] }),
            /* @__PURE__ */ jsxs12("div", { className: "p-6 md:w-2/3", children: [
              /* @__PURE__ */ jsx15("h3", { className: "mb-2 font-lora text-xl font-bold text-primary", children: event.title }),
              /* @__PURE__ */ jsx15("p", { className: "mb-4 text-gray-600", children: event.description }),
              event.venue && /* @__PURE__ */ jsxs12("div", { className: "mb-3 flex items-center", children: [
                /* @__PURE__ */ jsx15(MapPin2, { className: "mr-2 shrink-0 text-gold-dark", size: 18, "aria-hidden": "true" }),
                /* @__PURE__ */ jsx15("span", { children: event.venue })
              ] }),
              event.time && /* @__PURE__ */ jsxs12("div", { className: "flex items-center", children: [
                /* @__PURE__ */ jsx15(Clock2, { className: "mr-2 shrink-0 text-gold-dark", size: 18, "aria-hidden": "true" }),
                /* @__PURE__ */ jsx15("span", { children: event.time })
              ] })
            ] })
          ]
        },
        event.id
      );
    }) }),
    !fullPage && /* @__PURE__ */ jsx15("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsx15(LinkButton_default, { href: "/evenements", variant: "primary", arrow: true, children: "Voir tous les \xE9v\xE9nements" }) })
  ] }) });
};
var EventsSection_default = EventsSection;

// src/components/home/GallerySection.tsx
import { jsx as jsx16, jsxs as jsxs13 } from "react/jsx-runtime";
var GallerySection = () => /* @__PURE__ */ jsx16("section", { id: "galerie", className: "bg-gray-50 py-16 md:py-24", children: /* @__PURE__ */ jsxs13("div", { className: "container mx-auto px-4 md:px-6", children: [
  /* @__PURE__ */ jsx16(
    SectionHeading_default,
    {
      title: "Galerie Photos",
      description: "D\xE9couvrez les moments forts des \xE9v\xE9nements pass\xE9s de notre dahira"
    }
  ),
  /* @__PURE__ */ jsx16("ul", { className: "grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", children: galleryImages.slice(0, 8).map((image) => /* @__PURE__ */ jsxs13("li", { className: "group relative h-64 overflow-hidden rounded-lg shadow-md", children: [
    /* @__PURE__ */ jsx16(
      "img",
      {
        src: image.src,
        alt: image.alt,
        className: "h-full w-full object-cover transition-transform duration-500 group-hover:scale-110",
        loading: "lazy",
        decoding: "async"
      }
    ),
    /* @__PURE__ */ jsx16("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100", children: /* @__PURE__ */ jsx16("span", { className: "px-2 text-center font-medium text-white", children: image.alt }) })
  ] }, image.id)) }),
  /* @__PURE__ */ jsx16("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsx16(LinkButton_default, { href: "/galerie", arrow: true, children: "Voir toutes les photos" }) })
] }) });
var GallerySection_default = GallerySection;

// src/components/home/NewsletterSection.tsx
import { useState as useState5 } from "react";

// src/lib/email.ts
import emailjs from "@emailjs/browser";
var env = define_import_meta_env_default;
var config = {
  serviceId: env.VITE_EMAILJS_SERVICE_ID || "service_nasri",
  publicKey: env.VITE_EMAILJS_PUBLIC_KEY || "IgrYnt6RaLyZ4gKlx",
  newsletterTemplateId: env.VITE_EMAILJS_TEMPLATE_NEWSLETTER || "template_vkabwua",
  contactTemplateId: env.VITE_EMAILJS_TEMPLATE_CONTACT || ""
};
var options = {
  publicKey: config.publicKey,
  limitRate: { throttle: 1e4 }
};
async function subscribeToNewsletter({ name, email }) {
  await emailjs.send(
    config.serviceId,
    config.newsletterTemplateId,
    { user_name: name, user_email: email },
    options
  );
}
function openMailClient(data) {
  const body = `${data.message}

--
${data.name} (${data.email})`;
  window.location.href = `mailto:${SITE.emails[0]}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;
}
async function sendContactMessage(data) {
  if (!config.contactTemplateId) {
    openMailClient(data);
    return "mailto";
  }
  await emailjs.send(
    config.serviceId,
    config.contactTemplateId,
    {
      from_name: data.name,
      from_email: data.email,
      reply_to: data.email,
      subject: data.subject,
      message: data.message
    },
    options
  );
  return "sent";
}

// src/components/home/NewsletterSection.tsx
import { jsx as jsx17, jsxs as jsxs14 } from "react/jsx-runtime";
var fieldClass = "w-full flex-1 rounded-md px-4 py-3 text-dark focus:outline-none focus:ring-2 focus:ring-gold";
var NewsletterSection = () => {
  const { toast: toast2 } = useToast();
  const [name, setName] = useState5("");
  const [email, setEmail] = useState5("");
  const [honeypot, setHoneypot] = useState5("");
  const [sending, setSending] = useState5(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (honeypot) return;
    if (!name.trim() || !email.trim()) {
      toast2({
        title: "Erreur de validation",
        description: "Veuillez remplir tous les champs obligatoires.",
        variant: "destructive"
      });
      return;
    }
    setSending(true);
    try {
      await subscribeToNewsletter({ name: name.trim(), email: email.trim() });
      toast2({
        title: "Inscription r\xE9ussie",
        description: "Un email de confirmation vous a \xE9t\xE9 envoy\xE9."
      });
      setName("");
      setEmail("");
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast2({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription. Veuillez r\xE9essayer.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };
  return /* @__PURE__ */ jsx17("section", { className: "bg-primary py-16 text-white", "aria-labelledby": "newsletter-title", children: /* @__PURE__ */ jsx17("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs14("div", { className: "mx-auto max-w-3xl text-center", children: [
    /* @__PURE__ */ jsx17("h2", { id: "newsletter-title", className: "mb-4 font-lora text-3xl font-bold md:text-4xl", children: "Restez Inform\xE9" }),
    /* @__PURE__ */ jsx17("p", { className: "mb-8", children: "Abonnez-vous \xE0 notre newsletter pour recevoir des mises \xE0 jour sur nos \xE9v\xE9nements et activit\xE9s" }),
    /* @__PURE__ */ jsxs14("form", { onSubmit: handleSubmit, className: "flex flex-col gap-4 md:flex-row", noValidate: true, children: [
      /* @__PURE__ */ jsxs14("label", { className: "flex-1", children: [
        /* @__PURE__ */ jsx17("span", { className: "sr-only", children: "Votre nom" }),
        /* @__PURE__ */ jsx17(
          "input",
          {
            type: "text",
            name: "name",
            autoComplete: "name",
            placeholder: "Votre nom",
            className: fieldClass,
            value: name,
            onChange: (e) => setName(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsxs14("label", { className: "flex-1", children: [
        /* @__PURE__ */ jsx17("span", { className: "sr-only", children: "Votre email" }),
        /* @__PURE__ */ jsx17(
          "input",
          {
            type: "email",
            name: "email",
            autoComplete: "email",
            placeholder: "Votre email",
            className: fieldClass,
            value: email,
            onChange: (e) => setEmail(e.target.value),
            required: true
          }
        )
      ] }),
      /* @__PURE__ */ jsx17("div", { className: "absolute -left-[9999px]", "aria-hidden": "true", children: /* @__PURE__ */ jsx17(
        "input",
        {
          type: "text",
          name: "website",
          tabIndex: -1,
          autoComplete: "off",
          value: honeypot,
          onChange: (e) => setHoneypot(e.target.value)
        }
      ) }),
      /* @__PURE__ */ jsx17(
        "button",
        {
          type: "submit",
          className: "rounded-md bg-gold px-6 py-3 font-bold text-dark transition-colors duration-300 hover:bg-gold-light disabled:opacity-60",
          disabled: sending,
          children: sending ? "En cours..." : "S'abonner"
        }
      )
    ] }),
    /* @__PURE__ */ jsx17("p", { className: "mt-4 text-sm text-gray-200", children: "En vous abonnant, vous acceptez de recevoir nos communications par email. Vous pouvez vous d\xE9sabonner \xE0 tout moment." })
  ] }) }) });
};
var NewsletterSection_default = NewsletterSection;

// src/components/ContactInfo.tsx
import { Clock as Clock3, Mail as Mail2, MapPin as MapPin3, MessageCircle, Phone as Phone2 } from "lucide-react";
import { jsx as jsx18, jsxs as jsxs15 } from "react/jsx-runtime";
var Row = ({ icon, title, children }) => /* @__PURE__ */ jsxs15("div", { className: "flex items-start", children: [
  /* @__PURE__ */ jsx18("div", { className: "mr-4 rounded-full bg-primary-light p-3 text-white", "aria-hidden": "true", children: icon }),
  /* @__PURE__ */ jsxs15("div", { children: [
    /* @__PURE__ */ jsx18("h4", { className: "mb-1 text-lg font-medium text-primary", children: title }),
    children
  ] })
] });
var linkClass = "block text-gray-600 hover:text-primary hover:underline";
var ContactInfo = ({ headingAs: Heading = "h3" }) => /* @__PURE__ */ jsxs15("div", { children: [
  /* @__PURE__ */ jsx18(Heading, { className: "mb-6 font-lora text-2xl font-semibold text-primary", children: "Informations de Contact" }),
  /* @__PURE__ */ jsxs15("div", { className: "space-y-6", children: [
    /* @__PURE__ */ jsx18(Row, { icon: /* @__PURE__ */ jsx18(MapPin3, { size: 20 }), title: "Adresse", children: /* @__PURE__ */ jsx18("p", { className: "text-gray-600", children: SITE.address }) }),
    /* @__PURE__ */ jsx18(Row, { icon: /* @__PURE__ */ jsx18(Phone2, { size: 20 }), title: "T\xE9l\xE9phone", children: SITE.phones.map((p) => /* @__PURE__ */ jsx18("a", { href: `tel:${p.tel}`, className: linkClass, children: p.display }, p.tel)) }),
    /* @__PURE__ */ jsx18(Row, { icon: /* @__PURE__ */ jsx18(Mail2, { size: 20 }), title: "Email", children: SITE.emails.map((email) => /* @__PURE__ */ jsx18("a", { href: `mailto:${email}`, className: `${linkClass} break-all`, children: email }, email)) }),
    /* @__PURE__ */ jsx18(Row, { icon: /* @__PURE__ */ jsx18(Clock3, { size: 20 }), title: "Heures d'ouverture", children: SITE.hours.map((h) => /* @__PURE__ */ jsx18("p", { className: "text-gray-600", children: h }, h)) }),
    SITE.whatsapp && /* @__PURE__ */ jsxs15(
      "a",
      {
        href: `https://wa.me/${SITE.whatsapp}`,
        target: "_blank",
        rel: "noopener noreferrer",
        className: "inline-flex items-center rounded-md bg-primary px-5 py-3 font-medium text-white transition-colors hover:bg-primary-light",
        children: [
          /* @__PURE__ */ jsx18(MessageCircle, { className: "mr-2 h-5 w-5", "aria-hidden": "true" }),
          "Nous \xE9crire sur WhatsApp",
          /* @__PURE__ */ jsx18("span", { className: "sr-only", children: " (nouvelle fen\xEAtre)" })
        ]
      }
    ),
    /* @__PURE__ */ jsxs15("div", { className: "mt-8", children: [
      /* @__PURE__ */ jsx18("h4", { className: "mb-3 text-lg font-medium text-primary", children: "Suivez-nous" }),
      /* @__PURE__ */ jsx18(SocialLinks_default, { linkClassName: "flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white transition-colors duration-300 hover:bg-primary-light" })
    ] })
  ] })
] });
var ContactInfo_default = ContactInfo;

// src/components/LocationMap.tsx
import { jsx as jsx19 } from "react/jsx-runtime";
var LocationMap = ({ className = "" }) => /* @__PURE__ */ jsx19("div", { className: `h-64 w-full overflow-hidden rounded-lg shadow-lg ${className}`, children: /* @__PURE__ */ jsx19(
  "iframe",
  {
    title: `Carte : ${SITE.name}, ${SITE.addressShort}`,
    src: SITE.mapEmbedUrl,
    width: "100%",
    height: "100%",
    style: { border: 0 },
    allowFullScreen: true,
    loading: "lazy",
    referrerPolicy: "no-referrer-when-downgrade"
  }
) });
var LocationMap_default = LocationMap;

// src/components/home/ContactSection.tsx
import { jsx as jsx20, jsxs as jsxs16 } from "react/jsx-runtime";
var ContactSection = () => /* @__PURE__ */ jsx20("section", { id: "contact", className: "bg-white py-16 md:py-24", children: /* @__PURE__ */ jsxs16("div", { className: "container mx-auto px-4 md:px-6", children: [
  /* @__PURE__ */ jsx20(
    SectionHeading_default,
    {
      title: "Contactez-Nous",
      description: "Vous avez des questions ou souhaitez rejoindre notre dahira? N'h\xE9sitez pas \xE0 nous contacter"
    }
  ),
  /* @__PURE__ */ jsxs16("div", { className: "grid grid-cols-1 gap-10 md:grid-cols-2", children: [
    /* @__PURE__ */ jsx20(ContactInfo_default, {}),
    /* @__PURE__ */ jsxs16("div", { children: [
      /* @__PURE__ */ jsx20(
        "img",
        {
          src: "/images/page-title-bg.jpg",
          alt: "Photo du si\xE8ge de notre daara",
          className: "max-h-96 w-full rounded-lg object-cover shadow-lg",
          loading: "lazy",
          decoding: "async"
        }
      ),
      /* @__PURE__ */ jsx20(LocationMap_default, { className: "mt-8" })
    ] })
  ] }),
  /* @__PURE__ */ jsx20("div", { className: "mt-10 text-center", children: /* @__PURE__ */ jsx20(LinkButton_default, { href: "/contact", arrow: true, children: "Nous \xE9crire" }) })
] }) });
var ContactSection_default = ContactSection;

// src/pages/Home.tsx
import { Fragment, jsx as jsx21, jsxs as jsxs17 } from "react/jsx-runtime";
var Home = () => {
  usePageMeta();
  return /* @__PURE__ */ jsxs17(Fragment, { children: [
    /* @__PURE__ */ jsx21(HeroSection_default, {}),
    /* @__PURE__ */ jsx21(PrayerTimes_default, {}),
    /* @__PURE__ */ jsx21(AboutSection_default, {}),
    /* @__PURE__ */ jsx21(LeadershipSection_default, {}),
    /* @__PURE__ */ jsx21(ActivitiesSection_default, {}),
    /* @__PURE__ */ jsx21(EventsSection_default, {}),
    /* @__PURE__ */ jsx21(GallerySection_default, {}),
    /* @__PURE__ */ jsx21(NewsletterSection_default, {}),
    /* @__PURE__ */ jsx21(ContactSection_default, {})
  ] });
};
var Home_default = Home;

// src/components/PageHeader.tsx
import { jsx as jsx22, jsxs as jsxs18 } from "react/jsx-runtime";
var PageHeader = ({ title, description }) => /* @__PURE__ */ jsx22("div", { className: "bg-primary py-12 text-white", children: /* @__PURE__ */ jsxs18("div", { className: "container mx-auto px-4 text-center md:px-6", children: [
  /* @__PURE__ */ jsx22("h1", { className: "mb-4 font-lora text-4xl font-bold md:text-5xl", children: title }),
  /* @__PURE__ */ jsx22("p", { className: "mx-auto max-w-3xl", children: description })
] }) });
var PageHeader_default = PageHeader;

// src/pages/AboutUs.tsx
import { Fragment as Fragment2, jsx as jsx23, jsxs as jsxs19 } from "react/jsx-runtime";
var AboutUs = () => {
  usePageMeta("\xC0 Propos");
  return /* @__PURE__ */ jsxs19(Fragment2, { children: [
    /* @__PURE__ */ jsx23(
      PageHeader_default,
      {
        title: "\xC0 Propos de Nous",
        description: "D\xE9couvrez l'histoire, la mission et les valeurs de la Dahira Miftahoun Nasri de Guediawaye-Notaire"
      }
    ),
    /* @__PURE__ */ jsx23(AboutSection_default, { fullPage: true }),
    /* @__PURE__ */ jsx23(LeadershipSection_default, {}),
    /* @__PURE__ */ jsx23("section", { className: "bg-gray-50 py-16 md:py-24", children: /* @__PURE__ */ jsxs19("div", { className: "container mx-auto px-4 md:px-6", children: [
      /* @__PURE__ */ jsx23(SectionHeading_default, { title: "Notre Vision" }),
      /* @__PURE__ */ jsxs19("div", { className: "mx-auto max-w-4xl space-y-6 leading-relaxed text-gray-700", children: [
        /* @__PURE__ */ jsx23("p", { children: "La Dahira Miftahoun Nasri aspire \xE0 \xEAtre un phare de spiritualit\xE9 et d'apprentissage islamique dans la communaut\xE9 de Guediawaye-Notaire. Notre vision est de cr\xE9er un espace o\xF9 les principes et enseignements du Mouridisme peuvent \xEAtre pratiqu\xE9s, \xE9tudi\xE9s et transmis aux g\xE9n\xE9rations futures." }),
        /* @__PURE__ */ jsx23("p", { children: "Nous nous effor\xE7ons de b\xE2tir une communaut\xE9 forte, solidaire et engag\xE9e qui incarne les valeurs fondamentales du Mouridisme : le travail, la pri\xE8re, la fraternit\xE9 et le service. \xC0 travers notre dahira, nous visons \xE0 contribuer positivement \xE0 notre soci\xE9t\xE9 et \xE0 promouvoir un islam de paix, de tol\xE9rance et d'amour universel, conform\xE9ment aux enseignements de Cheikh Ahmadou Bamba." }),
        /* @__PURE__ */ jsx23("p", { children: "Notre engagement est de continuer \xE0 grandir, \xE0 servir et \xE0 inspirer, en gardant toujours \xE0 l'esprit les principes qui nous guident et en adaptant nos actions aux besoins changeants de notre communaut\xE9 et de notre \xE9poque, tout en restant fid\xE8les \xE0 notre h\xE9ritage spirituel." })
      ] })
    ] }) })
  ] });
};
var AboutUs_default = AboutUs;

// src/pages/Activites.tsx
import { Calendar, Clock as Clock4 } from "lucide-react";
import { Fragment as Fragment3, jsx as jsx24, jsxs as jsxs20 } from "react/jsx-runtime";
var Activites = () => {
  usePageMeta("Activit\xE9s");
  return /* @__PURE__ */ jsxs20(Fragment3, { children: [
    /* @__PURE__ */ jsx24(
      PageHeader_default,
      {
        title: "Nos Activit\xE9s",
        description: "D\xE9couvrez les diff\xE9rentes activit\xE9s spirituelles et communautaires de la Dahira Miftahoun Nasri"
      }
    ),
    /* @__PURE__ */ jsx24(ActivitiesSection_default, { fullPage: true }),
    /* @__PURE__ */ jsx24("section", { className: "bg-white py-16 md:py-24", children: /* @__PURE__ */ jsxs20("div", { className: "container mx-auto px-4 md:px-6", children: [
      /* @__PURE__ */ jsx24(
        SectionHeading_default,
        {
          title: "Programmes Hebdomadaires",
          description: "Rejoignez-nous pour nos activit\xE9s r\xE9guli\xE8res"
        }
      ),
      /* @__PURE__ */ jsx24("div", { className: "mx-auto max-w-4xl space-y-6 rounded-lg bg-gray-50 p-6 shadow-md md:p-8", children: weeklyProgram.map((day, index) => /* @__PURE__ */ jsxs20(
        "div",
        {
          className: index < weeklyProgram.length - 1 ? "border-b border-gray-200 pb-4" : "",
          children: [
            /* @__PURE__ */ jsxs20("div", { className: "mb-2 flex items-center gap-3", children: [
              /* @__PURE__ */ jsx24(Calendar, { className: "text-primary", size: 20, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx24("h3", { className: "font-lora text-xl font-semibold text-primary", children: day.day })
            ] }),
            /* @__PURE__ */ jsx24("ul", { className: "ml-8 space-y-4", children: day.slots.map((slot) => /* @__PURE__ */ jsxs20("li", { className: "flex items-start", children: [
              /* @__PURE__ */ jsx24(Clock4, { className: "mr-2 mt-1 shrink-0 text-gold-dark", size: 16, "aria-hidden": "true" }),
              /* @__PURE__ */ jsxs20("div", { children: [
                /* @__PURE__ */ jsx24("p", { className: "font-medium", children: slot.time }),
                /* @__PURE__ */ jsx24("p", { className: "text-gray-600", children: slot.label })
              ] })
            ] }, slot.time)) })
          ]
        },
        day.day
      )) })
    ] }) })
  ] });
};
var Activites_default = Activites;

// src/pages/Evenements.tsx
import { Calendar as Calendar2, Clock as Clock5, MapPin as MapPin4 } from "lucide-react";
import { Fragment as Fragment4, jsx as jsx25, jsxs as jsxs21 } from "react/jsx-runtime";
var Evenements = () => {
  usePageMeta("\xC9v\xE9nements");
  const { upcoming, past } = splitEvents(events);
  const main = upcoming[0];
  const mainDate = main && formatDateParts(main.date);
  return /* @__PURE__ */ jsxs21(Fragment4, { children: [
    /* @__PURE__ */ jsx25(
      PageHeader_default,
      {
        title: "Nos \xC9v\xE9nements",
        description: "D\xE9couvrez les \xE9v\xE9nements \xE0 venir de la Dahira Miftahoun Nasri"
      }
    ),
    /* @__PURE__ */ jsx25(EventsSection_default, { fullPage: true }),
    main && mainDate && /* @__PURE__ */ jsx25("section", { className: "bg-gray-50 py-16 md:py-24", children: /* @__PURE__ */ jsxs21("div", { className: "container mx-auto px-4 md:px-6", children: [
      /* @__PURE__ */ jsx25(SectionHeading_default, { title: "\xC9v\xE9nement Principal", description: "Ne manquez pas notre prochain grand \xE9v\xE9nement" }),
      /* @__PURE__ */ jsxs21("article", { className: "mx-auto max-w-4xl overflow-hidden rounded-lg bg-white shadow-lg md:flex", children: [
        /* @__PURE__ */ jsxs21("div", { className: "flex flex-col items-center justify-center bg-primary p-8 text-center text-white md:w-1/3", children: [
          /* @__PURE__ */ jsx25(Calendar2, { className: "mx-auto mb-4 h-12 w-12", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx25("span", { className: "text-5xl font-bold", children: mainDate.day }),
          /* @__PURE__ */ jsx25("div", { className: "text-xl", children: mainDate.month }),
          /* @__PURE__ */ jsx25("div", { className: "mt-1", children: mainDate.year })
        ] }),
        /* @__PURE__ */ jsxs21("div", { className: "p-8 md:w-2/3", children: [
          /* @__PURE__ */ jsx25("h3", { className: "mb-4 font-lora text-2xl font-bold text-primary", children: main.title }),
          /* @__PURE__ */ jsx25("p", { className: "mb-6 text-gray-600", children: main.description }),
          /* @__PURE__ */ jsxs21("div", { className: "space-y-4", children: [
            main.venue && /* @__PURE__ */ jsxs21("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx25(MapPin4, { className: "mr-3 shrink-0 text-gold-dark", size: 20, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx25("span", { children: main.venue })
            ] }),
            main.time && /* @__PURE__ */ jsxs21("div", { className: "flex items-center", children: [
              /* @__PURE__ */ jsx25(Clock5, { className: "mr-3 shrink-0 text-gold-dark", size: 20, "aria-hidden": "true" }),
              /* @__PURE__ */ jsx25("span", { children: main.time })
            ] })
          ] })
        ] })
      ] })
    ] }) }),
    past.length > 0 && /* @__PURE__ */ jsx25("section", { className: "bg-white py-16 md:py-24", children: /* @__PURE__ */ jsxs21("div", { className: "container mx-auto px-4 md:px-6", children: [
      /* @__PURE__ */ jsx25(SectionHeading_default, { title: "\xC9v\xE9nements Pass\xE9s", description: "Revivez nos \xE9v\xE9nements pr\xE9c\xE9dents" }),
      /* @__PURE__ */ jsx25("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3", children: past.map((event) => /* @__PURE__ */ jsxs21("article", { className: "overflow-hidden rounded-lg bg-gray-50 shadow-md", children: [
        /* @__PURE__ */ jsx25("div", { className: "h-1 bg-gold", "aria-hidden": "true" }),
        /* @__PURE__ */ jsxs21("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx25("p", { className: "mb-2 text-gray-600", children: /* @__PURE__ */ jsx25("time", { dateTime: event.date, children: formatLongDate(event.date) }) }),
          /* @__PURE__ */ jsx25("h3", { className: "mb-3 font-lora text-xl font-bold text-primary", children: event.title }),
          /* @__PURE__ */ jsx25("p", { className: "text-gray-600", children: event.description })
        ] })
      ] }, event.id)) })
    ] }) })
  ] });
};
var Evenements_default = Evenements;

// src/pages/Galerie.tsx
import { useState as useState6 } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Fragment as Fragment5, jsx as jsx26, jsxs as jsxs22 } from "react/jsx-runtime";
var IMAGES_PER_PAGE = 8;
var categories = ["Tous", ...Array.from(new Set(galleryImages.map((i) => i.category)))];
var Galerie = () => {
  usePageMeta("Galerie");
  const [category, setCategory] = useState6("Tous");
  const [page, setPage] = useState6(1);
  const filtered = category === "Tous" ? galleryImages : galleryImages.filter((i) => i.category === category);
  const totalPages = Math.max(1, Math.ceil(filtered.length / IMAGES_PER_PAGE));
  const current = filtered.slice((page - 1) * IMAGES_PER_PAGE, page * IMAGES_PER_PAGE);
  const pageBtn = "flex h-10 w-10 items-center justify-center rounded-md border";
  return /* @__PURE__ */ jsxs22(Fragment5, { children: [
    /* @__PURE__ */ jsx26(PageHeader_default, { title: "Galerie Photos", description: "D\xE9couvrez les moments forts de la Dahira Miftahoun Nasri" }),
    /* @__PURE__ */ jsx26("section", { className: "bg-gray-50 py-16", children: /* @__PURE__ */ jsxs22("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx26("div", { className: "mb-12 flex flex-wrap justify-center gap-3", role: "group", "aria-label": "Filtrer par cat\xE9gorie", children: categories.map((c) => /* @__PURE__ */ jsx26(
        "button",
        {
          type: "button",
          "aria-pressed": category === c,
          onClick: () => {
            setCategory(c);
            setPage(1);
          },
          className: cn(
            "rounded-full border px-5 py-2 text-sm transition-colors duration-300",
            category === c ? "border-primary bg-primary text-white" : "border-gray-200 bg-white text-gray-700 hover:bg-primary hover:text-white"
          ),
          children: c
        },
        c
      )) }),
      /* @__PURE__ */ jsx26("ul", { className: "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4", children: current.map((image) => /* @__PURE__ */ jsxs22("li", { className: "group relative overflow-hidden rounded-lg shadow-md", children: [
        /* @__PURE__ */ jsx26(
          "img",
          {
            src: image.src,
            alt: image.alt,
            className: "h-64 w-full object-cover transition-transform duration-500 group-hover:scale-110",
            loading: "lazy",
            decoding: "async"
          }
        ),
        /* @__PURE__ */ jsx26("div", { className: "absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100", children: /* @__PURE__ */ jsxs22("div", { className: "px-2 text-center text-white", children: [
          /* @__PURE__ */ jsx26("p", { className: "text-sm", children: image.category }),
          /* @__PURE__ */ jsx26("p", { className: "text-lg font-semibold", children: image.alt })
        ] }) })
      ] }, image.id)) }),
      totalPages > 1 && /* @__PURE__ */ jsxs22("nav", { "aria-label": "Pagination de la galerie", className: "mt-10 flex justify-center space-x-2", children: [
        /* @__PURE__ */ jsx26(
          "button",
          {
            type: "button",
            onClick: () => setPage((p) => Math.max(1, p - 1)),
            disabled: page === 1,
            "aria-label": "Page pr\xE9c\xE9dente",
            className: cn(pageBtn, "text-gray-700 hover:bg-primary hover:text-white disabled:opacity-50"),
            children: /* @__PURE__ */ jsx26(ChevronLeft, { size: 18, "aria-hidden": "true" })
          }
        ),
        Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => /* @__PURE__ */ jsx26(
          "button",
          {
            type: "button",
            onClick: () => setPage(n),
            "aria-label": `Page ${n}`,
            "aria-current": page === n ? "page" : void 0,
            className: cn(
              pageBtn,
              page === n ? "bg-primary text-white" : "bg-white text-gray-700 hover:bg-primary hover:text-white"
            ),
            children: n
          },
          n
        )),
        /* @__PURE__ */ jsx26(
          "button",
          {
            type: "button",
            onClick: () => setPage((p) => Math.min(totalPages, p + 1)),
            disabled: page === totalPages,
            "aria-label": "Page suivante",
            className: cn(pageBtn, "text-gray-700 hover:bg-primary hover:text-white disabled:opacity-50"),
            children: /* @__PURE__ */ jsx26(ChevronRight, { size: 18, "aria-hidden": "true" })
          }
        )
      ] })
    ] }) }),
    /* @__PURE__ */ jsx26("section", { className: "bg-white py-16", children: /* @__PURE__ */ jsxs22("div", { className: "container mx-auto px-4", children: [
      /* @__PURE__ */ jsx26(SectionHeading_default, { title: "Nos Vid\xE9os", description: "Revivez nos \xE9v\xE9nements \xE0 travers ces vid\xE9os" }),
      /* @__PURE__ */ jsx26("div", { className: "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3", children: videos.map((video) => /* @__PURE__ */ jsxs22("article", { className: "overflow-hidden rounded-lg bg-gray-50 shadow-md", children: [
        /* @__PURE__ */ jsxs22(
          "video",
          {
            controls: true,
            preload: "none",
            poster: VIDEO_POSTER,
            className: "aspect-video w-full bg-gray-200 object-cover",
            children: [
              /* @__PURE__ */ jsx26("source", { src: video.src, type: "video/mp4" }),
              "Votre navigateur ne supporte pas la lecture de vid\xE9os."
            ]
          }
        ),
        /* @__PURE__ */ jsxs22("div", { className: "p-6", children: [
          /* @__PURE__ */ jsx26("h3", { className: "mb-2 text-xl font-bold text-primary", children: video.title }),
          /* @__PURE__ */ jsx26("p", { className: "mb-2 text-gray-600", children: video.desc }),
          video.date && /* @__PURE__ */ jsx26("p", { className: "text-sm text-gray-600", children: /* @__PURE__ */ jsx26("time", { dateTime: video.date, children: formatLongDate(video.date) }) })
        ] })
      ] }, video.title)) })
    ] }) })
  ] });
};
var Galerie_default = Galerie;

// src/components/ContactForm.tsx
import { useState as useState7 } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

// src/components/ui/button.tsx
import * as React3 from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva as cva2 } from "class-variance-authority";
import { jsx as jsx27 } from "react/jsx-runtime";
var buttonVariants = cva2(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);
var Button = React3.forwardRef(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return /* @__PURE__ */ jsx27(
      Comp,
      {
        className: cn(buttonVariants({ variant, size, className })),
        ref,
        ...props
      }
    );
  }
);
Button.displayName = "Button";

// src/components/ui/input.tsx
import * as React4 from "react";
import { jsx as jsx28 } from "react/jsx-runtime";
var Input = React4.forwardRef(
  ({ className, type, ...props }, ref) => {
    return /* @__PURE__ */ jsx28(
      "input",
      {
        type,
        className: cn(
          "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        ),
        ref,
        ...props
      }
    );
  }
);
Input.displayName = "Input";

// src/components/ui/textarea.tsx
import * as React5 from "react";
import { jsx as jsx29 } from "react/jsx-runtime";
var Textarea = React5.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx29(
    "textarea",
    {
      className: cn(
        "flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      ),
      ref,
      ...props
    }
  );
});
Textarea.displayName = "Textarea";

// src/components/ContactForm.tsx
import { jsx as jsx30, jsxs as jsxs23 } from "react/jsx-runtime";
var schema = z.object({
  name: z.string().trim().min(2, "Le nom doit contenir au moins 2 caract\xE8res"),
  email: z.string().trim().email("Veuillez entrer une adresse email valide"),
  subject: z.string().trim().min(5, "Le sujet doit contenir au moins 5 caract\xE8res"),
  message: z.string().trim().min(10, "Le message doit contenir au moins 10 caract\xE8res"),
  website: z.string().max(0).optional()
  // champ piège anti-robots
});
var Field = ({ id, label, error, children }) => /* @__PURE__ */ jsxs23("div", { children: [
  /* @__PURE__ */ jsx30("label", { htmlFor: id, className: "mb-1 block text-sm font-medium text-gray-700", children: label }),
  children,
  error && /* @__PURE__ */ jsx30("p", { id: `${id}-error`, role: "alert", className: "mt-1 text-sm text-red-600", children: error })
] });
var ContactForm = () => {
  const { toast: toast2 } = useToast();
  const [sending, setSending] = useState7(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm({ resolver: zodResolver(schema) });
  const onSubmit = async (values2) => {
    if (values2.website) return;
    setSending(true);
    try {
      const result = await sendContactMessage({
        name: values2.name,
        email: values2.email,
        subject: values2.subject,
        message: values2.message
      });
      toast2({
        title: result === "sent" ? "Message envoy\xE9" : "Presque termin\xE9",
        description: result === "sent" ? "Nous vous r\xE9pondrons dans les plus brefs d\xE9lais." : "Votre application de messagerie s'ouvre : validez l'envoi du message pr\xE9-rempli."
      });
      reset();
    } catch (error) {
      console.error(error);
      toast2({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'envoi du message. Veuillez r\xE9essayer.",
        variant: "destructive"
      });
    } finally {
      setSending(false);
    }
  };
  const describe = (id, hasError) => hasError ? `${id}-error` : void 0;
  return /* @__PURE__ */ jsxs23("form", { onSubmit: handleSubmit(onSubmit), noValidate: true, className: "space-y-5", children: [
    /* @__PURE__ */ jsxs23("div", { className: "grid grid-cols-1 gap-5 sm:grid-cols-2", children: [
      /* @__PURE__ */ jsx30(Field, { id: "contact-name", label: "Nom", error: errors.name?.message, children: /* @__PURE__ */ jsx30(
        Input,
        {
          id: "contact-name",
          autoComplete: "name",
          placeholder: "Votre nom complet",
          "aria-invalid": !!errors.name,
          "aria-describedby": describe("contact-name", !!errors.name),
          ...register("name")
        }
      ) }),
      /* @__PURE__ */ jsx30(Field, { id: "contact-email", label: "Email", error: errors.email?.message, children: /* @__PURE__ */ jsx30(
        Input,
        {
          id: "contact-email",
          type: "email",
          autoComplete: "email",
          placeholder: "Votre adresse email",
          "aria-invalid": !!errors.email,
          "aria-describedby": describe("contact-email", !!errors.email),
          ...register("email")
        }
      ) })
    ] }),
    /* @__PURE__ */ jsx30(Field, { id: "contact-subject", label: "Sujet", error: errors.subject?.message, children: /* @__PURE__ */ jsx30(
      Input,
      {
        id: "contact-subject",
        placeholder: "Sujet de votre message",
        "aria-invalid": !!errors.subject,
        "aria-describedby": describe("contact-subject", !!errors.subject),
        ...register("subject")
      }
    ) }),
    /* @__PURE__ */ jsx30(Field, { id: "contact-message", label: "Message", error: errors.message?.message, children: /* @__PURE__ */ jsx30(
      Textarea,
      {
        id: "contact-message",
        rows: 5,
        placeholder: "Votre message...",
        "aria-invalid": !!errors.message,
        "aria-describedby": describe("contact-message", !!errors.message),
        ...register("message")
      }
    ) }),
    /* @__PURE__ */ jsx30("div", { className: "absolute -left-[9999px]", "aria-hidden": "true", children: /* @__PURE__ */ jsx30("input", { type: "text", tabIndex: -1, autoComplete: "off", ...register("website") }) }),
    /* @__PURE__ */ jsx30(Button, { type: "submit", size: "lg", disabled: sending, className: "bg-primary px-8 font-bold text-white hover:bg-primary-light", children: sending ? "Envoi en cours..." : "Envoyer le message" })
  ] });
};
var ContactForm_default = ContactForm;

// src/pages/Contact.tsx
import { Fragment as Fragment6, jsx as jsx31, jsxs as jsxs24 } from "react/jsx-runtime";
var Contact = () => {
  usePageMeta("Contact");
  return /* @__PURE__ */ jsxs24(Fragment6, { children: [
    /* @__PURE__ */ jsx31(
      PageHeader_default,
      {
        title: "Contactez-Nous",
        description: "Vous avez des questions ou souhaitez rejoindre notre dahira? N'h\xE9sitez pas \xE0 nous contacter"
      }
    ),
    /* @__PURE__ */ jsx31("section", { className: "bg-white py-16 md:py-24", children: /* @__PURE__ */ jsx31("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsxs24("div", { className: "mx-auto grid max-w-5xl grid-cols-1 gap-12 lg:grid-cols-2", children: [
      /* @__PURE__ */ jsxs24("div", { children: [
        /* @__PURE__ */ jsx31("h2", { className: "mb-6 font-lora text-2xl font-semibold text-primary", children: "Envoyez-nous un message" }),
        /* @__PURE__ */ jsx31(ContactForm_default, {})
      ] }),
      /* @__PURE__ */ jsx31(ContactInfo_default, { headingAs: "h2" })
    ] }) }) }),
    /* @__PURE__ */ jsx31("section", { className: "bg-gray-50 py-16", children: /* @__PURE__ */ jsx31("div", { className: "container mx-auto px-4 md:px-6", children: /* @__PURE__ */ jsx31("div", { className: "mx-auto max-w-5xl", children: /* @__PURE__ */ jsx31(LocationMap_default, { className: "h-96" }) }) }) })
  ] });
};
var Contact_default = Contact;

// src/App.tsx
import { Fragment as Fragment7, jsx as jsx32, jsxs as jsxs25 } from "react/jsx-runtime";
function ScrollToTop() {
  const [location] = useLocation2();
  useEffect6(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return null;
}
function App() {
  return /* @__PURE__ */ jsxs25(Fragment7, { children: [
    /* @__PURE__ */ jsx32(
      "a",
      {
        href: "#contenu",
        className: "sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-white focus:px-4 focus:py-2 focus:text-primary",
        children: "Aller au contenu"
      }
    ),
    /* @__PURE__ */ jsx32(Toaster, {}),
    /* @__PURE__ */ jsx32(ScrollToTop, {}),
    /* @__PURE__ */ jsxs25("div", { className: "flex min-h-screen flex-col", children: [
      /* @__PURE__ */ jsx32(Header_default, {}),
      /* @__PURE__ */ jsx32("main", { id: "contenu", tabIndex: -1, className: "flex-grow focus:outline-none", children: /* @__PURE__ */ jsxs25(Switch, { children: [
        /* @__PURE__ */ jsx32(Route, { path: "/", component: Home_default }),
        /* @__PURE__ */ jsx32(Route, { path: "/a-propos", component: AboutUs_default }),
        /* @__PURE__ */ jsx32(Route, { path: "/activites", component: Activites_default }),
        /* @__PURE__ */ jsx32(Route, { path: "/evenements", component: Evenements_default }),
        /* @__PURE__ */ jsx32(Route, { path: "/galerie", component: Galerie_default }),
        /* @__PURE__ */ jsx32(Route, { path: "/contact", component: Contact_default }),
        /* @__PURE__ */ jsx32(Route, { component: NotFound })
      ] }) }),
      /* @__PURE__ */ jsx32(Footer_default, {}),
      /* @__PURE__ */ jsx32(BackToTop_default, {})
    ] })
  ] });
}
var App_default = App;

// _smoke.tsx
import { jsx as jsx33 } from "react/jsx-runtime";
var paths = ["/", "/a-propos", "/activites", "/evenements", "/galerie", "/contact", "/inexistant"];
var bad = 0;
for (const p of paths) {
  const html = renderToString(/* @__PURE__ */ jsx33(Router, { ssrPath: p, children: /* @__PURE__ */ jsx33(App_default, {}) }));
  const nested = /<a [^>]*>(?:(?!<\/a>).)*<a /s.test(html);
  const h1 = (html.match(/<h1/g) || []).length;
  const hashLinks = (html.match(/href="#"/g) || []).length;
  console.log(p.padEnd(13), "bytes", String(html.length).padEnd(7), "h1:", h1, "nested<a>:", nested, 'href="#":', hashLinks);
  if (nested || h1 !== 1 || hashLinks) bad++;
}
var home = renderToString(/* @__PURE__ */ jsx33(Router, { ssrPath: "/", children: /* @__PURE__ */ jsx33(App_default, {}) }));
console.log("home has empty-events msg:", home.includes("Aucun \xE9v\xE9nement"));
console.log("contact has form:", renderToString(/* @__PURE__ */ jsx33(Router, { ssrPath: "/contact", children: /* @__PURE__ */ jsx33(App_default, {}) })).includes('id="contact-message"'));
process.exit(bad ? 1 : 0);
