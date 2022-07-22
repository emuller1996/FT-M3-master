var fs = require('fs');
const axios = require('axios');

module.exports = {
    pwd: function(){ process.stdout.write(__dirname)},
    date: function(){process.stdout.write(Date())},
    ls : function(){ 
        fs.readdir('.','utf8',function(err,files){
            if(err) throw (err);
            files.forEach(file=>{
                process.stdout.write(file + '\n');
            })
            process.stdout.write('\nprompt > ');
        })
    }, 
    echo : function(args){
        process.stdout.write(args.join(" "));

    },
    cat : function (args){
        fs.readFile(args[0],'utf-8',function(err,file){
            if(err) throw err;
            process.stdout.write(file);
            process.stdout.write('\nprompt > ');

        })
        
    },
    head : function (args){
        fs.readFile(args[0],'utf-8',function(err,file){
            if(err) throw err;
            var lineas = file.split('\n').slice(0,3);
            process.stdout.write(lineas.join('\n'));
            process.stdout.write('\nprompt > ');
        })

    },
    tail : function (args){
        fs.readFile(args[0],'utf-8',function(err,file){
            if(err) throw err;
            var lineas = file.split('\n').slice(-3);
            process.stdout.write(lineas.join('\n'));
            process.stdout.write('\nprompt > ');
        })
    }, 
    curl : function (args){
        axios(args[0])
        .then(data => {
            process.stdout.write(data.data.toString()); 
            process.stdout.write('\nprompt > ');
        })
        .catch(err => console.error(err))
    }


}