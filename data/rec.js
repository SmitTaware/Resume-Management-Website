const mongoCollection =require('./mongoCollection');
const rec = mongoCollection.rec;
const uuid = require ('node-uuid');

var exportedMethods ={
    async createRec(User,Comp,Pos,JD,CV,AS){
       
       const recCol =  await rec();
       const newRec ={
           _id: uuid.v4(),
           user: User,
           company: Comp,
           position: Pos,
           jobDescription: JD,
           resume: CV,
           applicationStatus: AS,
           dateOfCreation: dateFotmat(Date.now),
           dateOfUpdation: dateFormat(Date.now),
          // comments: com
       } ;
     await recCol.insertOne(newRec);
    } ,

    async updateRec(id, updatedRec) {
    
        const recCol = await rec();
        const updatedR = {};
         
        if(updatedRec.company){updatedR.company=updatedRec.company;}
        if(updatedRec.position){updatedR.position=updatedRec.position;}
        if(updatedRec.jobDescription){updatedR.jobDescription=updatedRec.jobDescription;}
        if(updatedRec.resume){updatedR.resume=updatedRec.resume;}
        if(updatedRec.applicationStatus){updatedR.applicationStatus=updatedRec.applicationStatus;}
       // if(updatedRec.comments){updatedR.comments=updatedRec.comments;}
        updatedR.dateOfUpdation = dateFormat(Date.now);
    
        const updInfo = await recCol.updateOne({ _id: id }, { $set: updatedU });
        if (updInfo.updatedtedCount === 0)
        { throw `Updation Failed.Could not update Record ${id}`;}
    },
    async getUserByComp(CN){
        const recCol = await rec();
        
        const Rec = await recCol.findOne({company:CN});

        if(!Rec){return false;}
        
        return Rec;
    },

    async getUserByPos(Pos){
        const recCol = await rec();
        
        const Rec = await recCol.findOne({position:Pos});

        if(!Rec){return false;}
        
        return Rec;
    },
    
    async deleteRec(id){
     
        if(!id){throw "id not provided";}
        const recCol = await rec();
        const Rec = await recCol.removeOne({_id: id});

        if (Rec.deletedCount === 0)
        { throw `Updation Failed.Could not delete Record ${id}`;}

    }
}  
module.exports = exportedMethods;