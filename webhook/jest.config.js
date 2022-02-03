/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
    roots: ['<rootDir>'],
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['<rootDir>[/\\\\](node_modules)[/\\\\]'],
    testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
    coveragePathIgnorePatterns: ['node_modules', 'test-config', '.mock.ts', 'test-utils.ts'],
    globalSetup: '<rootDir>/jest-setup.ts',
};
