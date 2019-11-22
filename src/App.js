import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import './App.css';

import CreateBlog from "./components/create-blog.component";
import BlogList from "./components/blog-list.component";

import logo from "./logo.png";

class App extends Component {
  render() {
    return (
        <Router>
            <div className="container-fluid">
                <nav className="navbar navbar-expand-lg navbar-inverse bg-dark">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <a className="navbar-brand" href="#"  rel="noopener noreferrer">
                                <img src={logo} width="30" height="30" alt="CodingTheSmartWay.com" />
                            </a>
                            <span className="myBrand">
                                 <Link to="/" className="navbar-brand" >Blog App</Link>
                            </span>
                        </div>
                        <ul className="navbar-nav navbar-right">
                            <li className="navbar-item">
                                <button type="button" class="btn btn-success mr-3 myBTN">
                                    <Link to="/" className="nav-link">Blogs</Link>
                                </button>
                            </li>
                            <li className="navbar-item">
                                <button type="button" class="btn btn-success myBTN">
                                    <Link to="/create" className="nav-link">New Blog</Link>
                                </button>
                            </li>
                        </ul>
                    </div>
                </nav>
                <br/>
                <Route path="/" exact component={BlogList} />
                <Route path="/create" component={CreateBlog} />
            </div>
        </Router>
    );
  }
}

export default App;
