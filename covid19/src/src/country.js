import axios from 'axios'
import React , {Component} from 'react';
import Cards from './card'
import Grid from '@material-ui/core/Grid';
import Graph from './chart';

class Country extends Component {

  constructor() {
    super();
    this.state = {
      totalCases : 0,
      activeCases : 0,
      totalDischarged : 0,
      totalDeaths : 0,
      newCases : 0,
      newDischarged : 0,
      newDeaths : 0,
      data : {},
      isLoaded : false,
      country : 'Global',
      date : 0,
      slug : 'global'
    };
  }

  componentDidMount() {
    axios.get('https://api.covid19api.com/summary')
    .then(res => {
      this.setState({
        data : res.data,
        isLoaded : true,
        totalCases : res.data.Global.TotalConfirmed,
        totalDischarged :res.data.Global.TotalRecovered,
        totalDeaths : res.data.Global.TotalDeaths,
        newCases :res.data.Global.NewConfirmed,
        newDischarged : res.data.Global.NewRecovered,
        newDeaths :res.data.Global.NewDeaths,
        date : res.data.Date,

    })
     const totalActive = this.state.totalCases- this.state.totalDischarged -this.state.totalDeaths;
     this.setState({
       activeCases : totalActive,
     })
  })
  .catch(err => {console.log(err)})
  }



  static getDerivedStateFromProps(props, current_state) {
      if (current_state.country !== props.country) {
        const cntData = current_state.data.Countries.filter( (cnt) =>
        {
          if(cnt.Country === props.country) {
            return cnt;
          }
        });
        if(cntData.length) {
          return {
            totalCases : cntData[0].TotalConfirmed,
            totalDischarged :cntData[0].TotalRecovered,
            totalDeaths : cntData[0].TotalDeaths,
            newCases : cntData[0].NewConfirmed,
            newDischarged : cntData[0].NewRecovered,
            newDeaths :cntData[0].NewDeaths,
            date : cntData[0].Date,
            activeCases : cntData[0].TotalConfirmed - cntData[0].TotalRecovered -  cntData[0].TotalDeaths ,
            country : cntData[0].country,
            slug : cntData[0].Slug
            };
        } else {
          return {
          totalCases : 0,
          totalDischarged : 0,
          totalDeaths : 0,
          newCases : 0,
          newDischarged : 0,
          newDeaths :0,
          date : 'Up To Date',
          activeCases : 0 ,
          country :  props.country,
          slug :  props.country
         };
        }
      } else {
      return {
        country : props.country
        };
    }
  }


render() {
  if(this.state.isLoaded) {
    return (
      <div className = 'data'>
      <h2> {this.state.country} </h2>
        <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center" >
                <Cards title = 'Total Cases' classnme = 'Total-Cases' count = {this.state.totalCases} />
                <Cards title = 'Total Active Cases' classnme = 'Active-Cases' count = {this.state.activeCases} />
                <Cards title = 'Total Recovered' classnme = 'Discharge' count = {this.state.totalDischarged} />
                <Cards title = 'Total Deaths' classnme = 'Deaths' count = {this.state.totalDeaths} />
        </Grid>
        <br/><br/>
        <label> {this.state.date.substring(0, 10)} </label>
        <br/><br/>
        <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center" >
                <Cards title = 'New Cases' classnme = 'Total-Cases' count = {this.state.newCases} />
                <Cards title = 'New Recovered' classnme = 'Discharge' count = {this.state.newDischarged} />
                <Cards title = 'New Deaths' classnme = 'Deaths' count = {this.state.newDeaths} />
        </Grid>
        <Graph title = 'Daily Cases' graph = 'line' cnt = {this.state.slug} />
        <Graph title = 'Total Cases'  graph = 'bar' cnt = {this.state.slug}/>
        <Grid
                container
                spacing={3}
                direction="row"
                justify="center"
                alignItems="center" >


        </Grid>
      </div>
    )
  } else {
    return (
      <div> loading </div>
    )
  }

}
}


  export default Country;
