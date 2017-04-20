import React from 'react';


var Account = React.createClass({

    // Used to initialize state
    getInitialState () {
        return {
            name : "",
            message : "",
        }
    },

    render () {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input type="text" defaultValue={this.state.name} onChange={this.handleNameChange}/>
                    </label>
                    <input type="submit" value="Create Account" />
                </form>
                Name: {this.state.name}
                <br/>
                Message: {this.state.message}
                <br/>
            </div>
        );
    },

    handleSubmit(e) {
        // Prevents reinitialization
        e.preventDefault();
        let name = this.state.name;
        fetch('http://localhost:8080/accountCreation/createAccount?' + 'userName=' + name , {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            }
        }).then(res =>{
            if(res.ok){
                this.setState({message: 'Yes!'});
            }
            else{
                this.setState({message: name + " is already taken"});
            }
        })
    },

    handleNameChange (e) {
        // Prevent following the link.
        e.preventDefault();
        this.setState({ name : e.target.value , message : "..."});
    },

});



export class AccountCreation extends React.Component {

    constructor() {
        super();
    }


    render() {
        return(
            <div>
                <Account/>
            </div>
        );
    }
}
