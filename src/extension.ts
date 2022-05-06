import { ExtensionContext } from 'vscode';
import { Container } from './container';
import { once } from './functions';
import { registerCommands } from './command';


export async function activate(context: ExtensionContext) {
    console.log("codecovplug is activated");
    const container = Container.create(context);

	once(container.onReady)(() => {
		context.subscriptions.push(...registerCommands(container));
	});

	await container.ready();
}

export function deactivate() {
    
}