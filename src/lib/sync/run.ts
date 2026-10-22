import {
  createTokenSource,
  type FirstSyncChoice,
  ProviderError,
  sync,
  type SyncResult,
} from "@gamerdexapp/gamerdex-sync";
import { deviceStore, SYNC_APP_ID } from "./device";
import { isSyncDocument, type SyncDocument } from "./document";
import {
  authEndpoint,
  createProvider,
  providerOf,
  type SyncProviderId,
} from "./providers";
import { syncSchema } from "./schema";

export const tokenSource = (provider: SyncProviderId) =>
  createTokenSource({
    endpoint: authEndpoint(provider),
    load: () => deviceStore.load().tokens,
    save: (tokens) => deviceStore.update({ tokens }),
    now: Date.now,
  });

const syncOnce = (
  local: SyncDocument,
  firstSync?: FirstSyncChoice,
): Promise<SyncResult> => {
  const device = deviceStore.load();
  const id = providerOf(device);
  const provider = id && createProvider(id, device, tokenSource(id).getToken);
  if (!provider) throw new Error("No storage is chosen."); // i18n-ignore
  return sync({
    appId: SYNC_APP_ID,
    deviceId: device.deviceId,
    deviceName: device.deviceName,
    provider,
    schema: syncSchema,
    local,
    state: device.state,
    firstSync,
    validate: isSyncDocument,
    now: () => new Date().toISOString(),
  });
};

const isRejectedToken = (error: unknown) =>
  error instanceof ProviderError &&
  error.kind === "auth" &&
  error.status === 401;

/** Makes the next request renew the access token, which the provider no longer accepts. */
const expireAccessToken = () => {
  const { tokens } = deviceStore.load();
  if (tokens) deviceStore.update({ tokens: { ...tokens, accessExpiresAt: 0 } });
};

/**
 * Syncs once. When the provider rejects a token that has not expired by the clock, the token is
 * renewed and the sync runs once more. A sign in that is refused again reports the first error.
 */
export const runSync = async (
  local: SyncDocument,
  firstSync?: FirstSyncChoice,
): Promise<SyncResult> => {
  try {
    return await syncOnce(local, firstSync);
  } catch (error) {
    if (!isRejectedToken(error)) throw error;
    expireAccessToken();
    try {
      return await syncOnce(local, firstSync);
    } catch (retryError) {
      const refused =
        retryError instanceof ProviderError && retryError.kind === "auth";
      throw refused ? error : retryError;
    }
  }
};
