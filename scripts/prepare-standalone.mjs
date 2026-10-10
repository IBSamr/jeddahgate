import fs from 'node:fs/promises';
import path from 'node:path';

const copies = [
  ['public', '.next/standalone/public'],
  ['.next/static', '.next/standalone/.next/static'],
];
for (const [source, destination] of copies) {
  try {
    await fs.access(source);
    await fs.mkdir(path.dirname(destination), { recursive: true });
    await fs.cp(source, destination, { recursive: true, force: true });
    console.log(`Prepared standalone assets: ${source} -> ${destination}`);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
    console.log(`Skipping missing optional asset directory: ${source}`);
  }
}
