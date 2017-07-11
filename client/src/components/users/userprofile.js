import React from 'react';
import { getUser }  from "../../actions/userAction";
import { connect } from "react-redux";
@connect((store) => {
     //console.log(store);
     return {
          user: store.users.user,
     };
})
class UserProfile extends React.Component {
     constructor(props){
          super(props);
          this.userId =  this.getParamsId();
     }
     getParamsId(){
          return this.props.params.id;
     }
     componentDidMount(){
          this.props.dispatch(getUser(this.userId))
     }

     render(){
          const { data } = this.props.user;
          let name = null;
          let email = null;
          let profileUrl = null;
          if(data){
               name = data.name;
               email = data.email;
               profileUrl = data.profilePic;
          }
     let imagePreview = null;
     if(profileUrl && profileUrl != null){
     imagePreview = profileUrl.map( (profile,index) => {
           let imgPath = profile.path
          return (
               <div className="col-lg-3 col-md-4 col-xs-6 thumb" key={index} >
                             <a className="thumbnail" href="#">
                                 <img className="img-responsive" src={imgPath} alt="" />
                            </a>
               </div>
          );
     });
}
     return (
               <div className="container">
                    <h1 className="head1">{name}</h1>
                    <div className="container">
                         Hi My email id is : {email}
                    </div>
          <div className="row">
           <div className="col-lg-12">
              <h1 className="page-header">All Upload images</h1>
            </div>
               {imagePreview}
               </div>
          </div>
          )
     }
}
module.exports = UserProfile;
