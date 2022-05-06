import {
    Disposable,
    Hover,
    TextEditor,
    TextDocument,
    CancellationToken,
    Uri,
    Position,
    languages,
    window
} from 'vscode';

import { Container } from '../container';
import { once } from '../functions';

import { LinesChangeEvent } from '../lineTracker';

export class LineHoverController implements Disposable {
    private readonly _disposable: Disposable;
    private _hoverProviderDisposable: Disposable | undefined;
    private _uri: Uri | undefined;

    constructor(private readonly container: Container) {
        this._disposable = Disposable.from(
            once(container.onReady)(this.onReady, this),
        );
    }

    dispose() {
        this.unregisterHover();
        this._disposable.dispose();
    }

    private onReady(): void {
		this.registerHover(window.activeTextEditor);
        this.onConfigurationChanged();
	}

    private onConfigurationChanged() {
        this.container.lineTracker.subscribe(
            this,
            this.container.lineTracker.onDidChangeActiveLines(this.onActiveLinesChanged, this),
        );
    }

	private onActiveLinesChanged(e: LinesChangeEvent) {
		if (e.pending) return;

		if (e.editor == null || e.selections == null) {
			this.unregisterHover();

			return;
		}

		if (this._hoverProviderDisposable != null) return;

		this.registerHover(e.editor);
	}

    async provideTestInfoHover(
		document: TextDocument,
		position: Position,
		_token: CancellationToken,
	): Promise<Hover | undefined> {
        if (!this.container.lineTracker.includes(position.line)) return;


        const lineState = this.container.lineTracker.getState(position.line);
        const state = lineState?.state;
        
        if (state == null ) return;

        const message = `Line Number: ${state.line} Covered: ${state.covered} Count: ${state.count}`;


        return new Hover(message);
    }

    private registerHover(editor: TextEditor | undefined) {
        if (editor == null) return;

        this._uri = editor.document.uri;

        this._hoverProviderDisposable = Disposable.from(languages.registerHoverProvider(
            { pattern: this._uri.fsPath },
            {
                provideHover: this.provideTestInfoHover.bind(this)
            }
        ))

    }

    private unregisterHover() {
        this._uri = undefined;
        if (this._hoverProviderDisposable != null) {
            this._hoverProviderDisposable.dispose();
            this._hoverProviderDisposable = undefined;
        }
    }
}