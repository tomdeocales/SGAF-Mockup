import js from '@eslint/js'
import nextPlugin from '@next/eslint-plugin-next'
import tseslint from 'typescript-eslint'

export default tseslint.config(
  {
    ignores: ['node_modules', '.next', 'out', 'dist', '**/*.config.*'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  nextPlugin.configs['core-web-vitals'],
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/jsx-uses-react': 'off',
    },
  },
)
