import React, { useState } from "react";
import type { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";

import Panel from "./Panel";

const NearestNeighborTravDescriptionPanel: FC = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true); // Panel is initially open
  return (
    <Panel
      isDeployed={isPanelOpen}
      setIsDeployed={setIsPanelOpen}
      title={
        <>
          <BsInfoCircle className="text-muted" /> Description
        </>
      }
    >
      <p>
      This traversal illustrates the optimal path determined by the nodes with the highest weights.  
      </p>
      <p>
        Within the given datasets, nodes with weights closer to 1 exhibit a stronger correlation to 
        each other. The algorithm employed is the
        <a target="_blank" rel="noreferrer" href="https://en.wikipedia.org/wiki/Nearest_neighbour_algorithm"> nearest neighbor algorithm
        </a>
        , which selects the 
        node with the highest weight at each step until the user-defined distance is reached. 
      </p>
      <p>
        This effectively delineates a path of maximally related nodes that can be traversed within 
        the specified distance input by the user.
      </p>
    </Panel>
  );
};

export default NearestNeighborTravDescriptionPanel;