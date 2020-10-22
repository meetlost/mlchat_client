/**
 * lib for Chat Room
 */

import { SemanticCOLORS } from "semantic-ui-react";

import { ChatRoomConnectionStatusType } from "./type";

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

function isCMDChat(cmd: string): boolean
{
  return cmd === "chat";
}

function formatConnectionStatus(status: ChatRoomConnectionStatusType): SemanticCOLORS
{
  let ret = "";

  switch (status) {
    case "connecting":
      ret = "yellow";
      break;
    case "open":
      ret = "green";
      break;
    case "close":
      ret = "grey";
      break;
    case "error":
      ret = "red";
      break;
    default:
      ret = "yellow";
      break;
  }

  return ret as SemanticCOLORS;
}

export { isCMDUserList, isCMDNewUser, isCMDUserLeft, isCMDChat, formatConnectionStatus };
