import { Disposable, workspace, WorkspaceFoldersChangeEvent } from "vscode";
import { CoverageConfig } from "./config";
import { Container } from "../container";
import * as fs from 'fs';
import { once } from "../functions";

export interface CoverageUpdateEvent {
    readonly config: CoverageConfig;
}


export class CoverageLoader implements Disposable {
    private _disposable: Disposable;
    private _configs: CoverageConfig[];

    constructor(private readonly container: Container) {
        this._configs = [];

        this._disposable = Disposable.from(
            once(container.onReady)(this.loadCoverage, this),
            workspace.onDidChangeWorkspaceFolders(this.loadCoverage, this),
        );
    }

    dispose() {
        this._disposable.dispose();
    }

    private onWorkspaceFoldersChanged(e: WorkspaceFoldersChangeEvent) {
    }

    get configs() {
        return this._configs;
    }

    private loadCoverageJson(path: string): CoverageConfig {
        return JSON.parse(fs.readFileSync(path, 'utf8'));

    }

    async loadCoverage() {
        /*
        Load coverage data from the workspace.
        */
        this._configs = [];

        await this.loadFileSystemCoverage();
    }

    async loadFileSystemCoverage() {
        /*
        Load coverage data from the file system.
        Defaults to {currentWorkspaceFolder/.coverage/}
        */

        let configUris = await workspace.findFiles('**/.coverage/**/*.json');

        for (const uri of configUris) {
            const config = this.loadCoverageJson(uri.fsPath);
            this._configs.push(config);
        }
    }

}