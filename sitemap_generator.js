const SitemapGenerator = require('sitemap-generator');
process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = 1;
var generator = SitemapGenerator('https://www.herpetofaunabd.live/', {
  maxDepth: 0,
  filepath: './sitemap.xml',
  maxEntriesPerFile: 50000,
  stripQuerystring: true
});


generator.on('start',()=>{
  console.log("Process Started!!");
})
generator.start();