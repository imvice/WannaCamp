mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
	container: 'show-map',
	style: 'mapbox://styles/mapbox/outdoors-v12',
	center: campground.geometry.coordinates,
	zoom: 10,
});

map.addControl(new mapboxgl.NavigationControl());

const marker1 = new mapboxgl.Marker()
	.setLngLat(campground.geometry.coordinates)
	.setPopup(
		new mapboxgl.Popup({ offset: 25 }).setHTML(
			`<h3>${campground.title}</3><h5>${campground.location}</h5>`
		)
	)
	.addTo(map);
