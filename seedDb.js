const mongoose = require('mongoose');
const db = require('./models');

const users = ['tripPlanner@gmail.com', 'flightAficionado@ymail.com', 'travelLover@aol.com', 'businessFlier@businessEmail.com', 'occasionalFlier@yahoo.com']
const trips = [
    {
        tripName: 'The Best Trip',
        startLocation: 'ORD',
        startDate: new Date(2019, 2, 2),
        startFlightTakeOffTime: '3 p.m.',
        endLocation: 'LAX',
        endDate: new Date(2019, 2, 9),
        endFlightTakeOffTime: '4 p.m.',
        roundTrip: true
    },
    {
        tripName: 'Moving',
        startLocation: 'ORD',
        startDate: new Date(2019, 3, 2),
        startFlightTakeOffTime: '8 a.m.',
        endLocation: 'LAX',
        endDate: new Date(2019, 3, 9),
        endFlightTakeOffTime: 'N/A',
        roundTrip: false
    },
    {
        tripName: 'My Trip',
        startLocation: 'ORD',
        startDate: new Date(2019, 3, 11),
        startFlightTakeOffTime: '12 p.m.',
        endLocation: 'LAX',
        endDate: new Date(2019, 3, 18),
        endFlightTakeOffTime: '11 a.m.',
        roundTrip: true
    },
    {
        tripName: 'Meeting',
        startLocation: 'ORD',
        startDate: new Date(2019, 1, 11),
        startFlightTakeOffTime: '6 p.m.',
        endLocation: 'LAX',
        endDate: new Date(2019, 1, 18),
        endFlightTakeOffTime: '7 p.m.',
        roundTrip: true
    },
    {
        tripName: 'Family Vacation',
        startLocation: 'ORD',
        startDate: new Date(2019, 3, 20),
        startFlightTakeOffTime: '2 p.m.',
        endLocation: 'LAX',
        endDate: new Date(2019, 3, 27),
        endFlightTakeOffTime: '5 p.m.',
        roundTrip: true
    }
]
const suitcases = [
    {
        items: ['shirt', 'pant'],
        quantities: [2, 4]
    },
    {
        items: ['blanket', 'sweater'],
        quantities: [1, 5]
    },
    {
        items: ['neck pillow', 'tablet'],
        quantities: [1, 1]
    },
    {
        items: ['pants', 'socks'],
        quantities: [2, 5]
    },
    {
        items: ['socks', 'shoes'],
        quantities: [2, 2]
    }
]
let tripIds = [];

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nextpedia", { useNewUrlParser: true });

for (let i = 0; i < users.length; i++) {
    db.User.create({user: users[i]}).then(() => console.log(`user ${i} created`)).catch(err => console.log(err));

    db.Trip.create(trips[i])
        .then(trip => {
            console.log(`trip ${i} created`);
            tripIds.push(trip._id);
            db.User.updateOne({user: users[i]}, {$push: {trips: trip._id}})
                .then(() => console.log(`user ${i} updated`))
                .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    db.Suitcase.create(suitcases[i])
        .then(suitcase => {
            console.log(`suitcase ${i} created`);
            db.Trip.updateOne({_id: tripIds[i]},{$push: {suitcases: suitcase._id}})
                .then(() => console.log(`trip ${i} updated`))
                .catch(() => console.log(err));
        })
}
