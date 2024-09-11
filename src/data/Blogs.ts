import { Blog } from '@/lib/datatypes';

export const BlogsData: Blog[] = [
  {
    id: 0,
    title: 'Linear Regression',
    description: 'Explore the fundamentals of linear regression, a basic yet powerful technique in machine learning.',
    url: 'https://example.com/blog/first-post',
    expectedReadingTime: '5 minutes',
    imageUrl: '/blogs/regression/linearRegression.jpg',
    blogUrl: '/allBlogs/LinearRegression'
  },
  {
    id: 1,
    title: 'Classification',
    description: 'A comprehensive guide to classification, a key technique in supervised learning.',
    url: 'https://www.google.com',
    expectedReadingTime: '15 minutes',
    imageUrl: '/blogs/classification/binaryClassification.jpg',
    blogUrl: '/allBlogs/Classification'
  },
  // {
  //   id: 2,
  //   title: 'Time Series Forecasting',
  //   description: 'Learn the techniques and applications of time series forecasting in various domains.',
  //   content: 'Time series forecasting involves predicting future values based on previously observed values. It is widely used in finance, weather forecasting, supply chain management, and many other fields. This post provides an overview of time series analysis, including key concepts like stationarity, seasonality, and autocorrelation. We will explore different forecasting methods, such as ARIMA, exponential smoothing, and machine learning-based approaches.',
  //   url: 'https://www.google.com',
  //   expectedReadingTime: '20 minutes',
  //   imageUrl: '/blogs/timeSeries.jpg',
  //   blogUrl: '/allBlogs/LinearRegression'

  // },
  // {
  //   id: 3,
  //   title: 'Recommendation Systems',
  //   description: 'Understand the workings of recommendation systems and their impact on various industries.',
  //   content: 'Recommendation systems are algorithms that suggest relevant items to users, such as products, movies, or articles. This post explores different types of recommendation systems, including collaborative filtering, content-based filtering, and hybrid methods. We will discuss the challenges in building recommendation systems, such as scalability and diversity, and provide examples of their applications in e-commerce, streaming services, and social media.',
  //   url: 'https://www.google.com',
  //   expectedReadingTime: '30 minutes',
  //   imageUrl: '/blogs/recommend.jpg',
  //   blogUrl: '/allBlogs/LinearRegression'
  // }
];
