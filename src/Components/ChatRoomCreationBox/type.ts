/**
 * type for Chat Room Creation Box
 */

type HandleChatRoomCreationBoxOpenType = (open: boolean) => void;

interface FormInputErrorType {
  content: string;
  pointing: string;
}

export type { HandleChatRoomCreationBoxOpenType, FormInputErrorType };
