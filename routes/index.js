'use strict';

import v1 from './v1';
import v2 from './v2';
import v3 from './v3';
import v4 from './v4';
import v5 from './v5';
import v6 from './v6';

module.exports = (app) => {
	app.use('/v1', v1); //user
	app.use('/v2', v2);	//shopping
	app.use('/v3', v3);	//address
	app.use('/v4', v4);	//other
	app.use('/v5', v5);	//admin
	app.use('/v6', v6);	//statis
}