/**
 * Header
 */

import React from "react";
import { Menu, Button } from "semantic-ui-react";

import { t } from "src/lib/language/translate";

import "./style.scss";

function Main(): JSX.Element
{
  return (
    <>
      <div className="header-box">
        <Menu borderless>
          <Menu.Item>{t("MLChat")}</Menu.Item>
          <Menu.Item position="right">
            <Button>{t("Create Chat Room")}</Button>
          </Menu.Item>
        </Menu>
      </div>
    </>
  );
}

export default Main;
