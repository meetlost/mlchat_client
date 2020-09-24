/**
 * Footer
 */

import React from "react";
import { Menu } from "semantic-ui-react";

import "./style.scss";

function Main(): JSX.Element
{
  return (
    <>
      <div className="footer-box">
        <Menu borderless fixed="bottom"></Menu>
      </div>
    </>
  );
}

export default Main;
