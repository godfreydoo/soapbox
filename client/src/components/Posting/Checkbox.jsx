import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { green } from '@material-ui/core/colors';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
import Favorite from '@material-ui/icons/Favorite';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import TwitterIcon from '@material-ui/icons/Twitter';
import YouTubeIcon from '@material-ui/icons/YouTube';

const GreenCheckbox = withStyles({
  root: {
    color: green[400],
    '&$checked': {
      color: green[600],
    },
  },
  checked: {},
})((props) => <Checkbox color="default" {...props} />);



export default function CheckboxLabels() {
  const [state, setState] = React.useState({
    youtube: false,
    twitter: false
  });

  const handleChange = (event) => {
    setState(prevState => { return { ...state, [event.target.name]: event.target.checked }; });
  };

  return (
    <FormGroup row>
      <FormControlLabel
        onChange={handleChange} control={<Checkbox icon={<TwitterIcon />} checkedIcon={<TwitterIcon style={{color: '#00ACEE'}} />} name="twitter" />}
        label="Twitter"
      />
      <FormControlLabel
        onChange={handleChange} control={<Checkbox icon={<YouTubeIcon />} checkedIcon={<YouTubeIcon style={{color: '#c4302b'}} />} name="youtube" />}
        label="YouTube"
      />
    </FormGroup>
  );
}
