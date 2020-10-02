/**
 * type for Chat Room Creation Box
 */

type HandleOpenType = (open: boolean) => void;

interface FormInputErrorType {
  content: string;
  pointing: string;
}

export type { HandleOpenType, FormInputErrorType };
