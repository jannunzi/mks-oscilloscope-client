/**
 *  Copyright (c) 2015, The Regents of the University of California,
 *  through Lawrence Berkeley National Laboratory (subject to receipt
 *  of any required approvals from the U.S. Dept. of Energy).
 *  All rights reserved.
 *
 *  This source code is licensed under the BSD-style license found in the
 *  LICENSE file in the root directory of this source tree.
 */

/* eslint max-len:0 */

import React from "react";
import {TimeEvent, Stream, TimeSeries, TimeRange} from "pondjs";
import Ring from 'ringjs'
import utilities from "../../utils/utilities";
import oscilloscopeService from '../../services/OsciloscopeService'

import {ChartContainer, ChartRow, Charts, YAxis, LineChart, Baseline, Resizable} from "react-timeseries-charts";

const style = {
    value: {
        stroke: "#a02c2c",
        opacity: 0.2
    }
};

const baselineStyle = {
    line: {
        stroke: "steelblue",
        strokeWidth: 1,
        opacity: 0.4,
        strokeDasharray: "none"
    },
    label: {
        fill: "steelblue"
    }
};

const baselineStyleLite = {
    line: {
        stroke: "steelblue",
        strokeWidth: 1,
        opacity: 0.5
    },
    label: {
        fill: "steelblue"
    }
};

const baselineStyleExtraLite = {
    line: {
        stroke: "steelblue",
        strokeWidth: 1,
        opacity: 0.2,
        strokeDasharray: "1,1"
    },
    label: {
        fill: "steelblue"
    }
};

const sec = 1000;
const minute = 60 * sec;
const hours = 60 * minute;
const rate = 80;
let counter = 0;


const url = "http://localhost:5000"
// const url = "https://secure-hamlet-60495.herokuapp.com"

export default class Oscilloscope2 extends React.Component {
    constructor(props) {
        super(props);
        const url = utilities.getBaseUrl();

        this.state = {
            time: new Date(2015, 0, 1),
            events: new Ring(200),
            window: 1,
            paused: false,
            offset: 0
        }

        this.eventSource = new EventSource(`${url}/events`);
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(prevProps.data != this.props.data) {
            this.setState({
                data: prevProps.data
            });
        }
    }

    getNewEvent = (t, data) => {
        const base = data;//Math.sin(counter * Math.PI / 10);
        counter++;
        return new TimeEvent(t, parseInt(base * 700 + 700, 10));
    };

    updateOscilloscope = (data) =>
        this.setState(prevState => {
            const increment = minute;
            const t = new Date(prevState.time.getTime() + increment);
            const event = this.getNewEvent(t, data);
            this.stream.addEvent(event);
            const newEvents = prevState.events;
            newEvents.push(event);
            return {
                time: t,
                events: newEvents
            }
        });

    componentDidMount() {
        this.eventSource.addEventListener('mks-event', (e) => this.updateOscilloscope(JSON.parse(e.data)));
        // this.eventSource.addEventListener('closedConnection', () => this.stopUpdates());

        this.stream = new Stream();
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    widen = () => {
        this.setState(prevState => {
            return {
                window: ++prevState.window
            }
        })
    }

    shrink = () => {
        this.setState(prevState => {
            return {
                window: prevState.window > 1 ? --prevState.window : prevState.window
            }
        })
    }

    pause = () => {
        if(this.state.paused) {
            oscilloscopeService.play()
        } else {
            oscilloscopeService.pause()
        }
        this.setState(prevState => ({
            paused: !prevState.paused
        }))
    }

    left = () => {
        this.setState(prevState => {
            return {
                offset: prevState.offset - 500000
            }
        })
    }

    right = () => {
        this.setState(prevState => {
            return {
                offset: prevState.offset + 500000
            }
        })
    }

    render() {
        const eventSeries = new TimeSeries({
            name: "raw",
            events: this.state.events.toArray()
        });

        // Timerange for the chart axis
        const initialBeginTime = new Date(2015, 0, 1);
        const timeWindow = 1 * minute * 60 * this.state.window / 2;

        let beginTime;
        const endTime = new Date(this.state.time.getTime() + minute);
        if (endTime.getTime() - timeWindow < initialBeginTime.getTime()) {
            beginTime = initialBeginTime;
        } else {
            beginTime = new Date(endTime.getTime() - timeWindow);
        }

        endTime.setTime(endTime.getTime() + this.state.offset)
        beginTime.setTime(beginTime.getTime() + this.state.offset)

        const timeRange = new TimeRange(beginTime, endTime);

        return (
            <div>
                <br/>
                <button className="btn btn-danger" onClick={this.pause}>
                    {!this.state.paused && <i className="fa fa-pause"></i>}
                    {this.state.paused && <i className="fa fa-play"></i>}
                </button>
                &nbsp;
                <button className="btn btn-primary" onClick={this.widen}><i className="fa fa-search-minus"></i></button>
                &nbsp;
                <button className="btn btn-primary" onClick={() => this.setState({window: 1})}>100%</button>
                &nbsp;
                <button className="btn btn-primary" disabled={this.state.window <= 1} onClick={this.shrink}><i className="fa fa-search-plus"></i></button>
                &nbsp;
                <button className="btn btn-success" onClick={this.left}><i className="fa fa-fast-backward"></i></button>
                &nbsp;
                <button className="btn btn-success" onClick={this.right}><i className="fa fa-fast-forward"></i></button>
                &nbsp;
                <Resizable>
                    <ChartContainer
                        title="MKS Oscilloscope"
                        titleStyle={{ fill: "#555", fontWeight: 500 }}
                        timeRange={timeRange}
                        format="%b '%y"
                        showGrid={true}
                        enablePanZoom={true}
                        timeAxisTickCount={5}
                        onTimeRangeChanged={this.handleTimeRangeChange}
                    >
                        <ChartRow height="500">
                            <YAxis
                                id="price"
                                label="Voltage (MV)"
                                min={0}
                                max={1500}
                                width="60"
                                format=".2f"
                            />
                            <Charts>
                                <LineChart
                                    axis="price"
                                    series={eventSeries}
                                    style={style} />
                            </Charts>
                        </ChartRow>
                    </ChartContainer>
                </Resizable>
            </div>
        );
    }
}
