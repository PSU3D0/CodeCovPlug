import {
    Event,
    EventEmitter,
    ExtensionContext
} from 'vscode';

import { LineTracker } from './lineTracker';
import { LineHoverController } from './hovers/HoverController';
import { HelloWorldCommand } from './commands';
import { Coverage } from './coverage/coverage';
import { CoverageLoader } from './coverage/coverageLoader';


export class Container {
    static #instance: Container | undefined;
    private constructor(context: ExtensionContext) {
        this._context = context;
        HelloWorldCommand;
        context.subscriptions.push((this._lineTracker = new LineTracker(this)));
        context.subscriptions.push((this._lineHoverController = new LineHoverController(this)));
        context.subscriptions.push((this._coverage = new Coverage(this)));
        context.subscriptions.push((this._coverageLoader = new CoverageLoader(this)));
    }

    static create(context: ExtensionContext) {
		if (Container.#instance != null) throw new Error('Container is already initialized');

		Container.#instance = new Container(context);
		return Container.#instance;
	}

    private _context: ExtensionContext;
    get context() {
        return this._context;
    }

    private _lineTracker: LineTracker;
    get lineTracker() {
        return this._lineTracker;
    }

    private _lineHoverController: LineHoverController;
    get lineHoverController() {
        return this._lineHoverController;
    }

    private _coverageLoader: CoverageLoader;
    get coverageLoader() {
        return this._coverageLoader;
    }

    private _coverage: Coverage
    get coverage() {
        return this._coverage;
    }

    private _ready: boolean = false;
    async ready() {
		if (this._ready) throw new Error('Container is already ready');
		this._ready = true; 

        queueMicrotask(() => this._onReady.fire());
    }

    private _onReady: EventEmitter<void> = new EventEmitter<void>();
    get onReady() {
        return this._onReady.event;
    }
}