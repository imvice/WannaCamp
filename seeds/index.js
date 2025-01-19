if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config(); // Load environment variables if not in production
}

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

//connect to database
const dbUrl = process.env.DB_URL || 'mongodb://127.0.0.1:27017/wanna-camp';
mongoose.connect(dbUrl);

// check database connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
	console.log('Database connected');
});

// Pick a random element from an array
const sample = array => array[Math.floor(Math.random() * array.length)];

// create a database that contains 50 random
// cities and state and gives titles using elements
const seedDB = async () => {
	await Campground.deleteMany({});
	for (let i = 0; i < 200; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const price = Math.floor(Math.random() * 20) + 10;
		const city = cities[random1000];
		const camp = new Campground({
			author: '677aaa7d292f2ba824a62ca6',
			location: `${cities[random1000].city}, ${cities[random1000].state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla sequi voluptatem doloremque tempore quos aperiam vel nesciunt fuga, nihil ipsam! Excepturi et cum fugit eveniet id a autem ad tempora!',
			price,
			geometry: {
				type: 'Point',
				coordinates: [city.longitude, city.latitude],
			},
			images: [
				{
					url: 'https://res.cloudinary.com/dibf6qmj9/image/upload/v1737261595/glen-jackson-mzZVGFfMOkA-unsplash_oooqwc.jpg',
					filename: 'WannaCamp/campgroundpic1',
				},
				{
					url: 'https://res.cloudinary.com/dibf6qmj9/image/upload/v1737261595/wei-pan-Ta0A1miYZKc-unsplash_htob4j.jpg',
					filename: 'WannaCamp/campgroundpic2',
				},
				{
					url: 'https://res.cloudinary.com/dibf6qmj9/image/upload/v1737261595/kevin-ianeselli-ebnlHkqfUHY-unsplash_hvbp0u.jpg',
					filename: 'WannaCamp/campgroundpic3',
				},
				{
					url: 'https://res.cloudinary.com/dibf6qmj9/image/upload/v1737261595/andreas-ronningen-i9FLJwYhVQs-unsplash_d3wlqw.jpg',
					filename: 'WannaCamp/campgroundpic4',
				},
			],
		});
		await camp.save();
	}
};

seedDB().then(() => {
	db.close();
});
