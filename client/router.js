import React from 'react'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { requireAuth } from './utils/authUtils'

// Layouts
import MainLayout from './layouts/MainLayout'
import RecipeLayout from './layouts/RecipeLayout'

// Pages
import Home from './pages/Index'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import AddRecipe from './pages/AddRecipe'

export default (
	<Router history={browserHistory}>

		<Route component={MainLayout}>
			<Route path="/" component={Home} />
			<Route path='/login' component={Login} />
			<Route path='/signup' component={SignUp} />
		</Route>

    <Route component={RecipeLayout} onEnter={requireAuth}>
      <Route path='/dashboard' component={Dashboard} />
      <Route path="/newrecipe" component={AddRecipe} />
    </Route>
	</Router>
)
