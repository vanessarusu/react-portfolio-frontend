import React from 'react';
import styles from './ContactForm.module.scss';
import * as endpoints from '../../global/endpoints';
import { Link } from "react-router-dom";
import dropdownCaret from '../../img/dropdown-arrow.svg';


class ContactForm extends React.Component {
    constructor(props) {
        super(props);
        // const token = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9sb2NhbGhvc3Q6ODg4OFwvMjAxOFwvYm93ZXJfY29tcG9uZW50c1wvd29yZHByZXNzIiwiaWF0IjoxNTQ4NTM0OTE2LCJuYmYiOjE1NDg1MzQ5MTYsImV4cCI6MTU0OTEzOTcxNiwiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.wIGDZBWYak3zp_211w7Buu9ZRn9bZ4ir3hsBUUKyOcM';
        this.state = {
            category: 0,
            message: '',
            name: '',
            email: '',
            isDropdownOpen: false,
            isSubmitted: false,
            isSending: false  
        }

        this.dropDownValues = [
            {
                value: 'brand-refinement',
                label: 'Branding & Brand Refinement'
            },
            {
                value: 'web-design-dev',
                label: 'Web Design & Development'
            },
            {
                value: 'brand-support',
                label: 'Brand Support or Short Term Assistance'
            },
            {
                value: 'ongoing-collaboration',
                label: 'Collaborations & Partnerships'
            },
            {
                value: 'other',
                label: 'Other / I\'m not quite sure yet'
            }
        ]

    }

    componentDidMount() {
    }

    handleSubmit = (event) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('your-email', this.state.email);
        formData.append('your-name', this.state.name);
        formData.append('your-message', this.state.message);
        formData.append('your-subject', `${this.state.name} — ${this.dropDownValues[this.state.category].label}`);
        
        fetch(endpoints.CONTACT_FORM(), {
            method: "POST",
            crossDomain: true,
            headers: {
                Accept: "application/json",
                "Authorization": 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvdmFuZXNzYXJ1c3UuY29tXC92YW5lc3NhcnVzdTIxIiwiaWF0IjoxNjE2MjgwODI3LCJuYmYiOjE2MTYyODA4MjcsImV4cCI6MTcwMjY4MDgyNywiZGF0YSI6eyJ1c2VyIjp7ImlkIjoiMSJ9fX0.i3XdO03KxyV9LMUN6yMxQJ0-pGIqXuONSCNmI40P4Ow'
            },
            body: formData
            })
              .then(res => {return res.json()})
              .then(data => {
                  console.log(data);
                  this.setState({
                      isSubmitted: true,
                      isSending: false
                  })
        })

        this.setState({isSending: true});
    }

    handleClickOutside = (e) => {
        if(e.target.nodeName !== 'LI' && this.state.isDropdownOpen) {
            this.setState({
                isDropdownOpen: false
            })
        }
    }

    handleChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value =target.value;
        this.setState({[name]: value});
    }

    handleDropdown = (key) => {
        this.setState({
            category: key
        })

        this.toggleDropdown();
    }

    toggleDropdown = () => {
        const newVal = !this.state.isDropdownOpen;
        this.setState({
            isDropdownOpen: newVal
        })
    }
    

    render() {
        let {isSubmitted, isSending, name, email, message, category, isDropdownOpen} = this.state;
        return (
            <div className={`${isSending ? styles.loading : ''} ${styles.formContainer}`}>
 
            { !isSubmitted ? 
                <form onSubmit = {this.handleSubmit} className={styles.form}>
                    <label>
                        <span className="sr-only">Name</span>
                        <input type="text" name="name" value={name} placeholder="Name" onChange={this.handleChange} description="name" required></input>
                    </label>
                    <label>
                        <span className="sr-only">Email</span>
                        <input type="email" name="email" value={email} onChange={this.handleChange} description="email" placeholder="Email" required></input>
                    </label>
                    <label className={styles.labelPrompt}>What would you like to discuss?</label>
                        <div className={styles.dropdownContainer} onClick={this.toggleDropdown}>
                            <span className={styles.selectedOption}>{this.dropDownValues[category].label}
                                <img src={dropdownCaret} alt="dropdown indicator" className={styles.dropdownCaret}/>
                            </span>
                            <ul value={category} 
                                name="category" 
                                className={`${isDropdownOpen ? styles.dropdownOpen : styles.dropdownClose}`}>
                                    {
                                        Object.keys(this.dropDownValues).map((key) => {
                                            let el = this.dropDownValues[key];
                                            return <li key={key} onClick={() => this.handleDropdown(key)}>{el.label}</li>
                                        })
                                    }
                            </ul>
                            <label id="selectValue" className="sr-only">Reason for Contact</label>
                            <select aria-labelledby="selectValue" value={this.dropDownValues[category].label} onChange={this.handleChange} name="category" description="reason for contact">
                                {
                                    Object.keys(this.dropDownValues).map((key) => {
                                        let el = this.dropDownValues[key];
                                        return <option key={key} value={el.value}>{el.label}</option>
                                    })
                                }
                            </select>
                        </div>
                    <label>
                    <span className="sr-only">Message</span>
                    <textarea value={message} name="message" placeholder="Message" description="Message" onChange={this.handleChange}></textarea>
                </label>
                <input type="submit" value="Submit" />
            </form>
            : 
            <div className={styles.submitSuccessContainer}>
                <h2>Thank you {name}!</h2>
                <p>Your message has been sent :)</p>
                <Link to={'/'}>back home</Link>
            </div>
            }
            
            </div>
        );
    }
}

export default ContactForm;