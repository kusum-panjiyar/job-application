import React from 'react'
import {BrowserRouter, Route, Link} from 'react-router-dom'
import ApplicationForm from './ApplicationForm'
import AdminDashboard from './AdminDashboard'

function App(props){
    return (
        <BrowserRouter>
           <div className='container'>
               <h1>User job Application</h1>
               <Link to='/'>ApplicationForm |</Link>
               <Link to='/admin'>AdminDashbord</Link>

               <Route path='/' component={ApplicationForm} exact={true} />
               <Route path='/admin' component={AdminDashboard} />
            </div>
        </BrowserRouter>
    )
}

export default App