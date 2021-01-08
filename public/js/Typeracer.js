export default class Typeracer {

    constructor(quote, car) {
        this.textInput = document.querySelector('#input');
        document.getElementById("input").focus();
        this.quote = quote;
        this.car = car;
        this.pressedAlt = false;
        this.pressedControl = false;
    }

    handleDownkey(e) {
        if (e.key === 'Alt')
            this.pressedAlt = true;
        else if (e.key === 'Control')
            this.pressedControl = true;
        else if (this.validKey(e.key)) {
            this.quote.updateTypingMaxLength(this.textInput);
            this.quote.setStartTime();
            if (this.quote.typedCorrectLetter(e.key, this.textInput.value.length)) {

                this.quote.markCurrentLetterGreen();
                this.quote.typedLettersCount++;

                if (this.quote.currentWordCompleted()) {
                    this.quote.resetCurrentActiveWord();
                    this.textInput.value = "";
                }
                else {
                    this.quote.currentLetterIndex++;
                    this.quote.currentActiveWordLength++;
                }
                if (!this.quote.currentLetterIsVisited()) {
                    this.quote.setCurrentLetterVisited();
                    this.car.moveCar(this.quote.quoteLength());
                }
            }
            else {
                if (e.key != 'Backspace') {
                    this.quote.markTypedLetterRed();
                    this.textInput.style.backgroundColor = 'red';
                }
                else if (this.quote.typedLettersCount > this.quote.currentActiveWordStart)
                    this.quote.resetLastWrongLetterColor();

                if (this.quote.currentLetterIndex > this.quote.typedLettersCount) {
                    this.quote.resetLastCorrectLetterColor();
                    this.quote.currentActiveWordLength--;
                }
                else if (this.quote.currentLetterIndex === this.quote.typedLettersCount)
                    this.textInput.style.backgroundColor = '#fafafa';
            }
        }
    }

    handleUpkey(e) {
        if (e.key === 'Alt')
            this.pressedAlt = false;
        else if (e.key === 'Control')
            this.pressedControl = false;
        else if (!this.pressedAlt && !this.pressedControl) {
            if (e.key == ' ' && this.quote.currentActiveWordLength === 0)
                this.textInput.value = "";
            if (this.quote.finished()) {
                this.textInput.value = "";
                document.querySelector("#result").innerHTML = this.quote.getSpeedResult();
                this.car.rePosition();
                this.textInput.setAttribute("disabled", "disabled");
            }
        }
    }

    validKey(key) {
        if ((key.length === 1 || key == "Backspace") && !this.quote.quoteCompleted()
            && this.quote.typedLettersCount <= this.quote.quoteLength() && !this.pressedAlt && !this.pressedControl)
            return true;
        return false;
    }

}