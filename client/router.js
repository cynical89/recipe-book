import React from 'react';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Index';

export default (
	<Router history={browserHistory}>

		<Route component={MainLayout}>
			<Route path='/' component={Home} />
		</Route>

	</Router>
);
