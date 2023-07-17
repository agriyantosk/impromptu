const places = [
    {
        placeToVisit: "Mount Bromo",
        description: "An active volcano with stunning sunrise and scenic views",
        address: "East Java, Indonesia",
        toDo: "Hike to the crater, ride a jeep to the viewpoint, watch the sunrise",
    },
    {
        placeToVisit: "Madakaripura Waterfall",
        description:
            "A majestic waterfall surrounded by lush greenery and caves",
        address: "East Java, Indonesia",
        toDo: "Hike to the waterfall, explore the caves, take a dip in the pool",
    },
    {
        placeToVisit: "Rafting at Pekalen River",
        description:
            "An adrenaline-pumping experience of rafting through rapids and waterfalls",
        address: "East Java, Indonesia",
        toDo: "Raft through the river, experience the rapids and waterfalls, enjoy the scenic views",
    },
    {
        placeToVisit: "Coban Rondo Waterfall",
        description:
            "A serene waterfall surrounded by gardens and tea plantations",
        address: "Malang, East Java, Indonesia",
        toDo: "Hike to the waterfall, explore the gardens, enjoy tea and snacks",
    },
    {
        placeToVisit: "Taman Safari",
        description: "A wildlife park with various animals and attractions",
        address: "Prigen, East Java, Indonesia",
        toDo: "See the animals, ride the safari bus, enjoy the shows and attractions",
    },
];

const picks = [[0, 3, 4], [], [1, 2]];

const factory = (picks) => {
    const obj2 = {
        _id: "647a26822a6d0e8563f1cf8e",
        tripMaster: "6478b1116be6487b745f420b",
        tripName: "Bali Trip Boys",
        tripParticipant: ["6478b1116be6487b745f420b"],
        itenararies: {
            accommodation: {
                placeToStay: "Novotel Bali",
                address: "Jalan Kuta, Bali",
                pricePerNight: "2000000",
                description: "Enjoy the most beautiful hotel in dewata island",
            },
            itinerary: [],
        },
    };

    for (let i = 0; i < picks.length; i++) {
        const itineraryInput = {
            day: [],
            budget: 0,
        };
        const pick = picks[i]; // putaran pertama => [0, 3, 4]
        for (let m = 0; m < pick.length; m++) {
            const pickk = pick[m]; // putaran kedua => 3
            for (let j = 0; j < places.length; j++) {
                const place = places[j];
                if (j === pickk) {
                    itineraryInput.day.push(place);
                }
            }
        }
        obj2.itenararies.itinerary.push(itineraryInput);
    }
    return obj2.itenararies.itinerary[0];
};

const result = {
    _id: "647a26822a6d0e8563f1cf8e",
    tripMaster: "6478b1116be6487b745f420b",
    tripName: "Bali Trip Boys",
    tripParticipant: ["6478b1116be6487b745f420b"],
    itenararies: {
        accommodation: {
            placeToStay: "Novotel Bali",
            address: "Jalan Kuta, Bali",
            pricePerNight: "2000000",
            description: "Enjoy the most beautiful hotel in dewata island",
        },
        itinerary: [
            {
                day: [
                    {
                        placeToVisit: "Mount Bromo",
                        description:
                            "An active volcano with stunning sunrise and scenic views",
                        address: "East Java, Indonesia",
                        toDo: "Hike to the crater, ride a jeep to the viewpoint, watch the sunrise",
                    },
                    {
                        placeToVisit: "Madakaripura Waterfall",
                        description:
                            "A majestic waterfall surrounded by lush greenery and caves",
                        address: "East Java, Indonesia",
                        toDo: "Hike to the waterfall, explore the caves, take a dip in the pool",
                    },
                    {
                        placeToVisit: "Madakaripura Waterfall",
                        description:
                            "A majestic waterfall surrounded by lush greenery and caves",
                        address: "East Java, Indonesia",
                        toDo: "Hike to the waterfall, explore the caves, take a dip in the pool",
                    },
                ],
                budget: 0,
            },
            {
                day: [
                    {
                        placeToVisit: "Madakaripura Waterfall",
                        description:
                            "A majestic waterfall surrounded by lush greenery and caves",
                        address: "East Java, Indonesia",
                        toDo: "Hike to the waterfall, explore the caves, take a dip in the pool",
                    },
                    {
                        placeToVisit: "Rafting at Pekalen River",
                        description:
                            "An adrenaline-pumping experience of rafting through rapids and waterfalls",
                        address: "East Java, Indonesia",
                        toDo: "Raft through the river, experience the rapids and waterfalls, enjoy the scenic views",
                    },
                ],
                budget: 0,
            },
            { day: [], budget: 0 },
        ],
    },
}

const obj = {
    accommodation: {
        placeToStay: "Novotel Bali",
        address: "Jalan Kuta, Bali",
        pricePerNight: "2000000",
        description: "Enjoy the most beautiful hotel in dewata island"
    },
    itinerary: [
        {
            day: [
                {
                    placeToVisit: "Mount Bromo",
                    description:
                        "An active volcano with stunning sunrise and scenic views",
                    address: "East Java, Indonesia",
                    toDo: "Hike to the crater, ride a jeep to the viewpoint, watch the sunrise"
                },
                {
                    placeToVisit: "Madakaripura Waterfall",
                    description:
                        "A majestic waterfall surrounded by lush greenery and caves",
                    address: "East Java, Indonesia",
                    toDo: "Hike to the waterfall, explore the caves, take a dip in the pool"
                },
            ],
            budget: 0
        },
        {
            day: [
                {
                    placeToVisit: "Madakaripura Waterfall",
                    description:
                        "A majestic waterfall surrounded by lush greenery and caves",
                    address: "East Java, Indonesia",
                    toDo: "Hike to the waterfall, explore the caves, take a dip in the pool"
                },
                {
                    placeToVisit: "Rafting at Pekalen River",
                    description:
                        "An adrenaline-pumping experience of rafting through rapids and waterfalls",
                    address: "East Java, Indonesia",
                    toDo: "Raft through the river, experience the rapids and waterfalls, enjoy the scenic views"
                },
            ],
            budget: 0
        },
        { day: [], budget: 0 }
    ]
}