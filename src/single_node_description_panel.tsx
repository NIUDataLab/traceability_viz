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
        This visualization represents the interconnectedness of nodes within a selected dataset. 
      </p>
      <p>
        The initial node, depicted in black, is positioned in the upper left corner. 
        Subsequent nodes are placed at varying distances from the initial node, reflecting their 
        degree of correlation.
      </p>
      <p>
        The proximity of these nodes is determined by their relevance to the 
        initial node, with red indicating a high degree of relevance, orange signifying moderate 
        relevance, and yellow representing minimal relevance.
      </p>
      <p>
        This method provides a clear and concise representation of the relationships within the dataset.
      </p>
    </Panel>
  );
};

export default SingleNodeDescriptionPanel;
