const axios = require('axios');
const Dev = require('../models/Dev')
module.exports = {
    async store(req,res){
        const {username} = req.body;

        const userExists = await Dev.findOne({user:username})

        if(userExists){
            return res.json(userExists)
        }

        const userProfile = await axios.get(`https://api.github.com/users/${username}`)

        const {name,bio,avatar_url:avatar} = userProfile.data

        const devPersonSaved = await Dev.create({
            name,
            user : username,
            bio,
            avatar
        })
        return res.json(devPersonSaved)
    },
    async index(req,res){
        const {user:loggedUserId} = req.headers;
        const loggedDev = await Dev.findById(loggedUserId)
        const allUsers = await Dev.find({
            $and:[
                {_id: {$ne :loggedUserId}},
                {_id: {$nin :loggedDev.likes}},
                {_id: {$nin :loggedDev.dislikes}},
            ]
        })
        return res.json(allUsers)
    }
};