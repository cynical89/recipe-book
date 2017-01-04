import React from 'react'
import { Link } from 'react-router'
import Footer from '../components/common/Footer'
import { PageHeader } from 'react-bootstrap'
import Navigation from '../components/common/Navigation'
import { checkWebToken } from '../utils/requireAuth'

class MainLayout extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			authorized: false,
			token: ''
		}
	}

	componentWillMount() {
		if(checkWebToken(localStorage.getItem('userToken'))) {
			this.setState({ authorized: true, token: localStorage.getItem('userToken') })
		} else {
			localStorage.removeItem('userToken')
		}
	}

	_logout = () => {
		localStorage.removeItem('userToken')
		this.setState({ authorized: false })
		this.context.router.push('/')
	}

	render() {
		return (
			<div className='app'>
				<header className='primary-header'></header>
				<Navigation authorized={this.state.authorized} _logout={this._logout}/>
				<main>
					{this.props.children}
				</main>
				<Footer
					footerText={ footerConfig.footerText }
				/>
			</div>
		)
	}
}

const footerConfig = {
	footerText: 'This site was built with react!'
}

export default MainLayout
