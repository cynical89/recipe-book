import React from "react";
import { Link } from "react-router";

export default class NotFound extends React.Component {
	render() {
		return (
			<div>
				<div className="container">
					<h2>Not Found</h2>
					<br />
					<p className="lead text-danger">Sorry the page you are looking for cannot be found!</p>
					<br />
					<p><Link to="/">Return Home</Link></p>
				</div>
			</div>
		);
	}
}
