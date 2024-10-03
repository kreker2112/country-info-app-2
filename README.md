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
    git clone https://github.com/kreker2112/country-info-app.git

    ```

2. Navigate to the project directory:

    cd country-info-app

3. Install the required dependencies using Yarn:

    yarn install

### Running the Application

To run the application in development mode, use:

    yarn serve

### Building for Production

To create a production build, use:

    yarn build

### Deployment to GitHub Pages

To deploy the application to GitHub Pages, follow these steps:

1. Ensure you have added the correct deploy script in your package.json file:

    "scripts": {
    "deploy": "yarn build && gh-pages -d dist"
    }

2. Add the following to your vue.config.js file to configure the public path for GitHub Pages:

    module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
    ? '/country-info-app/'
    : '/'
    };

3. Deploy the application using the following command:

    yarn deploy

## Project Structure

Here’s a brief overview of the project structure:

src/
components/: Reusable Vue components like NavBar, SearchBar, and RandomCountriesWidget.
store/: Vuex store configuration and modules.
views/: Page-level components such as Home.vue and Country.vue.
styles/: Global SCSS styles.

## Contributing

If you would like to contribute to this project, feel free to follow these steps:

1. Fork the repository.
2. Create your feature branch (git checkout -b feature-branch).
3. Commit your changes (git commit -m 'Add a feature').
4. Push to the branch (git push origin feature-branch).
5. Open a Pull Request.

## License

This project is licensed under the MIT License.
