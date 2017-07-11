import React from "react"
import { connect } from "react-redux"
import { fetchUser } from "../actions/userAction"
import Header from './header/header';
import Footer from './footer/footer';
import "../main.css";
export default class Layout extends React.Component {
       render() {
          return (
             <div>
             <div id="wrap">
              <Header/>
             {this.props.children}
               </div>
               <br/> <br/>
           <Footer />
             </div>
          );
       }
  }
