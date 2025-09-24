import React, { useMemo, useState } from "react";
import './App.css'
import { CONTACT_INFO } from "./config";


// Single‑file React site for Batllava Solutions with EN/SQ language toggle.
// TailwindCSS recommended. Replace placeholder gallery images later as desired.

export default function BatllavaSite() {
  const [route, setRoute] = useState("home");
  const [showMobileNav, setShowMobileNav] = useState(false);
  const [lang, setLang] = useState<"en" | "sq">("en");

  const t = (key: keyof typeof copy.en) => copy[lang][key] as string;

  const pages = [
    { id: "home", label: t("nav_home") },
    { id: "services", label: t("nav_services") },
    { id: "gallery", label: t("nav_gallery") },
    { id: "about", label: t("nav_about") },
    { id: "book", label: t("nav_book") },
    { id: "contact", label: t("nav_contact") },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <TopBar onCta={() => setRoute("book")} lang={lang} t={t} />
      <Header
        route={route}
        setRoute={setRoute}
        pages={pages}
        showMobileNav={showMobileNav}
        setShowMobileNav={setShowMobileNav}
        lang={lang}
        setLang={setLang}
      />

      {route === "home" && (
        <Home onPrimary={() => setRoute("book")} onSecondary={() => setRoute("gallery")} t={t} />
      )}
      {route === "services" && <Services t={t} />}
      {route === "gallery" && <Gallery t={t} />}
      {route === "about" && <About t={t} />}
      {route === "book" && <Booking t={t} />}
      {route === "contact" && <Contact t={t} />}

      <Footer setRoute={setRoute} t={t} />
      <SchemaOrgJSONLD />
    </div>
  );
}

function TopBar({ onCta, t, lang }: { onCta: () => void; t: any; lang: "en" | "sq" }) {
  return (
    <div className="w-full bg-gray-50 border-b border-gray-200 text-sm">
      <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
        <p className="text-gray-600">
          {t("topbar_service_area")} • {t("topbar_from_batllava")}
        </p>
        <div className="flex items-center gap-4">
          <a href="tel:+38344444444" className="text-gray-700 hover:underline">044 259 974</a>
          <a href="mailto:kqyrpak@gmail.com" className="text-gray-700 hover:underline">batllavasolutions@gmail.com</a>
          <button onClick={onCta} className="hidden sm:inline-flex rounded-xl px-3 py-1.5 bg-gray-900 text-white hover:bg-black transition">
            {t("cta_book")}
          </button>
        </div>
      </div>
    </div>
  );
}

