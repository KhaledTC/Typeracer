export default class Car {
    constructor() {
        this.Car = document.querySelector('#car');
        this.previousRoadBoundaries = this.getRoadBoundaries();
        this.startPosition();
    }

    startPosition() {
        this.getCarStyle().left = (this.getRoadBoundaries().left).toString();
        this.getBottomPosition();
        this.previousCarBoundaries = this.getCarBoundaries();
    }

    moveCar(quoteLength) {
        this.Car.style.left = (parseFloat(this.Car.style.left, 10) + this.roadDistance() / quoteLength).toString();
    }

    getCarBoundaries() {
        return document.querySelector("#car").getBoundingClientRect();
    }

    getCarStyle() {
        return document.querySelector('#car').style;
    }

    getRoadBoundaries() {
        return document.querySelector('#road').getBoundingClientRect();
    }

    roadDistance() {
        return this.getRoadBoundaries().width - this.getCarBoundaries().width;
    }

    rePosition() {
        this.getLeftPosition();
        this.getBottomPosition();
        this.previousRoadBoundaries = this.getRoadBoundaries();
        this.previousCarBoundaries = this.getCarBoundaries();
    }

    getLeftPosition() {
        let drivedDistance = this.getCarBoundaries().left - this.previousRoadBoundaries.left;
        let scaleFactor = drivedDistance / (this.previousRoadBoundaries.width - this.previousCarBoundaries.width);
        let ScaledDistance = (this.getRoadBoundaries().width - this.getCarBoundaries().width) * scaleFactor;
        this.getCarStyle().left = (this.getRoadBoundaries().left + ScaledDistance).toString();
    }

    getBottomPosition() {
        this.getCarStyle().top = (this.getRoadBoundaries().top - this.getCarBoundaries().height).toString();
    }

}