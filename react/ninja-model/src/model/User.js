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
 * The User model module.
 * @module model/User
 * @version 2.0.0
 */
class User {
    /**
     * Constructs a new <code>User</code>.
     * @alias module:model/User
     * @param username {String} The user's Red Hat Kerberos ID.
     */
    constructor(username) { 
        
        User.initialize(this, username);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj, username) { 
        obj['username'] = username;
    }

    /**
     * Constructs a <code>User</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/User} obj Optional instance to populate.
     * @return {module:model/User} The populated <code>User</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new User();

            if (data.hasOwnProperty('displayName')) {
                obj['displayName'] = ApiClient.convertToType(data['displayName'], 'String');
            }
            if (data.hasOwnProperty('username')) {
                obj['username'] = ApiClient.convertToType(data['username'], 'String');
            }
            if (data.hasOwnProperty('githubUsername')) {
                obj['githubUsername'] = ApiClient.convertToType(data['githubUsername'], 'String');
            }
            if (data.hasOwnProperty('trelloUsername')) {
                obj['trelloUsername'] = ApiClient.convertToType(data['trelloUsername'], 'String');
            }
            if (data.hasOwnProperty('email')) {
                obj['email'] = ApiClient.convertToType(data['email'], 'String');
            }
        }
        return obj;
    }


}

/**
 * The name displayed to all users of the system. Typically the users first and last name.
 * @member {String} displayName
 */
User.prototype['displayName'] = undefined;

/**
 * The user's Red Hat Kerberos ID.
 * @member {String} username
 */
User.prototype['username'] = undefined;

/**
 * The user's Github username.
 * @member {String} githubUsername
 */
User.prototype['githubUsername'] = undefined;

/**
 * The user's Trello username.
 * @member {String} trelloUsername
 */
User.prototype['trelloUsername'] = undefined;

/**
 * The Red Hat email associated with the user.
 * @member {String} email
 */
User.prototype['email'] = undefined;






export default User;

