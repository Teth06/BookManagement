module.exports = {
    root: true,

    parserOptions: {
      ///requireConfigFile: false,
      parser: "@babel/eslint-parser",
      //babelOptions: {"configFile": "./babel.config.js", },
    },
    env: {
      
      node: true,
      
    },
    extends: ["plugin:vue/vue3-recommended"],
    rules: {
      'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
      'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    },
  };
  