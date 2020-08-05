import React from 'react'
import axios from './config/axios'

class ApplicationForm extends React.Component{
    constructor(){
        super()
        this.state={
             name:'',
             email:'',
             contact:'',
             job:'',
             experience:'',
             skills:''
        }
    }

    handleChange =(e) =>{
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = (e) =>{
        e.preventDefault()
        const formData = {
            name: this.state.name,
            email: this.state.email,
            phone:this.state.contact,
            jobTitle:this.state.job,
            experience:this.state.experience,
            skills:this.state.skills
        }
        console.log(formData)
        axios.post('/users/application-form',formData)
        .then((response)=>{
            //console.log('resolve',response.data)
            if(response.data.hasOwnProperty('error')){
                alert(response.data.message)
            }
            else{
                alert('Your application has been submitted')
                this.setState({
                    name:'',
                    email:'',
                    contact:'',
                    job:'',
                    expreience:'',
                    skills:''
                })
            }
            console.log('response',response.data)
        })
        .catch((err)=>{
            console.log('reject',err)
        })
    }

    render(){
        return(
            <div className='row'>
                <div className='col-md-8 offset-md-2'>

                <h2>Apply for job</h2>
                <form onSubmit={this.handleSubmit} >
                    <div className='form-group'>
                    <label htmlFor='fullName'>Full name</label>
                    <input 
                    type='text' 
                    id='fullNmae' 
                    name='name' 
                    value={this.state.name} 
                    onChange={this.handleChange} className='form-control' />
                    </div>

                    <div className='form-group'>
                    <label htmlFor='email' >Email address</label>
                    <input 
                    type='text' 
                    id='email' 
                    name='email' 
                    value={this.state.email} 
                    onChange={this.handleChange}
                    placeholder='example@email.com' className='form-control'/>
                    </div>
                    
                    <div className='form-group'>
                    <label htmlFor='contact' >Contact Number</label>
                    <input 
                    type='text' 
                    id='contact' 
                    name='contact' 
                    value={this.state.contact} 
                    onChange={this.handleChange} 
                    placeholder='+91 9988554344' className='form-control'/>
                    </div>

                    <div className='form-group'>
                    <label>Applying for job</label>
                    <select value={this.state.job} name='job' onChange={this.handleChange} className='form-control'> 
                    <option value=''>---Select---</option>
                        <option value='Front-End Developer' >Front-End Developer</option>
                        <option value='Node.js Developer' >Node.js Developer</option>
                        <option value='MEAN Stack Developer' >MEAN Stack Developer</option>
                        <option value='FULL Stack Developer' >FULL Stack Developer</option>
                    </select>
                    </div>
                    
                    <div className='form-group'>
                    <label htmlFor='experience' >Experience</label>
                    <input 
                    type='text' 
                    id='experience' 
                    name='experience' 
                    value={this.state.experience} 
                    onChange={this.handleChange}  placeholder='Experience(2years,3month)' className='form-control' />
                    </div>
                    
                    <div className='form-group'>
                    <label htmlFor='skills' >Technical Skills</label>
                    <textarea id='skills' name='skills' value={this.state.skills} onChange={this.handleChange} placeholder='Technical Skills' className='form-control'></textarea>
                    </div>

                    <input type='submit' value='Send Application ' className='btn btn-info'/>
                </form>
                </div>
            </div>
        )
    }
} 

export default ApplicationForm