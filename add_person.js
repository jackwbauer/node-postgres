const settings = require("./settings");

const knex = require("knex")({
    client: 'pg',
    connection: settings
});

const first_name = process.argv[2];
const last_name = process.argv[3] || '';
const birthdate = process.argv[4] || '';

// const pg = require('knex')({client: 'pg'});
knex('famous_people')
    .insert({
        first_name,
        last_name,
        birthdate
    }).asCallback((err) => {
        if(err) {
            console.error(err);
        }
        knex.destroy();
    });