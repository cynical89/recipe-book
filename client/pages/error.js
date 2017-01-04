import React from "react";
import { Link } from "react-router";

export default class Error extends React.Component {
	render() {
		return (
			<div>
				<div className="container">
					<h2>Error</h2>
					<br />
					<p className=" lead text-danger">Sorry something has gone awry. Sorry for the inconvenience</p>
					<br />
					<p><Link to="/">Return Home</Link></p>
				</div>
			</div>
		);
	}
}
