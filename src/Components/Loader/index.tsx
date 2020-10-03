/**
 * Loader
 */

import React from "react";
import { Dimmer, Loader } from "semantic-ui-react";

interface Props {
  loading: boolean;
}

function Main(props: Props): JSX.Element
{
  const { loading } = props;

  return (
    <>
      <Dimmer active={loading}>
        <Loader />
      </Dimmer>
    </>
  );
}

export default Main;
