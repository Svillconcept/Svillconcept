# SVILL CONCEPT — Website

Statische One-Page-Website für **SVILL CONCEPT** (Valentin Suponicov) — Maßküchen,
Bäder und Einbaumöbel aus Freiburg. Optimiert für **GitHub Pages**.

## Inhalt
- `index.html` — Startseite (Hero, Leistungen, Ablauf, Projekt-Galerie, Kontakt)
- `impressum.html`, `datenschutz.html` — Rechtstexte
- `css/style.css` — Design (Porzellan · Anthrazit · Bronze)
- `js/main.js` — Navigation, Galerie-Filter, Lightbox, Smart-Kontakt
- `fonts/` — selbst gehostete Schriften (Cormorant Garamond, Jost) — **kein Google-CDN**, DSGVO-freundlich
- `images/gallery/` — Projektfotos · `images/site/` — Hero/About/CTA
- `.nojekyll` — GitHub Pages soll die Dateien unverändert ausliefern

## Lokal ansehen
Einfach `index.html` im Browser öffnen — oder ein kleiner lokaler Server:

```bash
python3 -m http.server 8080
```

Dann http://localhost:8080 aufrufen.

## Auf GitHub Pages veröffentlichen
1. Neues Repository auf GitHub anlegen (z. B. `svill-concept`).
2. Diesen Ordner-Inhalt in das Repository pushen (alle Dateien im Wurzelverzeichnis).
3. Im Repo: **Settings → Pages → Source: „Deploy from a branch"**, Branch `main`, Ordner `/ (root)`.
4. Nach ein paar Minuten ist die Seite unter `https://<benutzername>.github.io/<repo>/` erreichbar.

### Eigene Domain (optional)
In **Settings → Pages → Custom domain** die Wunschdomain eintragen und beim
Domain-Anbieter einen `CNAME`- bzw. `A`-Record auf GitHub setzen.

## Fotos ändern
Bilder in `images/gallery/` heißen `kueche-01.jpg`, `bad-01.jpg`, `wohnen-01.jpg` …
Die Titel/Reihenfolge werden in `js/main.js` im Objekt `PROJECTS` gepflegt.
