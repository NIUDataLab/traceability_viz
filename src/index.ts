/**
 * This is a minimal example of sigma. You can use it as a base to write new
 * examples, or reproducible test cases for new issues, for instance.
 */

import Graph from "graphology";
import Sigma from "sigma";
import random from 'graphology-layout/random';
import chroma, { distance } from "chroma-js";

function Get(yourUrl:string){
    var Httpreq = new XMLHttpRequest(); // a new request
    Httpreq.open("GET",yourUrl,false);
    Httpreq.send(null);
    return Httpreq.responseText;          
}

window.onload = () => {
  // Get the mode select and data select elements
  const modeSelect = document.getElementById('mode-select') as HTMLSelectElement;
  const dataSelect = document.getElementById('data-select') as HTMLSelectElement;

  // Disable the mode select dropdown initially
  modeSelect.disabled = true;

  // Enable the mode select dropdown when an option is selected from the data select dropdown
  dataSelect.addEventListener('change', function() {
    if (this.value) {
      modeSelect.disabled = false;
    } else {
      modeSelect.disabled = true;
    }
  });
};

// Get the select element
const dataSelect = document.getElementById('data-select') as HTMLSelectElement;

// Add an event listener for the change event
dataSelect.addEventListener('change', () => {
  // Get the default option
  const defaultOption = dataSelect.querySelector('option[value=""]');

  // If a value is selected, remove the default option
  if (dataSelect.value && defaultOption) {
    defaultOption.remove();
  }
});


const single_node_container = document.getElementById("single-node-container") as HTMLElement;

let parsed_data: any;

// Declare the single_node_renderer variable with a type
let single_node_renderer: Sigma | null;

document.getElementById('data-select')?.addEventListener('change', (event) => {
  const selectedOption = (event.target as HTMLSelectElement).value;
  single_node_legend.style.display = "none";

  // Reset the single-node-input input field
  (document.getElementById('single-node-input') as HTMLInputElement).value = '';

  single_node_graph_view.clear(); // Clear the graph
  if (single_node_renderer != null)
  {
    single_node_renderer.kill();
    single_node_renderer = null;
  }

  start_node_distance_graph.clear();
  if (start_node_distance_renderer != null)
  {
    start_node_distance_renderer.kill();
    start_node_distance_renderer = null;
  }

  // Reset the single-node-input input field
  (document.getElementById('start-node-input') as HTMLInputElement).value = '';
  (document.getElementById('distance-input') as HTMLInputElement).value = '';
  // Get the elements
  const pathDisplay = document.getElementById('path-display');
  const totalRiskDisplay = document.getElementById('total-risk-display');

  // Set their content to nothing
  if (pathDisplay) {
    pathDisplay.innerHTML = '';
  }
  if (totalRiskDisplay) {
    totalRiskDisplay.innerHTML = '';
  } 

  if (!selectedOption)
  {
    alert('Please choose a data set to work with!');
    return;
  }

  fetch('http://127.0.0.1:5000/different.json', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: `data_type=${selectedOption}`,
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    // 'data' is now a JavaScript object that you can work with
    parsed_data = data;

    for (const node of Object.keys(parsed_data)) {
      console.log("node:", node)
      single_node_graph_view.addNode(node, { label: node } );
    }
  });
});




//const single_node_container = document.getElementById("single-node-container") as HTMLElement;
//const temp_c = document.getElementById("temp") as HTMLElement;

//const raw_data = Get("http://127.0.0.1:5000/data.json"); // this stores raw data, still needs to be converted
//const parsed_data = JSON.parse(raw_data); // this converts the data to JSON object format

//console.log(parsed_data);

const single_node_graph_view = new Graph();


//graph.addNode("John", { x: 0, y: 10, size: 5, label: "John", color: "blue" });
//graph.addNode("Mary", { x: 10, y: 0, size: 3, label: "Mary", color: "red" });

//graph.addEdge("John", "Mary");

/*for (const node of Object.keys(parsed_data)) {
    single_node_graph_view.addNode(node, { label: node } );
}*/

/*for (const node of Object.keys(parsed_data)) //for reading edges later on into the graph
{
    for (const edge of Object.keys(parsed_data[node]))
    {
        const weight = parsed_data[node][edge];
        graph.addEdge(node, edge, { weight });
    }
}*/

