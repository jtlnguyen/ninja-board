/**
 * Giveback Ninja
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD.
    define(['expect.js', process.cwd()+'/src/index'], factory);
  } else if (typeof module === 'object' && module.exports) {
    // CommonJS-like environments that support module.exports, like Node.
    factory(require('expect.js'), require(process.cwd()+'/src/index'));
  } else {
    // Browser globals (root is window)
    factory(root.expect, root.GivebackNinja);
  }
}(this, function(expect, GivebackNinja) {
  'use strict';

  var instance;

  beforeEach(function() {
    instance = new GivebackNinja.DefaultApi();
  });

  var getProperty = function(object, getter, property) {
    // Use getter method if present; otherwise, get the property directly.
    if (typeof object[getter] === 'function')
      return object[getter]();
    else
      return object[property];
  }

  var setProperty = function(object, setter, property, value) {
    // Use setter method if present; otherwise, set the property directly.
    if (typeof object[setter] === 'function')
      object[setter](value);
    else
      object[property] = value;
  }

  describe('DefaultApi', function() {
    describe('createUser', function() {
      it('should call createUser successfully', function(done) {
        //uncomment below and update the code to test createUser
        //instance.createUser(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('levelGet', function() {
      it('should call levelGet successfully', function(done) {
        //uncomment below and update the code to test levelGet
        //instance.levelGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('scorecardGet', function() {
      it('should call scorecardGet successfully', function(done) {
        //uncomment below and update the code to test scorecardGet
        //instance.scorecardGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('scorecardUsernameGet', function() {
      it('should call scorecardUsernameGet successfully', function(done) {
        //uncomment below and update the code to test scorecardUsernameGet
        //instance.scorecardUsernameGet(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
    describe('scorecardUsernamePoolPost', function() {
      it('should call scorecardUsernamePoolPost successfully', function(done) {
        //uncomment below and update the code to test scorecardUsernamePoolPost
        //instance.scorecardUsernamePoolPost(function(error) {
        //  if (error) throw error;
        //expect().to.be();
        //});
        done();
      });
    });
  });

}));
