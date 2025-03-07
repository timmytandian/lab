function add (a, b, callback) {
    setTimeout(() => {
        sum = a + b;
        callback(sum)
    },
    2000)
}

// add(1, 4, (sum) => {
//     console.log(sum)
// })

console.table(
    COMMANDS.map(command => {
      return {
        "Long Option": command.long_option,
        "Short Option": command.short_option,
        Description: command.description
      };
    })
  );

  https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/EnvyCodeR.zip
  https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/IntelOneMono.zip
  https://github.com/ryanoasis/nerd-fonts/releases/download/v3.0.2/NerdFontsSymbolsOnly.zip