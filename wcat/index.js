#!/usr/bin/env node

const fs = require("fs");
let arrayofargs = process.argv.slice(2);
//console.log(arrayofargs);
//console.log(process.argv);

let flags = [];   // kahi ek se jyada args ki jaroorat pad jaye
//note: saare flags ek saath imlement honge and tab answer banega
let filenames = [];

let secondaryarguments = [];

for (let val of arrayofargs) {
    // of - use kiya iss liye i matlab value at arr[i] h

    if (val[0] == "-") // assuming that all our commands start with '-'
    {
        flags.push(val);
    }
    else if (val[0] == "$")  // to remove anything character from the file 
    {                        // ex:  $v  will remove all the v from the file  
        secondaryarguments.push(val.slice(1));    
    }
    else {
        filenames.push(val);
    }
}

if (flags.length == 0 && secondaryarguments.length == 0) {
    for (fname of filenames) {
       let contentOfFile = fs.readFileSync(fname, 'utf-8');
        console.log(contentOfFile);

    }

}

else {
   for (fname of filenames) {
        let contentOfFile = fs.readFileSync(fname, 'utf-8');
        for (flag of flags) {
            if (flag == "-rs")    // remove all spaces from the answer
            {
                contentOfFile = removeAll(contentOfFile, " ")
            }

            if (flag == "-rn")    // remove all new lines from the answer
            {
                contentOfFile = removeAll(contentOfFile, "\r\n")   //   "/r/n is representation of new line"

            }

            if (flag == "-rsc")    // remove all special characters from the answer
            {
                contentOfFile = removeAll(contentOfFile, "sc")   //   "/r/n is representation of"

            }
        }

        for(sec_arg of secondaryarguments)
        {  
            contentOfFile = removeAll(contentOfFile, sec_arg)
        }


        console.log(contentOfFile);

    }
}

function removeAll(fileData, toRemove) {
    if (toRemove == "sc") {
        let str = ""
        for (let i = 0; i < fileData.length; i++) {
            var c = fileData[i];
            if ((c >= '0' && c <= '9') || (c >= 'A' && c <= 'Z') || (c >= 'a' && c <= 'z')) {
                str += c;
            }

        }
        return str;
    }

    else
        return fileData.split(toRemove).join("");

}
 