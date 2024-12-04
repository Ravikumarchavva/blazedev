import { Project } from "@/lib/datatypes";

export const Projects: Project[] = [
    {
        id: 0,
        title: 'Car Price',
        description: 'Predict car prices based on features and market trends.',
        date: new Date('2022-01-01'),
        image: '/projects/carPrice/car.jpg',
        comingSoon: false,
        link: '/projects/CarPricePrediction',
    },
    {
        id: 1,
        title: 'Telecom Churn',
        description: 'Analyze customer data to predict telecom churn.',
        date: new Date('2023-01-01'),
        image: '/projects/churn/churn.jpg',
        comingSoon: false,
        link: '/projects/CustomerChurn',
    },
    {
        id: 2,
        title: 'Cricket Win Prediction',
        description: 'Estimates the probability of a cricket team winning a match.',
        date: new Date('2024-12-04'),
        image: '/projects/cricketWinPrediction/t20.jpg',
        comingSoon: false,
        link: '/projects/CricketWinPrediction',
    },

];

