SatelliteRecord = function ( tle ) {

	this.tle0 = tle[0];
	this.tle1 = tle[1];
	this.tle2 = tle[2];

	this.name = tle[0].slice(2);

	this.satrec = satellite.twoline2satrec( this.tle1, this.tle2 );

}

SatelliteRecord.prototype = {

	setTime: function ( time ) {

		this.time = time;

	},

	getPositionAndVelocityAtTime: function ( time ) {

		return satellite.propagate( this.satrec, time );

	},

	getPositionAndVelocity: function () {

		return satellite.propagate( this.satrec, this.time );

	},

}