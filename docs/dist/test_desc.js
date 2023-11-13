import React, {useState, useEffect} from "../_snowpack/pkg/react.js";
import ReactDOM from "../_snowpack/pkg/react-dom.js";
import SingleNodeDescriptionPanel from "./single_node_description_panel.js";
import DescriptionPanel from "./description_panel.js";
import NearestNeighborTravDescriptionPanel from "./nearest_neighbor_traversal_description.js";
import NodeDisplay from "./node_display.js";
import RiskTraversalDescriptionPanel from "./risk_visual_description.js";
import "./styles.css.proxy.js";
function App() {
  const [mode, setMode] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const [nodeDescriptionsData, setNodeDescriptionsData] = useState(null);
  useEffect(() => {
    const modeSelect = document.getElementById("mode-select");
    const dataSelect = document.getElementById("data-select");
    if (modeSelect) {
      modeSelect.addEventListener("change", function(event) {
        setMode(event.target.value);
      });
    }
    if (dataSelect) {
      dataSelect.addEventListener("change", function(event) {
        setSelectedOption(event.target.value);
      });
    }
  }, []);
  useEffect(() => {
    if (!selectedOption) {
      return;
    }
    fetch("http://127.0.0.1:5000/all_node_description_data.json", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body: `data_type=${selectedOption}`
    }).then((response) => response.json()).then((data) => {
      console.log("Printing descriptions for all nodes for node_display element: ");
      console.log(data);
      setNodeDescriptionsData(data);
    });
  }, [selectedOption]);
  return /* @__PURE__ */ React.createElement("div", {
    className: "panel-container"
  }, mode === "" && /* @__PURE__ */ React.createElement(DescriptionPanel, null), mode === "single-node" && /* @__PURE__ */ React.createElement(SingleNodeDescriptionPanel, null), mode === "single-node" && /* @__PURE__ */ React.createElement(NodeDisplay, {
    nodeData: nodeDescriptionsData
  }), mode === "start-node-distance" && /* @__PURE__ */ React.createElement(NearestNeighborTravDescriptionPanel, null), mode === "better-traversal-visual" && /* @__PURE__ */ React.createElement(RiskTraversalDescriptionPanel, null));
}
ReactDOM.render(/* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(App, null)), document.getElementById("root"));
