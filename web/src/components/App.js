import React, { Component } from 'react'
import Amplify, { Auth } from 'aws-amplify'
import aws_exports from '../aws-exports'

// components
import AuthForm from './auth/form'

// containers
import AuthButtonsContainer from '../containers/buttons'

// styles
import globalStyle from '../stylesheets/globals.css'


export default class App extends Component {
	constructor(props){
		super(props)
		this.state = {
			authMode: 'default', // ['default', 'signup', 'login']
			loggedin: false,
		}

		// bind methods
		this.handleButtonClick = this.handleButtonClick.bind(this)
	}

	handleButtonClick(e) {
		this.setState({
			authMode: e.target.id,
		})
	}

	render() {
		const messages = {
			errorUsernameExists: "For security reasons, I can't confirm that you've already signed up... but if I was you, I'd reset your password 😉",
			loginSuccess: "👍 Success! Please check your email for a verification code.",
		}

		return (
			<section className={this.state.authMode}>
				<div>
					<h1>BLEARN</h1>
					<p>A multidimensional learning app? Sounds good to me.</p>
				</div>

				{ ! this.state.loggedin
						? <AuthButtonsContainer />
						: null }

				{ ! this.state.loggedin && (this.state.authMode == 'signup' || this.state.authMode == 'login')
						? <AuthForm mode={this.state.authMode} />
						: null }

			</section>
		);
	}
}