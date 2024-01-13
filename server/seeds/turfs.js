if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const geoCodes = [
    [12.975383, 77.713096],
    [12.980907, 77.713986],
    [12.977853, 77.707433],
    [12.987626, 77.729879],
    [12.957353, 77.729871],
    [12.939937, 77.705589],
    [12.927563, 77.640576],
    [12.886028, 77.643096],
    [12.885873, 77.599709],
    [12.962264, 77.592334],
]

const locations = [
    '20, 7th Cross Rd, EPIP Zone, Brookefield, Bengaluru, Karnataka 560066',
    'Seetharampalya - Hoodi Rd, Seetharampalya, Whitefield, Bengaluru, Karnataka 560048',
    '22/A, Doddanakundi Industrial Area 2, Phase 1, Doddanekkundi, Bengaluru, Karnataka 560048',
    'Sy. No. 78/2 Sadara Mangala Village, K R Puram Hobli, Whitefield Main Road, Saradar Mangala Industrial Area, Thigularapalya Hoodi, Bengaluru, Karnataka 560048',
    '269, Siddhapura Main Rd, Phase 1, Siddapura, Whitefield, Bengaluru, Karnataka 560066',
    'WPQ4+X6X, Panathur, Bengaluru, Karnataka 560103',
    'Jakkasandra Extension, Koramangala, Bengaluru, Karnataka 560034',
    'Kudlu Main Rd, Next to Royal Enfield Showroom - Electronic City Motors, Srinivasa Nagar, Hal Layout, Singasandra, Bengaluru, Karnataka 560068',
    'Meenakshi Residency Block-F, MEENAKSHI RESIDENCY, Venugopal Reddy Layout, Arekere, Bengaluru, Karnataka 560076',
    'Lal Bagh Main Rd, Srinivas Colony, Sudhama Nagar, Bengaluru, Karnataka 560027'
]

const names = [
    'Powerplay 1',
    'Powerplay 2',
    'The Yard Arena',
    'Astro Park - Whitefield',
    'Gurukul Football Grounds',
    'Astro Arena',
    'Sporthood Koramangala',
    'Iqra Games Village',
    'Football Turf',
    'Tiento Sports'
]

const footballTurfs = Array.from({ length: 10 }, (_, index) => ({
    name: names[index],
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
    geoCode: geoCodes[index],
    price: 30 + index,
    rating: 0,
    description: 'Lively turf, perfect for sports and events. A green oasis with modern amenities, ideal for relaxation and celebrations.',
    location: locations[index],
    author: process.env.DATABASE_SEED_AUTHOR,
    reviews: []
}));

module.exports = {footballTurfs};