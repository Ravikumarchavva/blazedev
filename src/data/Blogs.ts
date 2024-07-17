 import {Blog} from '@/types/datatypes';

 export const Blogs : Blog[] = [
    {
      id: 1,
      title: 'Regression',
      description: 'This is a sample regression post.',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vel justo id mauris tincidunt pharetra at et massa. Sed euismod, ligula vel placerat fermentum, velit nunc semper velit, ut fermentum ligula ex nec velit. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Donec in dui ac lectus pulvinar facilisis sed et lectus.',
      url: 'https://example.com/blog/first-post',
      expectedReadingTime: '5 minutes',
      imageUrl: 'https://example.com/image1.jpg',
    },
    // Add more blog posts here
 ];