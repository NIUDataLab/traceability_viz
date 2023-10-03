import React from 'react';
import ReactDOM from 'react-dom';
import Panel from './Panel';

ReactDOM.render(
  <React.StrictMode>
    <Panel title="My Panel">
      <p>This is the content of the panel.</p>
    </Panel>
  </React.StrictMode>,
  document.getElementById('root')
);


