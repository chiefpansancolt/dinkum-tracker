import {
  authorizeUrl,
  AUTH_SERVICE_URL as DEFAULT_AUTH_URL,
  CLIENT_IDS as DEFAULT_CLIENT_IDS,
  dropboxAuthorizeUrl,
  DropboxProvider,
  GitHubProvider,
  googleAuthorizeUrl,
  GoogleDriveProvider,
  microsoftAuthorizeUrl,
  OneDriveProvider,
  ROOT_FOLDER,
  type SyncProvider,
} from "@gamerdexapp/gamerdex-sync";
import type { DeviceSync } from "./device";

export type SyncProviderId = "github" | "google" | "dropbox" | "microsoft";

type FolderProviderId = Exclude<SyncProviderId, "github">;

/**
 * The sign in service. A variable replaces the default of the sync package, and a variable that is
 * set but empty turns sync off in this build.
 */
const AUTH_URL = process.env.NEXT_PUBLIC_GAMERDEX_AUTH_URL ?? DEFAULT_AUTH_URL;

/**
 * The public client IDs. A variable replaces the default of the sync package, and a variable that
 * is set but empty leaves the provider out of this build.
 */
const CLIENT_IDS: Record<FolderProviderId, string> = {
  google: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ?? DEFAULT_CLIENT_IDS.google,
  dropbox:
    process.env.NEXT_PUBLIC_DROPBOX_CLIENT_ID ?? DEFAULT_CLIENT_IDS.dropbox,
  microsoft:
    process.env.NEXT_PUBLIC_MICROSOFT_CLIENT_ID ?? DEFAULT_CLIENT_IDS.microsoft,
};

/** The sign in service without a provider, so a value that ends in a provider name still works. */
const authBase = AUTH_URL.replace(/\/+$/, "").replace(
  /\/(github|google|dropbox|microsoft)$/,
  "",
);

/** The order of the picker in the design: the recommended provider first, GitHub last. */
const PICKER_ORDER: SyncProviderId[] = [
  "google",
  "dropbox",
  "microsoft",
  "github",
];

/** The providers that this build can sign in with. */
export const availableProviders: SyncProviderId[] = !authBase
  ? []
  : PICKER_ORDER.filter(
      (provider) => provider === "github" || CLIENT_IDS[provider] !== "",
    );

/**
 * The folder that holds the folder of the tracker, as the player sees it. Dropbox and OneDrive name
 * their app folder after the app registration, so these names must match the registrations.
 */
const PARENT_FOLDERS: Partial<Record<SyncProviderId, string>> = {
  dropbox: "Apps/Gamerdex",
  microsoft: "Apps/Gamerdex Sync/Gamerdex",
};

export const dataFolderOf = (provider: SyncProviderId, appId: string) =>
  `${PARENT_FOLDERS[provider] ?? ROOT_FOLDER}/${appId}`;

/** GitHub keeps the data in a repository. The other providers keep it in a folder. */
export const usesRepository = (provider: SyncProviderId) =>
  provider === "github";

export const authEndpoint = (provider: SyncProviderId) =>
  `${authBase}/${provider}`;

/** A device that signed in before there was a choice of providers used GitHub. */
export const providerOf = (device: DeviceSync): SyncProviderId | null =>
  device.provider ?? (device.tokens ? "github" : null);

const FOLDER_SIGN_IN_URLS = {
  google: googleAuthorizeUrl,
  dropbox: dropboxAuthorizeUrl,
  microsoft: microsoftAuthorizeUrl,
};

export const signInUrl = (
  provider: SyncProviderId,
  redirectUri: string,
  state: string,
) =>
  provider === "github"
    ? authorizeUrl(redirectUri, state)
    : FOLDER_SIGN_IN_URLS[provider](CLIENT_IDS[provider], redirectUri, state);

const FOLDER_PROVIDERS = {
  google: GoogleDriveProvider,
  dropbox: DropboxProvider,
  microsoft: OneDriveProvider,
};

/** Returns null while the provider still needs a setting, such as the repository of GitHub. */
export const createProvider = (
  provider: SyncProviderId,
  device: DeviceSync,
  getToken: () => Promise<string>,
): SyncProvider | null => {
  if (provider !== "github")
    return new FOLDER_PROVIDERS[provider]({ getToken });
  return device.repository
    ? new GitHubProvider({ repository: device.repository, getToken })
    : null;
};
