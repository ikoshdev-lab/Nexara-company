const mongoose = require('mongoose');

const uris = [
  "mongodb+srv://islomovikromjon7_db_user:Helloworld@cluster0.xvzwh5a.mongodb.net/nexara?retryWrites=true&w=majority",
  "mongodb+srv://islomovikromjon7_db_user:tSPDLcVgr3jXdX9f@cluster0.xvzwh5a.mongodb.net/nexara?retryWrites=true&w=majority"
];

async function testUris() {
  for (let uri of uris) {
    console.log(`Testing connection with: ${uri.replace(/:[^:]*@/, ':****@')}`);
    try {
      await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
      console.log("✅ CONNECTION SUCCESSFUL!");
      await mongoose.disconnect();
      return;
    } catch (e) {
      console.log(`❌ CONNECTION FAILED: ${e.message}`);
    }
  }
}

testUris();