function Header({ route, setRoute, pages, showMobileNav, setShowMobileNav, lang, setLang }: any) {
  return (
    <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-xl bg-gray-900 text-white flex items-center justify-center font-semibold">B</div>
          <div className="leading-tight">
            <div className="font-semibold text-lg">Batllava Solutions</div>
            <div className="text-xs text-gray-500">{lang === "en" ? "Bathrooms • Tiling • Renovations" : "Banjo • Plaka • Rinovime"}</div>
          </div>
        </div>
        <nav className="hidden md:flex items-center gap-1">
          {pages.map((p: any) => (
            <button
              key={p.id}
              onClick={() => setRoute(p.id)}
              className={`px-3 py-2 rounded-xl text-sm transition ${route === p.id ? "bg-gray-900 text-white" : "text-gray-700 hover:bg-gray-100"}`}
              aria-current={route === p.id ? "page" : undefined}
            >
              {p.label}
            </button>
          ))}
          <div className="ml-3">
            <LangSwitch lang={lang} setLang={setLang} />
          </div>
        </nav>
        <div className="md:hidden flex items-center gap-2">
          <LangSwitch lang={lang} setLang={setLang} />
          <button className="p-2 rounded-lg border border-gray-300" onClick={() => setShowMobileNav((v: boolean) => !v)} aria-label="Open navigation">
            ☰
          </button>
        </div>
      </div>
      {showMobileNav && (
        <div className="md:hidden border-t border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 py-2 grid grid-cols-2 gap-2">
            {pages.map((p: any) => (
              <button key={p.id} onClick={() => { setRoute(p.id); setShowMobileNav(false); }} className={`px-3 py-2 rounded-xl text-sm text-left ${route === p.id ? "bg-gray-900 text-white" : "bg-gray-50"}`}>
                {p.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}

function LangSwitch({ lang, setLang }: { lang: "en" | "sq"; setLang: (l: "en" | "sq") => void; }) {
  return (
    <div className="inline-flex rounded-lg border border-gray-300 overflow-hidden">
      <button onClick={() => setLang("en")} className={`px-3 py-1 text-sm ${lang === "en" ? "bg-gray-900 text-white" : "bg-white"}`}>EN</button>
      <button onClick={() => setLang("sq")} className={`px-3 py-1 text-sm ${lang === "sq" ? "bg-gray-900 text-white" : "bg-white"}`}>SQ</button>
    </div>
  );
}

function Home({ onPrimary, onSecondary, t }: { onPrimary: () => void; onSecondary: () => void; t: any }) {
  return (
    <main>
      <section className="bg-gradient-to-b from-gray-50 to-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-semibold tracking-tight text-gray-900">
              {t("hero_title")}
            </h1>
            <p className="mt-4 text-lg text-gray-600">
              {t("hero_sub")}
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button onClick={onPrimary} className="rounded-2xl px-5 py-3 bg-gray-900 text-white hover:bg-black transition">
                {t("cta_book")}
              </button>
              <button onClick={onSecondary} className="rounded-2xl px-5 py-3 bg-gray-100 text-gray-900 hover:bg-gray-200 transition">
                {t("cta_gallery")}
              </button>
            </div>
            <div className="mt-8 flex items-center gap-6 text-sm text-gray-600">
              <div>{t("badge_kosovo")}</div>
              <div className="w-px h-4 bg-gray-300" />
              <div>{t("badge_insured")}</div>
              <div className="w-px h-4 bg-gray-300" />
              <div>{t("badge_free_assessment")}</div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/4] w-full rounded-3xl bg-gray-200 border border-gray-300 overflow-hidden">
              <img src="https://res.cloudinary.com/dydmdktay/image/upload/ar_1:1,c_auto,g_auto/Photo1_ojwvaz.jpg" alt="Minimalist tiled bathroom with walk-in shower" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-6 left-6 bg-white rounded-2xl shadow-lg border border-gray-200 p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-xl bg-gray-900 text-white flex items-center justify-center">✓</div>
              <div className="text-sm">
                <div className="font-medium">{t("card_turnkey_title")}</div>
                <div className="text-gray-600">{t("card_turnkey_sub")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <USPStrip t={t} />
      <ServicesPreview t={t} />
      <Process t={t} />
      <CTA t={t} />
    </main>
  );
}

function USPStrip({ t }: { t: any }) {
  const items = [
    { title: t("usp_one_title"), desc: t("usp_one_desc") },
    { title: t("usp_two_title"), desc: t("usp_two_desc") },
    { title: t("usp_three_title"), desc: t("usp_three_desc") },
  ];
  return (
    <section className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-6">
        {items.map((it) => (
          <div key={it.title} className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
            <div className="font-semibold text-gray-900">{it.title}</div>
            <div className="text-gray-600 mt-2 text-sm">{it.desc}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ServicesPreview({ t }: { t: any }) {
  const services = [
    {
      title: t("svc_full_title"),
      desc: t("svc_full_desc"),
      img: "https://images.unsplash.com/photo-1600566752191-8d5e13d11381?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: t("svc_tiling_title"),
      desc: t("svc_tiling_desc"),
      img: "https://images.unsplash.com/photo-1591843337132-ad2f87f2f7e0?q=80&w=1600&auto=format&fit=crop",
    },
    {
      title: t("svc_plumbing_title"),
      desc: t("svc_plumbing_desc"),
      img: "https://images.unsplash.com/photo-1586401100295-7a8096fd2316?q=80&w=1600&auto=format&fit=crop",
    },
  ];
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-gray-900">{t("services_h2")}</h2>
        <p className="mt-2 text-gray-600 max-w-2xl">{t("services_intro")}</p>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {services.map((s) => (
            <article key={s.title} className="rounded-2xl overflow-hidden border border-gray-200 bg-white">
              <div className="aspect-[4/3] bg-gray-100">
                <img className="w-full h-full object-cover" src={s.img} alt={s.title} />
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-gray-900">{s.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{s.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process({ t }: { t: any }) {
  const steps = [
    { step: 1, title: t("proc_1_t"), desc: t("proc_1_d") },
    { step: 2, title: t("proc_2_t"), desc: t("proc_2_d") },
    { step: 3, title: t("proc_3_t"), desc: t("proc_3_d") },
    { step: 4, title: t("proc_4_t"), desc: t("proc_4_d") },
  ];
  return (
    <section className="bg-gray-50 border-y border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-semibold text-gray-900">{t("process_h2")}</h2>
        <div className="mt-8 grid md:grid-cols-4 gap-6">
          {steps.map((s) => (
            <div key={s.step} className="rounded-2xl bg-white border border-gray-200 p-6">
              <div className="text-xs text-gray-500">{t("step")} {s.step}</div>
              <div className="font-semibold mt-1">{s.title}</div>
              <div className="text-sm text-gray-600 mt-2">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTA({ t }: { t: any }) {
  return (
    <section className="bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 rounded-3xl border border-gray-200 bg-gray-50">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h3 className="text-2xl font-semibold text-gray-900">{t("cta_block_title")}</h3>
            <p className="text-gray-600 mt-2">{t("cta_block_sub")}</p>
          </div>
          <div className="flex gap-3 md:justify-end">
            <a href="#book" onClick={(e) => { e.preventDefault(); document.getElementById("route-book")?.scrollIntoView({ behavior: "smooth" }); }} className="rounded-2xl px-5 py-3 bg-gray-900 text-white hover:bg-black text-center">
              {t("cta_book")}
            </a>
            <a href="#contact" onClick={(e) => { e.preventDefault(); document.getElementById("route-contact")?.scrollIntoView({ behavior: "smooth" }); }} className="rounded-2xl px-5 py-3 bg-white border border-gray-300 text-gray-900 text-center">
              {t("cta_contact")}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

function Services({ t }: { t: any }) {
  const offerings = [
    { title: t("svc_full_title"), bullets: t("svc_full_bullets").split("|") },
    { title: t("svc_tiling_title"), bullets: t("svc_tiling_bullets").split("|") },
    { title: t("svc_plumbing_title"), bullets: t("svc_plumbing_bullets").split("|") },
    { title: t("svc_repairs_title"), bullets: t("svc_repairs_bullets").split("|") },
  ];

  return (
    <main id="route-services">
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">{t("services_h1")}</h1>
          <p className="mt-3 text-gray-600 max-w-2xl">{t("services_body")}</p>
          <div className="mt-10 grid md:grid-cols-2 gap-6">
            {offerings.map((o) => (
              <div key={o.title} className="rounded-2xl border border-gray-200 p-6 bg-gray-50">
                <h2 className="font-semibold text-gray-900">{o.title}</h2>
                <ul className="mt-3 text-sm text-gray-700 list-disc pl-5 space-y-1">
                  {o.bullets.map((b: string) => (<li key={b}>{b}</li>))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function Gallery({ t }: { t: any }) {
  const items = [
    { src: "https://images.unsplash.com/photo-1584624274494-c20783a7a24a?q=80&w=1600&auto=format&fit=crop", alt: t("gal_1") },
    { src: "https://images.unsplash.com/photo-1600490036275-35f7aa3c8077?q=80&w=1600&auto=format&fit=crop", alt: t("gal_2") },
    { src: "https://images.unsplash.com/photo-1552324190-9e86fa095c4a?q=80&w=1600&auto=format&fit=crop", alt: t("gal_3") },
    { src: "https://images.unsplash.com/photo-1598300106895-4cbb3b98e525?q=80&w=1600&auto=format&fit=crop", alt: t("gal_4") },
    { src: "https://images.unsplash.com/photo-1598300053653-828bc3d793fc?q=80&w=1600&auto=format&fit=crop", alt: t("gal_5") },
    { src: "https://images.unsplash.com/photo-1574701146989-1cce10d3c2c7?q=80&w=1600&auto=format&fit=crop", alt: t("gal_6") },
  ];
  return (
    <main id="route-gallery">
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">{t("gallery_h1")}</h1>
          <p className="mt-2 text-gray-600">{t("gallery_body")}</p>
          <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {items.map((it) => (
              <figure key={it.src} className="group rounded-2xl overflow-hidden border border-gray-200 bg-gray-100">
                <img src={it.src} alt={it.alt} className="w-full h-60 object-cover group-hover:scale-[1.02] transition" />
                <figcaption className="p-3 text-sm text-gray-600">{it.alt}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

function About({ t }: { t: any }) {
  return (
    <main id="route-about">
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">{t("about_h1")}</h1>
            <p className="mt-4 text-gray-700">
              {t("about_p1")}
            </p>
            <p className="mt-4 text-gray-700">
              {t("about_p2")}
            </p>
            <ul className="mt-6 text-gray-700 list-disc pl-5 space-y-2">
              <li>{t("about_b1")}</li>
              <li>{t("about_b2")}</li>
              <li>{t("about_b3")}</li>
              <li>{t("about_b4")}</li>
            </ul>
          </div>
          <div>
            <div className="aspect-[4/3] w-full rounded-3xl bg-gray-200 border border-gray-300 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1523419409543-a7ea0c43d887?q=80&w=1600&auto=format&fit=crop" alt="Craftsman installing tile with precision" className="w-full h-full object-cover" />
            </div>
            <div className="mt-4 text-sm text-gray-600">
              {t("about_note")}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
function Booking({ t }: { t: any }) {
  const [status, setStatus] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    city: "",
    date: "",
    projectType: "Full Renovation",
    details: "",
    consent: false,
  });

async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!form.name || !form.phone || !form.email || !form.city || !form.date || !form.consent) {
    setStatus(t("book_error"));
    return;
  }

  // Build FormData for Google Form
  const fd = new FormData();
  fd.append("entry.1732573222", form.name);             // Name
  fd.append("entry.1689525553", form.phone);            // Phone
  fd.append("entry.1416839458", form.email);            // Email
  fd.append("entry.1961125892", form.city);             // City
  fd.append("entry.1388871214", form.date);             // Preferred Date/Time
  fd.append("entry.762756978", form.projectType);       // Project Type (must match option text in Google Form)
  fd.append("entry.918524863", form.details);           // Details
  fd.append("entry.1574231071", form.consent ? "Yes" : "No"); // Consent

  try {
    await fetch(
      "https://docs.google.com/forms/d/e/1FAIpQLScXS6IAQDtHT3pl0iLHDbWopWXGir83Pv0vEY6bU-o9-Ty05Q/formResponse",
      {
        method: "POST",
        mode: "no-cors", // ✅ Required, since Google Forms doesn't send CORS headers
        body: fd,
      }
    );

    // Optimistic success (we can't read response because of no-cors)
    setStatus(t("book_success"));
    setForm({
      name: "",
      phone: "",
      email: "",
      city: "",
      date: "",
      projectType: "Full Renovation",
      details: "",
      consent: false,
    });
  } catch (err) {
    console.error(err);
    setStatus(t("book_error_generic"));
  }
}


  return (
    <main id="route-book">
      <section className="bg-white">
        <div className="max-w-3xl mx-auto px-4 py-16">
          <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">{t("book_h1")}</h1>
          <p className="mt-2 text-gray-600">{t("book_intro")}</p>
          <div className="mt-3 text-xs text-gray-500">{t("book_rules")}</div>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            {/* Name + Phone */}
            <div className="grid md:grid-cols-2 gap-5">
              <Field label={t("field_name")} required>
                <input className="input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("ph_name")} />
              </Field>
              <Field label={t("field_phone")} required>
                <input className="input" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder={t("ph_number")}/>
              </Field>
            </div>

            {/* Email + City */}
            <div className="grid md:grid-cols-2 gap-5">
              <Field label={t("field_email")} required>
                <input type="email" className="input" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="kqyrpak@gmail.com" />
              </Field>
              <Field label={t("field_city")} required>
                <input className="input" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} placeholder={t("ph_city")} />
              </Field>
            </div>

            {/* Date + Project type */}
            <div className="grid md:grid-cols-2 gap-5">
              <Field label={t("field_datetime")} required>
                <input type="datetime-local" className="input" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </Field>
              <Field label={t("field_project_type")}>
                <select
                  className="input"
                  value={form.projectType}
                  onChange={(e) => {
                    console.log("Selected project type value:", e.target.value);
                    setForm({ ...form, projectType: e.target.value });
                  }}
                >
                  <option value="Full Renovation">{t("opt_full")}</option>
                  <option value="Tiling">{t("opt_tiling")}</option>
                  <option value="Plumbing">{t("opt_plumbing")}</option>
                  <option value="Repairs">{t("opt_repairs")}</option>
                </select>
              </Field>
            </div>

            {/* Details */}
            <Field label={t("field_details")}>
              <textarea className="input min-h-[120px]" value={form.details} onChange={(e) => setForm({ ...form, details: e.target.value })} placeholder={t("ph_details")} />
            </Field>

            {/* Consent */}
            <label className="flex items-start gap-3 text-sm text-gray-700">
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-1" />
              <span>
                {t("consent")} <span className="text-gray-500">({t("required")})</span>
              </span>
            </label>

            {/* Submit */}
            <div className="flex items-center gap-3">
              <button type="submit" className="rounded-2xl px-5 py-3 bg-gray-900 text-white hover:bg-black">{t("book_submit")}</button>
              <div className="text-xs text-gray-500">{t("timezone_note")}</div>
            </div>

            {/* Status */}
            {status && <div className="text-sm text-gray-700 bg-gray-50 border border-gray-200 rounded-xl p-3">{status}</div>}
          </form>

          <div className="mt-10 text-xs text-gray-500">
            {t("book_tip")}
          </div>
        </div>
      </section>
    </main>
  );
}

function Contact({ t }: { t: any }) {
  const [status, setStatus] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const CONTACT_FORM = {
  action: "https://docs.google.com/forms/d/e/1FAIpQLScysDborhocrtjYX3AErcASsB9yzy7lY84ah3a0xK29lKJK9w/formResponse",
  fields: {
    name: "entry.1156589676",
    email: "entry.1362548099",
    phone: "entry.1773631402",
    message: "entry.1524515684",
  },
} as const;

 async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();
  if (!form.name || !form.email || !form.message) {
    setStatus(t("contact_error"));
    return;
  }

  const fd = new FormData();
  fd.append(CONTACT_FORM.fields.name, form.name);
  fd.append(CONTACT_FORM.fields.email, form.email);
  fd.append(CONTACT_FORM.fields.phone, form.phone || "");
  fd.append(CONTACT_FORM.fields.message, form.message);

  // Debug: see exactly what’s being sent
  for (const [key, value] of fd.entries()) {
    console.log("Contact payload:", key, value);
  }

  try {
    await fetch(CONTACT_FORM.action, {
      method: "POST",
      mode: "no-cors", // Google Forms requires this
      body: fd,
    });

    setStatus(t("contact_success")); // optimistic success
    setForm({ name: "", email: "", phone: "", message: "" });
  } catch (err) {
    console.error(err);
    setStatus(t("contact_error_generic"));
  }
}


  return (
    <main id="route-contact">
      <section className="bg-white">
        <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-start">
          {/* Left Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900">{t("contact_h1")}</h1>
            <p className="mt-3 text-gray-600">{t("contact_intro")}</p>
            <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50 p-6 text-gray-800">
              <dl className="grid grid-cols-3 gap-4 text-sm">
                <div className="col-span-3"><span className="font-medium">{t("label_phone")}: </span>{CONTACT_INFO.phoneDisplay}</div>
                <div className="col-span-3"><span className="font-medium">Email:</span> <a href="mailto:kqyrpak@gmail.com" className="hover:underline">{CONTACT_INFO.email}</a></div>
                <div className="col-span-3"><span className="font-medium">{t("label_service_area")}:</span> {t("contact_area_text")}</div>
                <div className="col-span-3"><span className="font-medium">{t("label_hours")}:</span> {t("hours_text")}</div>
                <div className="col-span-3 flex items-center gap-3"><span className="font-medium"></span> <a className="hover:underline" href={CONTACT_INFO.whatsapp} target="_blank" rel="noreferrer">WhatsApp</a> <span>•</span> <a className="hover:underline" href={CONTACT_INFO.viber}>Viber</a></div>
              </dl>
            </div>
          </div>

          {/* Contact Form */}
          <form onSubmit={handleSubmit} className="rounded-2xl border border-gray-200 p-6 bg-gray-50 grid gap-4">
            <Field label={t("field_name")} required>
              <input className="input" placeholder={t("ph_name")} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Email" required>
              <input type="email" className="input" placeholder={t("ph_email")} value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
            </Field>
            <Field label={t("field_phone")}>
              <input className="input" placeholder={t("ph_number")} value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <Field label={t("field_message")} required>
              <textarea className="input min-h-[140px]" placeholder={t("ph_message")} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
            </Field>
            <button type="submit"  className="rounded-2xl px-5 py-3 bg-gray-900 text-white hover:bg-black">{t("contact_submit")}</button>
            {status && <div className="text-sm text-gray-700 bg-white border border-gray-200 rounded-xl p-3">{status}</div>}
          </form>
        </div>
      </section>
    </main>
  );
}

function Footer({ setRoute, t }: { setRoute: (r: string) => void; t: any }) {
  return (
    <footer className="mt-16 border-top border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 py-12 grid md:grid-cols-4 gap-10 text-sm">
        <div className="col-span-2">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gray-900 text-white flex items-center justify-center font-semibold">B</div>
            <div className="font-semibold text-gray-900">Batllava Solutions</div>
          </div>
          <p className="mt-3 text-gray-600 max-w-md">{t("footer_blurb")}</p>
        </div>
        <div>
          <div className="font-semibold text-gray-900">{t("footer_explore")}</div>
          <ul className="mt-3 space-y-2">
            {[
              [t("nav_home"), "home"],
              [t("nav_services"), "services"],
              [t("nav_gallery"), "gallery"],
              [t("nav_about"), "about"],
              [t("nav_book"), "book"],
              [t("nav_contact"), "contact"],
            ].map(([label, id]) => (
              <li key={String(id)}>
                <button onClick={() => setRoute(String(id))} className="hover:underline text-gray-700">{label}</button>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="font-semibold text-gray-900">{t("footer_contact")}</div>
          <ul className="mt-3 space-y-2 text-gray-700">
            <li>{t("label_phone")}: <a className="hover:underline" href="tel:+38344259979">044 259 979</a></li>
            <li>Email: <a className="hover:underline" href="mailto:kqyrpak@gmail.com">batllavasolutions@gmail.com</a></li>
            <li>{t("label_service_area")}: {t("contact_area_text")}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6 text-xs text-gray-500 flex flex-wrap items-center justify-between gap-3">
          <div>© {new Date().getFullYear()} Batllava Solutions. {t("rights")}</div>
          {/* No legal pages for now per client instructions */}
        </div>
      </div>
    </footer>
  );
}

function Field({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-sm font-medium text-gray-800">{label} {required && <span className="text-gray-500">*</span>}</div>
      <div className="mt-1">{children}</div>
    </label>
  );
}

const style = document.createElement("style");
style.innerHTML = `.input{width:100%;border-radius:0.75rem;border:1px solid #D1D5DB;background:#fff;padding:0.625rem 0.75rem;color:#111827} .input:focus{outline:none;box-shadow:0 0 0 2px #D1D5DB}`;
document.head.appendChild(style);

function SchemaOrgJSONLD() {
  const json = useMemo(() => ({
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Batllava Solutions",
    image: [
      "https://images.unsplash.com/photo-1616594039964-ae9021a400a0?q=80&w=1600&auto=format&fit=crop",
    ],
    description:
      "Complete bathroom renovations and expert tiling across Kosovo. From scratch to everything—design, build, and finish by one expert team.",
    areaServed: "Kosovo",
    address: {
      "@type": "PostalAddress",
      addressCountry: "XK",
      addressLocality: "Batllava",
    },
    telephone: "+383 44 444 444",
    email: "kqyrpak@gmail.com",
    openingHours: ["Mo-Sa 09:00-17:00"],
    url: "https://batllavasolutions.com",
  }), []);

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(json) }} />
  );
}

const copy = {
  en: {
    nav_home: "Home",
    nav_services: "Services",
    nav_gallery: "Gallery",
    nav_about: "About",
    nav_book: "Book",
    nav_contact: "Contact",

    topbar_service_area: "Serving all of Kosovo",
    topbar_from_batllava: "From Batllava, nationwide",

    hero_title: "Complete Bathroom Renovations, Start to Finish",
    hero_sub: "From tiling and plumbing to finishing touches—we deliver turnkey bathrooms anywhere in Kosovo. Built by a master craftsman with 10+ years of experience.",
    cta_book: "Book a Consultation",
    cta_gallery: "View Gallery",
    badge_kosovo: "Nationwide in Kosovo",
    badge_insured: "Insured • Quality Guarantee",
    badge_free_assessment: "Free On‑Site Assessment",

    card_turnkey_title: "Turnkey delivery",
    card_turnkey_sub: "Design • Build • Finish",

    usp_one_title: "From scratch to everything",
    usp_one_desc: "One team handles plumbing, tiling, fixtures, and finishing—no handoffs, no delays.",
    usp_two_title: "Master craftsmanship",
    usp_two_desc: "10+ years of bathrooms delivered across Kosovo.",
    usp_three_title: "Transparent quotes",
    usp_three_desc: "Clear scope, timeline, and budget before work begins.",

    services_h2: "Services",
    services_intro: "From tiling and water systems to full renovations, we deliver durable, easy‑to‑maintain bathrooms.",

    process_h2: "Our Process",
    step: "Step",
    proc_1_t: "Free site visit",
    proc_1_d: "We inspect, measure, and discuss your goals.",
    proc_2_t: "Transparent quote",
    proc_2_d: "Scope, timeline, and fixed price to approve.",
    proc_3_t: "Build & coordinate",
    proc_3_d: "We handle every trade and protect your home.",
    proc_4_t: "Sign‑off & guarantee",
    proc_4_d: "Walkthrough, quality check, and after‑care.",

    cta_block_title: "Ready to transform your bathroom?",
    cta_block_sub: "Book a free consultation and on‑site assessment anywhere in Kosovo.",
    cta_contact: "Contact Us",

    services_h1: "Our Services",
    services_body: "We are problem‑solvers who deliver complete bathroom solutions—planned, built, and finished by the same expert team.",

    svc_full_title: "Turnkey Renovations",
    svc_full_desc: "Design to handover. Demolition, plumbing, electrical, waterproofing, tiling, fixtures, painting.",
    svc_tiling_title: "Expert Tiling",
    svc_tiling_desc: "Floors, walls, walk‑in showers. Large‑format, porcelain, mosaic, and natural stone.",
    svc_plumbing_title: "Plumbing & Water Systems",
    svc_plumbing_desc: "Piping, drains, mixers, hidden cisterns, water heaters, and leak prevention.",
    svc_repairs_title: "Repairs & Upgrades",
    svc_repairs_desc: "Regrouting, silicone, fixture replacements, conversions, ventilation.",

    svc_full_bullets: "Demolition & disposal|Plumbing & waterproofing|Electrical & lighting|Tiling & grout sealing|Fixtures, cabinetry, mirrors|Painting & finishing",
    svc_tiling_bullets: "Walls & floors|Walk‑in showers & niches|Large‑format & porcelain|Mosaic & natural stone|Heated floor preparation",
    svc_plumbing_bullets: "Supply & drain piping|Hidden cisterns & mixers|Water heaters & filtration|Leak testing & prevention",
    svc_repairs_bullets: "Regrouting & silicone|Fixture replacements|Shower & tub conversions|Ventilation improvements",

    gallery_h1: "Gallery",
    gallery_body: "Recent projects delivered around Kosovo. Replace these with your photos and short captions.",
    gal_1: "Walk‑in shower with frameless glass",
    gal_2: "Herringbone tile walls",
    gal_3: "Marble vanity top",
    gal_4: "Modern freestanding tub",
    gal_5: "Large‑format floor tiles",
    gal_6: "Minimalist bathroom with niche",

    about_h1: "About Batllava Solutions",
    about_p1: "Batllava Solutions was founded by a master craftsman with more than a decade of hands‑on experience delivering bathrooms across Kosovo. Our story is simple: do great work, communicate clearly, and stand behind every detail.",
    about_p2: "We coordinate every trade—from plumbing and tiling to fixtures and finishes—so you have a single team and a seamless result. That is our 'from scratch to everything' promise.",
    about_b1: "Nationwide service across Kosovo",
    about_b2: "Insured and safety‑compliant workmanship",
    about_b3: "Clear timelines and fixed‑price quotes",
    about_b4: "After‑care support and workmanship guarantee",
    about_note: "*Add founder name, credentials, and a short professional bio here.*",

    book_h1: "Book a Consultation",
    book_intro: "Free on‑site assessment, anywhere in Kosovo.",
    book_rules: "Working Hours: Mon–Sat 09:00–17:00. Please book at least 24 hours in advance. Emergency requests are accepted when possible.",
    field_name: "Full Name",
    field_phone: "Phone",
    field_email: "Email",
    field_city: "City",
    field_datetime: "Preferred Date & Time",
    field_project_type: "Project Type",
    field_details: "Project Details",
    field_message: "Message",
    ph_name: "Your name",
    ph_number:"Phone number",
    ph_email:"Email Address",
    ph_city: "Prishtina, Prizren, ...",
    ph_details: "Tell us about size, style, timeline, and any specific needs.",
    ph_message: "How can we help?",
    consent: "I agree to be contacted by Batllava Solutions about my project.",
    required: "Required",
    book_submit: "Request Booking",
    contact_submit:"Contact Us",
    book_email_subject: "New Consultation Request — Batllava Solutions",
    book_error: "Please complete all required fields and consent to be contacted.",
    book_email_open: "Thank you! Your email app should open now. We'll confirm shortly.",
    timezone_note: "Timezone: Europe/Pristina",
    book_tip: "Tip: We can integrate Google Calendar or Calendly later for automatic confirmations.",

    contact_h1: "Contact Us",
    contact_intro: "We respond quickly. For urgent questions, call or message us directly.",
    contact_error: "Please fill in your name, email, and message.",
    contact_email_open: "Thank you! Your email app should open now.",

    label_phone: "Phone",
    label_service_area: "Service Area",
    label_hours: "Hours",
    contact_area_text: "All of Kosovo (HQ: Batllava)",
    hours_text: "Mon–Sat 09:00–17:00",

    footer_blurb: "Complete bathroom renovations across Kosovo—from first measurement to final silicone line. Quality work, clear communication, guaranteed.",
    footer_explore: "Explore",
    footer_contact: "Contact",
    rights: "All rights reserved.",
  },
  sq: {
    nav_home: "Ballina",
    nav_services: "Shërbimet",
    nav_gallery: "Galeria",
    nav_about: "Rreth Nesh",
    nav_book: "Rezervo",
    nav_contact: "Kontakti",

    topbar_service_area: "Shërbejmë në tërë Kosovën",
    topbar_from_batllava: "Nga Batllava, në mbarë vendin",

    hero_title: "Rinovime të plota të banjës, nga fillimi deri në fund",
    hero_sub: "Nga pllakat dhe ujsjellësi te përfundimet — ne dorëzojmë banjo gati për përdorim kudo në Kosovë. Punuar nga mjeshtër me mbi 10 vite përvojë.",
    cta_book: "Rezervo Konsultim",
    cta_gallery: "Shiko Galerinë",
    badge_kosovo: "Në gjithë Kosovën",
    badge_insured: "Të siguruar • Cilësi e garantuar",
    badge_free_assessment: "Vlerësim falas në teren",

    card_turnkey_title: "Dorëzim çelësa në dorë",
    card_turnkey_sub: "Dizajnim • Ndërtim • Përfundim",

    usp_one_title: "Nga e para, deri në çdo gjë",
    usp_one_desc: "Një ekip merret me ujsjellësin, pllakat, pajisjet dhe përfundimet — pa vonesa.",
    usp_two_title: "Mjeshtëri e lartë",
    usp_two_desc: "Mbi 10 vite banjo të dorëzuara në gjithë Kosovën.",
    usp_three_title: "Ofertë transparente",
    usp_three_desc: "Përkufizim i qartë i punëve, afateve dhe buxhetit para se të fillojmë.",

    services_h2: "Shërbimet",
    services_intro: "Nga pllakat dhe sistemi i ujit te rinovimet e plota, dorëzojmë banjo të qëndrueshme dhe të lehta për mirëmbajtje.",

    process_h2: "Procesi Ynë",
    step: "Hapi",
    proc_1_t: "Vizitë falas në teren",
    proc_1_d: "Inspektojmë, masim dhe diskutojmë qëllimet tuaja.",
    proc_2_t: "Ofertë transparente",
    proc_2_d: "Përmasa, afatet dhe çmimi fiks për aprovim.",
    proc_3_t: "Ndërtim & koordinim",
    proc_3_d: "Menaxhojmë çdo profesion dhe mbrojmë shtëpinë tuaj.",
    proc_4_t: "Pranim & garanci",
    proc_4_d: "Kontroll cilësie dhe përkujdesje pas punimeve.",

    cta_block_title: "Gati ta transformojmë banjon tuaj?",
    cta_block_sub: "Rezervoni konsultim falas dhe vlerësim në çdo qytet të Kosovës.",
    cta_contact: "Na Kontaktoni",

    services_h1: "Shërbimet Tona",
    services_body: "Zgjidhim probleme dhe ofrojmë zgjidhje të plota për banjo — planifikuar, ndërtuar dhe përfunduar nga i njëjti ekip.",

    svc_full_title: "Rinovime të plota",
    svc_full_desc: "Nga dizajni në dorëzim. Shembje, ujsjellës, elektricitet, hidroizolim, pllaka, pajisje, lyerje.",
    svc_tiling_title: "Punime pllakash",
    svc_tiling_desc: "Dysheme, mure, dushë me ecje. Formate të mëdha, porcelan, mozaik dhe gur natyror.",
    svc_plumbing_title: "Ujsjellës & Sisteme uji",
    svc_plumbing_desc: "Tuba, kanalizim, miksera, kazane, cisterne të fshehura dhe parandalim rrjedhjesh.",
    svc_repairs_title: "Riparime & Përmirësime",
    svc_repairs_desc: "Rivendosje fugi e silikoni, zëvendësim pajisjesh, konvertime, ventilim.",

    svc_full_bullets: "Shembje & deponim|Ujsjellës & hidroizolim|Elektricitet & ndriçim|Pllaka & fugim|Pajisje, mobilje, pasqyra|Lyerje & përfundime",
    svc_tiling_bullets: "Mure & dysheme|Dushe me ecje & niche|Formate të mëdha & porcelan|Mozaik & gur natyror|Përgatitje për ngrohje dyshemeje",
    svc_plumbing_bullets: "Tuba furnizimi & kullimi|Cisterna të fshehura & miksera|Bojlerë & filtrime|Testim & parandalim rrjedhjesh",
    svc_repairs_bullets: "Rifugim & silikon|Zëvendësim pajisjesh|Konvertime dush/vaskë|Përmirësim ventilimi",

    gallery_h1: "Galeria",
    gallery_body: "Projekte të fundit nëpër Kosovë. Zëvendësoni këto me fotot tuaja dhe përshkrime të shkurtra.",
    gal_1: "Dush me xham pa kornizë",
    gal_2: "Mure me pllaka herringbone",
    gal_3: "Lavaman me sipërfaqe mermeri",
    gal_4: "Kadë moderne e pavarur",
    gal_5: "Pllaka dyshemeje format i madh",
    gal_6: "Banjo minimale me niche",

    about_h1: "Rreth Batllava Solutions",
    about_p1: "Batllava Solutions u themelua nga një mjeshtër me mbi një dekadë përvojë praktike në dorëzimin e banjove në gjithë Kosovën. Historia jonë është e thjeshtë: punë e mirë, komunikim i qartë dhe përgjegjësi për çdo detaj.",
    about_p2: "Koordinojmë çdo profesion — nga ujsjellësi dhe pllakat te pajisjet dhe përfundimet — që të keni një ekip të vetëm dhe rezultat pa ndërprerje. Ky është premtimi ynë ‘nga e para deri në çdo gjë’.",
    about_b1: "Shërbim në mbarë Kosovën",
    about_b2: "Punime të siguruara dhe sipas standardeve",
    about_b3: "Afate të qarta dhe çmime fikse",
    about_b4: "Përkujdesje pas punimeve dhe garanci",
    about_note: "*Shtoni emrin e themeluesit, kredencialet dhe një bio të shkurtër profesionale.*",

    book_h1: "Rezervo Konsultim",
    book_intro: "Vlerësim falas në teren, kudo në Kosovë.",
    book_rules: "Orari i punës: Hënë–Shtunë 09:00–17:00. Ju lutemi rezervoni të paktën 24 orë më parë. Rastet emergjente pranohen kur është e mundur.",
    field_name: "Emri i plotë",
    field_phone: "Telefoni",
    field_email: "Email",
    field_city: "Qyteti",
    field_datetime: "Data & ora e preferuar",
    field_project_type: "Lloji i projektit",
    field_details: "Detaje të projektit",
    field_message: "Mesazhi",
    ph_name: "Emri juaj",
    ph_email:"Email Addressa",
    ph_number:"Numri i telefonit",
    ph_city: "Prishtinë, Prizren, ...",
    ph_details: "Na tregoni për madhësinë, stilin, afatet dhe kërkesat e posaçme.",
    ph_message: "Si mund t’ju ndihmojmë?",
    consent: "Pranoj të kontaktohem nga Batllava Solutions për projektin tim.",
    required: "E domosdoshme",
    book_submit: "Kërko Rezervim",
    contact_submit:"Na Kontaktoni",
    book_email_subject: "Kërkesë e re për konsultim — Batllava Solutions",
    book_error: "Ju lutemi plotësoni fushat e domosdoshme dhe jepni pëlqimin.",
    book_email_open: "Faleminderit! Aplikacioni i emailit do të hapet tani. Do të konfirmojmë së shpejti.",
    timezone_note: "Zona kohore: Europe/Pristina",
    book_tip: "Këshillë: Mund të integrojmë Google Calendar ose Calendly më vonë për konfirmime automatike.",

    contact_h1: "Na Kontaktoni",
    contact_intro: "Përgjigjemi shpejt. Për urgjenca, telefononi ose dërgoni mesazh direkt.",
    contact_error: "Ju lutemi plotësoni emrin, emailin dhe mesazhin.",
    contact_email_open: "Faleminderit! Aplikacioni i emailit do të hapet tani.",

    label_phone: "Telefoni",
    label_service_area: "Zona e shërbimit",
    label_hours: "Orari",
    contact_area_text: "E gjithë Kosova (selia: Batllavë)",
    hours_text: "Hënë–Shtunë 09:00–17:00",

    footer_blurb: "Rinovime të plota të banjës në Kosovë — nga matja e parë te vija e fundit e silikonit. Punë cilësore, komunikim i qartë, garanci.",
    footer_explore: "Lëviz",
    footer_contact: "Kontakt",
    rights: "Të gjitha të drejtat e rezervuara.",
  },
} as const;
