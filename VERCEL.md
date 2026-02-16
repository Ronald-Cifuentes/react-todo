# Desplegar el cliente en Vercel

## 1. Repo con solo la carpeta `client`

Si tu repo en GitHub es **solo** el contenido de `client/` (con `package.json`, `vite.config.ts`, etc. en la raíz):

- Conecta ese repo a Vercel.
- **Root Directory** debe estar vacío (raíz del repo).
- El archivo `vercel.json` con los `rewrites` hace que todas las rutas sirvan `index.html` (evita 404 en `/` y al refrescar).

## 2. Repo monorepo (carpeta `client` dentro del repo)

Si el repo tiene varias carpetas y el frontend está en `client/`:

1. En Vercel → **Project Settings** → **General**.
2. En **Root Directory** pon: **`client`** y guarda.
3. **Build Command**: `npm run build` (suele detectarse solo).
4. **Output Directory**: `dist` (suele detectarse solo para Vite).
5. Redespliega.

Así Vercel construye y publica la app desde `client/` y usa el `vercel.json` que está ahí.

## 3. Variables de entorno

En **Settings** → **Environment Variables** añade:

- **`VITE_API_BASE_URL`** = `https://django-todo-nbhj.onrender.com/api`  
  (la URL base de tu API en Render, **con** `/api` al final.)

Sin esta variable, el cliente no sabrá a qué backend llamar en producción.

## 4. Después del deploy

- La URL de la app será algo como `https://tu-proyecto.vercel.app`.
- Abre esa URL; debería cargar la Todo app y no 404.
- Si sigue 404, revisa que **Root Directory** sea `client` cuando el repo sea monorepo.
