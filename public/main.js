

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var topHemiGeometry = new THREE.SphereGeometry( 7, 30, 15, 0, Math.PI*2, 0, Math.PI/2);
var topHemiMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
var topHemi = new THREE.Mesh( topHemiGeometry, topHemiMaterial );

var topHemiEdge = new THREE.EdgesHelper( topHemi, 0x34baff );
topHemiEdge.material.linewidth = 1;

var bottomHemiGeometry = new THREE.SphereGeometry( 7, 15, 30, 0, Math.PI*2, Math.PI/2, Math.PI );
var bottomHemiMaterial = new THREE.MeshBasicMaterial( { color: 0x00ff00, wireframe: true } );
var bottomHemi = new THREE.Mesh( bottomHemiGeometry, bottomHemiMaterial );

var bottomHemiEdge = new THREE.EdgesHelper( bottomHemi, 0x34ffba );
bottomHemiEdge.material.linewidth = 1;

scene.add( topHemiEdge );
scene.add( bottomHemiEdge );


camera.position.z = 5;

function render () {
	requestAnimationFrame( render );

	// cube.rotation.x += 0.001;
	// cube.rotation.y += 0.001;

	renderer.render(scene, camera);
};

render();


var issRecord = new SatelliteRecord([
	"0 ISS (ZARYA)",
	"1 25544U 98067A   16218.77412066  .00002369  00000-0  41840-4 0  9992",
	"2 25544  51.6438 170.6068 0002061 103.6851 332.7169 15.54924509 12705"
]);

var currentTime = new Date();

var positionAndVelocity = issRecord.getPositionAndVelocityAtTime( currentTime );

var positionEci = positionAndVelocity.position,
    velocityEci = positionAndVelocity.velocity;

var observerGd = {
    longitude: 127.045153 * satellite.deg2rad,
    latitude: 37.507934 * satellite.deg2rad,
    height: 0.370
};

var gmst = satellite.gstimeFromTime( currentTime );

// You can get ECF, Geodetic, Look Angles, and Doppler Factor.
var positionEcf   = satellite.eciToEcf(positionEci, gmst),
    observerEcf   = satellite.geodeticToEcf(observerGd),
    positionGd    = satellite.eciToGeodetic(positionEci, gmst),
    lookAngles    = satellite.ecfToLookAngles(observerGd, positionEcf);

 var satelliteX = positionEci.x,
        satelliteY = positionEci.y,
        satelliteZ = positionEci.z;

    // Look Angles may be accessed by `azimuth`, `elevation`, `range_sat` properties.
    var azimuth   = lookAngles.azimuth,
        elevation = lookAngles.elevation,
        rangeSat  = lookAngles.rangeSat;

    // Geodetic coords are accessed via `longitude`, `latitude`, `height`.
    var longitude = positionGd.longitude,
        latitude  = positionGd.latitude,
        height    = positionGd.height;

    //  Convert the RADIANS to DEGREES for pretty printing (appends "N", "S", "E", "W". etc).
    var longitudeStr = satellite.degreesLong(longitude),
        latitudeStr  = satellite.degreesLat(latitude);
