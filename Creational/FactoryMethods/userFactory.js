var Employee = require('./Employee');
var Shopper = require('./Shopper');
var Person = require('./Person');

const MODULES = {
    Shopper,
    Employee,
    Person
};

class PersonFactory {
    static createInstance(data, type) {
        const objCreator = MODULES[type];
        const object = objCreator ? new objCreator(data) : null;
        return object;
    }
}

module.exports = PersonFactory;
