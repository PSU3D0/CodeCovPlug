import { TextEditor } from 'vscode';
import { Schemes } from './constants';

export function isTextEditor(editor: TextEditor): boolean {
	const scheme = editor.document.uri.scheme;
	return scheme !== Schemes.Output && scheme !== Schemes.DebugConsole;
}