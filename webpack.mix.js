const mix = require('laravel-mix');
const { InjectManifest } = require('workbox-webpack-plugin');

mix.js('resources/js/app.js', 'public/js')
   .react()
   .postCss('resources/css/app.css', 'public/css', [
       // Add your PostCSS plugins here
   ])
   .webpackConfig({
       plugins: [
           new InjectManifest({
               swSrc: './public/sw.js', // Source of the service worker
               swDest: 'sw.js', // Destination in the public folder
           }),
       ],
   });
