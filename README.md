# Country Info App

## Description

The **Country Info App** is a Vue.js application that provides information about countries using the Nager.Date API. It allows users to search for countries, view upcoming holidays for random countries, and explore detailed holiday information by year for a specific country.

## Features

-   **Search Bar**: Search and find information about countries by their name.
-   **Random Countries Widget**: Displays random countries with information about their upcoming holidays.
-   **Country Details**: Shows public holidays for a specific country.
-   **Year Switcher**: View holidays for a selected year.

## Technology Stack

-   [Vue 3](https://vuejs.org/) — Frontend framework.
-   [Vue Router](https://router.vuejs.org/) — Client-side routing.
-   [Vuex](https://vuex.vuejs.org/) — State management library.
-   [Axios](https://axios-http.com/) — HTTP client for making API requests.
-   [SCSS](https://sass-lang.com/) — CSS preprocessor for styling.

## Prerequisites

Before you begin, ensure you have met the following requirements:

-   **Node.js** version 12.x or higher.
-   **Yarn** package manager installed.
-   A **GitHub Pages** repository if you plan to deploy the project.

## Getting Started

### Installation

To get a local copy of the project, follow these steps:

1. Clone the repository:

    ```bash
    git clone https://github.com/kreker2112/country-info-app-2.git
    ```

2. Navigate to the project directory:

    ```bash
    cd country-info-app-2
    ```

3. Install the required dependencies using Yarn:

    ```bash
    yarn install
    ```

### Running the Application

To run the application in development mode, use:

```bash
yarn serve
```

### Building for Production

To create a production build, use:

```bash
yarn build
```

### Deployment to GitHub Pages

To deploy the application to GitHub Pages, follow these steps:

1. Ensure you have added the correct deploy script in your package.json file:

    ```json
    "scripts": {
        "deploy": "yarn build && gh-pages -d dist"
    }
    ```

2. Add the following to your vue.config.js file to configure the public path for GitHub Pages:

    ```javascript
    module.exports = {
        publicPath:
            process.env.NODE_ENV === 'production'
                ? '/country-info-app-2/'
                : '/',
    };
    ```

3. Deploy the application using the following command:

    ```bash
    yarn deploy
    ```

## Testing

This project uses Jest for unit testing and Vue Test Utils for testing Vue components.

### Running Unit Tests

To run the unit tests, use the following command:

```bash
yarn test:unit
```

The tests are located in the `tests/unit/` directory and are designed to validate the functionality of individual components, Vuex store modules, and actions.

### Sample Test Setup

The project is configured with the following testing setup:

-   **Vue Test Utils** is used for mounting Vue components and simulating user interactions.
-   **Axios Mock Adapter** is used to mock API responses during tests.
-   **flush-promises** is used to handle asynchronous requests and promises in tests.

### Testing and Deployment Workflow

To ensure a smooth and stable deployment process, we have set up a workflow that runs unit tests before deploying the application. If all tests pass successfully, the application will be deployed to GitHub Pages.

You can run the tests and deploy the application using the following command:

```bash
yarn test-and-deploy
```

This command will:

1. Run the unit tests using Jest.
2. If all tests pass, it will build the application.
3. After the build, it will deploy the application to GitHub Pages.

Ensure your `package.json` contains the following script:

```json
"scripts": {
    "test-and-deploy": "yarn test:unit && yarn deploy"
}
```

## Linting

Linting is also set up using ESLint and Prettier. To check for linting issues, you can run:

```bash
yarn lint
```

This will ensure that your code follows the project's coding standards.

## Project Structure

Here’s a brief overview of the project structure:

```bash
src/
├── components/            # Reusable Vue components (e.g., NavBar, SearchBar, RandomCountriesWidget)
├── store/                 # Vuex store configuration and modules
├── views/                 # Page-level components (e.g., Home.vue, Country.vue)
├── styles/                # Global SCSS styles
tests/
├── unit/                  # Unit tests for Vue components and store modules
```

## Contributing

If you would like to contribute to this project, feel free to follow these steps:

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature-branch`).
3. Commit your changes (`git commit -m 'Add a feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.
