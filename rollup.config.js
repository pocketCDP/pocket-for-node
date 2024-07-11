const { nodeResolve } = require("@rollup/plugin-node-resolve");
const commonjs = require("@rollup/plugin-commonjs");
const typescript = require("@rollup/plugin-typescript");
const peerDeps = require("rollup-plugin-peer-deps-external");
const terser = require("@rollup/plugin-terser");

module.exports = {
  input: ["./src/index.ts"],
  output: {
    dir: "dist",
    format: "cjs",
    exports: "named",
    preserveModules: true,
    preserveModulesRoot: "src",
    sourcemap: true,
  },
  plugins: [
    peerDeps(),
    nodeResolve({
      preferBuiltins: true,
    }),
    commonjs(),
    typescript({
      tsconfig: "./tsconfig.build.json",
      declaration: true,
      declarationDir: "dist",
    }),
    terser(),
  ],
};
