/* ===========================================================
   SVILL CONCEPT — interactions
   =========================================================== */
(function () {
  "use strict";

  /* ---------- Contact data (assembled at runtime → less spam scraping) ---------- */
  var PHONE_PARTS = ["0176", "2186", "0741"];        // display
  var PHONE_TEL = "+49" + "176" + "21860741";        // tel: link
  var MAIL_USER = "s.villmoebel";
  var MAIL_HOST = "gmail.com";
  var phoneDisplay = PHONE_PARTS.join(" ");
  var mailDisplay = MAIL_USER + "@" + MAIL_HOST;

  /* ---------- Header: solid on scroll ---------- */
  var header = document.querySelector(".header");
  var isSub = document.body.classList.contains("page--sub");
  function onScroll() {
    if (isSub) return;
    var solid = window.scrollY > window.innerHeight * 0.72;
    header.classList.toggle("header--solid", solid);
    header.classList.toggle("header--light", !solid);
  }
  if (header && !isSub) { onScroll(); window.addEventListener("scroll", onScroll, { passive: true }); }

  /* ---------- Mobile nav ---------- */
  var burger = document.querySelector(".burger");
  var backdrop = document.querySelector(".nav-backdrop");
  function closeNav() { document.body.classList.remove("nav-open"); if (burger) burger.setAttribute("aria-expanded", "false"); }
  if (burger) {
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("nav-open");
      burger.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }
  if (backdrop) backdrop.addEventListener("click", closeNav);
  document.querySelectorAll(".nav__link").forEach(function (l) { l.addEventListener("click", closeNav); });

  /* ---------- Reveal on scroll ---------- */
  var reveals = document.querySelectorAll(".reveal, .tile");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---------- Gallery ----------
     Each project lists its own image file + category, so category is
     independent of the filename (fixes any mis-sorted images).            */
  var PROJECTS = [
    // ---- Küchen ----
    { img: "kueche-01", cat: "kueche", title: "Grifflose Küche in Beton-Optik mit Kochinsel" },
    { img: "kueche-03", cat: "kueche", title: "Kücheninsel in Anthrazit mit Side-by-Side" },
    { img: "kueche-02", cat: "kueche", title: "Grifflose L-Küche in Weiß mit schwarzer Arbeitsplatte" },
    { img: "kueche-13", cat: "kueche", title: "Küche in Holzoptik mit Steinarbeitsplatte" },
    { img: "kueche-14", cat: "kueche", title: "Grifflose Küche in Holzoptik mit Kochinsel" },
    { img: "kueche-04", cat: "kueche", title: "Puristische Küche in Weiß mit Holz-Rückwand" },
    { img: "kueche-05", cat: "kueche", title: "Küche in Creme mit beleuchteten Glasvitrinen" },
    { img: "kueche-06", cat: "kueche", title: "Offene Küche in Anthrazit mit Barinsel" },
    { img: "kueche-09", cat: "kueche", title: "U-Küche in Weiß mit Holz-Arbeitsplatte" },
    { img: "kueche-12", cat: "kueche", title: "Offene Küche mit Marmorinsel und Designleuchten" },
    { img: "bad-06",    cat: "kueche", title: "Kücheninsel in Beton-Optik mit Marmorwand" },
    { img: "bad-07",    cat: "kueche", title: "Grifflose Küche in Creme mit schwarzem Becken" },
    // ---- Bäder ----
    { img: "bad-01", cat: "bad", title: "Badmöbel in Grau & Holz mit Marmorwand" },
    { img: "bad-02", cat: "bad", title: "Doppelwaschtisch mit schwarzen Aufsatzbecken" },
    { img: "bad-03", cat: "bad", title: "Waschtisch mit beleuchteten Spiegeln" },
    { img: "bad-05", cat: "bad", title: "Waschtischanlage mit Spiegelschrank" },
    { img: "bad-08", cat: "bad", title: "Doppelwaschtisch mit schwarzem Marmor" },
    { img: "bad-09", cat: "bad", title: "Schwebender Waschtisch mit offenen Fächern" },
    { img: "bad-10", cat: "bad", title: "Bad mit integriertem Waschturm in Marmoroptik" },
    { img: "bad-04", cat: "bad", title: "Ablage-Detail vor Sichtbeton" },
    // ---- Wohnen & Schränke ----
    { img: "wohnen-01", cat: "wohnen", title: "Wohnwand mit beleuchteter Holznische" },
    { img: "wohnen-11", cat: "wohnen", title: "Wohnzimmer mit Marmor-Kamin und TV-Wand" },
    { img: "wohnen-07", cat: "wohnen", title: "Wohnzimmer mit Holzlamellen-Wand" },
    { img: "kueche-10", cat: "wohnen", title: "Wohnwand mit TV in Weiß" },
    { img: "kueche-11", cat: "wohnen", title: "Wohnwand mit integriertem Aquarium" },
    { img: "kueche-07", cat: "wohnen", title: "Einbau-Weinbar mit Weinregal" },
    { img: "wohnen-02", cat: "wohnen", title: "Einbauschrank unter Dachschräge" },
    { img: "wohnen-08", cat: "wohnen", title: "Jugendzimmer mit Einbauschrank" },
    { img: "wohnen-03", cat: "wohnen", title: "Garderobe mit rundem LED-Spiegel" },
    { img: "wohnen-05", cat: "wohnen", title: "Flurmöbel mit beleuchtetem Rundspiegel" },
    { img: "wohnen-09", cat: "wohnen", title: "Ankleide-Flur mit Sichtbeton-Säule" },
    { img: "wohnen-04", cat: "wohnen", title: "Schlafzimmer im Loft-Stil" },
    { img: "wohnen-06", cat: "wohnen", title: "Luxus-Schlafzimmer mit Marmorwand" }
  ];
  var CAT_LABEL = { kueche: "Küchen", bad: "Bäder", wohnen: "Wohnen & Schränke" };

  var grid = document.getElementById("grid");
  var items = []; // {el, cat, title, src}
  if (grid) {
    PROJECTS.forEach(function (p) {
      var src = "images/gallery/" + p.img + ".jpg";
      var fig = document.createElement("button");
      fig.type = "button";
      fig.className = "tile";
      fig.setAttribute("data-cat", p.cat);
      fig.setAttribute("aria-label", p.title + " vergrößern");
      fig.innerHTML =
        '<img src="' + src + '" alt="' + p.title + ' – SVILL CONCEPT" loading="lazy" decoding="async">' +
        '<span class="tile__zoom" aria-hidden="true">' + iconExpand() + '</span>' +
        '<span class="tile__overlay"><span class="tile__cat">' + CAT_LABEL[p.cat] + '</span>' +
        '<span class="tile__title">' + p.title + '</span></span>';
      grid.appendChild(fig);
      var obj = { el: fig, cat: p.cat, title: p.title, src: src };
      items.push(obj);
      fig.addEventListener("click", function () { openLightbox(obj); });
    });
    // reveal observe for freshly created tiles
    if ("IntersectionObserver" in window) {
      var io2 = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); io2.unobserve(e.target); } });
      }, { threshold: 0.08 });
      items.forEach(function (o) { io2.observe(o.el); });
    } else { items.forEach(function (o) { o.el.classList.add("in"); }); }
  }

  /* ---------- Filters ---------- */
  var current = "all";
  document.querySelectorAll(".filter").forEach(function (btn) {
    btn.addEventListener("click", function () {
      document.querySelectorAll(".filter").forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      current = btn.getAttribute("data-filter");
      items.forEach(function (o) {
        var show = current === "all" || o.cat === current;
        o.el.classList.toggle("is-hidden", !show);
      });
    });
  });
  function visibleItems() {
    return items.filter(function (o) { return current === "all" || o.cat === current; });
  }
  function applyFilter(cat) {
    document.querySelectorAll(".filter").forEach(function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-filter") === cat);
    });
    current = cat;
    items.forEach(function (o) { o.el.classList.toggle("is-hidden", !(cat === "all" || o.cat === cat)); });
  }
  // service cards -> jump to gallery + filter
  document.querySelectorAll("[data-goto]").forEach(function (el) {
    el.addEventListener("click", function () {
      applyFilter(el.getAttribute("data-goto"));
      var t = document.getElementById("projekte");
      if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  /* ---------- Lightbox ---------- */
  var lb = document.getElementById("lightbox");
  var lbImg = lb ? lb.querySelector(".lightbox__img") : null;
  var lbCat = lb ? lb.querySelector(".c-cat") : null;
  var lbTitle = lb ? lb.querySelector(".c-title") : null;
  var lbCount = lb ? lb.querySelector(".lb-count") : null;
  var lbList = [], lbPos = 0, lastFocus = null;

  function openLightbox(obj) {
    lbList = visibleItems();
    lbPos = lbList.indexOf(obj);
    if (lbPos < 0) lbPos = 0;
    lastFocus = document.activeElement;
    render();
    lb.classList.add("is-open");
    lb.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    var closeBtn = lb.querySelector(".lb-close");
    if (closeBtn) closeBtn.focus();
  }
  function closeLightbox() {
    lb.classList.remove("is-open");
    lb.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    if (lastFocus) lastFocus.focus();
  }
  function step(d) { lbPos = (lbPos + d + lbList.length) % lbList.length; render(); }
  function render() {
    var o = lbList[lbPos];
    if (!o) return;
    lbImg.src = o.src;
    lbImg.alt = o.title + " – SVILL CONCEPT";
    lbCat.textContent = CAT_LABEL[o.cat];
    lbTitle.textContent = o.title;
    lbCount.textContent = String(lbPos + 1).padStart(2, "0") + " / " + String(lbList.length).padStart(2, "0");
  }
  if (lb) {
    lb.querySelector(".lb-close").addEventListener("click", closeLightbox);
    lb.querySelector(".lb-next").addEventListener("click", function () { step(1); });
    lb.querySelector(".lb-prev").addEventListener("click", function () { step(-1); });
    lb.addEventListener("click", function (e) { if (e.target === lb || e.target.classList.contains("lightbox__stage")) closeLightbox(); });
    document.addEventListener("keydown", function (e) {
      if (!lb.classList.contains("is-open")) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowRight") step(1);
      else if (e.key === "ArrowLeft") step(-1);
    });
    // swipe
    var sx = 0;
    lb.addEventListener("touchstart", function (e) { sx = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener("touchend", function (e) {
      var dx = e.changedTouches[0].clientX - sx;
      if (Math.abs(dx) > 50) step(dx < 0 ? 1 : -1);
    }, { passive: true });
  }

  /* ---------- Smart contact reveal ---------- */
  // Rows in #kontakt: number/e-mail shown directly, one click opens the app.
  // Values/hrefs are assembled at runtime (kept out of static HTML → less spam scraping).
  function wireContactRow(row, type) {
    if (!row) return;
    var valueEl = row.querySelector(".contact-row__value");
    var ctaEl = row.querySelector(".contact-row__cta");
    if (type === "phone") {
      valueEl.textContent = phoneDisplay;
      row.setAttribute("href", "tel:" + PHONE_TEL);
      if (ctaEl) ctaEl.textContent = "Anrufen";
    } else {
      valueEl.textContent = mailDisplay;
      row.setAttribute("href", "mailto:" + mailDisplay);
      if (ctaEl) ctaEl.textContent = "E-Mail schreiben";
    }
  }
  wireContactRow(document.getElementById("row-phone"), "phone");
  wireContactRow(document.getElementById("row-mail"), "mail");

  /* ---------- Floating contact (FAB) ---------- */
  var fab = document.getElementById("fab");
  if (fab) {
    var toggle = fab.querySelector(".fab__toggle");
    var fabPhone = fab.querySelector('[data-fab="phone"]');
    var fabMail = fab.querySelector('[data-fab="mail"]');
    if (fabPhone) {
      fabPhone.setAttribute("href", "tel:" + PHONE_TEL);
      var p = fabPhone.querySelector(".fab__num"); if (p) p.textContent = phoneDisplay;
    }
    if (fabMail) {
      fabMail.setAttribute("href", "mailto:" + mailDisplay);
      var m = fabMail.querySelector(".fab__num"); if (m) m.textContent = mailDisplay;
    }
    toggle.addEventListener("click", function () {
      var open = fab.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) { if (!fab.contains(e.target)) fab.classList.remove("is-open"); });
  }

  /* ---------- Footer year ---------- */
  var y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();

  /* ---------- icons ---------- */
  function iconExpand() {
    return '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>';
  }
})();
