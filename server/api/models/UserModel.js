/*
* Author : Mangal Singh
* Module : UserModel
* Description : Use for User Info
*/
let mongoose = require('mongoose');
let Schema = mongoose.Schema;
let ObjectId = Schema.ObjectId;

const
bcrypt=require('bcrypt-nodejs'),
SALT_WORK_FACTOR = 10;

let modelSchema = new Schema({
     name : { type: String, required: true},
     email: { type: String, required: true, unique: true },
     password: { type: String, required: true },

     activated: { type: Boolean, default: false },
     profilePic :[],
    isDeleted: {
          type: Boolean,
          enum : [true, false],
          default: false
     },
     createdDate:{type:Date, default: Date.now},
     modifiedDate:{type:Date, default: Date.now}
});
modelSchema.pre('save', function(next) {
     var user = this;
     // only hash the password if it has been modified (or is new)
     if (!user.isModified('password')) return next();
     // generate a salt
     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
          if (err) return next(err);

          // hash the password using our new salt
          bcrypt.hash(user.password, salt, null,function(err, hash) {
               if (err) return next(err);

               // override the cleartext password with the hashed one
               user.password = hash;
               next();
          });
     });
});

modelSchema.pre('beforeUpdate',function(values, next) {
     bcrypt.genSalt(10, function(err, salt) {
          if (err) return next(err);
          if (values.password) {
               //code
               bcrypt.hash(values.password, salt, function(err, hash) {
                    if (err) return next(err);
                    values.password = hash;
                    next();
               });
          }
          else{
               next();

          }

     });
})

modelSchema.methods.comparePassword = function(password, user, cb) {
     //console.log(password);
     //console.log("User======",user);return;
     bcrypt.compare(password, user.password, function(err, match) {
          if (err) cb(err);
          if (match) {
               cb(null, true);
          } else {
               cb(err);
          }
     });
};

modelSchema.set('toObject', { virtuals: true });
modelSchema.set('toJSON', { virtuals: true });

let modelObj = mongoose.model('User', modelSchema);
module.exports = modelObj;
