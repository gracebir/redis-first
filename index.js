const express = require('express');
const axios = require('axios')
const redis = require('redis');



const app = express()


const port = process.env.PORT || 5000;
const redisPort = process.env.PORT || 6379;


async function getRepos(req,res,next){
    try{

        console.log('Fetching Data...');

        const { username } = req.params;

        const response = await axios.get(`https://api.github.com/users/${username}`);

        const data = await response.data;
        res.send(data)
    } catch(err){
        console.error(err);
    }
}

const client = redis.createClient(redisPort);


app.get('/repos/:username', getRepos);

app.listen(port, ()=>{
    console.log('running ....');
})