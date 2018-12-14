const dbConnection = ("./mongoConnection");

const getCollectionFn = collection =>{
    let _col= undefined;

    return async() => {
        if(!_col){
            const _db = await dbConnection();
            _col = await db.collection(collection);
        }
     return _col;
    }
}
module.exports={
    rec : getCollectionFn("rec"),
    users : getCollectionFn("users"),
    comments : getCollectionFn("com")
}