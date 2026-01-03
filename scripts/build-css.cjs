const postcss = require('postcss');
const tailwindcss = require('tailwindcss');
const autoprefixer = require('autoprefixer');
const fs = require('fs');
const path = require('path');

const projectRoot = __dirname ? path.join(__dirname, '..') : path.resolve('..');
const inputFile = path.join(projectRoot, 'src', 'styles.css');
const outputFile = path.join(projectRoot, 'dist', 'styles.css');
const tailwindConfig = path.join(projectRoot, 'tailwind.config.js');

// Read the input CSS file
const css = fs.readFileSync(inputFile, 'utf8');

// Process CSS through PostCSS with Tailwind and Autoprefixer
// Pass the config path and set cwd to project root so content paths resolve correctly
postcss([tailwindcss({ config: tailwindConfig }), autoprefixer])
  .process(css, { from: inputFile, to: outputFile, cwd: projectRoot })
  .then((result) => {
    // Ensure dist directory exists
    const distDir = path.dirname(outputFile);
    if (!fs.existsSync(distDir)) {
      fs.mkdirSync(distDir, { recursive: true });
    }

    // Write the compiled CSS to dist
    fs.writeFileSync(outputFile, result.css);
    console.log(`✓ Built styles.css: ${path.relative(projectRoot, outputFile)}`);

    if (result.map) {
      const mapFile = outputFile + '.map';
      fs.writeFileSync(mapFile, result.map.toString());
      console.log(`✓ Built styles.css.map: ${path.relative(projectRoot, mapFile)}`);
    }
  })
  .catch((err) => {
    console.error('Error processing CSS:', err);
    process.exit(1);
  });
