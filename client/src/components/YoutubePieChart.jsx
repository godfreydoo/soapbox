import React, { PureComponent } from 'react';
import { PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';
import {setActivePostMetrics} from './YoutubeList';
import axios from 'axios';
import YoutubeList from './YoutubeList';

// const getYoutubeData = function() {
//   axios.post('/youtube/video', {
//     channelId: 'UCYZclLEqVsyPKP9HW87tPag'
//   })
//     .then(resVal => {
//       setYoutubeData(resVal.data);
//       setCurrentSocialMedia('youtube');
//       setActivePostMetrics(null);
//       axios.get(`/youtube/channel-stats?id=${'UCYZclLEqVsyPKP9HW87tPag'}`)
//         .then(response => {
//           setActiveAccountMetrics(response.data.items[0].statistics);
//         })
//         .catch(err => {
//           console.log('Failed to retrieve account metrics data');
//         });
//     })
//     .catch(err => {
//       console.log('Failed to retrieve youtube data');
//     });
// };

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const YoutubePieChart = ( { setActivePostMetrics }) => {

  
  return (
    <ResponsiveContainer width="20%" height="20%">
      <PieChart width={400} height={400}>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={renderCustomizedLabel}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  );
};

export default YoutubePieChart;