import { CodegenConfig } from '@graphql-codegen/cli';

// https://www.apollographql.com/docs/react/development-testing/static-typing/
const config: CodegenConfig = {
  schema: 'schema.json',
  documents: './graphql/queries/**/*.ts',
  generates: {
    './generated/graphql/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        gqlTagName: 'gql',
      }
    }
  }
};
export default config;
