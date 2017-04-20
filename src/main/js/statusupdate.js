/**
 * Created by ethan on 2017-02-06.
 */

import React from 'react';

var StatusComponent = React.createClass({

    // Used to initialize state
    getInitialState () {
        return {
            name : "",
            status : "",
            success : ""
        }
    },

    handleNameChange (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ name : e.target.value , success : "..."});
    },

    handleStatusChange (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ status : e.target.value  , success : "..."});
    },

    handleSubmit(e) {
        // Prevents reinitialization
        e.preventDefault();
        let name = this.state.name;
        let status = this.state.status;
        fetch('http://localhost:8080/statusPost/postStatus?'
            + 'userName=' + name + "&statusText=" + status, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({success: 'Yes!'});
            }
            else{
                this.setState({success: 'No...'});
            }
        })
    },

    // what you see
    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" defaultValue={this.state.name} onChange={this.handleNameChange}/>
                        <input type="text" defaultValue={this.state.status} onChange={this.handleStatusChange}/>
                    </label>
                    <input type="submit" value="Post Status!" />
                </form>
                Name: {this.state.name}
                <br/>
                Status: {this.state.status}
                <br/>
                Success: {this.state.success}
            </div>
        );
    }
});

export class StatusUpdate extends React.Component{
    render(){
        return(
            <div>
                <StatusComponent/>
            </div>
        );
    }
}