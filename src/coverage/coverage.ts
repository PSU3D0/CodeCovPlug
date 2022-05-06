import { EventEmitter, Event, ExtensionContext, workspace, Disposable, WorkspaceFoldersChangeEvent, Uri, TextDocument } from "vscode";
import { stat } from "fs";
import { Container } from "../container";

import { CoverageConfig, LineCoverageConfig } from "./config";
import { LineSelection } from "../lineTracker";

export interface CoverageDidUpdateEvent {
    readonly config: CoverageConfig;
}

export class CoverageLine {
    readonly _line: number;
    readonly _count: number;
    readonly _covered: boolean;
    readonly _refs: LineCoverageConfig[];

    constructor(line: number, count: number, covered: boolean, refs: LineCoverageConfig[]) {
        this._line = line;
        this._count = count;
        this._covered = covered;
        this._refs = refs;
    }

    get line() {
        return this._line;
    }

    get count() {
        return this._count;
    }

    get covered() {
        return this._covered;
    }

    get refs() {
        return this._refs;
    }

}

export class Coverage implements Disposable {
    /*
     This class is responsible for managing and resolving coverage data
     already imported by CoverageLoader.
    */
    private _disposable: Disposable;

    constructor(private readonly container: Container) {
        this._disposable = Disposable.from(
            workspace.onDidChangeWorkspaceFolders(this.onWorkspaceFoldersChanged, this),
        )
    }

    dispose() {
        this._disposable.dispose();
    }

    private onWorkspaceFoldersChanged(e: WorkspaceFoldersChangeEvent) {
    }

    async getCoverageForLine(
        uri: Uri,
        editorLine: number,
        document?: TextDocument | undefined
    ): Promise<CoverageLine | undefined> {
        /*
        Resolve multiple coverage configurations for a particular line.
        */

        let count = 0;
        let covered = false;

        return new CoverageLine(editorLine, count, covered, []);

    }

}