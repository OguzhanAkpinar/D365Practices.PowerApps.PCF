import * as React from 'react';
import Switch from '@mui/material/Switch';

export interface ISwitchProps {
    checked: boolean;
    onChange: (checked:boolean) => void;
}

export interface ISwitchState {
    checked: boolean;
}

export class CustomSwitch extends React.Component<ISwitchProps, ISwitchState> {

    constructor(props: ISwitchProps) {
        super(props);
        this.state = { checked: props.checked }
    }


     handleChange = (event: any) => {
        this.setState({ checked: event.target.checked });
        this.props.onChange(event.target.checked);
    };

    render() {
        return (
            <Switch
            checked={this.state.checked}
            onChange={this.handleChange}
            inputProps={{ 'aria-label': 'controlled' }}
          />
        )
    }
}