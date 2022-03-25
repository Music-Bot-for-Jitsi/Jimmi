import rollupPluginJson from 'https://dev.jspm.io/@rollup/plugin-json';

export default {
  port: 4040,
  mode: "dom",
  plugins: [rollupPluginJson()],
  extendsImportMap: [],
};
