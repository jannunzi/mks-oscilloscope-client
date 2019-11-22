import React from 'react'
import {
  XYPlot,XAxis,YAxis,HorizontalGridLines,VerticalGridLines,LineSeries
} from "react-vis";

export class OscilloscopeVis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if(prevProps.data != this.props.data) {
      this.setState({
        data: prevProps.data
      });
    }
  }

  render() {
    return(
      <XYPlot
        size={10}
        margin={{top: 40, right: 40, left: 10, bottom: 10}}
        width={1000}
        height={500}>
        <HorizontalGridLines/>
        <VerticalGridLines />
        <XAxis orientation="top"   tickValues={[0,2,4,6,8,10,12,14,16,18,20,22,24]}/>
        <YAxis orientation="right" tickValues={[-10,-9,-8,-7,-6,-5,-4,-3,-2,-1,0,1,2,3,4,5,6,7,8,9,10]}/>
        <LineSeries
          size={10}
          data={this.props.data}/>
      </XYPlot>
    )
  }
}
