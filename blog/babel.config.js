module.exports = {
    presets: ['next/babel'],
    plugins: [
      [
        'import',
        {
          libraryName: 'antd',
          libraryDirectory: 'lib',
          style: 'index.css',
        },
      ],
    ],
  }
  