declare const DEV: boolean;

declare namespace NodeJS {
  interface Global {
    DEV: boolean;
  }
}
