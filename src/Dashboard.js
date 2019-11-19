import React from 'react';
import OscilloscopeService from './services/OsciloscopeService'
const oscilloscopeService = OscilloscopeService.getInstance();

export class Dashboard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            intervalMs: 100,
            radiansPerTick: 10,
        }
    }
    updateDashboard = newState => {
        this.setState(newState)
        oscilloscopeService.updateOsciloscope(this.state)
    }

    updateOscilloscope = () =>
        oscilloscopeService.updateOsciloscope(this.state)

    render() {
        return(
            <div>
                <br/>
                <div className="input-group">
                    <input
                        value={this.state.intervalMs}
                        onChange={(e) => this.updateDashboard({intervalMs: parseInt(e.target.value)})}
                        type="number" className="form-control" placeholder="Interval in milliseconds"/>
                        <div className="input-group-append" id="button-addon4">
                            <button
                                onClick={() => this.updateDashboard({intervalMs: this.state.intervalMs - 1})}
                                className="btn btn-outline-secondary" type="button"><i className="fa fa-minus"/></button>
                            <button
                                onClick={() => this.updateDashboard({intervalMs: this.state.intervalMs + 1})}
                                className="btn btn-outline-secondary" type="button"><i className="fa fa-plus"/></button>
                        </div>
                </div>
                <input
                    className="form-control"
                    onChange={(e) => this.updateDashboard({radiansPerTick: e.target.value})}
                    type="number"
                    value={this.state.radiansPerTick}/>
                <button
                    className="btn btn-primary btn-block"
                    onClick={this.updateOscilloscope}>Update</button>
            </div>
        )
    }
}
