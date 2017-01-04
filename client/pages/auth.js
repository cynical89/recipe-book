import React from "react";

const Auth = React.createClass({
	render() {
		return (
				<div className="container">
					<h2>Log in!</h2>
					<br />
					<a className="btn btn-block btn-social btn-lg btn-github" href="/auth/github">
							<span className="fa fa-github"></span>
							Sign in with Github
					</a>
				</div>
		);
	}
});

export default Auth;
