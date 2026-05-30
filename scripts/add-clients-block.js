const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../.env.local') });

async function addClientsBlock() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const Page = mongoose.model('Page', new mongoose.Schema({
      slug: String,
      content: {
        blocks: Array
      }
    }));

    const homePage = await Page.findOne({ slug: 'home' });
    if (!homePage) {
      console.error('Home page not found');
      return;
    }

    const hasClients = homePage.content.blocks.some(b => b.type === 'clients');
    if (!hasClients) {
      homePage.content.blocks.push({
        type: 'clients',
        data: {}
      });
      await homePage.save();
      console.log('Clients block added to Home page');
    } else {
      console.log('Clients block already exists on Home page');
    }

    await mongoose.disconnect();
  } catch (err) {
    console.error('Error:', err);
  }
}

addClientsBlock();
