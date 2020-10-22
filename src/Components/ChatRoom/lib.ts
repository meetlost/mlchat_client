/**
 * lib for Chat Room
 */

function isCMDUserList(cmd: string): boolean
{
  return cmd === "user_list";
}

function isCMDNewUser(cmd: string): boolean
{
  return cmd === "new_user";
}

function isCMDUserLeft(cmd: string): boolean
{
  return cmd === "user_left";
}

export { isCMDUserList, isCMDNewUser, isCMDUserLeft };
