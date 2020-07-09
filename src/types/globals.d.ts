declare const DEV: boolean;

declare namespace NodeJS {
  interface Global {
    DEV: boolean;
  }
}

interface Window {
  INITIAL_STATE: Record<string, unknown>;
}
