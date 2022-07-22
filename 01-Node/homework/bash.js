const comandos = require("./commands/index");

// Output un prompt
process.stdout.write("prompt > ");
// El evento stdin 'data' se dispara cuando el user escribe una línea
process.stdin.on("data", function (data) {
  var args = data.toString().trim().split(' '); // remueve la nueva línea
  var cmd = args.shift();

  if (!comandos.hasOwnProperty(cmd)) {
    process.stdout.write("Comando no existe . . . ");
    process.stdout.write("\nprompt > ");
  } else {
    comandos[cmd](args);
  }

  //process.stdout.write('You typed: ' + cmd);
  process.stdout.write("\nprompt > ");
});
