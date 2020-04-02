import React from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

class PostShow extends React.Component{
    constructor(){
        super()
        this.state={
             user:{},
             posts:[],
             comments:[]
        }
    }

    componentDidMount()
    {
        
        const userId=this.props.match.params.userId
        axios.get(`http://jsonplaceholder.typicode.com/users/${userId}`)
        .then(response=>{
            const users=response.data
            console.log(users)
            this.setState({users})
        })
        axios.get(`http://jsonplaceholder.typicode.com/posts?id=${userId}`)
        .then(response=>{
            const posts=response.data
            console.log(posts)
            this.setState({posts})
        })

        axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${userId}`)
        .then(response=>{
            const comments=response.data
            console.log(comments)
            this.setState({comments})
        })

        .catch(err=>{
            console.log(err)
        })
    }

    render(){
        return(
            <div>
                <h2>USER NAME:{this.state.user.name}</h2>
                <h2>TITLE :-
                    {
                        this.state.posts.map(ele=>{
                            return ele.title
                        })
                    }
                </h2>
                <h2>BODY:-
                    {
                        this.state.posts.map(ele=>{
                            return ele.body
                        })
                    }
                </h2>
                <hr/>
                <h2>Comments:</h2>
                <ul>
                    {
                        this.state.comments.map((ele,i)=>{
                        return (<li key={i}>{ele.body}</li>)
                        })
                    }
                </ul><hr/>
            </div>
        )
    }
}

export default PostShow