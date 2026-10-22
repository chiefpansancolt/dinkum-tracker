import type { StoredTokens, SyncState } from "@gamerdexapp/gamerdex-sync";
import type { SyncProviderId } from "./providers";

export const SYNC_APP_ID = "dinkum-tracker";

/** A key of its own, so the keys that the old app reads stay as they were. */
const DEVICE_KEY = "dinkum-tracker-sync";

export type ActivityKind =
  "connected" | "uploaded" | "downloaded" | "merged" | "conflicts" | "failed";

export interface ActivityEntry {
  at: string;
  kind: ActivityKind;
  provider: SyncProviderId;
  count?: number;
}

const MAX_ACTIVITY = 8;

/** This state lives outside the saved data and is never uploaded. */
export interface DeviceSync {
  deviceId: string;
  deviceName: string;
  provider: SyncProviderId | null;
  tokens: StoredTokens | null;
  repository: string | null;
  state: SyncState | null;
  signInState: string | null;
  lastSyncAt: string | null;
  autoSync: boolean;
  syncOnReturn: boolean;
  waitOnMetered: boolean;
  activity: ActivityEntry[];
}

const serverDevice: DeviceSync = {
  deviceId: "",
  deviceName: "",
  provider: null,
  tokens: null,
  repository: null,
  state: null,
  signInState: null,
  lastSyncAt: null,
  autoSync: true,
  syncOnReturn: true,
  waitOnMetered: false,
  activity: [],
};

const listeners = new Set<() => void>();
let cachedRaw: string | null | undefined;
let cached: DeviceSync = serverDevice;

const platformName = () => {
  const agent = navigator as Navigator & {
    userAgentData?: { platform?: string };
  };
  return agent.userAgentData?.platform || navigator.platform || "Browser";
};

const freshDevice = (): DeviceSync => ({
  ...serverDevice,
  deviceId: crypto.randomUUID(),
  deviceName: platformName(),
});

export const deviceStore = {
  load(): DeviceSync {
    if (typeof window === "undefined") return serverDevice;
    try {
      const raw = localStorage.getItem(DEVICE_KEY);
      if (raw === cachedRaw) return cached;
      cachedRaw = raw;
      cached = raw
        ? { ...serverDevice, ...(JSON.parse(raw) as Partial<DeviceSync>) }
        : freshDevice();
      return cached;
    } catch {
      return cached === serverDevice ? freshDevice() : cached;
    }
  },

  loadOnServer(): DeviceSync {
    return serverDevice;
  },

  update(changes: Partial<DeviceSync>): boolean {
    const next = { ...deviceStore.load(), ...changes };
    try {
      localStorage.setItem(DEVICE_KEY, JSON.stringify(next));
    } catch {
      return false;
    }
    listeners.forEach((listener) => listener());
    return true;
  },

  recordActivity(entry: Omit<ActivityEntry, "at">): boolean {
    const activity = [
      { ...entry, at: new Date().toISOString() },
      ...deviceStore.load().activity,
    ].slice(0, MAX_ACTIVITY);
    return deviceStore.update({ activity });
  },

  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    window.addEventListener("storage", listener);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", listener);
    };
  },
};
