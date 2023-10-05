import React from "react";
import type { FC } from "react";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

import Panel from "./Panel";

const NodeDisplay: FC = () => {
  return (
    <Panel
      title={
        <>
          <BsFillExclamationTriangleFill className="text-muted" /> Node Index
        </>
      }
    >
      <p>
        This is going to be used to display descriptions and more information about the nodes.
      </p>
      <p>
    
      </p>
    </Panel>
  );
};

export default NodeDisplay;