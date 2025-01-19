if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config(); // Load environment variables if not in production
}

const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const Review = require('../models/review')

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
	await Campground.deleteMany({}); // Clear all campgrounds
	await Review.deleteMany({}); // Clear all reviews

	// Define the same three comments
	const reviews = await Promise.all([
		new Review({
			author: '67866d92294dd7823b91c7d3',
			body: 'Beautiful place, great for families',
			rating: 5,
		}).save(),
		new Review({
			author: '67866d92294dd7823b91c7d3',
			body: 'Stunning location, but very crowded on weekends',
			rating: 4,
		}).save(),
		new Review({
			author: '67866d92294dd7823b91c7d3',
			body: 'Highly recommended, we loved it!!',
			rating: 4,
		}).save(),
	]);

	// Seed campgrounds
	for (let i = 0; i < 50; i++) {
		const random1000 = Math.floor(Math.random() * 1000);
		const city = cities[random1000];
		const price = Math.floor(Math.random() * 20) + 10;

		const camp = new Campground({
			author: '67866d92294dd7823b91c7d3', // Production
			// author: '678ca3978aea078d40b0565f', // Development
			location: `${city.city}, ${city.state}`,
			title: `${sample(descriptors)} ${sample(places)}`,
			description:
				'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla sequi voluptatem doloremque tempore quos aperiam vel nesciunt fuga, nihil ipsam!',
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
			],
			reviews: reviews.map(review => review._id), // Reference review IDs
		});

		await camp.save();
	}

	console.log('Database seeded successfully!');
};

// Run seeding and close the database
seedDB().then(() => {
	db.close();
});


seedDB().then(() => {
	db.close();
});
