const chai = require('chai');
const sinon = require('sinon');
const AreaModel = require('./../../../db/model').area;
const help = require('./../_helper')

describe('Model Unit Tests -- Area', function() {
    
    let mocks = [];
    const testArea = new AreaModel(help.logger())

    this.afterEach('Cleanup mocks', function(done) {
        mocks.forEach(mock => {
            mock.restore();
        });
        done();
    });

    describe('createdArea() unit tests', function() {
        it('Should pass information to area store without issue', function() {

            let createStub = sinon.stub(testArea.store, 'createOne' ).callsFake( async () => {
                return await Promise.resolve('Oh hey');
            });
            
            mocks.push(createStub);

            return testArea.createArea('house','tepid', 'some').then( results => {
                chai.expect(results).to.exist;
                chai.expect(results).to.equal('Oh hey');
            }).catch( error => {
                console.error(error);
                chai.expect(error).to.not.exist;
            })

        });

        it('Should log and return errors from area store', function() {

            let createErrorStub = sinon.stub(testArea.store, 'createOne').callsFake( async () => {
                throw 'poop';
            });
            
            let logSpy = sinon.spy(testArea.logger, 'error');

            mocks =[...mocks, createErrorStub, logSpy];

            return testArea.createArea('bob','warm','everything')
                .catch(error => {
                    chai.expect(error).to.exist;
                    chai.expect(error).to.equal('poop');
                    chai.expect(logSpy.called).to.be.true;
                });
        })
    })
})