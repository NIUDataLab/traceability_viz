// FYI basically this is the animation feature to keep panels from overlapping. 
// Without this, when a panel is opened to obtain more information, issues happen with overlapping.
// There is animation being used here for opening and moving panels on top of one another.
import React, { FC, useEffect, useRef, useState, ReactNode } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import AnimateHeight from "react-animate-height";

const DURATION = 300;

const Panel: FC<{ title: JSX.Element | string; isDeployed: boolean; setIsDeployed: (isDeployed: boolean) => void; children?: ReactNode; }> = ({
  title,
  isDeployed,
  setIsDeployed,
  children,
}) => {
  const dom = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isDeployed)
      setTimeout(() => {
        if (dom.current) dom.current.parentElement!.scrollTo({ top: dom.current.offsetTop - 5, behavior: "smooth" });
      }, DURATION);
  }, [isDeployed]);

  return (
    <div className="panel panels" ref={dom}>
      <h2>
        {title}{" "}
        <button type="button" onClick={() => setIsDeployed(!isDeployed)}>
          {isDeployed ? <MdExpandLess /> : <MdExpandMore />}
        </button>
      </h2>
      <AnimateHeight duration={DURATION} height={isDeployed ? "auto" : 0}>
        {children}
      </AnimateHeight>
    </div>
  );
};

export default Panel;