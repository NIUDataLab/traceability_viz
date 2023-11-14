import React, {useState} from "../_snowpack/pkg/react.js";
import {BsInfoCircle} from "../_snowpack/pkg/react-icons/bs.js";
import Panel from "./Panel.js";
const DescriptionPanel = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  return /* @__PURE__ */ React.createElement(Panel, {
    isDeployed: isPanelOpen,
    setIsDeployed: setIsPanelOpen,
    title: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(BsInfoCircle, {
      className: "text-muted"
    }), " Description")
  }, /* @__PURE__ */ React.createElement("p", null, "This application provides visual representations of the relationships between nodes derived from two distinct datasets."), /* @__PURE__ */ React.createElement("p", null, "The first dataset incorporates a compilation of Common Weakness Enumerations (CWE), sourced directly from the", /* @__PURE__ */ React.createElement("a", {
    target: "_blank",
    rel: "noreferrer",
    href: "http://cwe.mitre.org"
  }, " offical CWE website"), "."), /* @__PURE__ */ React.createElement("p", null, "The second dataset is based on the Common Attack Pattern Enumeration and Classification (CAPEC), an industry-recognized standard for attack patterns. The data for this set is obtained from the", /* @__PURE__ */ React.createElement("a", {
    target: "_blank",
    rel: "noreferrer",
    href: "http://capec.mitre.org"
  }, " offical CAPEC website"), "."), /* @__PURE__ */ React.createElement("p", null, "By integrating these two datasets, the application offers a comprehensive overview of potential software vulnerabilities (as defined by CWE) and their associated attack patterns (as classified by CAPEC)."));
};
export default DescriptionPanel;
