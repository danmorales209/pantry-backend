const chai = require('chai');
const sinon = require('sinon');
const db = require('./../../../db/schemas').Area;
const AreaStore = require('./../../../db/store').area;
const _help = require('./../../_helper');

describe.only('Store Integration Tests -- Area', function () {

    const testStore = new AreaStore(_help.logger());

    before('Setup DB', function() {
        return _help.connect();
    });

    after('Cleanup', function() {
        return _help.drop('areas');
    })

    describe('createOne() tests', function() {
        
        it('Should create an area when required params are passed', function() {

            let testArea = {
                name: "Test Area",
                temperature: "Ambient",
                capacity: "20 cu ft"
            };

            return Promise.resolve().then( () => {
                return testStore.createOne(testArea).catch(error => {
                    console.error(error)
                });
                
            }).then( () => {
                return db.find({areaName:'Test Area'}).exec().then( (results) => {
                    console.log(results);
                })
            })
            
        })
    })

})