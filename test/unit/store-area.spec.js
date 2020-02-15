const chai = require('chai');
const sinon = require('sinon');
const areaStore = require('./../../db/store').area;

describe('Store Unit Tests -- Area', function () {
    const testStore = new areaStore();
    let mocks = [];

   /*  before('Some pre work', function(done) {
        console.clear();
        done();
    }) */

    this.afterEach('Reset mocks', function (done) {
        mocks.forEach(mock => mock.restore())
        done();
    })

    describe('getAll() Unit tests', function () {


        it('Should pass information to db.Find without issue', function () {
            
            
            let findMock = sinon.stub(testStore.db,'find').returns({
                'find': () => this,
                'exec': () => Promise.resolve('Woot')
            });
    
            mocks.push(findMock);
    
            return testStore.getAll({owner: 'bob'}).then( results => {
                console.log(results)
                chai.expect(results).to.exist;
                chai.expect(results).to.equal("Woot")
            }).catch(error => {
                console.log("Shouldn't see this")
                console.error(error);
                chai.expect(error).to.not.exist;
            })
        });

        it('Should log and throw errors originating from Database', function() {
            let findMockError = sinon.stub(testStore.db,'find').returns({
                'find': () => this,
                'exec': () => Promise.reject('Whoops')
            });

            let logSpy = sinon.spy(testStore.logger,'error');

            mocks = [...mocks, findMockError, logSpy];

            return testStore.getAll({owner:'ted'}).then(results => {
                chai.expect(results).to.not.exist;
            }).catch( error => {
                chai.expect(error).to.exist;
                chai.expect(error).to.equal('Whoops');
                chai.expect(logSpy.called).to.be.true;
            })
        })

    });

    describe('createOne() unit tests', function() {
        
        it('Should pass information to the database without issue', function() {
            let createOneMock = sinon.stub(testStore.db,'create').callsFake(() => {
                return Promise.resolve();
            });

            let logSpy = sinon.spy(testStore.logger, 'info');

            mocks = [...mocks, createOneMock, logSpy];

            return testStore.createOne('tree', 'cold','a lot').then( () => {
                
                chai.expect(logSpy.called).to.be.true;
            
            }).catch( error => {
                console.error(error);
                chai.expect(error).to.not.exist;
            })
        });

        it('Should log and throw errors from the database', function() {
            
            let createErrorMock= sinon.stub(testStore.db, 'create').callsFake( () => {
                return Promise.reject('Boom');
            });

            let logSpy = sinon.spy(testStore.logger, 'error');

            mocks = [...mocks, createErrorMock, logSpy];

            return testStore.createOne('moose', 'hot', 'some').catch(error => {
                chai.expect(error).to.equal('Boom');
                chai.expect(logSpy.called).to.be.true;
            })
        })

    })
})