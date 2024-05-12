import React, { PureComponent } from 'react';
import { Chart } from 'react-google-charts';
import { ResponsiveContainer } from 'recharts';
import { Text, Box, Center } from "@chakra-ui/react";
import Select from "react-select";

const newOptions = [
  { value: "2020", label: "2020" },
  { value: "2021", label: "2021" },
  { value: "2022", label: "2022" },
  { value: "2023", label: "2023" },
  { value: "2024", label: "2024" },
  { value: "2025", label: "2025" }
];

const jsonData = [
  {
    "provinsi": "ID-AC",
    "persentase": 0.467594661898985
  },
  {
    "provinsi": "ID-BA",
    "persentase": 0.737212237783254
  },
  {
    "provinsi": "ID-BB",
    "persentase": 0.638067772170151
  },
  {
    "provinsi": "ID-BE",
    "persentase": 0.574853801169591
  },
  {
    "provinsi": "ID-BT",
    "persentase": 0.599799630086313
  },
  {
    "provinsi": "ID-GO",
    "persentase": 0.54135083154203
  },
  {
    "provinsi": "ID-JA",
    "persentase": 0.45942265795207
  },
  {
    "provinsi": "ID-JB",
    "persentase": 0.759740525218387
  },
  {
    "provinsi": "ID-JI",
    "persentase": 0.72576122157292
  },
  {
    "provinsi": "ID-JK",
    "persentase": 0.764388051371266
  },
  {
    "provinsi": "ID-JT",
    "persentase": 0.679189547927023
  },
  {
    "provinsi": "ID-KB",
    "persentase": 0.557018332135155
  },
  {
    "provinsi": "ID-KI",
    "persentase": 0.573842664650687
  },
  {
    "provinsi": "ID-KR",
    "persentase": 0.601231011000524
  },
  {
    "provinsi": "ID-KS",
    "persentase": 0.665019473177269
  },
  {
    "provinsi": "ID-KT",
    "persentase": 0.592331547786862
  },
  {
    "provinsi": "ID-LA",
    "persentase": 0.567540006275494
  },
  {
    "provinsi": "ID-MA",
    "persentase": 0.381902181155879
  },
  {
    "provinsi": "ID-NB",
    "persentase": 0.670678390725549
  },
  {
    "provinsi": "ID-NT",
    "persentase": 0.446846000234935
  },
  {
    "provinsi": "ID-PA",
    "persentase": 0.594617757970518
  },
  {
    "provinsi": "ID-PB",
    "persentase": 0.427289048473968
  },
  {
    "provinsi": "ID-RI",
    "persentase": 0.588275035414624
  },
  {
    "provinsi": "ID-SA",
    "persentase": 0.572801024765158
  },
  {
    "provinsi": "ID-SB",
    "persentase": 0.630235994090165
  },
  {
    "provinsi": "ID-SG",
    "persentase": 0.552915039719941
  },
  {
    "provinsi": "ID-SN",
    "persentase": 0.685473687954614
  },
  {
    "provinsi": "ID-SS",
    "persentase": 0.631104089871862
  },
  {
    "provinsi": "ID-ST",
    "persentase": 0.531615712600925
  },
  {
    "provinsi": "ID-SU",
    "persentase": 0.679131606375677
  },
  {
    "provinsi": "ID-YO",
    "persentase": 0.548564399601395
  }
];
// const data = json.loads(jsonData);
const convertedData = jsonData.map(item => [item.provinsi, item.persentase]);

// Adding the header row
convertedData.unshift(['Provinces', 'Popularity']);

export default class GeoChartExample extends PureComponent {
  render() {
    return (
        <ResponsiveContainer>
          <Chart
            chartType="GeoChart"
            width={500}
            height={300}
            // data={[
            //   ['Provinces', 'Popularity'],
            //   ['ID-YO', 700],
            //   ['ID-JK', 300],
            //   ['ID-LA', 400],
            // ]}
            data={convertedData}
            options={{
              region: 'ID', // Asia,
              resolution: "provinces",
              colorAxis: { colors: ['red', 'green'] },
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
