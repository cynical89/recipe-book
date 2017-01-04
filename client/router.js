import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

// Layouts
import MainLayout from './layouts/MainLayout'

// Pages
import Home from './pages/Index'
import SignUp from './pages/SignUp'
import Login from './pages/Login'

export default (
	<Router history={browserHistory}>

		<Route component={MainLayout}>
			<Route path='/' component={Home} />
			<Route path='/login' component={Login} />
			<Route path='/signup' component={SignUp} />
		</Route>

	</Router>
)
