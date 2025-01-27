import { type CodegenConfig } from '@graphql-codegen/cli'

import 'dotenv/config'

const config: CodegenConfig = {
  schema: process.env.NEXT_PUBLIC_API_URL,
  documents: ['**/*.{ts,tsx}'],
  generates: {
    './src/modules/graphql/codegen/__generated__/': {
      preset: 'client',
      plugins: [],
      presetConfig: {
        fragmentMasking: false,
      },
    },
  },
}

export default config
