// import { format } from timeago.js;
const { format } = require('timeago.js');

const helpers  = { };

helpers.toAgoDate = (timestamp) => {
	return format(timestamp);
}

module.exports = helpers;