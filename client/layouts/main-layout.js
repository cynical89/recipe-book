import React from "react";
import { Link } from "react-router";
import Footer from "../components/footer";
import { PageHeader } from "react-bootstrap";
import Navigation from "../components/navigation"

const MainLayout = React.createClass({
	render() {
		return (
			<div className="app">
				<header className="primary-header"></header>
				<Navigation />
				<main>
					{this.props.children}
				</main>
				<Footer
					footerText={ footerConfig.footerText }
				/>
			</div>
		);
	}
});

const footerConfig = {
	footerText: "This site was built with react!"
}

export default MainLayout;
