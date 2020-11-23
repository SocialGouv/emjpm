# Contributing to SocialGouv/emjpm

## Development Environment

Start a local development environment.

### Code

#### Machine based

Use primarily your machine to host emjpm

1.  Start Postgres and Hasura

    ```
    $ docker-compose up --build
    ```

1.  Start other node.js packages

    ```
    $ yarn dev
    ```

1.  Open

- localhost:3000 for the frontend
- localhost:5000 for the hasura

#### Docker images based

Use the Dockerfiles to host emjpm

1.  Ensure to have a copy of the yarn.lock file in app folder

    ```
    $ cp yarn.lock packages/app
    ```

1.  Ensure to have a production build of the packages

    ```
    $ yarn build
    ```

1.  Build and start emjpm from the Dockerfiles

    ```
    $ docker-compose -f ./docker-compose.yaml -f ./docker-compose.build.yaml up --build
    ```

1.  Open

- localhost:3000 for the frontend
- localhost:5000 for the hasura

#### Built images based

Use the built image on our registry.gitlab.factory.social.gouv.fr/socialgouv/emjpm

1.  Build and start emjpm from the Dockerfiles

    ```
    $ docker-compose -f ./docker-compose.yaml -f ./docker-compose.built.yaml up
    ```

1.  [OPTIONAL] You can change the image tag default (`master`) in the [docker-compose.built.yaml](./docker-compose.built.yaml)

    ```
    $ docker-compose -f ./docker-compose.yaml -f ./docker-compose.built.yaml up
    ```

1.  [OPTIONAL] You can refreash the image by pulling them

    ```
    $ docker-compose  -f ./docker-compose.yaml -f ./docker-compose.built.yaml pull
    ```

1.  Open

- localhost:3000 for the frontend
- localhost:5000 for the hasura

### Database

1.  Ensure that the database is migrated and populated

    ```
    $ cd packages/hasura
    $ npx hasura-cli seeds apply
    ```

## Testing

Code that is written needs to be tested to ensure that it achieves the desired behaviour. Tests either fall into a unit test or an integration test.

### Unit tests

Some of the packages within emjpm have a `__tests__` directory. This is where unit tests reside in. If the scope of your work only requires a unit test, this is where you will write it in. Tests here usually don't require much if any setup.

### Integration tests

There will be situations however where the work you have done cannot be tested alone using unit tests. In situations like this, you should write an integration test for your code. The integration tests reside within the `optional/e2e` directory. Within this directory, there is a `features` directory. This is where you will write the integration test itself. [...]

## Open Development

All work on emjpm happens directly on [GitHub](/). Both core team members and external contributors send pull requests which go through the same review process.

### `master` is unsafe

We will do our best to keep `master` in good shape, with tests passing at all times. But in order to move fast, we will make API changes that your application might not be compatible with. We will do our best to communicate these changes and always version appropriately so you can lock into a specific version if need be.

### Workflow and Pull Requests

The core team will be monitoring for pull requests. When we get one, we'll run some Facebook-specific integration tests on it first. From here, we'll need to get another person to sign off on the changes and then merge the pull request. For API changes we may need to fix internal uses, which could cause some delay. We'll do our best to provide updates and feedback throughout the process.

_Before_ submitting a pull request, please make sure the following is done…

1.  Fork the repo and create your branch from `master`. A guide on how to fork a repository: https://help.github.com/articles/fork-a-repo/

    Open terminal (e.g. Terminal, iTerm, Git Bash or Git Shell) and type:

    ```sh-session
    $ git clone https://github.com/<your_username>/emjpm
    $ cd emjpm
    $ git checkout -b my_branch
    ```

    Note: Replace `<your_username>` with your GitHub username

1.  EMJPM uses Yarn for running development scripts. If you haven't already done so, please [install yarn](https://yarnpkg.com/en/docs/install).

1)  Make sure you have a compatible version of `node` installed (As of October 25th 2019, `v12.x` is recommended).

    ```sh
    node -v
    ```
