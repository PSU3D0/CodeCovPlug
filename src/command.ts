import { Command as CoreCommand, Disposable } from 'vscode';
import type { Container } from './container';
import type { Command } from './commands/base';


interface CommandConstructor {
	new (container: Container): Command;
}
const registrableCommands: CommandConstructor[] = [];

export function command(): ClassDecorator {
	return (target: any) => {
		registrableCommands.push(target);
	};
}

export function registerCommands(container: Container): Disposable[] {
	return registrableCommands.map(c => new c(container));
}