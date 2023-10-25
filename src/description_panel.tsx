import React, { useState } from "react";
import type { FC } from "react";
import { BsInfoCircle } from "react-icons/bs";

import Panel from "./Panel";

const DescriptionPanel: FC = () => {
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
        This application provides visual representations of the relationships between nodes derived from two 
        distinct datasets.
      </p>
      <p>
        The first dataset incorporates a compilation of Common Weakness Enumerations (CWE), sourced directly 
        from the
        <a target="_blank" rel="noreferrer" href="http://cwe.mitre.org"> offical CWE website
        </a>
        .  
      </p>
      <p>
        The second dataset is based on the Common Attack Pattern Enumeration and Classification (CAPEC), 
        an industry-recognized standard for attack patterns. The data for this set is obtained from the 
        <a target="_blank" rel="noreferrer" href="http://capec.mitre.org"> offical CAPEC website
        </a>
        .
      </p>
      <p>
      By integrating these two datasets, the application offers a comprehensive overview of potential 
      software vulnerabilities (as defined by CWE) and their associated attack patterns (as classified by CAPEC).
      </p>
    </Panel>
  );
};

export default DescriptionPanel;




