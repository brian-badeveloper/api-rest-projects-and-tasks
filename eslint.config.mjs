import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";


export default [
  {
    env: {
      node: true
    },
    files: ["**/*.eslintrc.{js,mjs,cjs,ts}"],
  },
  {
    languageOptions: { 
      globals: globals.browser 
    }
  },
  {
    rules: {
        "semicolons": "off",
        "import/prefer-default-export": 0
    }
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
];