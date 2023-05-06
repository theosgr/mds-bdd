import chai from 'chai';
import chaiHttp from 'chai-http';
import { When, Then } from '@cucumber/cucumber';
import { StatusCodes } from 'http-status-codes';
import api from '../../index.js';
import moment from 'moment';

// IMPORTANT : For Cucumber working, always use function () {}
// (never () => {})

chai.use(chaiHttp);

Then('I should have response {string}', function(expectedStatusCode) {
  chai.expect(this.response).to.have.status(StatusCodes[expectedStatusCode]);
});

When('I get the {string}', async function(type) {
  const res = await chai.request(api).get(`/${type}`);
  this.response = res;
});

When('I get the {string} having id {string}', async function(type, id) {
  const res = await chai.request(api).get(`/${type}s/${id}`);
  this.response = res;
});

When('I get the {string} having id {string} in orders', async function(type, id) {
  const res = await chai.request(api).get(`/orders/${type}s/${id}`);
  this.response = res;
});

When('I list all {string}', async function(type) {
  const res = await chai.request(api).get(`/${type}`);
  this.response = res;
});

When('I create the following {string}:', async function (type, dataTable) {
  const res = await chai.request(api).post(`/${type}s`).send(dataTable.hashes()[0]);
  this.response = res;
});

When('I update the {string} having id {string} with following data:', async function (type, id, dataTable) {
  const res = await chai.request(api).put(`/${type}s/${id}`).send(dataTable.hashes()[0]);
  this.response = res;
});

When('I delete the {string} having id {string}', async function(type, id) {
  const res = await chai.request(api).delete(`/${type}s/${id}`);
  this.response = res;
});

Then(/following ["a-zA-Z]+ list:/, function(expectedData) {
  chai.expect(this.response.body).to.deep.equal({
    data: expectedData.hashes()
  });
});

Then(/following new ["a-zA-Z]+ item:/, function(expectedData) {
  const {id, ...responseData} = this.response.body.data;
  chai.expect(responseData).to.deep.equal(expectedData.hashes()[0]);
  chai.expect(id).to.have.lengthOf(36);
});

Then(/following ["a-zA-Z]+ item:/, function(expectedData) {
  chai.expect(this.response.body).to.deep.equal({
    data: expectedData.hashes()[0]
  });
});

Then(/following ["a-zA-Z]+ item datas updated:/, function(expectedData) {
  const orderData = this.response.body.data;
  chai.expect(orderData).to.deep.equal(expectedData.hashes()[0]);
});

Then(/following deleted ["a-zA-Z]+ item:/, function(expectedData) {
  chai.expect(this.response.body).to.deep.equal({
    meta: {
      _deleted: expectedData.hashes()[0]
    }
  });
});

Then('following error : {string}', function(expectedError) {
  chai.expect(this.response.body).to.deep.equal({
    error: expectedError
  });
});

Then('following log info : {string}', function(expectedLogInfo) {
  chai.expect(this.response.body).to.deep.equal({
    logInfo: expectedLogInfo
  });
});


