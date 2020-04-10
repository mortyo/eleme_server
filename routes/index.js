'use strict';

import admin from './admin';
import bos from './bos';
import eus from './eus';
import member from './member';
import payapi from './payapi';
import promotion from './promotion';
import shopping from './shopping';
import statis from './statis';
import ugc from './ugc';
import v1 from './v1';
import v2 from './v2';
import v3 from './v3';
import v4 from './v4';

module.exports = (app) => {
	app.use('/v1', v1);
	app.use('/v2', v2);
	app.use('/v3', v3);
	app.use('/v4', v4);
	app.use('/ugc', ugc);
	app.use('/bos', bos);
	app.use('/eus', eus);
	app.use('/admin', admin);
	app.use('/payapi', payapi);
	app.use('/member', member);
	app.use('/statis', statis);
	app.use('/shopping', shopping);
	app.use('/promotion', promotion);
}