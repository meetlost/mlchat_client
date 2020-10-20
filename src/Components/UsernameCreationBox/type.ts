/**
 * type for Username Creation Box
 */

interface UsernameType {
  username: string;
}

type HandleOpenType = (open: boolean) => void;

export type { UsernameType, HandleOpenType };
