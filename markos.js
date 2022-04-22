'use strict';
let endglishDatabase = [];
let persianDatabase = [];
const wordAdder = string => {
  let wordCounter = 0;
  const words = string
    .toLowerCase()
    .split(
      /[^A-Za-z0-9\u00a9\u00ae\u2000-\u3300\ud83c\ud000-\udfff\ud83d\ud000-\udfff\ud83e\ud000-\udfff\u0600-\u061E\u0620-\u06ff]+/
    );
  for (const word of words) {
    if (
      /[\u0600-\u061E\u0620-\u06ff\u00a9\u00ae\u2000-\u3300\ud83c\ud000-\udfff\ud83d\ud000-\udfff\ud83e\ud000-\udfff]+/gi.test(
        word
      ) &&
      !persianDatabase.includes(word)
    ) {
      persianDatabase.push(word);
      wordCounter++;
    } else if (
      /[A-Za-z0-9\u00a9\u00ae\u2000-\u3300\ud83c\ud000-\udfff\ud83d\ud000-\udfff\ud83e\ud000-\udfff]+/gi.test(
        word
      ) &&
      !endglishDatabase.includes(word)
    ) {
      endglishDatabase.push(word);
      wordCounter++;
    }
  }
  if (wordCounter > 1) {
    document.querySelector(
      '.succ'
    ).textContent = `${wordCounter} new words were added successfully!`;
  } else if (wordCounter === 1) {
    document.querySelector(
      '.succ'
    ).textContent = `One new word was added successfully!`;
  } else {
    document.querySelector(
      '.succ'
    ).textContent = `No new words were added to the database!`;
  }
};
const wordMaker = () => {
  // The functions selects one of the two arrays based on a random number (the longer array has more chance)
  let selectedArray = [];
  const arrChance =
    Math.random() * (persianDatabase.length / endglishDatabase.length + 1) <
    persianDatabase.length / endglishDatabase.length;
  if (endglishDatabase.length === 0 && persianDatabase.length === 0) {
    return 'ERR_EMPTY_DATABASES';
  } else if (endglishDatabase.length < 5 && persianDatabase.length < 5) {
    return 'Please add more than 5 words';
  } else if (persianDatabase.length < 5) {
    selectedArray = [...endglishDatabase];
  } else if (endglishDatabase.length < 5) {
    selectedArray = [...persianDatabase];
  } else if (arrChance) {
    selectedArray = [...persianDatabase];
  } else if (!arrChance) {
    selectedArray = [...endglishDatabase];
  }
  if (Math.random() < 0.8) {
    let numberOfWords = Math.floor(Math.random() * 3) + 1;
    if (numberOfWords > selectedArray.length)
      numberOfWords = selectedArray.length;
    // if numberofwords = 1
    const wordsToJoin = [];
    const usedIndexes = [];
    while (wordsToJoin.length < numberOfWords) {
      let indexOfTheWord = Math.floor(Math.random() * selectedArray.length);
      while (usedIndexes.includes(indexOfTheWord)) {
        indexOfTheWord = Math.floor(Math.random() * selectedArray.length);
      }
      usedIndexes.push(indexOfTheWord);
      wordsToJoin.push(selectedArray[indexOfTheWord]);
    }
    return wordsToJoin.join(' ');
  } else {
    let numberOfWords = Math.floor(Math.random() * 15) + 2;
    if (numberOfWords > selectedArray.length)
      numberOfWords = selectedArray.length;
    // if numberofwords = 1
    const wordsToJoin = [];
    const usedIndexes = [];
    while (wordsToJoin.length < numberOfWords) {
      let indexOfTheWord = Math.floor(Math.random() * selectedArray.length);
      while (usedIndexes.includes(indexOfTheWord)) {
        indexOfTheWord = Math.floor(Math.random() * selectedArray.length);
      }
      usedIndexes.push(indexOfTheWord);
      const preserve = Math.floor(Math.random() * 3) + 1;
      if (
        selectedArray.includes(selectedArray[indexOfTheWord - preserve]) &&
        selectedArray.includes(selectedArray[indexOfTheWord + preserve])
      ) {
        for (let looper = preserve * -1; looper <= preserve; looper++) {
          wordsToJoin.push(selectedArray[indexOfTheWord + looper]);
        }
      }
    }
    return wordsToJoin.join(' ');
  }
};
document.querySelector('.submit').addEventListener('click', () => {
  wordAdder(document.querySelector('#input').value);
  if (document.querySelector('#input').value);
  else if (!document.querySelector('#input').value)
    document.querySelector('.succ').textContent = 'Please enter a string!';
  document.querySelector('#input').value = '';
});
document.querySelector('.generate').addEventListener('click', () => {
  document.querySelector('.random').textContent = wordMaker();
});
document.querySelector('.clear').addEventListener('click', () => {
  if (persianDatabase.length > 0 || endglishDatabase.length > 0) {
    persianDatabase = [];
    endglishDatabase = [];
    document.querySelector('.random').textContent =
      'Database successfully cleared!';
  } else {
    document.querySelector('.random').textContent =
      'Database is already empty!';
  }
});
