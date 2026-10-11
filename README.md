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

Mentions légales : compléter `LEGAL` dans `src/lib/site.ts` avant la mise en ligne.

## Tests

```bash
bun run test
```
