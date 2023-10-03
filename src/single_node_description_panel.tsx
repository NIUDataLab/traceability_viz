import React from "react";
import type { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";

import Panel from "./Panel";

const SingleNodeDescriptionPanel: FC = () => {
  return (
    <Panel
      title={
        <>
          <BsInfoCircle className="text-muted" /> Description
        </>
      }
    >
      <p>
        I am single node and i am proud.
      </p>
    </Panel>
  );
};

export default SingleNodeDescriptionPanel;
