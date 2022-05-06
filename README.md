# CodeCovPlug

CodeCovPlug (name pending) is a WIP visual studio code extension that tries to grant the VSCode developer an easy answer to the following question:

*What tests correspond to these line(s) of code?*

## Rational

Let us start with the following ideas

* Tests are essential for any codebase
* Tests provide a useful debugging tool
* Good tests implicitly describe what a piece of code should be doing
* Integration tests often need to be changed in response to rapidly evolving codebases
* Writing and running tests is an iterative process - a portion of a test suite may be run dozens of times over the course of a single feature ticket

One of the biggest complaints I hear around TDD is the *time* aspect. It takes *time* to write good tests, and it takes even longer to fix them. In large codebases touched by many hands, the problem of fixing tests worsens. Changing or refactoring a single existing feature may break dozens of tests that are scattered across the codebase, taking all the more time to fix.

## Planned Features / Roadmap


**MVP**
- [ ] Load a single coverage file into memory on extension startup or command execution (see contextcov.json)
- [ ] Display a hover popup on line mouseover that contains vscode hyperlinks to file:line paths
  
**POST MVP Roadmap**
- [ ] Display a hover popup that contains aggregated hyperlinks for a multi-line select
- [ ] Hover popup managed test execution
  - [ ] Vscode Configuration API for template based commands
  - [ ] "Run this test"
  - [ ] "Run all tests"
- [ ] Concatenate multiple coverage files
- [ ] Load coverage files from URL
- [ ] Load coverage files from S3
- [ ] 

---
## Generated README

Describe specific features of your extension including screenshots of your extension in action. Image paths are relative to this README file.

For example if there is an image subfolder under your extension project workspace:

\!\[feature X\]\(images/feature-x.png\)

> Tip: Many popular extensions utilize animations. This is an excellent way to show off your extension! We recommend short, focused animations that are easy to follow.

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

**Enjoy!**
