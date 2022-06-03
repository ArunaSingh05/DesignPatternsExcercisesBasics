var PersonFactory = require('./userFactory');

var alex = PersonFactory.createInstance({ name: 'Alex Banks', money: 100 }, 'Person');
var eve = PersonFactory.createInstance({ name: 'Eve Porcello', money: 100 }, 'Employee');

eve.payDay(100);

console.log(alex.toString());
console.log(eve.toString());
