Observer = function ( longitude, latitude, height) {

	this.gdCoord = {

	    longitude: 127.045153 * satellite.deg2rad,
	    latitude: 37.507934 * satellite.deg2rad,
	    height: 0.370

	};

}

Observer.prototype = {

	setGmst : function ( time ) {

		this.gmst = satellite.gstimeFromTime( currentTime );

	}

}