// Print node data
single_node_graph_view.forEachNode((nodeId, attributes) => {
  console.log(`Node ${nodeId}:`, attributes);
});
  
// Print edge data
single_node_graph_view.forEachEdge((edgeId, attributes, source, target) => {
  console.log(`Edge ${edgeId} from ${source} to ${target}:`, attributes);
});


  //const positions = random(graph);
  //random.assign(graph_distance_view); //assigns random positions directly to the graph

// eslint-disable-next-line @typescript-eslint/no-unused-vars
//const renderer = new Sigma(graph_distance_view, distance_container);

const modeSelect = document.querySelector("#mode-select") as HTMLSelectElement; //this can either be null as well

const single_node_section = document.getElementById("single-node-section") as HTMLInputElement;

const start_node_distance_section = document.getElementById("start-node-distance-section") as HTMLInputElement;

const better_traversal = document.getElementById("better-traversal-section") as HTMLInputElement;

if (modeSelect) {
  modeSelect.addEventListener("change", () => {
    const mode = modeSelect.value;

    single_node_section.style.display = "none";
    start_node_distance_section.style.display = "none";
    better_traversal.style.display = "none";
    

    if (mode === "single-node")
    {
      single_node_section.style.display = "block";
    }
    else if (mode === "start-node-distance")
    {
      start_node_distance_section.style.display = "block";
    }
    else if (mode === "better-traversal-visual")
    {
      better_traversal.style.display = "block";
    }
});
}
    

// Declare the single_node_renderer variable with a type
//let single_node_renderer: Sigma | null;
  
console.log("ok");

const single_node_input = document.querySelector("#single-node-input") as HTMLInputElement;

const single_node_legend = document.querySelector("#legend") as HTMLDivElement;


