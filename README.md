# frnikho.github.io

To install dependencies:

```bash
bun install
```

To run locally:

```bash
bun run dev
```

To build for production:

```bash
bun run build
```

To run with Docker:

```bash
docker build -t frnikho.github.io .
docker run -p 3000:3000 frnikho.github.io
```

This project uses [Bun](https://bun.sh) and [TanStack Start](https://tanstack.com/start).

## Configuration du formulaire de contact

Le formulaire envoie un email via SMTP (serveur Stalwart auto-hébergé, `mail.nikho.dev`). Variables d'environnement requises en production :

| Variable | Rôle |
|---|---|
| `SMTP_USER` | Compte Stalwart expéditeur (`contact@nikho.dev`) |
| `SMTP_PASS` | Mot de passe du compte Stalwart |
| `CONTACT_TO` | Destinataire (par défaut `SMTP_USER`) |
| `SMTP_HOST`, `SMTP_PORT` | Optionnels (`mail.nikho.dev`, `465`) |

## Mesure d'audience (Umami, auto-hébergé)

Le script Umami n'est chargé que si les deux variables sont définies **à l'exécution** (pas au build) et seulement en production :

| Variable | Rôle |
|---|---|
| `UMAMI_SCRIPT_URL` | URL HTTPS du script de ton instance (ex. `https://stats.exemple.fr/script.js`) |
| `UMAMI_WEBSITE_ID` | Identifiant du site (UUID) créé dans Umami |

Événements envoyés : `booking-click` (propriété `location`), `offer-select` (`offer`), `estimator-open`, `estimator-used`, `estimator-cta` (`offer`), `contact-submit` (`type`). Le script ne mesure que le domaine de production et respecte « Do Not Track ».

Mentions légales : compléter `LEGAL` dans `src/lib/site.ts` avant la mise en ligne.

## Tests

```bash
bun run test
```

## Blog

Articles en MDX, un dossier par article : `content/blog/<slug>/index.mdx`, images à côté.

```bash
bun run new-post "Titre de l'article" --cat ia   # crée un brouillon
```

| Champ | Rôle |
|---|---|
| `title`, `description` | Titre affiché ; description de 50 à 160 caractères (Google, cartes, RSS) |
| `seoTitle` | Obligatoire si `title` dépasse 65 caractères |
| `publishedAt`, `updatedAt` | `AAAA-MM-JJ` ou `AAAA-MM-JJTHH:mm`, **heure de Paris** |
| `category` | `dev`, `ia`, `selfhost`, `outils`, `retex` (voir `src/content/blog.ts`) |
| `tags` | Slugs libres ; pages de tags en `noindex` |
| `draft` | `true` : visible en `dev` uniquement |
| `service` | Slug d'une prestation : CTA en fin d'article et encart sur `/services/<slug>` |
| `aliases` | Anciens slugs, redirigés en 301 |
| `cover`, `coverAlt` | Couverture optionnelle (`./cover.png`) |

Le frontmatter est validé au build (`src/features/blog/schema.ts`) : une erreur bloque le déploiement.

- **Publication programmée** : un article daté du futur est filtré à chaque requête et apparaît le jour venu, sans rebuild. Le flux `/blog/rss.xml` et le sitemap `/sitemap-blog.xml` sont calculés de la même façon.
- **Images** : `![alt](./capture.png)` dans l'article. `bun run blog:assets` (lancé avant `dev` et `build`) convertit PNG/JPEG en WebP et génère l'image de partage `og.png` dans `public/blog-assets/<slug>/` (non versionné).
- **Composants MDX** : `<Callout type="info|astuce|attention" title="…">`. Blocs de code : ` ```ts title="fichier.ts" `.
- Le MDX est rendu en HTML côté serveur (pas d'`unsafe-eval` dans la CSP) : les composants d'article doivent rester statiques.
- Après la mise en ligne : déclarer `https://nikho.dev/sitemap-blog.xml` dans la Search Console (il est aussi listé dans `robots.txt`).
