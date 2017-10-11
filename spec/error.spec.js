'use strict';

const mock = require('node-mocks-http');

const { spy } = require('sinon');

const { expect } = require('chai');

const error = require('../src/error');

describe('error', () => {
    let response;
    let request;
    let next;

    beforeAll(() => {
        // Arrange
        request = mock.createRequest({
            method: 'GET',
            url: '/',
        });
        response = mock.createResponse();
        next = spy();

        // Act
        error(request, response, next);
    });

    it('should response with 500', () => {
        // Assert
        expect(response.statusCode).to.equal(500);
    });

    it('should response with an error message', () => {
        // Assert
        expect(JSON.parse(response._getData())).to.have.property(
            'error',
            'Invalid Request Format: /timeout_in_miliseconds/status_code'
        );
    });

    it('should call next', () => {
        // Assert
        expect(next.calledOnce).to.be.true;
    });
});
