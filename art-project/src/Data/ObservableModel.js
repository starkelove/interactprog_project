class ObservableModel {
  constructor() {
    this._observers = [];
  }

  addObserver(observer) {
    console.log("observable add");
    this._observers.push(observer);
  }

  notifyObservers(changeDetails) {
    this._observers.forEach(observer => {
      observer.update(this, changeDetails);
    });
  }

  removeObserver(observer) {
    console.log("observable remove");
    this._observers = this._observers.filter(o => o !== observer);
  }
}

export default ObservableModel;
