const fs = require('fs');
const path = require('path');

/** Cosmetic object
 * texture: string
 * name: string
 * category: string
 * animated: boolean
 * subCategory: string
 * */

class Cosmetic {
  constructor(cosmetic) {
    this.scale = cosmetic.type === 'dragon_wings' ? '0.13' : '1.0';
    this.texture = cosmetic.texture;
    this.name = cosmetic.name;
    this.category = cosmetic.category;
    this.animated = cosmetic.animated;
    this.subCategory = cosmetic.subCategory;
  }
}

const { cosmetics } = require('./cosmetics.json');

console.log('Reading original.txt...');
let newIndexes = fs.readFileSync(
  path.join(__dirname, 'indexes', 'original.txt'),
  'utf8'
);
console.log('Content read');

const startIndex = newIndexes.split('\n').length;
const assetsList = [];

console.log('Adding custom cosmetics...');
cosmetics.forEach((rawCosmetic, index) => {
  const cosmetic = new Cosmetic(rawCosmetic);
  const cosmeticId = startIndex + index;
  const cosmeticString = `${cosmeticId},${cosmetic.scale},${cosmetic.texture},${cosmetic.name},${cosmetic.category},${cosmetic.animated},${cosmetic.subCategory},NONE,${cosmetic.texture}`;
  newIndexes += cosmetic.texture;
  assetsList.push(cosmetic.texture);
  console.log(`Cosmetic ${cosmeticId} added!`);
});
console.log('All cosmetics added');

console.log('Writing output...');
fs.writeFileSync(
  path.join(__dirname, 'indexes', 'output.json'),
  JSON.stringify({ index: newIndexes, assetsList }, null, 2),
  'utf8'
);
console.log('Output wrote!');
