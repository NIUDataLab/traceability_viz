import Graph from "../_snowpack/pkg/graphology.js";
import Sigma from "../_snowpack/pkg/sigma.js";
import chroma from "../_snowpack/pkg/chroma-js.js";
import "./test_desc.js";
import {EventEmitter} from "../_snowpack/pkg/events.js";
export const eventEmitter = new EventEmitter();
function Get(yourUrl) {
  var Httpreq = new XMLHttpRequest();
  Httpreq.open("GET", yourUrl, false);
  Httpreq.send(null);
  return Httpreq.responseText;
}
window.onload = () => {
  const modeSelect2 = document.getElementById("mode-select");
  const dataSelect2 = document.getElementById("data-select");
  modeSelect2.disabled = true;
  dataSelect2.addEventListener("change", function() {
    if (this.value) {
      modeSelect2.disabled = false;
    } else {
      modeSelect2.disabled = true;
    }
  });
};
const dataSelect = document.getElementById("data-select");
dataSelect.addEventListener("change", () => {
  const defaultOption = dataSelect.querySelector('option[value=""]');
  if (dataSelect.value && defaultOption) {
    defaultOption.remove();
  }
});
const single_node_container = document.getElementById("single-node-container");
let parsed_data;
let node_descriptions_data;
let single_node_renderer;
document.getElementById("data-select")?.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  single_node_legend.style.display = "none";
  document.getElementById("single-node-input").value = "";
  single_node_graph_view.clear();
  if (single_node_renderer != null) {
    single_node_renderer.kill();
    single_node_renderer = null;
  }
  start_node_distance_graph.clear();
  if (start_node_distance_renderer != null) {
    start_node_distance_renderer.kill();
    start_node_distance_renderer = null;
  }
  document.getElementById("start-node-input").value = "";
  document.getElementById("distance-input").value = "";
  const pathDisplay = document.getElementById("path-display");
  const totalRiskDisplay = document.getElementById("total-risk-display");
  if (pathDisplay) {
    pathDisplay.innerHTML = "";
  }
  if (totalRiskDisplay) {
    totalRiskDisplay.innerHTML = "";
  }
  if (!selectedOption) {
    alert("Please choose a data set to work with!");
    return;
  }
  fetch("https://jwilson9567.pythonanywhere.com/different.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `data_type=${selectedOption}`
  }).then((response) => response.json()).then((data) => {
    console.log(data);
    parsed_data = data;
    for (const node of Object.keys(parsed_data)) {
      single_node_graph_view.addNode(node, {label: node});
    }
  });
  fetch("https://jwilson9567.pythonanywhere.com/all_node_description_data.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `data_type=${selectedOption}`
  }).then((response) => response.json()).then((data) => {
    console.log("Printing descriptions for all nodes: ");
    console.log(data);
    node_descriptions_data = data;
  });
});
const single_node_graph_view = new Graph();
const modeSelect = document.querySelector("#mode-select");
const single_node_section = document.getElementById("single-node-section");
const start_node_distance_section = document.getElementById("start-node-distance-section");
const better_traversal = document.getElementById("better-traversal-section");
if (modeSelect) {
  modeSelect.addEventListener("change", () => {
    const mode = modeSelect.value;
    single_node_section.style.display = "none";
    start_node_distance_section.style.display = "none";
    better_traversal.style.display = "none";
    if (mode === "single-node") {
      single_node_section.style.display = "block";
    } else if (mode === "start-node-distance") {
      start_node_distance_section.style.display = "block";
    } else if (mode === "better-traversal-visual") {
      better_traversal.style.display = "block";
    }
  });
}
console.log("ok");
const single_node_input = document.querySelector("#single-node-input");
const single_node_legend = document.querySelector("#legend");
if (single_node_section) {
  single_node_section.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      const nodeLabel = single_node_input.value;
      const selectedNode2 = single_node_graph_view.nodes().find((node) => single_node_graph_view.getNodeAttribute(node, "label") === nodeLabel);
      if (selectedNode2) {
        console.log("we found the node");
        resetGraph(single_node_graph_view);
        const containerWidth = single_node_container.offsetWidth;
        const containerHeight = single_node_container.offsetHeight;
        single_node_graph_view.setNodeAttribute(selectedNode2, "x", -containerWidth / 2);
        single_node_graph_view.setNodeAttribute(selectedNode2, "y", -containerHeight / 2);
        single_node_graph_view.setNodeAttribute(selectedNode2, "size", 10);
        single_node_graph_view.setNodeAttribute(selectedNode2, "color", "black");
        const relationships2 = parsed_data[selectedNode2];
        const minRelationship = Math.min(...Object.values(relationships2));
        const maxRelationship = Math.max(...Object.values(relationships2));
        const colorScale = chroma.scale("YlOrRd").domain([minRelationship, maxRelationship]);
        let angle = -Math.PI / 2;
        const angleStep = Math.PI / (2 * Object.keys(relationships2).length);
        for (const [node, relationship] of Object.entries(relationships2)) {
          if (node !== selectedNode2) {
            const normalizedRelationship = (relationship - minRelationship) / (maxRelationship - minRelationship);
            const distance2 = Math.pow(1 - normalizedRelationship, 3) * (containerWidth / 4);
            single_node_graph_view.setNodeAttribute(node, "x", -containerWidth / 2 + distance2 * Math.cos(angle));
            single_node_graph_view.setNodeAttribute(node, "y", -containerHeight / 2 + distance2 * Math.sin(angle));
            single_node_graph_view.setNodeAttribute(node, "color", colorScale(normalizedRelationship).hex());
            angle += angleStep;
          }
        }
        console.log("Data set used: ", dataSelect.value);
        if (!single_node_container) {
          console.error("Error: Could not find second container element on the page");
        } else {
          console.log("good");
          if (single_node_renderer) {
            console.log("perfect!!!!");
            single_node_renderer.kill();
            single_node_renderer = null;
          }
          single_node_renderer = new Sigma(single_node_graph_view, single_node_container);
          if (single_node_renderer) {
            single_node_renderer.on("clickNode", function(e) {
              var nodeId = e.node;
              console.log("Clicked on node with ID:", nodeId);
              eventEmitter.emit("nodeClicked", nodeId);
            });
          }
        }
      } else {
        console.log("we did not find the node!");
      }
    }
  });
}
function resetGraph(graph) {
  graph.forEachNode((node) => {
    graph.setNodeAttribute(node, "x", 0);
    graph.setNodeAttribute(node, "y", 0);
    graph.setNodeAttribute(node, "size", 3);
    graph.setNodeAttribute(node, "color", "#666");
  });
}
const start_node_input = document.getElementById("start-node-input");
const distance_input = document.getElementById("distance-input");
let path;
let edge_weights;
let total_risk;
async function fetchData() {
  const start_node = start_node_input.value;
  const start_distance = Number(distance_input.value);
  const response = await fetch("http://127.0.0.1:5000/calc", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({start_node, start_distance})
  });
  const data = await response.json();
  path = data.path;
  edge_weights = data.edge_weights;
  total_risk = data.distance;
  console.log("path:", path);
  console.log("edge_weights:", edge_weights);
  console.log("total_risk:", total_risk);
}
const start_node_distance_graph = new Graph();
let start_node_distance_renderer;
const start_node_distance_container = document.getElementById("start-node-distance-container");
if (start_node_input && distance_input) {
  distance_input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      await fetchData();
      console.log("we read the data: ", path);
      let graphWidth = 10;
      start_node_distance_graph.clear();
      for (let i = 0; i < path.length; i++) {
        let x = graphWidth / (path.length - 1) * i;
        let y = Math.random() * 4 + 5;
        if (i === 0) {
          start_node_distance_graph.addNode(path[i], {
            x,
            y,
            size: 6,
            label: path[i],
            color: "red"
          });
        } else {
          start_node_distance_graph.addNode(path[i], {
            x,
            y,
            size: 6,
            label: path[i],
            color: "blue"
          });
        }
      }
      console.log("we made it past the node read!");
      for (let i = 0; i < path.length - 1; i++) {
        let weight = parseFloat(edge_weights[i]);
        start_node_distance_graph.addEdge(path[i], path[i + 1], {
          id: "e" + i,
          source: path[i],
          target: path[i + 1],
          label: "Edge" + i,
          size: weight * 2,
          color: "#000"
        });
      }
      console.log("Edges added to the graph!");
      let path_display = document.getElementById("path-display");
      let total_risk_display = document.getElementById("total-risk-display");
      if (path_display) {
        path_display.textContent = "Path: " + path.join(" -> ");
        console.log(path_display.textContent);
      }
      if (total_risk_display) {
        total_risk_display.textContent = "Total Risk: " + total_risk;
        console.log(total_risk_display.textContent);
      }
      if (!start_node_distance_container) {
        console.error("Error: Could not find second container element on the page");
      } else {
        console.log("good");
        if (start_node_distance_renderer) {
          console.log("perfect!!!!");
          start_node_distance_renderer.kill();
          start_node_distance_renderer = null;
        }
        start_node_distance_renderer = new Sigma(start_node_distance_graph, start_node_distance_container);
      }
    }
  });
}
const better_traversal_input = document.getElementById("better-traversal-input");
const better_distance_input = document.getElementById("better-distance-input");
const better_distance_graph = new Graph();
let better_distance_renderer;
const better_distance_container = document.getElementById("better-traversal-container");
document.getElementById("data-select")?.addEventListener("change", (event) => {
  const selectedOption = event.target.value;
  fetch("http://127.0.0.1:5000/different.json", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: `data_type=${selectedOption}`
  }).then((response) => response.json()).then((data) => {
    console.log(data);
    parsed_data = data;
    for (const node of Object.keys(parsed_data)) {
      better_distance_graph.addNode(node, {label: node});
    }
  });
});
let relationships;
let selectedNode = void 0;
let better_distance = null;
if (better_traversal_input && better_distance_input) {
  better_distance_input.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      const nodeLabel = better_traversal_input.value;
      better_distance = better_distance_input.value;
      selectedNode = better_distance_graph.nodes().find((node) => better_distance_graph.getNodeAttribute(node, "label") === nodeLabel);
      if (selectedNode) {
        console.log("we found the node");
        resetGraph(better_distance_graph);
        const containerWidth = better_distance_container.offsetWidth;
        const containerHeight = better_distance_container.offsetHeight;
        better_distance_graph.setNodeAttribute(selectedNode, "x", -containerWidth / 2);
        better_distance_graph.setNodeAttribute(selectedNode, "y", -containerHeight / 2);
        better_distance_graph.setNodeAttribute(selectedNode, "size", 10);
        better_distance_graph.setNodeAttribute(selectedNode, "color", "black");
        relationships = parsed_data[selectedNode];
        const minRelationship = Math.min(...Object.values(relationships));
        const maxRelationship = Math.max(...Object.values(relationships));
        let angle = -Math.PI / 2;
        const angleStep = Math.PI / (2 * Object.keys(relationships).length);
        for (const [node, relationship] of Object.entries(relationships)) {
          if (node !== selectedNode) {
            const normalizedRelationship = (relationship - minRelationship) / (maxRelationship - minRelationship);
            const distance2 = Math.pow(1 - normalizedRelationship, 3) * (containerWidth / 4);
            better_distance_graph.setNodeAttribute(node, "x", -containerWidth / 2 + distance2 * Math.cos(angle));
            better_distance_graph.setNodeAttribute(node, "y", -containerHeight / 2 + distance2 * Math.sin(angle));
            const relationshipDistance = relationships[node];
            angle += angleStep;
          }
        }
        updateColors();
        console.log("Data set used: ", dataSelect.value);
        if (!better_distance_container) {
          console.error("Error: Could not find second container element on the page");
        } else {
          console.log("good");
          if (better_distance_renderer) {
            console.log("perfect!!!!");
            better_distance_renderer.kill();
            better_distance_renderer = null;
          }
          better_distance_renderer = new Sigma(better_distance_graph, better_distance_container);
        }
      }
    }
  });
}
function updateColors() {
  let redNodes = [];
  let greenNodes = [];
  if (relationships && selectedNode && better_distance !== null) {
    for (const [node, relationship] of Object.entries(relationships)) {
      if (node !== selectedNode) {
        const relationshipDistance = relationships[node];
        if (relationshipDistance <= better_distance) {
          better_distance_graph.setNodeAttribute(node, "color", "green");
          greenNodes.push({node, distance: relationshipDistance});
        } else {
          better_distance_graph.setNodeAttribute(node, "color", "red");
          if (better_distance_graph.getNodeAttribute(node, "color") === "red") {
            redNodes.push({node, distance: relationshipDistance});
          }
        }
      }
    }
    redNodes.sort((a, b) => b.distance - a.distance);
    greenNodes.sort((a, b) => b.distance - a.distance);
    for (let i = 0; i < redNodes.length - 1; i++) {
      if (!better_distance_graph.hasEdge(redNodes[i].node, redNodes[i + 1].node)) {
        let edgeId = better_distance_graph.addEdge(redNodes[i].node, redNodes[i + 1].node);
      }
    }
    for (let i = 0; i < greenNodes.length - 1; i++) {
      if (!better_distance_graph.hasEdge(greenNodes[i].node, greenNodes[i + 1].node)) {
        let edgeId = better_distance_graph.addEdge(greenNodes[i].node, greenNodes[i + 1].node);
      }
    }
    if (redNodes.length > 0 && !better_distance_graph.hasEdge(selectedNode, redNodes[0].node)) {
      better_distance_graph.addEdge(selectedNode, redNodes[0].node);
    }
    if (redNodes.length > 0 && greenNodes.length > 0 && !better_distance_graph.hasEdge(redNodes[redNodes.length - 1].node, greenNodes[0].node)) {
      better_distance_graph.addEdge(redNodes[redNodes.length - 1].node, greenNodes[0].node);
    }
  }
  console.log("done with this iteration!!!!!");
}
