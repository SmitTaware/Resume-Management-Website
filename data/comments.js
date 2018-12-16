const mongoCollection =require('../config/mongoCollections');
const com = mongoCollection.comments;
const rec = mongoCollection.rec;

var exportedMethods={
    async createCom(recId,com){

        const comCol =  await com();
        const newCom ={

            rec_id : recId,
            commment : com
        } ;
      await comCol.insertOne(newCom);
     } ,
    async updateCom(comId,recId,com) {

        if(!com){throw "Provide a comment to update"}

        const comCol = await com();
        const updatedC = {};

       updatedC.com=com;

       const updInfo = await comCol.updateOne({ com_id: comId }, { $set: updatedC });
       if (updInfo.updatedtedCount === 0)
        { throw `Updation Failed.Could not update comment ${id}`;}
    },
    async findCom(recId){
        const comCol = await com();

        const coms = await comCol.find({rec_id: recId}).toArray();
        return coms;
    },
    async deleteCom(id){

        if(!id){throw "id not provided";}
        const comCol = await com();
        const Com = await comCol.removeOne({com_id: id});

        if (Com.deletedCount === 0)
        { throw `Updation Failed.Could not delete Record ${id}`;}
}
}
module.exports = exportedMethods;