if (single_node_section) {
    // Listen for keydown events on the input element
    single_node_section.addEventListener("keydown", (event) => {
      // Check if the Enter key was pressed
      if (event.key === "Enter") {
        single_node_legend.style.display = "block";
        // Get the value entered by the user
        const nodeLabel = single_node_input.value; //change this still
  
      // Find a node with a matching label
      const selectedNode = single_node_graph_view
        .nodes()
        .find(
          (node) =>
            single_node_graph_view.getNodeAttribute(node, "label") === nodeLabel
        );
      if (selectedNode) {
        console.log("we found the node");

        // Call the resetGraph function to reset the graph
        resetGraph(single_node_graph_view);

        const containerWidth = single_node_container.offsetWidth;
        const containerHeight = single_node_container.offsetHeight;

        single_node_graph_view.setNodeAttribute(selectedNode, "x", -containerWidth / 2);
        single_node_graph_view.setNodeAttribute(selectedNode, "y", -containerHeight / 2);

        // Set its size and color
        single_node_graph_view.setNodeAttribute(selectedNode, "size", 10);
        single_node_graph_view.setNodeAttribute(selectedNode, "color", "black");
         // Call the updateColor function to start the rainbow fading effect
        //updateColor(graph_distance_view, selectedNode);
        

  // Get the relationship data for the selected node
  const relationships = parsed_data[selectedNode];

  // Calculate the minimum and maximum relationship values
  const minRelationship = Math.min(...(Object.values(relationships) as number[]));
  const maxRelationship = Math.max(...(Object.values(relationships) as number[]));

  const colorScale = chroma.scale("YlOrRd").domain([minRelationship, maxRelationship]);

  // Normalize the relationship values and use them to position the nodes
  let angle = -Math.PI / 2;
  const angleStep = Math.PI / (2 * Object.keys(relationships).length);
  for (const [node, relationship] of Object.entries(relationships)) {
    if (node !== selectedNode) {
      // Normalize the relationship value
      const normalizedRelationship =
        ((relationship as number) - minRelationship) /
        (maxRelationship - minRelationship);

      // Calculate the distance of the node from the selected node
      //const distance = (1 - normalizedRelationship) * (containerWidth / 4);
      const distance = Math.pow(1 - normalizedRelationship, 3) * (containerWidth / 4);

      // Set the position of the node
      single_node_graph_view.setNodeAttribute(
        node,
        "x",
        -containerWidth / 2 + distance * Math.cos(angle)
      );
      single_node_graph_view.setNodeAttribute(
        node,
        "y",
        -containerHeight / 2 + distance * Math.sin(angle)
      );

          // Set the color of the node based on its weight
    single_node_graph_view.setNodeAttribute(
      node,
      "color",
      colorScale(normalizedRelationship).hex()
    );

      // Increment the angle for the next node
      angle += angleStep;
    }
  }

   // Calculate the distance of the node from the selected node
//const distance = Math.pow(1 - normalizedRelationship, 2) * (containerWidth / 4);
        
        // Check if the third container element was found
        if (!single_node_container) {
            console.error(
              "Error: Could not find second container element on the page"
            );
          } else {
            console.log("good");
            // Check if a second Sigma instance already exists
            if (single_node_renderer) {
                console.log("perfect!!!!");
              // Remove the existing Sigma instance
              single_node_renderer.kill();
              single_node_renderer = null;
            }

            // Create a new Sigma instance and render the graph in the third container
            single_node_renderer = new Sigma(single_node_graph_view, single_node_container);

            // Assuming single_node_renderer is initialized somewhere...
            if (single_node_renderer) {
              (single_node_renderer).on('clickNode', function(e: any) {
                // Get the clicked node's id
                var nodeId = e.node;
                console.log("Clicked on node with ID:", nodeId);

                var nodeName = "gg"/* Get the real name of the node */;
                var nodeDescription = "hello"/* Get the description of the node */;
                //var nodeX = e.data.node['renderer1:x'];
                //var nodeY = e.data.node['renderer1:y'];
            
                // Update the content of the info box
                var infoBox = document.getElementById('info-box');
                if (infoBox) {
                  // Update the content of the info box
                  infoBox.innerHTML = 'Name: ' + nodeName + '<br>Description: ' + nodeDescription;
            
                  // Update the position of the info box
                  //infoBox.style.left = nodeX + 'px';
                  //infoBox.style.top = nodeY + 'px';
            
                  // Show the info box
                  infoBox.style.display = 'block';
                }




                //console.log("Clicked on node with ID:", nodeId);
                //var nodeId = e.data.node.id;
                

                // Fetch the description for this node
                fetch('http://127.0.0.1:5000/descriptions.json', {
                  method: 'POST',
                  headers: {
                      'Content-Type': 'application/x-www-form-urlencoded',
                  },
                  body: `node_id=${nodeId}`,
                })
                .then(response => response.json())  // Use json() instead of text()
                .then(responseJson => {
                    console.log(responseJson);
                });


              });
            }

        }

      } else {
        console.log("we did not find the node!");
      }
    }
    });
    }

    function resetGraph(graph: Graph) {
        // Reset the position, size, and color of all nodes in the graph
        graph.forEachNode((node) => {
          graph.setNodeAttribute(node, "x", 0);
          graph.setNodeAttribute(node, "y", 0);
          graph.setNodeAttribute(node, "size", 3);
          graph.setNodeAttribute(node, "color", "#666");
        });
      }

    // Define an array of colors for the rainbow effect
/*const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];
let colorIndex = 0;

// Define a function to update the color of the selected node
function updateColor(graph: Graph, selectedNode: string) {
  // Set the color attribute of the selected node to the next color in the array
  graph.setNodeAttribute(selectedNode, "color", colors[colorIndex]);

  // Increment the color index
  colorIndex = (colorIndex + 1) % colors.length;

  // Set a delay before calling the updateColor function again
  setTimeout(() => updateColor(graph, selectedNode), 1000); // 1000ms = 1s delay
}*/

const start_node_input = document.getElementById("start-node-input") as HTMLInputElement;
const distance_input = document.getElementById("distance-input") as HTMLInputElement;

/*if (start_node_input && distance_input) { //This is the function that is still not formatted and needs to be worked on.
  distance_input.addEventListener("keydown", (event) => {
    // Check if the Enter key was pressed
    if (event.key === "Enter") {
        console.log("we are in");

      //REMEMBER TO DO CHECKS FOR BOTH DISTANCE AND NODE ENTERED IF THEY ARE INVALID.

      const start_node = start_node_input.value;
      const start_distance = Number(distance_input.value);

      // Send the data to the Flask server
      fetch('http://127.0.0.1:5000/calc', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ start_node, start_distance })
      })
        .then((response) => response.json())
        .then((data) => {
           // Update the page content with the data received from the server
           console.log(data);

           path = data.path;
           edge_weights = data.edge_weights;
           total_risk = data.distance;
        });

      console.log(start_node, start_distance);
    }
  });
}*/

