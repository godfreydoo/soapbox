import { Card, CardHeader, CardContent } from '@material-ui/core';
import PropTypes from 'prop-types';
import React from 'react';

const MetricCard = props => {
  return (
    <Card>
      <CardContent>{props.name}: {props.metricData}</CardContent>
    </Card>
  );
};

MetricCard.propTypes = {
  name: PropTypes.string,
  metricData: PropTypes.any
};

export default MetricCard;