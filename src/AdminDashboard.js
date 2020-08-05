import React from 'react'
import moment from 'moment'
import axios from './config/axios'

class AdminDashboard extends React.Component{
    constructor(){
        super()
        this.state = {
            candidates: [],
            jobTitle:['Front-End Developer', 'Node.js Developer', 'MEAN Stack Developer', 'FULL Stack Developer'],
            selectedJob: 'Front-End Developer'
        }
    }

    componentDidMount() {
        axios.get('/users/application-forms')
        .then((response) => {
            console.log(response.data)
            const candidates = response.data
            this.setState({candidates  })
        })
        .catch((err) => {
            console.log(err)
        }) 
    }

    changeTitle = (title) =>{
        this.setState({selectedJob: title})
    }

    handleViewDetails = (id) => {
        axios.get(`/users/application-form/${id}`)
        .then((response) => {
            //console.log(response.data)
            const candidate = response.data
            alert(`${candidate.name} - ${candidate.email} - ${candidate.phone}`)
        })
    }

    handleStatus = (id,status) => {
          axios.put(`/users/application-form/update/${id}`,{status})
          .then((response) => {
              //console.log(response.data)
              const candidate = response.data
              alert(`candidate has been ${candidate.status}`)
              this.setState(prevState => ({
                  candidates: prevState.candidates.map(cand => {
                     if(cand._id === candidate._id) {
                         return {...candidate}
                     } 
                     else {
                         return {...candidate}
                     }
                  })
              }))
          } )
          .catch((err)=>{
              console.log(err)
          })
    }

    render(){
        return(
            <div>
                <h2>Admin Dashboard</h2>
            
                {
                    this.state.jobTitle.map((title,i) => {
                        return <button key={i} onClick={() =>{
                            this.changeTitle(title)
                        }} > {title}</button>
                    })
                }

                <h1>{this.state.selectedJob}s</h1>
                <p>List of candidates applied for { this.state.selectedJob } job </p>

                <table className='table'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Technical Skills</th>
                            <th>Experience</th>
                            <th>Applied Date</th>
                            <th>View Details</th>
                            <th>Update Application Status</th>
                        </tr>
                    </thead>
                    <tbody>
                          {
                             this.state.candidates.filter(candidate => candidate.jobTitle === this.state.selectedJob).map(candidate => {
                                 return(
                                     <tr>
                                         <td>{ candidate.name }</td>
                                         <td>{ candidate.skills }</td>
                                         <td>{ candidate.experience }</td>
                                         <td>{ moment(candidate.createdAt).format("DD/MM/YYYY") }</td>
                                         <td><button onClick={()=>{
                                             this.handleViewDetails(candidate._id)
                                         }} className='btn btn-primary'>view details</button></td>
                                         <td>
                                             
                                             {candidate.status ==='applied' ? (
                                                 <div>
                                                    <button onClick= {() =>{
                                                        this.handleStatus(candidate._id,'shortlisted')
                                                    }} className='btn btn-success'>shortlist</button>
                                                    <button onClick={()=>{
                                                        this.handleStatus(candidate._id,'rejected')
                                                    }} className='btn btn-denger'>reject</button>
                                                 </div>
                                             ) :(<button className={`btn btn-${candidate.status == 'shortlisted' ? 'success' : 'rejected'}`}>{ candidate.status}</button>) }
                                             </td>
                                     </tr>
                                 )
                             }) 
                          }
                    </tbody>
                </table>

            </div>
        )
    }
}

export default AdminDashboard