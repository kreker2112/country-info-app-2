module.exports = {
    preset: '@vue/cli-plugin-unit-jest/presets/typescript-and-babel',
    setupFilesAfterEnv: ['<rootDir>/tests/setup.ts'],
    transformIgnorePatterns: ['<rootDir>/node_modules/(?!(axios)/)'],
};
