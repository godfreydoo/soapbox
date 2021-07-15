import React, { PureComponent } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [

  {
    'hashtag': 'aviation',
    'retweets': 5,
    'replies': 0,
    'likes': 1,
    'totalTweets': 4,
    'retweetAvg': 1.25,
    'replyAvg': 0,
    'likesAvg': 0.25
  },
  { 'hashtag': 'avgeek',
    'retweets': 5,
    'replies': 0,
    'likes': 1,
    'totalTweets': 4,
    'retweetAvg': 1.25,
    'replyAvg': 0,
    'likesAvg': 0.25
  },
  { 'hashtag': 'airplane',
    'retweets': 5,
    'replies': 0,
    'likes': 1,
    'totalTweets': 4,
    'retweetAvg': 1.25,
    'replyAvg': 0,
    'likesAvg': 0.25
  },
  { 'hashtag': 'cessna172',
    'retweets': 4,
    'replies': 0,
    'likes': 0,
    'totalTweets': 3,
    'retweetAvg': 1.3333333333333333,
    'replyAvg': 0,
    'likesAvg': 0
  }


];

export default class Example extends PureComponent {

  render() {
    return (
      <ResponsiveContainer width="50%" height="30%">
        <BarChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="hashtag" />
          <YAxis dataKey="retweetAvg"/>
          <Tooltip />
          <Legend />
          <Bar dataKey="retweetAvg" fill="#8884d8" />
          <Bar dataKey="likesAvg" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    );
  }
}
