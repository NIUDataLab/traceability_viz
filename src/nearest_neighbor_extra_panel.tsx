import React, { useState, useEffect } from "react";
import type { FC } from "react";
import { AiFillAlert } from "react-icons/ai";
import { fetch_neighbor_traversal } from './index'; // replace with your TypeScript file

import Panel from "./Panel";

export interface Data {
  path: string[];
  edge_weights: number[];
  total_risk: number;
}

interface NearestNeighborExtraPanelProps {
  data: Data;
}

const NearestNeighborExtraPanel: FC<NearestNeighborExtraPanelProps> = ({ data: initialData }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false); // Panel is initially open
  const [data, setData] = useState<Data>(initialData);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        // Fetch new data and update the panel here
        fetch_neighbor_traversal() // replace with your parameters
          .then(data => {
            if (data !== null) {
              console.log("Fetched data: ", data); // Add this line
              const roundedData = {
                ...data,
                edge_weights: data.edge_weights.map((weight: number) => parseFloat(weight.toFixed(2))),
                total_risk: parseFloat(data.total_risk.toFixed(2)),
              }
              setData(roundedData);
              setIsPanelOpen(true);
            }
          });
      }
    };
  
    window.addEventListener("keydown", handleKeyDown);
  
    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []); // Empty dependency array so this runs only once when the component mounts
  
  

  return (
    <Panel
      isDeployed={isPanelOpen}
      setIsDeployed={setIsPanelOpen}
      title={
        <>
          <AiFillAlert className="text-muted" /> Total Risk: {data.total_risk}
        </>
      }
    >
      <p>
        Path: {data.path.join(' -> ')}
      </p>
      <p>
        Number of Nodes: {data.path.length}
      </p>
      <p>
        Edge Weights: {data.edge_weights.join(', ')}
      </p>
      <p>
        Total Risk: {data.total_risk}
      </p>
    </Panel>
  );
};

export default NearestNeighborExtraPanel;




