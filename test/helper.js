var request = require("supertest")
var app = require("../src/index")
var chai = require("chai");

global.app = app;
global.expect = chai.expect;
global.assert = chai.assert
