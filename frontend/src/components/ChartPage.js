import React, { useState } from 'react';
import { Header, Menu } from 'semantic-ui-react';
import Chart from './Chart';

const ChartPage = props => {
  const [graphPage, setGraphPage] = useState('Doughnut');

  const toGraphPage = page => event => {
    event.preventDefault();
    setGraphPage(page);
  };

  const renderCharts = () => {
    switch (graphPage) {
      case 'Doughnut':
        return <Chart type="main-doughnut" data={props.data} />;
      case 'Pie':
        return <Chart type="main-pie" data={props.data} />;
      case 'Bar':
        return <Chart type="main-bar" data={props.data} />;
      default:
        return null;
    }
  };
  return (
    <div>
      <Header as="h2">Expenses graph view</Header>
      <Menu pointing secondary>
        <Menu.Item
          name="Doughnut"
          active={graphPage === 'Doughnut'}
          onClick={toGraphPage('Doughnut')}
        />
        <Menu.Item
          name="Pie"
          active={graphPage === 'Pie'}
          onClick={toGraphPage('Pie')}
        />
        <Menu.Item
          name="Bar"
          active={graphPage === 'Bar'}
          onClick={toGraphPage('Bar')}
        />
      </Menu>
      {renderCharts()}
    </div>
  );
};

export default ChartPage;
