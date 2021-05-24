const mongooseDelete = require('mongoose-delete');
const mongooseHidden = require('mongoose-hidden');
const { Schema, SchemaTypeOptions } = require('mongoose');

module.exports = (modelNames,schema,options={hidden:Object,hardDelete:Boolean} ={}) => {
    if (!options.enableHardDelete) {
        schema.plugin(mongooseDelete, { 
            overrideMethods: true,
        })

    }
}