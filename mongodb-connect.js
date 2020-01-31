const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const client = new MongoClient('mongodb://localhost:27017', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

client.connect((err) => {
    if (err) {
        return console.log("Unable to connect Server");
    }
    console.log("Connected to Server");

    const db = client.db('nodeProject');

    // =====================UPADATE==========================

    // db.collection('Todos').findOneAndUpdate({
    //    text : 'Pavithra'
    // },{
    //     $set : {
    //         text:"Ranasinghe"
    //     }
    // },{
    //     returnOriginal:false
    // }
    // ).then((result)=>{
    //     console.log(result);
    // });


    // ====================DELETE===============================
        
    // db.collection('Todos').deleteOne({completed: false}).then((result)=>{
    //     console.log(result);
    // });

    // db.collection('Todos').deleteMany({complete : false}).then((result)=>{
    //     console.log(result);
    // });

    // =======================FIND==============================


    // db.collection('Todos').find().toArray().then((doc,err)=>{
    //     if(err){
    //         return console.log('Unable to find ',err);
    //     }
    //     console.log('Todos');
    //     console.log(JSON.stringify(doc, undefined, 2));
    // });

    // console.log("Start");
    
    // db.collection('Todos').find().toArray().then((result,err)=>{
    //     if(err) console.log(err);

    //     console.log(JSON.stringify(result, undefined, 1));
    // });

    // (async function call(){
    //     try{
    //         await db.collection('Todos').find().toArray().then((doc,err)=>{
    //             if(err){
    //                 return console.log('Unable to find ',err);
    //             }
    //             console.log('Todos');
    //             console.log(JSON.stringify(doc, undefined, 2));
    //         });
    //     }catch(err){
    //         console.log(err);
    //     }
    
    // });
    // call();
    
    // console.log("End");

    // // ======================ADD==================================
    // db.collection('Todos').insertOne({
    //     text: 'Example 10',
    //     completed: true
    // }, (err, result) => {
    //     if (err) {
    //         return console.log('Unable to insert Todo', err);
    //     }
    //     console.log(result.insertedCount);
    //     console.log(JSON.stringify(result, undefined, 2));
    //     client.close();
    // });
    // // ===========================================
    // db.collection('Todos').insertOne({
    //     text: 'Example 11',
    //     completed: true
    // }).then((result, err)=>{
    //     if(err) console.log(err);

    //     console.log(JSON.stringify(result, undefined, 2));
    // });

// // ======================ADD Many=================================

console.log("Start");

    db.collection('Todos').insertMany([{
        text:'Example 11',
        complete: false
    },{
        text:'Example 12',
        complete: false
    }],(err,result)=>{
        if(err) console.log("Unable to insert many values");

        console.log(JSON.stringify(result.ops, undefined, 2));

    });

    console.log("End");

});


