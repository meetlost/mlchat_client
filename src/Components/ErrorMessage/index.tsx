/**
 * Error Message
 */

import React from "react";
import { Message } from "semantic-ui-react";

import "./style.scss";

interface Props {
  message: string;
  hasPadding?: boolean;
}

function Main(props: Props): JSX.Element
{
  const { message, hasPadding } = props;

  return (
    <>
      <div className="error-message-box">
        <div className={`inner${hasPadding ? " has-padding" : ""}`}>
          <Message color="red">
            <span>{message}</span>
          </Message>
        </div>
      </div>
    </>
  );
}

export default Main;
