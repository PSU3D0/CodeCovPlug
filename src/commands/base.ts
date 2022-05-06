import { Disposable, commands, Uri, TextEditor } from "vscode";
import { Commands } from "../constants";


export abstract class Command implements Disposable {
    private readonly _disposable: Disposable;

    constructor(command: Commands | Commands[]) {
        if (typeof command === 'string') {
            this._disposable = commands.registerCommand(
                command,
                (...args: any[]) => this._execute(command, ...args),
                this,
            );

            return;
        }

        const subscriptions = command.map(cmd =>
			commands.registerCommand(cmd, (...args: any[]) => this._execute(cmd, ...args), this),
		);
		this._disposable = Disposable.from(...subscriptions);
    }

    dispose() {
        this._disposable.dispose();
    }

	abstract execute(...args: any[]): any;

	protected _execute(command: string, ...args: any[]): any {
		return this.execute(...args);
	}
}