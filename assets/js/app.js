// 'using' statements
import "babel-polyfill"
import fetch from "isomorphic-fetch"
import React, {Component} from 'react'
import {render} from 'react-dom'
import { Router, Route, Link, browserHistory, hashHistory } from 'react-router'
import * as BLUE from '@blueprintjs/core'

console.log(BLUE);

// Utility methods
// --------------
const log = (...a) => console.log(...a)

const get = (url) =>
    fetch(url, {credentials: 'same-origin'})
    .then(r => r.json())
    .catch(e => log(e))

const post = (url, data) => 
    fetch(url, { 
        method: 'POST',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .catch(e => log(e))
    .then(r => r.json())

const remove = (url, data) =>
    fetch(url, { 
        method: 'DELETE',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .delete(data)

const edit = (url, data) =>
    fetch(url, { 
        method: 'PUT',
        credentials: 'same-origin',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
    .catch(e => log(e))
    .return(r => r.json())

//------------

const Message = (message) =>
    <a className="message" href={`#/status/${message.id}`}>
            <p>{message.text}</p>
            <span>{message.handle}</span>
            <button className="editMessage">Edit Message</button>
            <button className="deleteMessage">Delete Message</button>
    </a>

const Error = () => <div>Page Not Found</div>

class Home extends Component {
    constructor(props){
        super(props)
        this.state = {
            items: []
        }
    }
    componentDidMount(){
        get('/api/chatroom').then(chatrooms => {
            chatrooms = chatrooms.reverse()
            this.setState({items: chatrooms})
        }).catch(e => log(e))
    }
    render(){
        return <div>
        <Nav />
        <Breadcrumbs />
        <hr />
        <div className="grid grid-3-600">
            {this.state.items.map(Chatroom)}
        </div>
        <a href="#/create" className="create-button"/>
        </div>
    }
}

class Chatroom extends Component {
    constructor(props){
        super(props)
        this.state = { id: props.params.id }
    }
    componentDidMount(){
        get('/api/chatroom'+this.state.id).then(x => {
            messages = messages.reverse()
            this.setState({items: messages})
        }).catch(e => log(e))
    }
    render() {
        return <div className="grid grid-3-600">
            <div>
                {this.state.items.map(Message)}
                <a href="#/EditMessage" className="edit-button"/>
                <a href="#/DeleteMessage" className="delete-button"/>
            </div>
            <a href="#/AddMessage" className="add-button"/>
        </div>
    }
}

class NewChat extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e){
        e.preventDefault()
        post('/api/chatroom', {
            name: this.refs.name.value,
            handle: this.refs.handle.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/$x.id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="compose-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
            </ul>
        }
    
    return <form className="create-screen" onSubmit={e => this.submit(e)}>

        {this.state.errors ? <p>There were errors with your chatroom submission:</p> : null}
        {err}

        <div>   
            <input ref="handle.name" type="text" placeholder="Your Handle Name" required />
            <textarea ref="name" placeholder="Chatroom Name" required></textarea>
            <input ref="user" type="text" placeholder="@username" required/>
        </div>
        <div>
            <button type="submit">Invite your friends to this Chatroom</button>
        </div>
        </form>
    }
}

class NewMessage extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e){
        e.preventDefault()
        post('/api/chatroom', {
            handle: this.refs.handle.value,
            text: this.refs.text.value,
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/$x.id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="post-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
            </ul>
        }
    
    return <form className="post-screen" onSubmit={e => this.submit(e)}>

        {this.state.errors ? <p>There were errors with your message submission:</p> : null}
        {err}

        <div>   
            <input ref="handle.name" type="text" placeholder="Your Handle Name" required />
            <textarea ref="text" placeholder="Your Message" required></textarea>
        </div>
        <div>
            <button type="submit">Send Message</button>
        </div>
        </form>
    }
}

class EditMessage extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e){
        e.preventDefault()
        edit('/api/chatroom', {
            handle: this.refs.handle.value,
            text: this.refs.text.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/$x.id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="edit-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
            </ul>
        }
    
    return <form className="edit-screen" onSubmit={e => this.submit(e)}>

        {this.state.errors ? <p>There were errors with your message edits:</p> : null}
        {err}

        <div>   
            <input ref="handle.name" type="text" placeholder="{$handle.name}" required />
            <textarea ref="name" placeholder="{$message.text}" required></textarea>
        </div>
        <div>
            <button type="submit">Save Changes</button>
        </div>
        </form>
    }
}

class DeleteMessage extends Component {
    constructor(props){
        super(props)
        this.state = {}
    }
    submit(e){
        e.preventDefault()
        remove('/api/chatroom', {
            handle: this.refs.handle.value,
            text: this.refs.text.value
        }).then(x => {
            if(!x.errors) window.location.hash = `#/status/$x.id}`

            this.setState({ errors: x.errors })
        }).catch(e => alert(e))
    }
    render(){
        var err
        if(this.state.errors){
            err = <ul className="remove-errors">
                {this.state.errors.map(x => <li>{x}</li>)}
            </ul>
        }
    
    return <form className="remove-screen" onSubmit={e => this.submit(e)}>

        {this.state.errors ? <p>There were errors with your message edits:</p> : null}
        {err}

        <div>
            <button type="submit">Delete Your Message</button>
        </div>
        </form>
    }
}

const Nav = () => 
    <nav className="pt-navbar pt-dark pt-fixed-top">
        <div className="pt-navbar-group pt-align-left">
            <div className="pt-navbar-heading">Blueprint</div>
            <input className="pt-input" placeholder="Search files..." type="text" />
        </div>
        <div className="pt-navbar-group pt-align-right">
            <button className="pt-button pt-minimal pt-icon-home">Home</button>
            <button className="pt-button pt-minimal pt-icon-document">Files</button>
            <span className="pt-navbar-divider"></span>
            <button className="pt-button pt-minimal pt-icon-user"></button>
            <button className="pt-button pt-minimal pt-icon-notifications"></button>
            <button className="pt-button pt-minimal pt-icon-cog"></button>
        </div>
    </nav>

const Breadcrumbs = () =>
    <ul className="pt-breadcrumbs">
        {["Home", "About", "Story"].map(x => 
            <li><BLUE.Breadcrumb text={x} /></li>
        )}
    </ul>



const Table = () => 
    <table className="pt-table pt-interactive pt-bordered">
        <thead>
            <th>Project</th>
            <th>Description</th>
            <th>Technologies</th>
        </thead>
        <tbody>
            <tr>
            <td>Blueprint</td>
            <td>CSS framework and UI toolkit</td>
            <td>Sass, TypeScript, React</td>
            </tr>
            <tr>
            <td>TSLint</td>
            <td>Static analysis linter for TypeScript</td>
            <td>TypeScript</td>
            </tr>
            <tr>
            <td>Plottable</td>
            <td>Composable charting library built on top of D3</td>
            <td>SVG, TypeScript, D3</td>
            </tr>
        </tbody>
    </table>

const reactApp = () => 
    render(
    <Router history={hashHistory}>
        <Route path="/" component={Home}/>
        <Route path="/create" component={NewChat}/>
        <Route path="/status/:id" component={ChatPage}/>
        <Route path="/add" component={NewMessage}/>
        <Route path="/edit" component={EditMessage}/>
        <Route path="/remove" component={DeleteMessage}/>
        <Route path="*" component={Error}/>
    </Router>,
    document.querySelector('.app'))

reactApp()

// Flow types supported (for pseudo type-checking at runtime)
// function sum(a: number, b: number): number {
//     return a+b;
// }
//
// and runtime error checking is built-in
// sum(1, '2');