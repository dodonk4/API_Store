import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts'],
  transform: {
    '^.+\\.(ts|js)$': ['babel-jest', { presets: [['@babel/preset-env', { targets: { node: 'current' }, modules: 'auto' }], '@babel/preset-typescript'], sourceType: 'unambiguous' }],
  },
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
  },
};

export default config;