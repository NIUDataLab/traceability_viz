import React, {useState, useEffect} from "../_snowpack/pkg/react.js";
import {BsFillExclamationTriangleFill} from "../_snowpack/pkg/react-icons/bs.js";
import Panel from "./Panel.js";
import {eventEmitter} from "./index.js";
const NodeDisplay = ({nodeData, selectedOption}) => {
  const [visibleNode, setVisibleNode] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [clickedNodeId, setClickedNodeId] = useState(null);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  useEffect(() => {
    const handleNodeClick = (nodeId) => {
      console.log("Received node ID:", nodeId);
      setIsPanelOpen(true);
      setClickedNodeId(nodeId);
    };
    eventEmitter.on("nodeClicked", handleNodeClick);
    return () => {
      eventEmitter.off("nodeClicked", handleNodeClick);
    };
  }, []);
  useEffect(() => {
    setClickedNodeId(null);
  }, [searchTerm]);
  const handleClick = (nodeId) => {
    console.log("we are in the nodeid");
    if (visibleNode === nodeId) {
      setVisibleNode(null);
    } else {
      setVisibleNode(nodeId);
    }
  };
  const resetSearch = () => {
    setSearchTerm("");
    setClickedNodeId(null);
  };
  useEffect(() => {
    console.log("isPanelOpen changed:", isPanelOpen);
  }, [isPanelOpen]);
  return /* @__PURE__ */ React.createElement(Panel, {
    isDeployed: isPanelOpen,
    setIsDeployed: setIsPanelOpen,
    title: /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(BsFillExclamationTriangleFill, {
      className: "text-muted"
    }), " Node Index")
  }, /* @__PURE__ */ React.createElement("p", null, "This is going to be used to display descriptions and more information about the nodes."), /* @__PURE__ */ React.createElement("input", {
    type: "text",
    placeholder: "Search by node name or ID",
    value: searchTerm,
    onChange: (e) => setSearchTerm(e.target.value)
  }), /* @__PURE__ */ React.createElement("button", {
    className: "search-button",
    onClick: resetSearch
  }, "Search"), isPanelOpen && nodeData && nodeData.data.sort((a, b) => a.name - b.name).filter((node) => {
    if (clickedNodeId) {
      return node.name === clickedNodeId;
    }
    return node.name.includes(searchTerm) || node.value.name.includes(searchTerm);
  }).map((node) => {
    const nodeLink = selectedOption === "CWE" ? `https://cwe.mitre.org/data/definitions/${node.name}.html` : `https://capec.mitre.org/data/definitions/${node.name}.html`;
    return /* @__PURE__ */ React.createElement("div", {
      className: `node-container ${visibleNode === node.name ? "clicked" : ""}`,
      key: node.name
    }, /* @__PURE__ */ React.createElement("h3", {
      className: "node-id",
      onClick: () => handleClick(node.name)
    }, selectedOption, "-", node.name, ": ", node.value.name), visibleNode === node.name && /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement("p", null, "Name: ", node.value.name), /* @__PURE__ */ React.createElement("p", null, "Description: ", JSON.stringify(node.value.description)), /* @__PURE__ */ React.createElement("p", null, "Link: ", /* @__PURE__ */ React.createElement("a", {
      className: "node-link",
      href: nodeLink,
      target: "_blank",
      rel: "noopener noreferrer"
    }, nodeLink))));
  }));
};
export default NodeDisplay;
