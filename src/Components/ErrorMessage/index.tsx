/**
 * Error Message
 */

import React from "react";

import "./style.scss";

interface Props {
  message: string;
}

function Main(props: Props): JSX.Element
{
  const { message } = props;

  return (
    <>
      <div className="error-message-box">
        <span>{message}</span>
      </div>
    </>
  );
}

export default Main;
