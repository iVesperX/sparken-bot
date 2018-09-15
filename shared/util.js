exports.clone = (o => JSON.parse(JSON.stringify(o)));

exports.initialize = (async (client, reset) => {
  // mLab collections
	const collections = {
    questions: [],
    answers: []
  };
  
  // generates a new collection
	const generateCollection = (async (name) => {
		if (!collections[name]) return;
		
		await client.database.createCollection(name);
    await client.database.collection(name).insertOne({ 'data': collections[name] });
    
    console.log(`Initialized new MongoDB database. [${name}]`);
	});
	
	// Iterates through collections
	for (let i in collections) {
		const c = await client.database.collection(i).findOne({});
		const exists = c && true;
		
		if (reset === true) {
      console.log('Resetting all collections');
			try { await client.database.dropCollection(i) } catch (e) {}
			
			generateCollection(i);
		} else {
      if (!exists) generateCollection(i);
    }
	}
});

exports.getLatestId = (list => {
  const last_item = list[list.length - 1];

  if (!last_item) {
    return 1;
  } else {
    const id = last_item.id || last_item.question_id;
    return id + 1;
  } 
});