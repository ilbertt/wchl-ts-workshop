# Todo App Example - Azle

This template gives a simple example of a todo app built with the [Azle framework](https://demergent-labs.github.io/azle).

- [Installation](#installation)
- [Deployment](#deployment)
- [Testing](#testing)

Azle helps you to build secure decentralized/replicated servers in TypeScript or JavaScript on [ICP](https://internetcomputer.org/). The current replication factor is [13-40 times](https://dashboard.internetcomputer.org/subnets).

Azle stable mode is continuously subjected to [intense scrutiny and testing](https://github.com/demergent-labs/azle/actions), however it has not yet undergone intense security review.

## Usage

The app contained in this template demonstrates some of the capabilities of Azle. The template is organized into the following files:

- [`backend/`](./backend) - The source code for the backend canister, built using Azle.
- [`frontend/`](./frontend) - The source code for the frontend, built using React and Vite.
- [`shared/`](./shared) - The TypeScript code shared between the backend and frontend.

### Useful commands

- `npm run build` - Build both the backend and frontend canisters, without deploying them.
- `npm run format` - Format the code using the Prettier.
- `npm run lint` - Lint the code using ESLint.

Additionally, in the `frontend/` directory, you can run the following commands:

- `npm run dev` - Start the frontend in development mode. You should run `dfx deploy backend` from the root directory before running this command, in order to have the backend canister API deployed and available to the frontend.
- `npm run prebuild` - Generate the backend canister API bindings in JS/TS format and places them in the `frontend/src/declarations/` directory. You should run this command before running `npm run dev`, in order to have the backend canister API available to the frontend.
- `npm run build` - Build the frontend in production mode. This runs the `npm run prebuild` command automatically.

## Development

To set up and run the example app locally, you can follow these steps:

1. Click "Use Template" button on the GitHub repository page to create your own repository.
2. Open the repository as a **VS Code Codespace** (instructions [here](https://docs.github.com/en/codespaces/developing-in-a-codespace/using-github-codespaces-in-visual-studio-code)).
3. Wait for the codespace to be ready. This will run the `devcontainer-setup.sh` script.
4. Start a local ICP replica:
   ```bash
   dfx start --clean
   ```
5. Deploy both the backend and frontend canisters:
   ```bash
   dfx deploy
   ```
6. Open the frontend in your browser, following the link in the output of the `dfx deploy` command. The link will look something like `http://{canister-frontend-id}.localhost:4943/`

Any time you make changes to either the backend or frontend, you should run the `dfx deploy` command again to redeploy the canisters.

## License

The template is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.
