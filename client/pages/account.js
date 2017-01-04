import React from "react";

const Account = React.createClass({
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
		return (
				<div className="container">
					<h2>Account</h2>
					<br />
					<pre> {JSON.stringify(this.state.user)} </pre>
					</div>
		);
	}
});

export default Account;
