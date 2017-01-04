import React from "react";

const Success = React.createClass({
	render() {
		return (
				<div className="container">
					<h2>Success!</h2>
					<br />
					<p className="lead text-success">You have successfully logged in!</p>
					</div>
		);
	}
});

export default Success;
