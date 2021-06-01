module.exports = {
  env: {
    browser: true,
    es6: true,
  },
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      classes: true,
    },
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  parser: 'babel-eslint',
  plugins: ['react'],
  rules: {
    'no-alert': 'off',
    'no-console': 'off',
    eqeqeq: 'off',
    'class-methods-use-this': 'off',
    'react/jsx-filename-extension': ['warn', { extensions: ['.jsx', '.js'] }],
    'react/jsx-props-no-spreading': 'off',
    'react/destructuring-assignment': 'off',
    'react/no-unused-state': 'off',
    'react/no-access-state-in-setstate': 'off',
    'react/prop-types': 0,
    'react/jsx-no-target-blank': 'off',
    'react/no-array-index-key': 'off',
    'react/prefer-stateless-function': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'no-use-before-define': 'off',
    'no-param-reassign': 'off',
    'spaced-comment': 'off',
    'lines-between-class-members': 'off',
    'no-return-await': 'off', //return await takes in place when we want to return a async response outside promise env
    'no-plusplus': 'off', //++
    'prefer-const': 'off', //const required on all non changable values
    'no-restricted-syntax': 'off', //for loop with two interators
    'no-restricted-properties': 'off', //isNaN forbidden, suggest usage of Number.isNaN but not compatible with IE
    'no-multi-assign': 'off', //multi assignment makes initialization clear
    'prefer-template': 'off', //concatenation takes in place in some particular cases
    'no-restricted-globals': 'off', //Math.pow is forbidden, suggest **
    'prefer-destructuring': 'off', //Dont allow array[0]
    'object-shorthand': 'off', //usage of shorthand on objects can cause confunsion and bugs on object structures, preffer to explicity define the keys
    'import/order': 'off', //import order should be on importance order
    'react/sort-comp': 'off',
    'no-else-return': 'off',
    'no-await-in-loop': 'off', //sorry, had to do that.. better can multiple callbacks
    'jsx-a11y/anchor-is-valid': 'off', //<a> usages
    'no-useless-return': 'off', //got a wierd case where this was wrong
    'new-cap': 'off', //3rd party lib uses it :/
    'no-lonely-if': 'off',
    'react/jsx-no-bind': 'off',
    'react/jsx-curly-brace-presence': 'off', //failing on AWS build?
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-static-element-interactions': 'off'
  },
};
