module.exports = {
  // devIndicators: {
  //   autoPrerender: false,
  // },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: `@svgr/webpack`,
          options: {
            ref: true,
            svgoConfig: {
              cleanupIDs: true,
            },
          },
        },
      ],
    });

    return config;
  },
};
