export default class Quote {

  constructor() {
    this.quoteText = this.getQuoteText();
    this.visitedLetter = new Array(this.quoteText.length);
    this.currentLetterIndex = 0;
    this.typedLettersCount = 0;
    this.currentActiveWordStart = 0;
    this.currentActiveWordLength = 0;
    this.startTypingTime = -1;
    this.endTypingTime = -1;
    this.typingSpeed = 0;
    this.buildQuoteBody();
  }

  getQuoteText() {
    return document.querySelector('#quoteText').innerHTML;
  }

  buildQuoteBody() {
    for (let i = 0; i < this.quoteText.length; i++) {
      let letter = this.createNewLetter();
      this.setIdToLetter(letter, i);
      this.makeLetterUnselectable(letter);
      this.pushLetterToQuote(letter, this.quoteText[i]);
      this.visitedLetter[i] = false;
    }
  }
  createNewLetter() {
    return document.createElement('span');
  }

  setIdToLetter(letter, id) {
    letter.setAttribute('id', 'letter' + id.toString());
  }

  makeLetterUnselectable(letter) {
    letter.classList.add('unselectable');
  }

  pushLetterToQuote(letter, data) {
    letter.innerHTML = data;
    document.querySelector('#quote').appendChild(letter);
  }

  currentActiveLetter() {
    return document.querySelector('#' + 'letter' + this.currentLetterIndex.toString());
  }

  updateTypingMaxLength(textInput) {
    textInput.setAttribute("maxlength", this.quoteText.length - this.currentActiveWordStart);
  }

  setStartTime() {
    if (this.startTypingTime === -1)
      this.startTypingTime = new Date();
  }

  quoteCompleted() {
    return this.currentLetterIndex >= this.quoteText.length;
  }

  typedCorrectLetter(letter, textInputLength) {
    return this.currentActiveLetter().innerHTML === letter && textInputLength === this.currentActiveWordLength;
  }

  markCurrentLetterGreen() {
    this.currentActiveLetter().style.color = 'green';
  }

  markTypedLetterRed() {
    if (this.typedLettersCount === this.quoteLength())
      return;
    document.querySelector('#letter' + this.typedLettersCount.toString()).style.backgroundColor = 'red';
    this.typedLettersCount++;
  }

  resetLastWrongLetterColor() {
    this.typedLettersCount--;
    this.getLetterById(this.typedLettersCount).style.backgroundColor = '#fafafa';
  }

  resetLastCorrectLetterColor() {
    this.currentLetterIndex--;
    this.getLetterById(this.currentLetterIndex).style.color = 'black';
  }

  getLetterById(id) {
    return document.querySelector('#letter' + id.toString());
  }

  currentWordCompleted() {
    return this.currentActiveLetter().innerHTML === ' ';
  }

  resetCurrentActiveWord() {
    this.currentLetterIndex++;
    this.currentActiveWordStart = this.currentLetterIndex;
    this.currentActiveWordLength = 0;
  }

  currentLetterIsVisited() {
    return this.visitedLetter[this.currentLetterIndex];
  }

  setCurrentLetterVisited() {
    this.visitedLetter[this.currentLetterIndex] = true;
  }

  quoteLength() {
    return this.quoteText.length;
  }

  goToNextWord() {
    this.currentActiveWordStart = this.currentLetterIndex;
  }

  claculateElapsedTime() {
    this.typingSpeed = this.quoteText.length / 5.0;
    this.typingSpeed /= (this.endTypingTime - this.startTypingTime) / 60000.0;
    return "Your speed is " + Math.round(this.typingSpeed) + " WPM";
  }

  getSpeedResult() {
    this.endTypingTime = new Date();
    return this.claculateElapsedTime();
  }

  finished() {
    return this.currentLetterIndex === this.quoteLength();
  }

}