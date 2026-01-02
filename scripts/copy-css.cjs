const fs = require('fs');
const path = require('path');

const projectRoot = __dirname ? path.join(__dirname, '..') : path.resolve('..');
const srcDir = path.join(projectRoot, 'src');
const distDir = path.join(projectRoot, 'dist');

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function copyCssFiles(srcBase, destBase) {
  const entries = fs.readdirSync(srcBase, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(srcBase, entry.name);
    const destPath = path.join(destBase, entry.name);

    if (entry.isDirectory()) {
      ensureDir(destPath);
      copyCssFiles(srcPath, destPath);
    } else if (entry.isFile() && entry.name.toLowerCase().endsWith('.css')) {
      ensureDir(path.dirname(destPath));
      fs.copyFileSync(srcPath, destPath);
      console.log(
        `Copied ${path.relative(projectRoot, srcPath)} -> ${path.relative(projectRoot, destPath)}`
      );
    }
  }
}

ensureDir(distDir);
copyCssFiles(srcDir, distDir);
