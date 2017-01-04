import React from "react";
import { Link } from "react-router";
import { Navbar, Nav, NavItem} from "react-bootstrap";

const Navigation = React.createClass({
	getInitialState: function() {
		return {
			user: null,
		};
	},

	componentDidMount: function() {
			this.serverRequest = $.get("auth/verify", function (result) {
				const user = result;
				this.setState({
					user: user,
				});
			}.bind(this));
	},

	componentWillUnmount: function() {
		this.serverRequest.abort();
	},

	render: function() {
		const user = this.state.user;
		let navItems;
		/* Using `href` for signout instead of `to` so we can make an api
			call to the server instead of react handling the route for us */
		if (user !== null && user !== undefined) {
			navItems = <ul className="nav navbar-nav navbar-right">
									<li><Link to="/account">Account</Link></li>
									<li><Link href="/auth/signout">Sign Out</Link></li>
								</ul>
		} else {
			navItems = <ul className="nav navbar-nav navbar-right">
									<li><Link to="/auth">Sign In</Link></li>
									<li><Link to="/signup">Sign Up</Link></li>
								</ul>
		}
		return (
			<nav className="navbar navbar-inverse navbar-fixed-top">
				<div className="container-fluid">
					<div className="navbar-header">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						<Link className="navbar-brand" to="/">Koa-React-Starter</Link>
					</div>
					<div id="navbar" className="navbar-collapse collapse">
						{navItems}
					</div>
				</div>
			</nav>
		);
	}
});

export default Navigation;
