import React from "react";
import type { FC } from "react";
import { BsFillExclamationTriangleFill } from "react-icons/bs";

import Panel from "./Panel";

const NodeDisplay: FC = () => {
  return (
    <Panel
      title={
        <>
          <BsFillExclamationTriangleFill className="text-muted" /> Node Description
        </>
      }
    >
      <p>
        This is going to be used to display descriptions and more information about the nodes.
      </p>
      <p>
        Once upon a time, in the bustling town of Millville, there was a middle school known as Millville 
        Junior High. Among its many students, there was one who stood out for all the wrong reasons - 
        a boy named Jake. Jake was a towering figure, much larger than his peers, and he used his 
        size to intimidate others. He was known as the school bully, but there was something different 
        about him. Jake wasn't just mean; he seemed to take pleasure in the fear he instilled in others.

        Jake's reign of terror continued unchecked until a new student arrived at Millville Junior High. 
        Her name was Lily, and she was unlike anyone Jake had ever encountered. Lily was small and seemingly 
        insignificant, but she possessed an inner strength that was visible to anyone who took the time to know her. 
        She had moved to Millville from a big city and had seen her fair share of bullies. Lily decided she wouldn't 
        be another one of Jake's victims.

        One day, Jake decided to target Lily. As he approached her with his usual menacing grin, 
        Lily stood her ground. She looked Jake straight in the eye and said, "Your actions say more about you 
        than they do about me." Jake was taken aback. No one had ever stood up to him before. From that day forward, 
        things began to change at Millville Junior High. Jake started to question his actions and slowly began to 
        change his ways. The story of the deranged middle school bully became a tale of transformation and redemption.
      </p>
    </Panel>
  );
};

export default NodeDisplay;