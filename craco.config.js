module.exports = {
  webpack: {
    configure: {
      optimization: {
        splitChunks: {
          chunks: 'all',
          minSize: 40000,
          maxSize: 200000,
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