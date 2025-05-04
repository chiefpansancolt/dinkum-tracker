/* eslint-disable @typescript-eslint/no-explicit-any */
interface Window {
  electron?: {
    store: {
      get: (key: string) => Promise<any>;
      set: (key: string, value: any) => Promise<boolean>;
      delete: (key: string) => Promise<boolean>;
    };
    import: () => Promise<string | null>;
    export: (data: string) => Promise<boolean>;
  };
}
