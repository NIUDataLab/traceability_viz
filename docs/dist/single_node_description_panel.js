import React, {useState} from "../_snowpack/pkg/react.js";
import {BsInfoCircle} from "../_snowpack/pkg/react-icons/bs.js";
import Panel from "./Panel.js";
const SingleNodeDescriptionPanel = () => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  return /* @__PURE__ */ React.createElement(Panel, {
    isDeployed: isPanelOpen,
    setIsDeployed: setIsPanelOpen,
    title: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(BsInfoCircle, {
      className: "text-muted"
    }), " Description")
  }, /* @__PURE__ */ React.createElement("p", null, "This visualization represents the interconnectedness of nodes within a selected dataset."), /* @__PURE__ */ React.createElement("p", null, "The initial node, depicted in black, is positioned in the upper left corner. Subsequent nodes are placed at varying distances from the initial node, reflecting their degree of correlation."), /* @__PURE__ */ React.createElement("p", null, "The proximity of these nodes is determined by their relevance to the initial node, with red indicating a high degree of relevance, orange signifying moderate relevance, and yellow representing minimal relevance."), /* @__PURE__ */ React.createElement("p", null, "This method provides a clear and concise representation of the relationships within the dataset."));
};
export default SingleNodeDescriptionPanel;
