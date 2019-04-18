let getRandomIntegers = int => {
  let i = Math.floor(Math.random() * int);
  let j = Math.floor(Math.random() * int);
  return [i, j];
};

let getRandomCell = array => {
    let integers = [];
  do {
    integers = getRandomIntegers(array.length);
  } while (array[integers[0]][integers[1]]._isActive === true);

  return integers;
};

export { getRandomCell as botGetRandomCell };
