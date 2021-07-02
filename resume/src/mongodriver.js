const MongoClient = require('mongodb').MongoClient;

async function main() {

	const uri = "mongodb+srv://dbuser:test1234@cluster0.o6o9w.mongodb.net/rezume?retryWrites=true&w=majority";
    const c = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
	    await c.connect();
	    const results = await c.db("rezume").collection("structure").findOne({"key":"home"});
	
		console.log(results);
	} catch (e) {
		console.log(e);
	} finally {
		await c.close();
	}
	// we'll add code here soon
}

main();