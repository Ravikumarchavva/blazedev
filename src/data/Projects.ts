import { Project } from "@/lib/datatypes";

export const Projects: Project[] = [
  {
    id: 0,
    title: "Car Price",
    description: "Predict car prices based on features and market trends.",
    date: new Date("2024-06-12"),
    image: "/projects/carPrice/car.jpg",
    comingSoon: false,
    link: "/projects/CarPricePrediction",
  },
  {
    id: 1,
    title: "Telecom Churn",
    description:
      "Find customers who are likely to churn to help bussiness in making customer retention strategies.",
    date: new Date("2024-07-21"),
    image: "/projects/churn/churn.jpg",
    comingSoon: false,
    link: "/projects/CustomerChurn",
  },
  {
    id: 2,
    title: "Cricket Win Prediction",
    description: "Estimates the probability of a cricket team winning a match.",
    date: new Date("2024-12-04"),
    image: "/projects/cricketWinPrediction/t20.jpg",
    comingSoon: false,
    link: "/projects/CricketWinPrediction",
  },
];
