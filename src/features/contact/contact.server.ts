// Re-export for plan compliance — actual implementation in ./contact.ts
// (avoid **/*.server.* import in client; see import-protection rules)
export { submitContact } from "./contact";
