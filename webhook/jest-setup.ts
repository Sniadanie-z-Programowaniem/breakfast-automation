// const nock = require('nock');
import nock from 'nock';

module.exports = () => {
    nock.disableNetConnect();
};
