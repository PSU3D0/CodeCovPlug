import { command } from "../command";
import type { Container } from "../container";
import { window } from "vscode";
import { Command } from "./base";
import { Commands } from "../constants";

@command()
export class HelloWorldCommand extends Command {
    constructor(private readonly container: Container) {
        super(Commands.HelloWorld);
    }

    execute() {
        window.showInformationMessage("Hello World!");
    }
}