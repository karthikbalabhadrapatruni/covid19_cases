import React, {Component} from 'react';
import Select from '@material-ui/core/Select';
import axios from 'axios'
import Country from './country.js'
import Grid from '@material-ui/core/Grid';


class DialogSelect extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value : 'Global',
      countries : [],
    }
}

componentDidMount() {
  axios.get('https://api.covid19api.com/countries')
  .then(res => {
    this.setState({countries : res.data})
  })
  .catch(err => {console.log(err)})
}



handleChange(event) {
   this.setState({value: event.target.value});
 }


render() {
  const k = this.state.countries.map(li => li.Country)
  k.sort()
    return (
      <div>
        <form>
          <label  style = {{padding : '10px'}}>
            Select Country
          </label>
          <select value={this.state.value} onChange={this.handleChange}>
          {
            k.map(li =><option value = {li}> {li} </option> )
          }
            <option value = 'Global'> Global </option>
            </select>
        </form>
    
        <Country country = {this.state.value} />

      </div>
    );
  }
}

export default DialogSelect;
