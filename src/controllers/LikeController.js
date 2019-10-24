const Dev = require('../models/Dev')
module.exports = {
    async store(req,res){
        const {devId} = req.params;
        const {user:loggedUserId} = req.headers; 
        const loggedDev = await Dev.findById(loggedUserId)
        const targetDev = await Dev.findById(devId)

        if(!targetDev){
            return res.status(400).json({error:"Dev not exists"})
        }

        if(targetDev.likes.includes(loggedUserId)){
            console.log("MATCH");
        }

        loggedDev.likes.push(targetDev._id)

        await loggedDev.save();
        return res.json(loggedDev)
    }
}