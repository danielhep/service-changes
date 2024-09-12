/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import("next").NextConfig} */
const config = {
  webpack: (config) => {
    config.externals = [...config.externals, "@mapbox/node-pre-gyp", "duckdb-async", "duckdb"];
    return config;
  },
  output: "standalone",
};

export default config;
