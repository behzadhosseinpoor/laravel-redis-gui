const mix = require("laravel-mix");
const tailwindcss = require("tailwindcss");

mix
  .setPublicPath("public")
  .ts("resources/ts/app.ts", "")
  .react()
  .sass("resources/sass/app.scss", "")
  .options({
    postCss: [tailwindcss("./tailwind.config.js")],
  })
  .sourceMaps()
  .version();
