module.exports = {
  webpack: {
    configure: {
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 80000,
          maxSize: 800000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'lib',
              chunks: 'all',
            }
          },
        },
      }
    }
  },
};