const SitemapGenerator = require('sitemap-generator');
// create generator
const generator = SitemapGenerator(process.env['URL'], {
  stripQuerystring: true,
  lastMod: true,
  filepath: './dist/browser/assets/sitemap.xml',
});

// register event listeners
generator.on('done', () => {
  // sitemaps created
});
generator.on('error', (err: any) => {
  console.error(err);
});
// start the crawler
generator.start();
