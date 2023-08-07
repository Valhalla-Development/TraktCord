module.exports = {
    env: {
        'browser': true
    },
    root: true,
    ignorePatterns: ['dist/**/*.js', 'build/**/*.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
    },
    plugins: ['@typescript-eslint'],
    extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'airbnb-base'],
    rules: {
        'quotes': ['error', 'single'],
        'object-curly-spacing': ['error', 'always'],
        'import/prefer-default-export': 'off',
        'indent': ['error', 4],
        'no-console': 'off',
        'max-len': [
            'error',
            {
                ignoreComments: true,
                code: 200,
                ignoreUrls: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true
            }
        ],
        'import/no-extraneous-dependencies': 'off',
        'import/extensions': 'off',
        'import/no-unresolved': 'off',
    },
};