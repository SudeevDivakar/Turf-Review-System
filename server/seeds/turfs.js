if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}


const footballTurfs = Array.from({ length: 10 }, (_, index) => ({
    name: `Turf ${index + 1}`,
    image: [
        {
            url: `https://en.reformsports.com/oxegrebi/2022/04/artificial-grass-on-football-pitch.jpeg`,
            filename: `gdgdgdggegturf${index + 1}.jpg`,
            originalname: `turf${index + 1}_image1.jpg`
        },
        {
            url: `https://d26itsb5vlqdeq.cloudfront.net//image/B5C3D15B-0407-167F-51E00AB4B55D258C`,
            filename: `gdgdgnkehturf${index + 1}.jpg`,
            originalname: `turf${index + 1}_image2.jpg`
        },
        {
            url: `https://t4.ftcdn.net/jpg/04/24/42/49/360_F_424424973_gbWTLm4RkYpRPrKpWxf77X2GvJUzdUWA.jpg`,
            filename: `gdgghthrsfehturf${index + 1}.jpg`,
            originalname: `turf${index + 1}_image3.jpg`
        },
        
    ],
    price: 30 + index,
    rating: 0,
    description: `Description for Turf ${index + 1}`,
    location: `City ${String.fromCharCode(65 + index)}`,
    author: process.env.DATABASE_SEED_AUTHOR,
    reviews: []
}));

module.exports = {footballTurfs};