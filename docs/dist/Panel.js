import React, {useEffect, useRef} from "../_snowpack/pkg/react.js";
import {MdExpandLess, MdExpandMore} from "../_snowpack/pkg/react-icons/md.js";
import AnimateHeight from "../_snowpack/pkg/react-animate-height.js";
const DURATION = 300;
const Panel = ({
  title,
  isDeployed,
  setIsDeployed,
  children
}) => {
  const dom = useRef(null);
  useEffect(() => {
    if (isDeployed)
      setTimeout(() => {
        if (dom.current)
          dom.current.parentElement.scrollTo({top: dom.current.offsetTop - 5, behavior: "smooth"});
      }, DURATION);
  }, [isDeployed]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "panel panels",
    ref: dom
  }, /* @__PURE__ */ React.createElement("h2", null, title, " ", /* @__PURE__ */ React.createElement("button", {
    type: "button",
    onClick: () => setIsDeployed(!isDeployed)
  }, isDeployed ? /* @__PURE__ */ React.createElement(MdExpandLess, null) : /* @__PURE__ */ React.createElement(MdExpandMore, null))), /* @__PURE__ */ React.createElement(AnimateHeight, {
    duration: DURATION,
    height: isDeployed ? "auto" : 0
  }, children));
};
export default Panel;
