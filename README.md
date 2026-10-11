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

Le formulaire envoie un email via SMTP (Gmail). Variables d'environnement requises en production :

| Variable | Rôle |
|---|---|
| `SMTP_USER` | Adresse Gmail expéditrice |
| `SMTP_PASS` | Mot de passe d'application Google (pas le mot de passe du compte) |
| `CONTACT_TO` | Destinataire (par défaut `SMTP_USER`) |
| `SMTP_HOST`, `SMTP_PORT` | Optionnels (`smtp.gmail.com`, `465`) |

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
