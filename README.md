**[Čeština](#čeština)** · **[English](#english)**

# Čeština

## Začínáme

Tato složka obsahuje tři části:

- `frontend/`: webová aplikace.
- `backend/`: API.
- `caddy/`: reverzní proxy pro produkci (Tour de Cloud). Lokální vývoj ji nepoužívá.

Spuštění všeho lokálně:

```bash
docker compose up
```

Frontend běží na `http://localhost:3000`, API na `http://localhost:3001/api`. Porty 3000, 3001 a 3306 (MySQL) musí být před spuštěním volné. V Docker Desktopu pro macOS nebo Windows nejdřív zapněte host networking (Settings → Resources → Network → "Enable host networking"); Linux a OrbStack to podporují bez nastavování.

## Nasazení

Push do větve `main` spustí `.github/workflows/deploy.yml`, který nahraje projekt na Tour de Cloud. Před prvním pushem:

1. Přidejte repository secret `TDC_TOKEN` (Settings → Secrets and variables → Actions) s vaším Tour de Cloud tokenem.
2. Otevřete `tourdeapp.yaml` a nahraďte `<slug>` slugem vašeho projektu, ve všech čtyřech řádcích `image:`.

Pak pushněte do `main`.

## Frontend: čistý JavaScript (Vite)

Jednostránková aplikace v čistém JavaScriptu postavená na Vite. Bez frameworku, jen práce s DOM.

Kód je v `frontend/src/`:

- `api.js`: komunikace s backendem (`getProducts`, `createProduct`, `updateProduct`, `deleteProduct`).
- `App.js`: drží stav seznamu produktů a propojuje formulář s tabulkou.
- `ProductForm.js`: formulář pro přidání a úpravu.
- `ProductTable.js`: vykresluje seznam produktů.
- `index.css`: styly.

`docker compose up` spustí vývojový server Vite s live reloadem: úprava souboru v `src/` se v prohlížeči projeví bez ručního refreshe.

Spuštění mimo Docker: `cd frontend && npm install && npm run dev -- --port 3000`. Backend volá na `http://localhost:3001/api` (nastaveno v `.env` jako `VITE_API_URL`).

## Backend: Python Django

API v Django REST Frameworku s MySQL (přes `pymysql`, nainstalovaný jako náhrada za `mysqlclient`, takže nepotřebuje kompilované rozšíření).

Kód je v `backend/`:

- `products/models.py`: model `Product`.
- `products/serializers.py`: tvar požadavků a odpovědí.
- `products/views.py`: `ProductViewSet` s CRUD akcemi.
- `products/urls.py`: mapuje `/api/product` a `/api/product/<id>` na akce view setu.
- `buffet/urls.py`: připojuje `products/urls.py` pod `/api/product`.
- `buffet/settings.py`: připojení k databázi, CORS, nainstalované aplikace.

`docker compose up` spustí `manage.py runserver`, který se sám restartuje po každé úpravě: stačí uložit soubor a další požadavek už použije novou verzi.

Spuštění mimo Docker: nejdřív spusťte MySQL příkazem `docker compose up -d mysql`, pak `pip install -r requirements.txt` a `sh start.sh` (na Windows `start.bat`), což spustí migrace a server. API poslouchá na `http://localhost:3001/api/product`.

# English

## Getting started

This folder has three parts:

- `frontend/`: the web app.
- `backend/`: the API.
- `caddy/`: the reverse proxy used in production (Tour de Cloud). Local development skips it.

Run everything locally:

```bash
docker compose up
```

The frontend is at `http://localhost:3000`, the API at `http://localhost:3001/api`. Ports 3000, 3001 and 3306 (MySQL) must be free before you start. On Docker Desktop for macOS or Windows, turn on host networking first (Settings → Resources → Network → "Enable host networking"); Linux and OrbStack support it by default.

## Deploying

Pushing to `main` runs `.github/workflows/deploy.yml`, which uploads the project to Tour de Cloud. Before the first push:

1. Add a repository secret named `TDC_TOKEN` (Settings → Secrets and variables → Actions) with your Tour de Cloud token.
2. Open `tourdeapp.yaml` and replace `<slug>` with your project's slug in all four `image:` lines.

Then push to `main`.

## Frontend: vanilla JavaScript (Vite)

A plain JavaScript single-page app built with Vite. No framework, just DOM manipulation.

Code lives in `frontend/src/`:

- `api.js`: talks to the backend (`getProducts`, `createProduct`, `updateProduct`, `deleteProduct`).
- `App.js`: holds the product list state and wires the form and table together.
- `ProductForm.js`: the add/edit form.
- `ProductTable.js`: renders the product list.
- `index.css`: styling.

`docker compose up` runs the Vite dev server with live reload: edit any file under `src/` and the browser updates without a manual refresh.

To run it outside Docker: `cd frontend && npm install && npm run dev -- --port 3000`. It calls the backend at `http://localhost:3001/api` by default (set in `.env` as `VITE_API_URL`).

## Backend: Python Django

A Django REST Framework API with MySQL (via `pymysql`, installed as a drop-in replacement for `mysqlclient` so it needs no compiled extension).

Code lives in `backend/`:

- `products/models.py`: the `Product` model.
- `products/serializers.py`: request and response shape.
- `products/views.py`: the `ProductViewSet` with the CRUD actions.
- `products/urls.py`: maps `/api/product` and `/api/product/<id>` to the view set's actions.
- `buffet/urls.py`: mounts `products/urls.py` under `/api/product`.
- `buffet/settings.py`: database connection, CORS, installed apps.

`docker compose up` runs `manage.py runserver`, which reloads automatically: edit any file and the next request picks up the change.

To run it outside Docker: start MySQL with `docker compose up -d mysql`, then `pip install -r requirements.txt` and `sh start.sh` (or `start.bat` on Windows), which runs migrations and starts the server. The API listens on `http://localhost:3001/api/product`.
