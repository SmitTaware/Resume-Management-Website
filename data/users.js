const mongoCollection =require('./mongoCollection');
const users = mongoCollection.users;
const uuid = require ('node-uuid');

var exportedMethods ={
    async createUser(uname,emailID,epass){
       
       const userClol =  await users();
       const newUser ={
           _id: uuid.v4(),
           userName: uname,
           emailId: emailID,
           encryptedPassword: epass
       } ;
     await userClol.insertOne(newUser);
    } ,

    async updateUser(id, updatedUser) {
    
        const userCol = await users();
        const updatedU = {};
         
        if(updatedUser.userName){updatedU.userName=updatedUser.userName;}
        if(updatedUser.emailId){updatedU.emailId=updatedUser.emailId;}
        if(updatedUser.encryptedPassword){updatedU.encryptedPassword=updatedUser.encryptedPassword;}
    
        const updInfo = await userCol.updateOne({ _id: id }, { $set: updatedU });
        if (updInfo.updatedtedCount === 0)
        { throw `Updation Failed.Could not update Profile ${id}`;}
    },
    async getUser(Uname){
        const userCol = await users();
        
        const User = await userCol.findOne({userName:Uname});
    
        if(!User){ return false;}
        return User;
    }

}  
module.exports = exportedMethods;