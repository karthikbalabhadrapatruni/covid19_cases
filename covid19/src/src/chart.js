import React , {Component} from 'react';
import './App.css';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';
import axios from 'axios'
//import Chart from "react-google-charts";
import Paper from '@material-ui/core/Paper';
import { Chart, Series, ArgumentAxis, Tooltip} from 'devextreme-react/chart';
//import {
//   ArgumentAxis,
//   ValueAxis,
//   Chart,
//   Title,
//   LineSeries,
//   BarSeries,
//  Tooltip,
//} from '@devexpress/dx-react-chart-material-ui';
// import { Animation } from '@devexpress/dx-react-chart';
import { EventTracker } from '@devexpress/dx-react-chart';
import {
  Label
} from 'devextreme-react/chart';

const options = {
  curveType: "function",
  legend: { position: "bottom" }
};


let dateCase = []

class Graph extends Component {
  constructor() {
    super();
    this.state = {
      cnt : 'global',
      cases : [],
      loaded : false,

    }

  }

  componentDidUpdate(prevProps, prevState) {
      let data;

        if (this.props.cnt !== prevProps.cnt) {
          this.setState({
            loaded : false
          })
          let flag = 0
          const url = 'https://api.covid19api.com/total/country/' + this.props.cnt
          axios.get(url)
          .then(res => {
             data = res.data
             console.log(res.data)
            this.setState({
              cases : res.data,
              loaded : true
            })

           })
          .catch(err => {console.log(err)})
    }
  }


render() {
  if(this.state.loaded) {
      dateCase = this.state.cases.map((dc,i) => { return {'date' : dc.Date.substring(0, 10), 'cases' : dc.Confirmed }})
      let sd = ''
      let ld = ''
      let newCases = this.state.cases.map((curr, i, array) => {

        sd =  array[0].Date.substring(0, 10);
        ld = array[i].Date.substring(0, 10);
        let pc = array[i].Confirmed
        let prevc = array[i-1] ? array[i-1].Confirmed : 0
          return {'date' :array[i].Date.substring(0, 10), 'cases' : pc - prevc }
        })

    if(this.props.graph == 'line' ) {
      return (
        <div>
        <br/>
        <br/>
        <br/>
      <Paper>
      <Chart id="chart" dataSource={dateCase}>
        <Series
          valueField="cases"
          argumentField="date"
          name="Confirmed Cases"
          type="line"
          color="#f93d2b" />


          <ArgumentAxis>
              <Label
                wordWrap="none"
                overlappingBehavior='rotate'
              />
            </ArgumentAxis>
                   <Tooltip enabled={true}/>
      </Chart>

      </Paper>
      </div>

      );

  } else {
    return (
      <div>
      <br/>
      <br/>
      <br/>

    <Paper>
    <Chart id="chart" dataSource={newCases}>
      <Series
        valueField="cases"
        argumentField="date"
        name="New Cases"
        type="bar"
        color="#f76bbf" />
        <ArgumentAxis>
            <Label
              wordWrap="none"
              overlappingBehavior='rotate'
            />
          </ArgumentAxis>
                 <Tooltip enabled={true}/>
    </Chart>
    </Paper>
    </div>
    );

  }

  }    else {
      return (
        <div> loading </div>
      )
    }

}
}

export default Graph;
