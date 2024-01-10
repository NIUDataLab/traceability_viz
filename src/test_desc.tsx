import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import SingleNodeDescriptionPanel from './single_node_description_panel';
import DescriptionPanel from './description_panel';
import NearestNeighborTravDescriptionPanel from './nearest_neighbor_traversal_description';
import NodeDisplay from './node_display';
import RiskTraversalDescriptionPanel from './risk_visual_description'
import './styles.css'

function App() {
  const [mode, setMode] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [nodeDescriptionsData, setNodeDescriptionsData] = useState<{ data: any } | null>(null);

  // First useEffect hook for adding the event listeners
  useEffect(() => {
    const modeSelect = document.getElementById('mode-select');
    const dataSelect = document.getElementById('data-select');

    if (modeSelect) {
      modeSelect.addEventListener('change', function(event) {
        setMode((event.target as HTMLSelectElement).value);
      });
    }

    if (dataSelect) {
      dataSelect.addEventListener('change', function(event) {
        setSelectedOption((event.target as HTMLSelectElement).value);
      });
    }
  }, []); // Empty dependency array so this runs only once when the component mounts

  // Second useEffect hook for fetching the data
  useEffect(() => {
    if (!selectedOption) {
      return;
    }

    //http://127.0.0.1:5000/all_node_description_data.json -- for local hosting
    //http://jwilson9567.pythonanywhere.com -- this is for online hosting
    fetch('https://jwilson9567.pythonanywhere.com/all_node_description_data.json', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: `data_type=${selectedOption}`,
    })
    .then(response => response.json())
    .then(data => {
      console.log("Printing descriptions for all nodes for node_display element: ")
      console.log(data);
      setNodeDescriptionsData(data); // Store the data in state
    });
  }, [selectedOption]); // selectedOption as a dependency

  return (
    <div className="panel-container">
      {mode === '' && <DescriptionPanel />}
      {mode === 'single-node' && <SingleNodeDescriptionPanel />}
      {mode === 'single-node' && <NodeDisplay nodeData={nodeDescriptionsData} selectedOption={selectedOption} />}
      {mode === 'start-node-distance' && <NearestNeighborTravDescriptionPanel />}
      {mode === 'better-traversal-visual' && <RiskTraversalDescriptionPanel />}
      {mode === 'better-traversal-visual' && <NodeDisplay nodeData={nodeDescriptionsData} selectedOption={selectedOption} />}
      {/* Add similar lines for the other modes... */}
    </div>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);





