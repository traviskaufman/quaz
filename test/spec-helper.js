'use strict';
var path = require('path');
/**
 * Expose sinon globally
 */
global.sinon = require('sinon');
/**
 * Expose chai's assertion api globally
**/
global.assert = require('chai').assert;
/**
 * Expose a global reference to the base directory
 */
global.BASE_DIR = path.resolve(path.join(__dirname, '..'));
/**
 * Expose the directory where fixtures are stored globally
 */
global.FIXTURES_DIR = path.join(BASE_DIR, 'test', 'fixtures');
