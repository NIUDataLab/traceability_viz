import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import SingleNodeDescriptionPanel from './single_node_description_panel';
import DescriptionPanel from './description_panel';
import './styles.css'
// Import the other description panels...

function App() {
  const [mode, setMode] = useState('');

  useEffect(() => {
    const modeSelect = document.getElementById('mode-select');
    const dataSelect = document.getElementById('data-select');

    if (modeSelect) {
      modeSelect.addEventListener('change', function(event) {
        setMode((event.target as HTMLSelectElement).value);
      });
    }

    // Do the same for dataSelect if needed...
  }, []);

  return (
    <div>
      {mode === 'single-node' && <SingleNodeDescriptionPanel />}
      {mode === '' && <DescriptionPanel />}
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

