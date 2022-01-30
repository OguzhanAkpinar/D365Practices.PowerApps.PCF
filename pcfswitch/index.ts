import {IInputs, IOutputs} from "./generated/ManifestTypes";
import ReactDOM = require("react-dom");
import React = require("react");
import { CustomSwitch, ISwitchProps } from "./CustomSwitch";

export class pcfswitch implements ComponentFramework.StandardControl<IInputs, IOutputs> {

	private _checked: boolean;

	private _container: HTMLDivElement;
	private notifyOutputChanged: () => void;
	private _context: ComponentFramework.Context<IInputs>;
	private props: ISwitchProps = { checked : false, onChange : this.notifyChange.bind(this) };

	constructor()
	{

	}

	notifyChange(checked: boolean) {
		this._checked = checked;
		this.notifyOutputChanged();
	}

	public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary, container:HTMLDivElement): void
	{
		this._context = context;
		this._container = container;
		this.notifyOutputChanged = notifyOutputChanged;
		this.props.checked = context.parameters.optionValue.raw || false;
		this.renderControl(context);
	}



	public updateView(context: ComponentFramework.Context<IInputs>): void
	{
		this._context = context;
		this.renderControl(context);
	}

	private renderControl(context: ComponentFramework.Context<IInputs>) {
		this._checked = context.parameters.optionValue.raw;
		this.props.checked = this._checked;
		ReactDOM.render(React.createElement(CustomSwitch, this.props), this._container);
	}

	public getOutputs(): IOutputs
	{
		return {
			optionValue : this._checked
		};
	}

	public destroy(): void
	{
		ReactDOM.unmountComponentAtNode(this._container);
	}
}
