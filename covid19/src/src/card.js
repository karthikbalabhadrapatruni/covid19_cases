import React , {Component} from 'react';
import './App.css';
import { CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import CountUp from 'react-countup';



class Cards extends Component {

  render() {
    const clsnme = 'card ' + this.props.classnme
    return (
      <Grid item xs={12} sm={6} md={3} >
        <Card  className= {clsnme}>
          <CardHeader title = {this.props.title}>
          </CardHeader>
          <hr/>
          <CardContent style = {{height : '80px'}}>
            <CountUp start={0} end={Number(this.props.count)} delay={0}>
              {({ countUpRef }) => (
                <div>
                <span className = 'count' ref={countUpRef} />
                </div>
              )}
            </CountUp>
          </CardContent>
        </Card>
      </Grid>
    );
  }
}

export default Cards;
