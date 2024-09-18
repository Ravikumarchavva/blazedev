import { Project } from "@/lib/datatypes";

export const Projects: Project[] = [
    {
        id: 0,
        title: 'Car Price',
        description: 'Predict car prices based on features and market trends.',
        date: new Date('2022-01-01'),
        image: '/projects/car.jpg',
        comingSoon: false,
        link: '/projects/CarPricePrediction',
    },
    {
        id: 1,
        title: 'Telecom Churn',
        description: 'Analyze customer data to predict telecom churn.',
        date: new Date('2023-01-01'),
        image: '/projects/churn.jpg',
        comingSoon: false,
        link: '/projects/CustomerChurn',
    },
    // {
    //     id: 3,
    //     title: 'IPL Score',
    //     description: 'Track live scores and updates final Estimation for IPL matches.',
    //     date: new Date('2021-01-01'),
    //     image: '/projects/ipl.jpg',
    //     comingSoon: true,
    //     link: '',
    // },
    // {
    //     id: 4,
    //     title: 'Fraud Detection',
    //     description: 'Utilize machine learning to identify fraudulent transactions.',
    //     date: new Date('2025-01-01'),
    //     image: '/projects/fraud.jpg',
    //     comingSoon: true,
    //     link: '',
    // },
    // {
    //     id: 5,
    //     title: 'Music Recommendation',
    //     description: 'Suggest personalized music based on user preferences.',
    //     date: new Date('2024-01-01'),
    //     image: '/projects/music.jpg',
    //     comingSoon: true,
    //     link: '',
    // },
];

