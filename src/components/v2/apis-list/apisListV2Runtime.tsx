import * as React from "react";
import { Button, FluentProvider, webLightTheme } from "@fluentui/react-components";

export interface ApisListV2State {
    clickCount: number;
}

export class ApisListV2Runtime extends React.Component {
    public state: ApisListV2State;

    constructor(props) {
        super(props);

        this.state = {
            clickCount: props.initialCount || 0
        };

        this.increaseCount = this.increaseCount.bind(this);
    }

    public increaseCount(): void {
        this.setState({ clickCount: this.state.clickCount + 1 });
    }

    public render(): JSX.Element {
        return (
            <FluentProvider theme={webLightTheme}>
            <div className="text text-align-center">
                <Button className="button" onClick={this.increaseCount}>
                    Click me
                </Button>
                <div>
                    <label htmlFor="clickCount">Click count:</label> <b id="clickCount">{this.state.clickCount}</b>
                </div>
            </div>
            </FluentProvider>
        );
    }
}