const fs = require('fs/promises');
const path = require('path');
const { execFile } = require('child_process');
const { promisify } = require('util');

const ROOT = process.cwd();
const TARGET_DIRS = ['static', 'src/assets'];
const IMAGE_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png']);
const execFileAsync = promisify(execFile);

async function exists(targetPath) {
  try {
    await fs.access(targetPath);
    return true;
  } catch {
    return false;
  }
}

async function collectImageFiles(dirPath, list = []) {
  const entries = await fs.readdir(dirPath, { withFileTypes: true });

  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      await collectImageFiles(entryPath, list);
      continue;
    }

    const ext = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXTENSIONS.has(ext)) {
      list.push(entryPath);
    }
  }

  return list;
}

async function optimizeImage(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const originalBuffer = await fs.readFile(filePath);

  if (ext !== '.jpg' && ext !== '.jpeg' && ext !== '.png') {
    return { changed: false, savedBytes: 0 };
  }
  const tempPath = `${filePath}.optimized`;
  const outputFormat = ext === '.png' ? 'png' : 'jpeg';
  const formatOption = ext === '.png' ? 'best' : '80';

  await execFileAsync('sips', [
    '-s',
    'format',
    outputFormat,
    '-s',
    'formatOptions',
    formatOption,
    filePath,
    '--out',
    tempPath,
  ]);

  const optimizedBuffer = await fs.readFile(tempPath);

  if (optimizedBuffer.length >= originalBuffer.length) {
    await fs.unlink(tempPath);
    return { changed: false, savedBytes: 0 };
  }

  await fs.rename(tempPath, filePath);
  return {
    changed: true,
    savedBytes: originalBuffer.length - optimizedBuffer.length,
  };
}

function toKb(bytes) {
  return `${(bytes / 1024).toFixed(1)} KB`;
}

async function main() {
  const imageFiles = [];

  for (const relativeDir of TARGET_DIRS) {
    const absDir = path.join(ROOT, relativeDir);
    if (await exists(absDir)) {
      await collectImageFiles(absDir, imageFiles);
    }
  }

  if (imageFiles.length === 0) {
    console.log('No supported image files found.');
    return;
  }

  let optimizedCount = 0;
  let totalSaved = 0;

  for (const filePath of imageFiles) {
    try {
      const result = await optimizeImage(filePath);
      if (result.changed) {
        optimizedCount += 1;
        totalSaved += result.savedBytes;
      }
    } catch (error) {
      console.warn(`Skipped ${filePath}: ${error.message}`);
    }
  }

  console.log(`Scanned: ${imageFiles.length} images`);
  console.log(`Optimized: ${optimizedCount} images`);
  console.log(`Saved: ${toKb(totalSaved)} (${totalSaved} bytes)`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
