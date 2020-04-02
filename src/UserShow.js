import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class UserShow extends React.Component {
    constructor(){
        super()
        this.state={
            users:{},
            posts:[]
        }
    }
    componentDidMount(){
        const userId = this.props.match.params.userId;
        console.log("Hello");
        axios.get(`http://jsonplaceholder.typicode.com/users/${userId}`)
        .then((response)=>{
            const users = response.data
            this.setState({users})
        })
        .catch((err)=>{
            console.log(err)
        })
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
       .then((response)=>{
           const posts = response.data
           this.setState({posts})
           
       })
       .catch((err)=>{
           console.log(err)
       })
    }
   
    render() {
        return (
            <div> 
                <h2>USER NAME: {this.state.users.name}</h2>
                <p>POST WRITTEN BY USER </p>
                <ul>
                    {
                        this.state.posts.map((ele,i)=>{
                        return (<li key={i}><Link to={`/users/${ele.id}`}>{ele.title}</Link></li>)
                        })
                    }
                </ul>
            </div> 
        )
    }
}

export default UserShow