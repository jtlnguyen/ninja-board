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
 * The Level model module.
 * @module model/Level
 * @version 2.0.0
 */
class Level {
    /**
     * Constructs a new <code>Level</code>.
     * @alias module:model/Level
     * @param name {module:model/Level} 
     * @param minimumScore {Number} The minimum point needed to be at that level
     */
    constructor(name, minimumScore) { 
        
        Level.initialize(this, name, minimumScore);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, name, minimumScore) { 
        obj['name'] = name;
        obj['minimumScore'] = minimumScore;
    }

    /**
     * Constructs a <code>Level</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Level} obj Optional instance to populate.
     * @return {module:model/Level} The populated <code>Level</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Level();

            if (data.hasOwnProperty('name')) {
                obj['name'] = Level.constructFromObject(data['name']);
            }
            if (data.hasOwnProperty('minimumScore')) {
                obj['minimumScore'] = ApiClient.convertToType(data['minimumScore'], 'Number');
            }
        }
        return obj;
    }


}

/**
 * @member {module:model/Level} name
 */
Level.prototype['name'] = undefined;

/**
 * The minimum point needed to be at that level
 * @member {Number} minimumScore
 */
Level.prototype['minimumScore'] = undefined;






export default Level;

