const pg = require("pg");
const settings = require("./settings");
const args = process.argv[2];

const client = new pg.Client({
    user: settings.user,
    password: settings.password,
    database: settings.database,
    host: settings.host,
    port: settings.port,
    ssl: settings.ssl
});

client.connect((err) => {
    if(err) {
        return console.error("Connection Error", err);
    }
    runQuery();
});

function runQuery() {
    client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text;", [args], (err, result) => {
        if(err) {
            return console.error("error running query", err);
        }
        
        client.end();
        logQueryOutput(err, result);
    });
}

function logQueryOutput(err, result) {
    console.log(`Found ${result.rows.length} person(s) by the name ${args}`);
    const output = result.rows;
    output.forEach((person, index) => {
        console.log(`-- ${index + 1}: ${person.first_name} ${person.last_name}, born '${person.birthdate}'`);
    })
}