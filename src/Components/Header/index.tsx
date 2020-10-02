/**
 * Header
 */

import React from "react";
import { Menu, Button } from "semantic-ui-react";

import { HandleOpenType as HandleChatRoomCreationBoxOpenType } from "src/Components/ChatRoomCreationBox/type";
import { t } from "src/lib/language/translate";

import "./style.scss";

interface Props {
  handleChatRoomCreationBoxOpen: HandleChatRoomCreationBoxOpenType;
}

function Main(props: Props): JSX.Element
{
  const { handleChatRoomCreationBoxOpen } = props;

  return (
    <>
      <div className="header-box">
        <Menu borderless>
          <Menu.Item>{t("MLChat")}</Menu.Item>
          <Menu.Item position="right">
            <Button onClick={() => handleChatRoomCreationBoxOpen(true)}>{t("Create Chat Room")}</Button>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
}

export default Main;
