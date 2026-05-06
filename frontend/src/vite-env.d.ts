declare module "*.svg" {
  const content: string;
  export default content;
}

interface ImportMetaEnv {
  readonly VITE_MSAL_CLIENT_ID: string;
  readonly VITE_MSAL_AUTHORITY: string;
  readonly VITE_MSAL_KNOWN_AUTHORITIES: string;
  readonly VITE_MSAL_REDIRECT_URI: string;
  readonly VITE_MSAL_TENANT_ID: string;
  readonly VITE_MSAL_USER_FLOW: string;

  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

// tsconfig.json
// {
//   "include"; ["src/**/*.ts", "src/**/*.tsx", "vite-env.d.ts"]
// }