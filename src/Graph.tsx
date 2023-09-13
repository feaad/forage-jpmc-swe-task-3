import React, { Component } from 'react';
import { Table, TableData } from '@finos/perspective';
import { ServerRespond } from './DataStreamer';
import { DataManipulator } from './DataManipulator';
import { AlertsDisplay } from "./AlertsDisplay";
import './Graph.css';

interface IProps {
  data: ServerRespond[],
}

interface PerspectiveViewerElement extends HTMLElement {
  load: (table: Table) => void,
}
class Graph extends Component<IProps, {}> {
  table: Table | undefined;

  render() {
    return React.createElement('perspective-viewer');
  }

  componentDidMount() {
    // Get element from the DOM.
    const elem = document.getElementsByTagName('perspective-viewer')[0] as unknown as PerspectiveViewerElement;

    //Updating the schema to show a blue print of the structure
    const schema = {
      price_abc: 'float',
      prince_def: 'float',
      ratio: 'float',
      upper_bound: 'float',
      lower_bound: 'float',
      opportunity_alert: 'float',
      timestamp: 'date'
    };

    if (window.perspective && window.perspective.worker()) {
      this.table = window.perspective.worker().table(schema);
    }
    if (this.table) {
      // Load the `table` in the `<perspective-viewer>` DOM reference.
      elem.load(this.table);
      elem.setAttribute('view', 'y_line');
      elem.setAttribute('row-pivots', '["timestamp"]');
      elem.setAttribute('columns', '["ratio", "upper_bound", "lower_bound", "opportunity_alert"]');
      elem.setAttribute('aggregates', JSON.stringify({
        price_abc: 'avg',
        prince_def: 'avg',
        ratio: 'avg',
        upper_bound: 'avg',
        lower_bound: 'avg',
        opportunity_alert: 'avg',
        timestamp: 'distinct count'
      }));
    }
  }

  componentDidUpdate() {
    if (this.table) {
      this.table.update([
        DataManipulator.generateRow(this.props.data),
      ] as unknown as TableData);
      var data = DataManipulator.generateRow(this.props.data);

      if (data.opportunity_alert != undefined) {
        AlertsDisplay.showOpp(data.opportunity_alert, data.timestamp);
      }
    }
  }

  

}

export default Graph;
