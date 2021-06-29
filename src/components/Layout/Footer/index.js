import React from 'react';

import classes from './style.module.less';

const Footer = () => {
	return (
		<footer className={classes.footer}>
			<div>
				<strong className="text-primary">Nextetor</strong>
				<span> 2021 © All Rights Reserved.</span>
			</div>
			<div className="ml-auto">
				<span>Powered by </span>
				<strong className="text-primary">Anonymouse</strong>
			</div>
		</footer>
	);
};

export default Footer;
