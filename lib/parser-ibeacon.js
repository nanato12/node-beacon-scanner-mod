/* ------------------------------------------------------------------
* node-beacon-scanner - parser-ibeacon.js
*
* Copyright (c) 2017-2019, Futomi Hatano, All rights reserved.
* Released under the MIT license
* Date: 2019-11-24
* ---------------------------------------------------------------- */
'use strict';

/* ------------------------------------------------------------------
* Constructor: BeaconParserIbeacon()
* ---------------------------------------------------------------- */
const BeaconParserIbeacon = function() {

};

/* ------------------------------------------------------------------
* Method: parse(peripheral)
* - peripheral: `Peripheral` object of the noble
* ---------------------------------------------------------------- */
BeaconParserIbeacon.prototype.parse = function(peripheral) {
	let ad = peripheral.advertisement;
	let manu = ad.manufacturerData;
	if(manu.length < 25) {
		return null;
	}
	//let uuid = manu.slice(4, 20).toString('hex');
	let uuid = [
		manu.slice( 4,  8).toString('hex'),
		manu.slice( 8, 10).toString('hex'),
		manu.slice(10, 12).toString('hex'),
		manu.slice(12, 14).toString('hex'),
		manu.slice(14, 20).toString('hex')
	].join('').toUpperCase();

	let battery = -1;
	if (ad.serviceData.length > 0) {
		let data_obj = Array.from(ad.serviceData[0].data);
		battery = data_obj[0];
	}

	return {
		uuid : uuid,
		major: manu.slice(20, 22).readUInt16BE(0),
		minor: manu.slice(22, 24).readUInt16BE(0),
		txPower: manu.slice(24, 25).readInt8(0),
		battery: battery,
	};
};

module.exports = new BeaconParserIbeacon();
