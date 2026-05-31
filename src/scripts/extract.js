const fs = require('fs');
const path = require('path');

const baseDir = path.join(__dirname, '../app/(public)/design-ideas');
const categories = fs.readdirSync(baseDir).filter(f => fs.statSync(path.join(baseDir, f)).isDirectory());

let result = [];

categories.forEach(cat => {
  const pagePath = path.join(baseDir, cat, 'page.tsx');
  if (fs.existsSync(pagePath)) {
    const content = fs.readFileSync(pagePath, 'utf8');
    
    // Extract galleryItems
    const match = content.match(/const galleryItems = \[([\s\S]*?)\];/);
    let items = [];
    if (match) {
      try {
        // Evaluate the array string (unsafe but works for simple object literals)
        // Need to clean up the string to be valid JS for eval
        let arrStr = '[' + match[1] + ']';
        items = eval(arrStr);
      } catch(e) {
        console.error(`Error parsing items in ${cat}`);
      }
    }
    
    // Extract categories
    const catMatch = content.match(/const categories = \[([\s\S]*?)\];/);
    let subcats = [];
    if (catMatch) {
      try {
        subcats = eval('[' + catMatch[1] + ']');
      } catch(e) {
        console.error(`Error parsing categories in ${cat}`);
      }
    }

    result.push({
      slug: cat,
      subcategories: subcats.filter(c => c !== "All"),
      items
    });
  }
});

fs.writeFileSync(path.join(__dirname, 'extracted_data.json'), JSON.stringify(result, null, 2));
console.log('Data extracted to extracted_data.json');
