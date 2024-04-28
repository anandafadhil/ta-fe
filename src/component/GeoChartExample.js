import React, { PureComponent } from 'react';
import { Chart } from 'react-google-charts';
import { ResponsiveContainer } from 'recharts';

export default class GeoChartExample extends PureComponent {
  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <Chart

          chartType="GeoChart"
          data={[
            ['Provinces', 'Popularity'],
            ['ID-YO', 600],
            ['ID-JK', 300],
            ['West Sumatra', 400],
            // Add more provinces here as needed
          ]}
          options={{
            region: 'ID', // Asia,
            resolution: "provinces",
            colorAxis: { colors: ['#00853f', 'black', '#e31b23'] },
            backgroundColor: '#81d4fa',
            datalessRegionColor: '#f8bbd0',
            defaultColor: '#f5f5f5',
          }}
          rootProps={{ 'data-testid': '1' }}
        />
      </ResponsiveContainer>
    );
  }
}
