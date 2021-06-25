module.exports = {
  content: [
    {
      raw: '<html><body><div class="app"></div></body></html>',
      extension: 'html',
    },
    ,
  ],
  defaultExtractor: content => content.match(/[\w-/:]+(?<!:)/g) || [],
  css: ['test.less', './node_modules/antd/es/**/*.css'],
};
