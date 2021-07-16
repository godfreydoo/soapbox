import 'date-fns';
import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import PropTypes from 'prop-types';
import { alpha } from '@material-ui/core/styles';

const Schedule = (props) => {

  const [selectedDate, setSelectedDate] = React.useState(new Date());

  useEffect(() => {
    props.setTweet(prevDetails => { return { ...prevDetails, sendAt: selectedDate }; });
  }, [selectedDate]); // eslint-disable-line

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="flex-end">
        <KeyboardDatePicker
          margin="normal"
          id="date-picker-dialog"
          label="Date picker dialog"
          format="MM/dd/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}/>
        <KeyboardTimePicker
          margin="normal"
          id="time-picker"
          label="Time picker"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change time',
          }}/>
      </Grid>
    </MuiPickersUtilsProvider>
  );
};

Schedule.propTypes = {
  setTweet: PropTypes.func,
  sendAt: PropTypes.string
};

export default Schedule;
