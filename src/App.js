import React from 'react'
import Home from './Home'
import UserList from './UserList'
import UserShow from './UserShow'
import PostList from './PostList'
import PostShow from './PostShow'
import {BrowserRouter,Route,Link } from 'react-router-dom'


function App(props) {
    return(
         <BrowserRouter>
            <div>
             <Link to='/'>Home |</Link>
             <Link to='/userlist'>User |</Link>
             <Link to='/postlist'>Post</Link>
             
             <Route path='/' component={Home} exact={true} />
             <Route path='/userlist' component={UserList} exact={true}/>
             <Route path='/userslist/:userId' component={UserShow} />
             <Route path='/postlist' component={PostList} exact={true}/>
             <Route path='/post/:userId' component={PostShow} />
            </div>
        </BrowserRouter>
    )
}
export default App