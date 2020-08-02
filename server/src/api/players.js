const express = require('express');
const router = express.Router();
const moment = require('moment');

var knex = require('knex')({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: 'Eduardo87$',
        database: 'mlb'
    }
});

router.get('/', async (req, res) => {
    const players = await knex.select('*').from('player');
    res.json(players);
});

router.get('/search/:id', async (req, res) => {
    console.log(moment().month());
    const players = await knex('player').where('PlayerId', req.params.id)
    res.json(players);
});

router.get('/search/:prop/:value', async (req, res, next) => {
    try{
        const players = await knex('player').where(req.params.prop, 'like' , `%${req.params.value}%`);
        res.json({ count : players.length, players});
    }
    catch(error){
        next(error);
    }
});

router.get('/rip', async (req, res) => {
    const players = await knex('player').where( { DeathMonth : moment().format('M'), DeathDay : moment().format('D') });
    res.json({ count : players.length, players});
});

router.get('/born', async (req, res) => {
    const players = await knex('player').where( { BirthMonth : moment().format('M'), BirthDay : moment().format('D') });
    res.json({ count : players.length, players});
});

module.exports = router;