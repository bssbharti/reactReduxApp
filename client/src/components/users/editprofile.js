import React from 'react';
import * as UserAction from "../../actions/userAction";
import { connect } from "react-redux";

class UserProfileEdit extends React.Component {
     constructor(props){
          super(props);
          this.userId =  this.getParamsId();
          this.handleChange = this.handleChange.bind(this);
          this.handleImageChange = this.handleImageChange.bind(this);
          // this.props.dispatch(UserAction.getUser(this.userId));
          this.props.getUser(this.userId);
          setTimeout(() => {
               console.log(this.props);
          }, 3000);
     }
     getParamsId(){
          return this.props.params.id;
     }

     handleChange(e){
          e.preventDefault();
          // this.editName.value = e.target.value;
          this.props.updateTempName(e.target.value);
     }
     handleImageChange(e) {
        e.preventDefault();
        let reader = new FileReader();
        let files = e.target.files;
        var file = [];
        for (var key in files) {
            if (files.hasOwnProperty(key) && files[key]) {
               file.push(files[key]);
            }
        }
        this.setState({images: file});
      }
     updateProfile(e){
          e.preventDefault();
           let name = this.refs.name.value;
           let user = {};
           user['id'] = this.userId;
           user['name'] = name;
           user['image'] = this.state.images
           this.props.updateProfile(user);
     }
     render(){
          return (
               <div className="container">
                    <h1 className="head1">{name}</h1>
                    <div className="container">
                         <form onSubmit={this.updateProfile.bind(this)} encType="multipart/form-data">
                              {this.props.tempName}
                              <input type="text" className="form-control" onChange={this.handleChange} placeholder="Name" value={this.props.tempName} ref="name" />
                              <input type="file" className="form-control"  placeholder="Image Upload" ref='image' onChange={this.handleImageChange} multiple/>
                              <br/>
                              <input type="submit" className="btn btn-success btn-lg" value="Update" />
                         </form>
                    </div>
               </div>
          )
     }
}

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.users.user,
    tempName: state.users.tempName
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    getUser: userId => dispatch(UserAction.getUser(userId)),
    updateTempName: name => dispatch(UserAction.updateTempName(name)),
     updateProfile: user => dispatch(UserAction.updateProfile(user))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileEdit);
