import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import requireAuth from './utils/requireAuth'

// Layouts
import MainLayout from './layouts/MainLayout'

// Pages
import Home from './pages/Index'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'

export default (
	<Router history={browserHistory}>

		<Route component={MainLayout}>
			<Route path='/' component={Home} />
			<Route path='/login' component={Login} />
			<Route path='/signup' component={SignUp} />
			<Route path='/dashboard' component={Dashboard} onEnter={requireAuth} />
		</Route>

	</Router>
)
