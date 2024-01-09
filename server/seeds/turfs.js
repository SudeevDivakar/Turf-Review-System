const footballTurfs = [
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 1",
        image: 'https://5.imimg.com/data5/QM/NB/VE/SELLER-48760690/football-turf-grass-500x500.jpg',
        price: 30,
        description: "6 a side ground that can be converted into an 8 a side ground",
        location: "City A"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 2",
        image: 'https://media.hudle.in/photos/47332',
        price: 25,        
        description: "Affordable and good quality turf with options for 5 a side games.",
        location: "City B",
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 3",
        image: 'https://5.imimg.com/data5/SELLER/Default/2021/10/LV/MR/OP/103253819/final-ground-agra-500x500.jpg',
        price: 40,
        description: "Top-notch facilities and professional staff, suitable for 11 a side matches.",
        location: "City C"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 4",
        image: 'https://images.livemint.com/rf/Image-621x414/LiveMint/Period1/2015/09/12/Photos/turf-kHJF--621x414@LiveMint.jpg',
        price: 35,
        description: "Scenic location with a well-maintained pitch, perfect for 7 a side games.",
        location: "City D"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 5",
        image: 'https://t4.ftcdn.net/jpg/04/24/42/49/360_F_424424973_gbWTLm4RkYpRPrKpWxf77X2GvJUzdUWA.jpg',
        price: 32,
        description: "Great turf for casual matches, suitable for 5 a side and 6 a side games.",
        location: "City E"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 6",
        image: 'https://res.cloudinary.com/dwzmsvp7f/image/fetch/q_75,f_auto,w_1316/https%3A%2F%2Fmedia.insider.in%2Fimage%2Fupload%2Fc_crop%2Cg_custom%2Fv1623295335%2Fkxaca9iyfdbzsdf5gw9v.png',
        price: 28,
        description: "Good value for money, suitable for 5 a side and 7 a side games.",
        location: "City F"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 7",
        image: 'https://img.redbull.com/images/c_limit,w_1500,h_1000,f_auto,q_auto/redbullcom/2020/12/15/xsbfcbfa6glci0r3md1n/sporthood-espirito-football-turf-ground-kochi-kerala',
        price: 45,
        description: "Premium turf experience, ideal for 11 a side matches.",
        location: "City G"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 8",
        image: 'https://img1.khelomore.com/venues/736/cover_photo/1040x490/2021-02-08.jpg',
        price: 31,
        description: "Well-lit and safe facilities, suitable for 6 a side and 8 a side games.",
        location: "City H"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 9",
        image: 'https://5.imimg.com/data5/RT/MI/CM/SELLER-2808438/synthetic-football-artificial-turf.jpg',
        price: 38,
        description: "Friendly staff and clean environment, suitable for 7 a side and 9 a side games.",
        location: "City I"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 10",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTq2zaWDu9Nc8ujA9TJ9thPnG3hqVarKYoOWQ&usqp=CAU',
        price: 33,
        description: "Convenient location for city dwellers, perfect for 5 a side and 6 a side games.",
        location: "City J"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 11",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRgT6q6bATH1xDW5_lIQGCtTlrGhZTrjKFheg&usqp=CAU',
        price: 29,
        description: "Well-maintained turf suitable for all skill levels, suitable for 7 a side and 8 a side games.",
        location: "City K"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 12",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvj6yq6VE_C5qCg59r_iYgO8Osqz6VU9Ikyw&usqp=CAU',
        price: 42,
        description: "Modern facilities and equipment, ideal for 9 a side and 11 a side matches.",
        location: "City L"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 13",
        image: 'https://timesofindia.indiatimes.com/photo/msid-68861346/68861346.jpg?resizemode=4',
        price: 34,
        description: "Easily accessible with ample parking, suitable for 6 a side and 7 a side games.",
        location: "City M"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 14",
        image: 'https://img.redbull.com/images/q_auto,f_auto/redbullcom/2020/12/15/spsk7mqyvepduccdvy4p/sporthood-espirito-football-turf-ground-kochi-kerala',
        price: 36,
        description: "Well-drained pitch, suitable for all weather, ideal for 8 a side and 9 a side games.",
        location: "City N"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 15",
        image: 'https://content.jdmagicbox.com/comp/kannur/s2/9999px497.x497.221123205822.m5s2/catalogue/the-nutmeg-football-turf-kannur-eybqy2ymr2.jpg',
        price: 39,
        description: "Family-friendly environment, suitable for 5 a side and 6 a side games.",
        location: "City O"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 16",
        image: 'https://cpimg.tistatic.com/08631624/b/4/Football-Artificial-Turf.jpg',
        price: 37,
        description: "Regularly sanitized and hygienic, perfect for 7 a side and 8 a side games.",
        location: "City P"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 17",
        image: 'https://dynamic-media-cdn.tripadvisor.com/media/photo-o/11/ec/80/31/turf-7.jpg?w=1200&h=1200&s=1',
        price: 26,
        description: "Budget-friendly option for casual games, suitable for 5 a side and 6 a side games.",
        location: "City Q"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 18",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcDEZS8IYEV5ImlTxBxDwg5Hi96osNUZKh6w&usqp=CAU',
        price: 43,
        description: "Exclusive turf experience with VIP amenities, ideal for 11 a side matches.",
        location: "City R"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 19",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZWaz1Uia9N7nF-nfPzJVZjyPPfioWaXvloQ&usqp=CAU',
        price: 27,
        description: "Well-maintained changing rooms and showers, suitable for 6 a side and 7 a side games.",
        location: "City S"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 20",
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOfStQ-_wcSIcS7mpeZS4GMLMjGitk9N_0rg&usqp=CAU',
        price: 41,
        description: "Professional coaching available on request, ideal for 9 a side and 11 a side matches.",
        location: "City T"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 21",
        image: 'https://jabulanisports.com/wp-content/uploads/2019/05/jabulani-about.jpg',
        price: 44,
        description: "State-of-the-art turf with the latest technology, suitable for 11 a side matches.",
        location: "City U"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 22",
        image: 'https://imgstaticcontent.lbb.in/lbbnew/wp-content/uploads/2018/05/21175706/thestreet2.png?w=1200&h=628&fill=blur&fit=fill',
        price: 30,
        description: "Excellent turf with well-maintained facilities, suitable for 7 a side and 8 a side games.",
        location: "City V"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 23",
        image: 'https://www.evergreenlandscaping.in/wp-content/uploads/2018/09/Football-Turf.jpg',
        price: 25,
        description: "Affordable and good quality turf with options for 5 a side games.",
        location: "City W"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 24",
        image: 'https://content.jdmagicbox.com/comp/ernakulam/g5/0484px484.x484.190725005122.f3g5/catalogue/kick-off-football-turf-ernakulam-1ppzvmtrty.jpg?clr=',
        price: 40,
        description: "Top-notch facilities and professional staff, suitable for 11 a side matches.",
        location: "City X"
    },
    {
        author: '659aee1cc0205028708211a6',
        name: "Turf 25",
        image: 'https://res.cloudinary.com/sporthood/image/fetch/t_xlarge/https://api.sporthood.in/media/venue/WhatsApp_Image_2022-06-13_at_1.37.07_PM.jpeg',
        price: 35,
        description: "Scenic location with a well-maintained pitch, perfect for 7 a side games.",
        location: "City Y"
    }
];


module.exports = {footballTurfs};