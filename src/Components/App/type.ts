/**
 * type for App
 */

interface AppAnyType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

interface AppRetType {
  okFlag: boolean;
  reason: string;
}

export type { AppAnyType, AppRetType };
