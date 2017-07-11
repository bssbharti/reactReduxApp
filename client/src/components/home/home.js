// ************ Container className *******
import React from 'react';
import { Link } from 'react-router';

class Home extends React.Component {
     constructor(props){
          super(props)
     }
     render() {
          return (
               <div className="center-container">
                    <div className="center-row">
                         <div className="container">
                              <h1 className="head1">Hii Mangal How are you</h1>
                         </div>
                    </div>
               </div>
          );
     }
}

module.exports = Home;
