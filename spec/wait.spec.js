'use strict';

const mock = require('node-mocks-http');

const { spy } = require('sinon');

const { expect } = require('chai');

const wait = require('../src/wait');

describe('wait', () => {
    it('should be a function', async () => {
        // Assert
        expect(wait).to.be.a('function');
    });

    it('should send params.status after waiting for params.time', () => {
        // Arrange
        const time = 1000;
        const status = 418;
        const request = mock.createRequest({
            METHOD: 'POST',
            url: '/${time}/${status}',
            params: {
                time,
                status,
            }
        });
        const response = mock.createResponse();

        // Act
        return new Promise(resolve => {
            // This also implicitly tests that `next` gets called.
            const startTime = Date.now();
            wait(request, response, () => resolve(startTime));
        }).then(startTime => {
            const timeDifference = Date.now() - startTime;
            const data = JSON.parse(response._getData());

            // Assert
            expect(timeDifference).to.be.at.least(time);
            expect(response.statusCode).to.equal(status);
            expect(data.waitTime).to.equal(time);
            expect(data.status).to.equal(status);
        });

    });

    describe('errors', () => {
        it('should error if typeof waitTime is not number', () => {
            // Arrange
            const time = 'abc';
            const status = 418;
            const request = mock.createRequest({
                METHOD: 'POST',
                url: '/${time}/${status}',
                params: {
                    time,
                    status,
                }
            });
            const response = mock.createResponse();
            const next = spy();

            // Act
            wait(request, response, next);

            // Assert
            expect(response.statusCode).to.equal(500);
            expect(response._getData()).to.have.property(
                'error',
                'Invalid Request Format: /<timeout_in_miliseconds>/<status_code>'
            );
            expect(next.calledOnce).to.be.true;
        });

        it('should error if status is not in the allowed range', () => {
            // Arrange
            const time = 1000;
            const status = 'abc';
            const request = mock.createRequest({
                METHOD: 'POST',
                url: '/${time}/${status}',
                params: {
                    time,
                    status,
                }
            });
            const response = mock.createResponse();
            const next = spy();

            // Act
            wait(request, response, next);

            // Assert
            expect(response.statusCode).to.equal(500);
            expect(response._getData()).to.have.property(
                'error',
                'Invalid Request Format: /<timeout_in_miliseconds>/<status_code>'
            );
            expect(next.calledOnce).to.be.true;
        });

        it('should error if waitTime is null', () => {
            // Arrange
            const time = null;
            const status = 418;
            const request = mock.createRequest({
                METHOD: 'POST',
                url: '/${time}/${status}',
                params: {
                    time,
                    status,
                }
            });
            const response = mock.createResponse();
            const next = spy();

            // Act
            wait(request, response, next);

            // Assert
            expect(response.statusCode).to.equal(500);
            expect(response._getData()).to.have.property(
                'error',
                'Invalid Request Format: /<timeout_in_miliseconds>/<status_code>'
            );
            expect(next.calledOnce).to.be.true;
        });

        it('should error if status is null', () => {
            // Arrange
            const time = 1000;
            const status = null;
            const request = mock.createRequest({
                METHOD: 'POST',
                url: '/${time}/${status}',
                params: {
                    time,
                    status,
                }
            });
            const response = mock.createResponse();
            const next = spy();

            // Act
            wait(request, response, next);

            // Assert
            expect(response.statusCode).to.equal(500);
            expect(response._getData()).to.have.property(
                'error',
                'Invalid Request Format: /<timeout_in_miliseconds>/<status_code>'
            );
            expect(next.calledOnce).to.be.true;
        });
    });
});
