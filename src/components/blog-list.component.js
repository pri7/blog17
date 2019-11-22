import React, { Component } from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom';
import MyModal from './MyModal';
const Blog = props => (
    <tr>
        <td><div style={{fontSize:"16px", fontWeight:"600"}}>{props.blog.blog_title}</div></td>
        <td><div style={{fontSize:"14px", fontWeight:"400"}}>{props.blog.blog_description.slice(0,20)}</div></td>
        <td><div style={{fontSize:"14px", fontWeight:"400"}}>{props.blog.blog_date}</div></td>
        <td>
            <div className="action">
                <button onClick={()=>deleteBlog(props.blog._id,props.deletedBlog)}>
                    <span className="glyphicon glyphicon-trash"></span>
                </button>

                <MyModal title={props.blog.blog_title} blogD={props.blog.blog_description} date={props.blog.blog_date}/>
            </div>
        </td>
    </tr>
);
const deleteBlog=(id, deletedBlog)=>{
    axios.post("http://localhost:4000/blogs/delete",{
        id: id
    })
        .then(response => {
            console.log(response);
            deletedBlog(id);
        })
        .catch(function (error){
            console.log(error);
        })
}

export default class TodosList extends Component {
    constructor(props) {
        super(props);
        // initialize the state with an empty todos array
        this.state = {blogs: []};
        this.deletedBlog=this.deletedBlog.bind(this);
        this.blogList=this.blogList.bind(this);
    }
    deletedBlog=(id)=>{
        let newBlogs=this.state.blogs.filter(data => id !== data._id);
        this.setState({
            blogs:newBlogs
        })
    }

    // To retrieve the todos data from the database --> use the componentDidMount lifecycle method
    componentDidMount() {
        axios.get('http://localhost:4000/blogs/')
            .then(response => {
                console.log(response);
                this.setState({ blogs: response.data });
            })
            .catch(function (error){
                console.log(error);
            })
    }

    blogList=()=> {
        return this.state.blogs.map((currentBlog, i)=>{
            return <Blog blog={currentBlog} key={i} deletedBlog={this.deletedBlog}/>;
        })
    }

    render() {
        return (
            <div>
                <h3>Blog List</h3>
                <table className="table table-striped" style={{ marginTop: 20 }} >
                    <thead>
                        <tr>
                            <th><h3>Title</h3></th>
                            <th><h3>Description</h3></th>
                            <th><h3>Date</h3></th>
                            <th><h3>Action</h3></th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.blogList() }
                    </tbody>
                </table>
            </div>
        )
    }
}