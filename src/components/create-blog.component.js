import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

export default class CreateBlog extends Component {
    constructor(props) {
        super(props);

        /** Setting the initial state of the component by assigned an object to this.state **/
        this.state={
            blog_description: '',
            blog_title: '',
            blog_date: moment().format("DD/MM/YYYY"),
        };

        /** Ensure to bind our methods to this by adding them here **/
        this.onChangeBlogDescription = this.onChangeBlogDescription.bind(this);
        this.onChangeBlogTitle = this.onChangeBlogTitle.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    /** Methods which can be used to update the state properties **/
    onChangeBlogDescription(e) {
        this.setState({
            blog_description: e.target.value
        });
    }
    onChangeBlogTitle(e) {
        this.setState({
            blog_title: e.target.value
        });
    }


    /** Method to handle the submit event of the form **/
    onSubmit(e) {
        e.preventDefault(); //ensure that the default HTML form submit behaviour is prevented

        console.log(`Form submitted:`);
        console.log(`Blog Description: ${this.state.blog_description}`);
        console.log(`Blog Title: ${this.state.blog_title}`);
        console.log(`Blog Date: ${this.state.blog_date}`);

        const newBlog = {
            blog_description: this.state.blog_description,
            blog_title: this.state.blog_title,
            blog_date: this.state.blog_date,
        };

        axios.post('http://localhost:4000/blogs/add', newBlog)
            .then(res => console.log(res.data));

        // Reset the Values.
        this.setState({
            blog_description: '',
            blog_title: '',
            blog_date: moment().toDate,
        })
    }

    // JSX code which is needed to display the form
    render() {
        return (
            <div style={{marginTop: 10}}>
                <h3>Create New Blog</h3>
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Content: </label>
                        <textarea className="form-control" rows="10" cols="50" name="description" form="usrform" value={this.state.blog_description} onChange={this.onChangeBlogDescription}>
                            Enter text here...
                        </textarea>
                    </div>
                    <div className="form-group">
                        <label>Title: </label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.blog_title}
                            onChange={this.onChangeBlogTitle}
                        />
                    </div>
                    <div className="form-group">
                        <input type="submit" value="Create Blog" className="btn btn-primary myBTN" />
                    </div>
                </form>
            </div>
        )
    }
}