//this function will wait using async, until the server recieves a response. Once it does, we read the data into path 
//edge_weights, and total_risk. This function can be altered so that distances and other items can be taken into it.
let path: string[];
let edge_weights: string[];
let total_risk: string[];

async function fetchData() {
  const start_node = start_node_input.value;
  const start_distance = Number(distance_input.value);

  const response = await fetch('http://127.0.0.1:5000/calc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ start_node, start_distance })
  });

  const data = await response.json();

  path = data.path;
  edge_weights = data.edge_weights;
  total_risk = data.distance;

  console.log("path:", path);
  console.log("edge_weights:", edge_weights);
  console.log("total_risk:", total_risk)
}

const start_node_distance_graph = new Graph();
let start_node_distance_renderer: Sigma | null;
const start_node_distance_container = document.getElementById("start-node-distance-container") as HTMLElement;

if (start_node_input && distance_input) {
  distance_input.addEventListener("keydown", async (event) => { //make the event listener async
    if (event.key === "Enter") {
      await fetchData();// wait for fetchData to complete
      console.log("we read the data: ", path);
      let graphWidth = 10; // Adjust this value to suit your needs

      // Clear the distance graph before adding nodes
      start_node_distance_graph.clear();

      for (let i = 0; i < path.length; i++)
      {
        let x = (graphWidth / (path.length - 1)) * i;
        let y = Math.random() * 4 + 5; // Add randomness to the height

        // If its the first first node, make it bigger and a different color
        if (i === 0)
        {
          start_node_distance_graph.addNode(path[i], { 
          x: x, 
          y: y, 
          size: 7, 
          label: "CWE " + path[i], 
          color: "red" 
        });
        } else 
        {
          start_node_distance_graph.addNode(path[i], { 
            x: x, 
            y: y, 
            size: 5, 
            label: "CWE " + path[i], 
            color: "blue" 
          });
        }
      }

      console.log("we made it past the node read!");

      // Add edges to the graph
      for (let i = 0; i < path.length - 1; i++) {
        let weight = parseFloat(edge_weights[i]);
        start_node_distance_graph.addEdge(path[i], path[i + 1], {
          id: 'e' + i,
          source: path[i],
          target: path[i + 1],
          label: 'Edge' + i,
          size: weight * 2,
          color: '#000'
        });
      }

      console.log("Edges added to the graph!");

      // Assuming path and total_risk are defined
      let path_display = document.getElementById('path-display');
      let total_risk_display = document.getElementById('total-risk-display');

      if (path_display)
      {
        path_display.textContent = 'Path: ' + path.join(' -> ');
        console.log(path_display.textContent); // Add this line  
      }

      if (total_risk_display)
      {
        total_risk_display.textContent = 'Total Risk: ' + total_risk;
        console.log(total_risk_display.textContent); // And this line
      }

      // Check if the third container element was found
      if (!start_node_distance_container) {
        console.error(
        "Error: Could not find second container element on the page"
      );
      } else {
        console.log("good");
        // Check if a second Sigma instance already exists
        if (start_node_distance_renderer) {
          console.log("perfect!!!!");
          // Remove the existing Sigma instance
          start_node_distance_renderer.kill();
          start_node_distance_renderer = null;
      }

      // Create a new Sigma instance and render the graph in the third container
      start_node_distance_renderer = new Sigma(start_node_distance_graph, start_node_distance_container);
    }
      
    }
  });
}

const better_traversal_input = document.getElementById("better-traversal-input") as HTMLInputElement;
const better_distance_input = document.getElementById("better-distance-input") as HTMLInputElement;

if (better_traversal_input && better_distance_input) {
  better_distance_input.addEventListener("keydown", async (event) => { //make the event listener async
    if (event.key === "Enter") {
      await better_fetchData();// wait for fetchData to complete
    }
  });
}

async function better_fetchData() {
  const start_node = better_traversal_input.value;
  const start_distance = Number(better_distance_input.value);

  const response = await fetch('http://127.0.0.1:5000/newcalc', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ start_node, start_distance })
  });

  const data = await response.json();

  //path = data.path;
  //edge_weights = data.edge_weights;
  //total_risk = data.distance;

  //console.log("path:", path);
  //console.log("edge_weights:", edge_weights);
  //console.log("total_risk:", total_risk)

  console.log("data")
}







