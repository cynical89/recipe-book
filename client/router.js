import React from "react";
import { Router, Route, browserHistory, IndexRoute } from "react-router";

// Layouts
import MainLayout from "./layouts/main-layout";

// Pages
import NotFound from "./pages/not-found";
import Home from "./pages/index";
import Auth from "./pages/auth";
import Signup from "./pages/signup";
import Success from "./pages/success";
import Account from "./pages/account";
import Error from "./pages/error";

export default (
	<Router history={browserHistory}>

		<Route component={MainLayout}>
			<Route path="/" component={Home} />
		</Route>

		<Route component={MainLayout}>
			<Route path="/auth" component={Auth} />
		</Route>

		<Route component={MainLayout}>
			<Route path="/signup" component={Signup} />
		</Route>

		<Route component={MainLayout}>
			<Route path="/success" component={Success} />
		</Route>

		<Route component={MainLayout}>
			<Route path="/account" component={Account} />
		</Route>

		<Route component={MainLayout}>
			<Route path="/error" component={Error} />
		</Route>

		<Route component={MainLayout}>
			<Route path="*" component={NotFound} />
		</Route>

	</Router>
);
