/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
import { defaults as tsjPreset } from 'ts-jest/presets'

import type { Config } from 'jest'

const jestConfig: Config = {
  ...tsjPreset,
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>'],
  modulePathIgnorePatterns: ['./dist', './node_modules'],
  moduleFileExtensions: ['js', 'ts', 'json'],
  // transform: {
  //   ...tsjPreset.transform,
  //   // '^.+\\.(ts)$': 'ts-jest'
  // },
  moduleNameMapper: {
    '^@app/([a-z_-s0-9.]+)+.(json)$': '<rootDir>/$1',
    '^@app/src/(.*)$': '<rootDir>/src/$1',
    '^@app/controllers/(.*)$': '<rootDir>/src/controllers/$1',
    '^@app/core/(.*)$': '<rootDir>/src/core/$1',
    // '^@app/core/handlers/(.*)$': '<rootDir>/src/core/handlers/$1',
    '^@app/entities/(.*)$': '<rootDir>/src/entities/$1',
    '^@app/repositories/(.*)$': '<rootDir>/src/repositories/$1',
    '^@app/services/(.*)$': '<rootDir>/src/services/$1',
    '^@app/server/(.*)$': '<rootDir>/src/server/$1',
    // '\\.(json)$': '<rootDir>/fileTransform.js',
    // '^@app/names.json': '<rootDir>/names.json',
    // '/^components\/(.*)$/': '<rootDir>/src/components/$1'
  },
}

export default jestConfig
