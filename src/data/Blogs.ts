import { Blog } from '@/lib/datatypes';

export const BlogsData: Blog[] = [
  {
    id: 0,
    title: 'Linear Regression',
    description: 'Explore the fundamentals of linear regression, a basic yet powerful technique in machine learning.',
    content: 'Linear regression is a linear approach to modeling the relationship between a dependent variable and one or more independent variables. It is one of the simplest and most commonly used algorithms in machine learning. This post delves into the theory behind linear regression, its applications, and how to implement it using Python. We will also explore its limitations and potential improvements.',
    url: 'https://example.com/blog/first-post',
    expectedReadingTime: '5 minutes',
    imageUrl: '/blogs/linearRegression.jpg',
  },
  {
    id: 1,
    title: 'Binary Classification',
    description: 'A comprehensive guide to binary classification, a key technique in supervised learning.',
    content: 'Binary classification is the task of classifying the elements of a given set into two groups based on a classification rule. This post covers the essential concepts of binary classification, common algorithms like logistic regression and support vector machines, and practical implementation tips. We will also discuss metrics to evaluate model performance and ways to handle imbalanced datasets.',
    url: 'https://www.google.com',
    expectedReadingTime: '15 minutes',
    imageUrl: '/blogs/binaryClassification.jpg',
  },
  {
    id: 2,
    title: 'Time Series Forecasting',
    description: 'Learn the techniques and applications of time series forecasting in various domains.',
    content: 'Time series forecasting involves predicting future values based on previously observed values. It is widely used in finance, weather forecasting, supply chain management, and many other fields. This post provides an overview of time series analysis, including key concepts like stationarity, seasonality, and autocorrelation. We will explore different forecasting methods, such as ARIMA, exponential smoothing, and machine learning-based approaches.',
    url: 'https://www.google.com',
    expectedReadingTime: '20 minutes',
    imageUrl: '/blogs/timeSeries.jpg',
  },
  {
    id: 3,
    title: 'Recommendation Systems',
    description: 'Understand the workings of recommendation systems and their impact on various industries.',
    content: 'Recommendation systems are algorithms that suggest relevant items to users, such as products, movies, or articles. This post explores different types of recommendation systems, including collaborative filtering, content-based filtering, and hybrid methods. We will discuss the challenges in building recommendation systems, such as scalability and diversity, and provide examples of their applications in e-commerce, streaming services, and social media.',
    url: 'https://www.google.com',
    expectedReadingTime: '30 minutes',
    imageUrl: '/blogs/recommend.jpg',
  }
];
