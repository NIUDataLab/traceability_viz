import React from "react";
import type { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";

import Panel from "./Panel";

const NodeDisplay: FC = () => {
  return (
    <Panel
      title={
        <>
          <BsInfoCircle className="text-muted" /> Description
        </>
      }
    >
      <p>
        This is going to be used to display descriptions and more information about the nodes.
      </p>
    </Panel>
  );
};

export default NodeDisplay;