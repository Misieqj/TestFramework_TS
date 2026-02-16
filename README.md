# Table of contents:

- [Table of contents:](#table-of-contents)
- [Usefull tips for the project](#usefull-tips-for-the-project)
  - [Proposed folder structure for the project:](#proposed-folder-structure-for-the-project)
  - [How to define locators.](#how-to-define-locators)
  - [When to use some of Playwrith classes:](#when-to-use-some-of-playwrith-classes)
  - [Solutions and tips for tests](#solutions-and-tips-for-tests)
    - [TestStepInfo](#teststepinfo)
    - [VariableList.forEach()](#variablelistforeach)
- [Instalation and basic project set up](#instalation-and-basic-project-set-up)
  - [Installation and basic commands](#installation-and-basic-commands)
  - [Setting params:](#setting-params)
  - [Use parameters for tests](#use-parameters-for-tests)
- [List of useful plugins for VSCode](#list-of-useful-plugins-for-vscode)

# Usefull tips for the project

## Proposed folder structure for the project:

- **components** - for components used in multiple pages.
- **fixtures** - for reusable test data like JSONs, images, PDFs...
- **pages** - for more complex projects (for smaller we can keep pages with tests).
- **tests** - to keep all tests.
- **utils** - for helper function.

## How to define locators.

The order to use to define elements:

1. getByRole()
1. getByTestId()
1. getByLabel()
1. locator() CSS or XPath

XPath is a bit slower and less readable, but can move up and down, has more options for searching text, and uses logical conditions.

## When to use some of Playwrith classes:

- **Dialog** - to serve in actions on system windows, like: alerts, confirms, prompts...
- **ConsoleMessage** - to get messages form console window in the browser like: log, error, warn.
- **WebWorker** - represents a Web Worker launched by the page, i.e. JavaScript running in the background, e.g. to make some calculation, communication with API, data processing or handling WebSockets.

## Solutions and tips for tests

### TestStepInfo

Test function `test.step()` to mark steps and make reports more readable. Use them in more complex tests with many steps. To make it more readable for business, we can also describe what kind of data we use to perform tests, e.g. _"Login with proper user data"_ or _"Login with incorrect data"_. [More info](https://playwright.dev/docs/api/class-teststepinfo)

### VariableList.forEach()

Used to execute tests for parameters from the list.

```ts
const varNameList: {varName: string}[] = {
  { varName: "value1" },
  { varName: "value2" },
};
varNameList.forEach(({varName}) => {
  test(`Execution for ${varName}`, async({}) => {
    //...
  });
})
```

# Instalation and basic project set up

## Installation and basic commands

More details about installation - https://playwright.dev/docs/intro
Basic commands:

- `npm init playwright@latest` - install latest from project directory
- `npx playwright test` - run all tests
- `npx playwright test --ui` - run tests from UI mode
- `npx playwright show-report` - open report

## Setting params:

- Prettier - if installed
- EditorConig - if needed
- ESLint - to static code analysis
- JSONs for package and tsconfig
- Playwright Config
- Collect appsettings variable for tests
- Create .vscode/launch.json to run tests
- CI/CD pipeline - [Check on Playwright page](https://playwright.dev/docs/ci-intro)

## Use parameters for tests

The best way is to create a JSON file with all params (`appsettings.json`) and then read it in `fixtures/test-params.ts`. In that file you can define conditions to choose which setting file load for which environment. To do that pass value via environment variable `$env:NODE_ENV = "local"`.

If you use secrets (sensitive credential data), pass them in the same way via environment variable.

# List of useful plugins for VSCode

- **Playwright Test for VS Code** - to run tests
- **Prettier** - code formatter. Add config files to project.
- **GitHub Copilot Chat** - AI chat
- **GitHub Actions** - pipelines in GitHub
- **Material Icon Theme** - change icons in files tree
- **Markdown All in One** - better format for .MD
- **Git Stash** - to put files on stash for later
- **Git Graph** - optional to see tree of branches
- **Project Manager** - to easier switch between projects
