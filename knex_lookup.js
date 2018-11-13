const settings = require("./settings");

const knex = require("knex")({
    client: 'pg',
    connection: settings
});

const arg = process.argv[2];

// const pg = require('knex')({client: 'pg'});
knex({ a: 'famous_people' })
.select({
    aFirstName: 'a.first_name',
    aLastName: 'a.last_name',
    aBirthdate: 'a.birthdate'
})
.where('first_name', arg)
.orWhere('last_name', arg)
.asCallback((err, result) => {
    if(err) {
        return console.error("error running query", err);
    }
    logQueryOutput(result);
    knex.destroy();
});

function logQueryOutput(result) {
    console.log(`Found ${result.length} person(s) by the name ${arg}`);
    result.forEach((person, index) => {
        console.log(`-- ${index + 1}: ${person.aFirstName} ${person.aLastName}, born '${person.aBirthdate}'`);
    })
}