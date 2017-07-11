/*
* Author : Mangal Singh
* Module : AuthsController
* Description : Use to register User on application
*/

const JwtService = require(APP_PATH + '/server/api/services/JwTokenService.js');
const UserModel = require(APP_PATH + '/server/api/models/UserModel.js');
const UserModelObj = new UserModel();

module.exports = {

     /**--------------------------------------------------------------------------
     Function    : register
     Description : use to register a user
     --------------------------------------------------------------------------*/
     register: function (req, res) {
          let name = req.body.name;
          let email = req.body.email;
          // let email = email1.toLowerCase();
          let password = req.body.password;
          console.log(req.body);
          if(!email){
               res.json({
                    status  : 'error',
                    message : 'Email field is required',
                    data    : {}
               });
          }

          if(!name){
               res.json({
                    status  : 'error',
                    message : 'Name field is required',
                    data    : {}
               });
          }

          if(!password){
               res.json({
                    status  : 'error',
                    message : 'Password field is required',
                    data    : {}
               });
          }

          UserModel.findOne({ email: email},(err, user) => {
               if(err) return res.json({ status: 'error', message: 'some error occured, Please try later.', data: {}});
               if(user){
                    res.json({
                         status: 'error',
                         message: "User is already registered with this email address, Please use new one.",
                         data: {}
                    });
               } else {
                    let newUser = UserModel({
                         name: name,
                         email: email,
                         password: password,

                    });
                    newUser.save((err, user) => {
                         if(err) return res.json({ status: 'error', message: 'some error occured, Please try later.', data: {} });
                         res.json({
                              status  : 'success',
                              message : "You are successfully registered to app ",
                              data : {
                                   id : user._id
                              }
                         });
                    });
               }

          })
     },




     /**--------------------------------------------------------------------------
     | Function    : login
     | Description : use to login user
     |--------------------------------------------------------------------------*/
     login: function (req, res) {
          let email = req.body.email;
          let password = req.body.password;
          if(!email){
               return res.json({status:'error', message : 'Please provide your email.', data : {} });
          }else{
               email = email.trim().toLowerCase();
          }

          if(!password){
               return res.json({status:'error', message : 'Please provide your password.',data : {} });
          }

          //let query = UserModel.findOne({email:email}, {"activated":1,"password" : 1, "isSubscribed": 1,"company" :1});
          let query = UserModel.findOne({email:email});
          query.exec(function(err, user) {
               if(err) return res.json({ status: 'error', message: 'some error occured, Please try again later.', data: {}});
               if(!user){
                    return res.json({status:'error', message : 'User not Exist ',data : {} });
               }else{
                    UserModelObj.comparePassword(password,user,function(err, validuser) {
                         if (err) {
                              return res.json({status:'error', message : 'some error occured, Please try again later.', data : {}});
                         }
                         if(!validuser){
                              return res.json( {status:'error', message :'You have entered wrong password.',data : {}});
                         }else {
                              return res.json({status:'success', message :'You have been successfully login.', data: {user:user,token:JwtService.issueToken(user._id)} });
                         }
                    });
               }
          });
     },

     /**--------------------------------------------------------------------------
     | Function    : User List
     | Description : use to get all user
     |--------------------------------------------------------------------------*/

     userList: function (req, res) {
          let query = UserModel.find({isDeleted:false});
          query.exec(function(err,userList){
               if(err){
                    return res.json({status : 'error', message : 'some error occured'})
               }else{
                    return res.json({status: 'success',message:'user list',data:  userList});
               }
          })

     },
     /**--------------------------------------------------------------------------
     | Function    : User Delete From List
     | Description : use to delete the user
     |--------------------------------------------------------------------------*/

     deleteUser: function (req, res) {
          let reqId = req.query.id;
          console.log(req.query)
          UserModel.findOneAndUpdate({'_id':reqId},{isDeleted : true},{new : true}).exec(function(err,user){
               if(err){
                    return res.json({status : 'error', message : 'some error occured'})
               }else{
                    if(user) {
                         return res.json({status: 'success',message:'user is deleted succefully',data:{id :user._id }});
                    } else {
                         return res.json({status: 'success',message:'Unable to delete'});
                    }
               }
          })

     },
     /**--------------------------------------------------------------------------
     | Function    : User Delete From List
     | Description : use to delete the user
     |--------------------------------------------------------------------------*/

     userProfile: function (req, res) {
          let reqId = req.query.id;

          UserModel.findOne({'_id':reqId}).exec(function(err,user){
               if(err){
                    return res.json({status : 'error', message : 'some error occured'})
               }else{
                    if(user) {
                         return res.json({status: 'success',message:'user profile',data:user});
                    } else {
                         return res.json({status: 'success',message:'User Not Available'});
                    }
               }
          })

     },
     /**--------------------------------------------------------------------------
     | Function    : User Delete From List
     | Description : use to delete the user
     |--------------------------------------------------------------------------*/
     updateProfile: function (req, res) {
          let multiparty = require('multiparty');
          let fs = require('fs');
          let form = new multiparty.Form();
          form.parse(req, (err, fields, files) => {
               let name = fields.name[0];
               let reqId = fields.id[0];
               let uploadDir = "/images/"
               //console.log(fields,"===========================",files);return;
               let imgArr = [];
               //if(files.imageFile && files.imageFile.length) {
               //     for(var key in files.imageFile){
               let {path: tempPath, originalFilename} = files.imageFile[0];
               let copyToPath = "server/static"+ uploadDir + originalFilename;
               fs.readFile(tempPath, function (err, data) {
                    fs.writeFile(copyToPath, data, function (err, data) {
                         let imgObj = {};
                         imgObj['name'] = originalFilename;
                         imgObj['path'] = uploadDir+originalFilename;
                         UserModel.update({'_id':reqId},{$push :{ 'profilePic' : imgObj }},
                         {upsert : false})
                         .exec(function(err,user){
                              if(err){
                                   console.log(err);

                              }else{
                                   if(user) {
                                        console.log("Uploaded Successfully");

                                   } else {

                                   }
                              }
                         })
                    });
               });

               UserModel.findOneAndUpdate({'_id':reqId},{name : name}).exec(function(err,user){
                    if(err){
                         return res.json({status : 'error', message : 'some error occured'})
                    }else{
                         if(user) {
                              return res.json({status: 'success',message:'user is Updated succefully',data:user });
                         } else {
                              return res.json({status: 'success',message:'User is not updated'});
                         }
                    }
               })
               // delete temp image
               // fs.unlink(tempPath, () => {
               //   console.log(copyToPath); return;
               //           res.send("File uploaded to: " + copyToPath);
               //      });


          })

     },
}
