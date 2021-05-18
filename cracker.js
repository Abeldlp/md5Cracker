import md5 from 'md5';
import readline from 'readline'
import fs from 'fs'

if(process.argv[2] == '-h'){
    console.log('\n Provide a wordlist of passwords and the md5 hass \n \n Example: node app.js ./my_wordlist ngwerg34345ilb345bilbaf\n')
    process.exit(1)
}

const crack = (input, password) => {
    return md5(input) === password
}

const passwordToCrack = process.argv[3]

const passwordList = process.argv[2]

const readInterface = readline.createInterface({
    input: fs.createReadStream(passwordList)
});

console.log("\n CRACKING PASSWORD \n");

readInterface.on('line', function(line) {
    let result = crack(line, passwordToCrack)
    process.stdout.clearLine();
    process.stdout.write("   " + line)
    process.stdout.cursorTo(0);

    if (result) {
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        console.log(' Password match: ' + line)
        readInterface.close()
        process.stdout.clearLine();
    }
});
