function* fizzBuzzGenerator(max) {
  // Tu código acá:
  var number = 1;
  while (number <= max || !max) {
    if(number % 3 === 0 && number % 5 === 0 ){
      yield "Fizz Buzz";
      number++;
    }
    else if (number % 3 === 0) {
      yield "Fizz";
      number++;
    } else if (number % 5 === 0) {
      yield "Buzz";
      number++;
    } else {
      yield number;
      number = number + 1;
    }
    
  }

}

module.exports = fizzBuzzGenerator;
