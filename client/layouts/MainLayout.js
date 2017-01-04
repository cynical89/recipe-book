import React from 'react'
import { Link } from 'react-router'
import Footer from '../components/commmon/Footer'
import { PageHeader } from 'react-bootstrap'
import Navigation from '../components/common/Navigation'

const MainLayout = (props) => {
	return (
		<div className='app'>
			<header className='primary-header'></header>
			<Navigation />
			<main>
				{props.children}
			</main>
			<Footer
				footerText={ footerConfig.footerText }
			/>
		</div>
	)
}

const footerConfig = {
	footerText: 'This site was built with react!'
}

export default MainLayout
