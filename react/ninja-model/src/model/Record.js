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

import ApiClient from '../ApiClient';

/**
 * The Record model module.
 * @module model/Record
 * @version 2.0.0
 */
class Record {
    /**
     * Constructs a new <code>Record</code>.
     * @alias module:model/Record
     * @param level {String} The level attained by the user for a period
     * @param score {Number} Points cumulated by a user during a period
     */
    constructor(level, score) { 
        
        Record.initialize(this, level, score);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, level, score) { 
        obj['level'] = level;
        obj['score'] = score;
    }

    /**
     * Constructs a <code>Record</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Record} obj Optional instance to populate.
     * @return {module:model/Record} The populated <code>Record</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Record();

            if (data.hasOwnProperty('level')) {
                obj['level'] = ApiClient.convertToType(data['level'], 'String');
            }
            if (data.hasOwnProperty('score')) {
                obj['score'] = ApiClient.convertToType(data['score'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * The level attained by the user for a period
 * @member {String} level
 */
Record.prototype['level'] = undefined;

/**
 * Points cumulated by a user during a period
 * @member {Number} score
 */
Record.prototype['score'] = undefined;






export default Record;

