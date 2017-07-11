import React from 'react';
import {Link} from 'react-router'
import { connect } from "react-redux"
import * as UserAction  from "../../actions/userAction"
var EventEmitter = require('events').EventEmitter;
var globalEmitter = module.exports = new EventEmitter();
const events  = events || globalEmitter;

@connect((store) => {
     return {
          users: store.users.users,
     };
})
class UserList extends React.Component{
     constructor(props){
          super(props)
          this.getUserList = this.getUserList.bind(this)
     }
     componentDidMount() {
          this.getUserList();
     }
     componentWillMount(){
          events.on('change',this.getUserList)
     }
     getUserList(){
          this.props.dispatch(UserAction.fetchUser());
     }
     deleteUser(e){
          e.preventDefault();
          this.props.dispatch(UserAction.deleteUser(e.target.value));
          events.emit('change');
     }

     render(){

          const  {users} = this.props;
          const { data } = users;
          let userList= null;
          if(data){
               userList = data.map((user,index) => {
                    return  (
                         <tr key={user._id}>
                              <td>{index+1}</td>
                              <td>{user.name}</td>
                              <td>{user.email}</td>
                              <td><Link className="btn btn-primary" to={"/edit/"+ user._id}>Edit</Link></td>
                              <td><Link className="btn btn-primary" to={"/profile/"+ user._id}>View</Link></td>
                              <td><button className="btn btn-danger" value ={user.id} onClick= {this.deleteUser.bind(this)}>Delete</button></td>
                         </tr>
                    )
               });
          }
          return (
               <div className="container table-responsive">
                    <h2>User List</h2>
                    <p>List of All the Register Users</p>
                    <table className="table table-striped table-bordered">
                         <thead>
                              <tr>
                                   <td><b>Sr No</b></td>
                                   <td><b>Name</b></td>
                                   <td><b>Email</b></td>
                                   <td><b>Edit</b></td>
                                   <td><b>View</b></td>
                                   <td><b>Delete</b></td>
                              </tr>
                         </thead>
                         <tbody>
                              {userList}
                         </tbody>
                    </table>
               </div>
          )
     }

}

module.exports = UserList;
