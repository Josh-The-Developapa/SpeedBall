// Product Images - First batch
import Product3 from '../assets/Black-Jacket.jpg';
import Product4 from '../assets/Brown-Jacket.jpg';
import Product5 from '../assets/Cart-Img.jpg';
import Product6 from '../assets/Brown-Pants.jpg';
import Product7 from '../assets/Brown-Jorts.png';
import Product8 from '../assets/Black-Tank.jpg';

// Product Images - Second batch
import Product10 from '../assets/Brown-Jacket2.png';
import Product11 from '../assets/Black-pants2.png';
import Product12 from '../assets/Black-Jacket2.jpg';
import Product13 from '../assets/Brown-Pants2.jpg';
import Product14 from '../assets/Brown-Jorts2.jpg';
import Product15 from '../assets/White-Tank.jpg';

// Brand Assets
import YourModelImage from '../assets/RS4.png';
import RandomShi from '../assets/rando-shi.png';

// Centralized product data
export const productsData = [
  {
    id: 3,
    name: 'Black Jacket',
    urlName: 'black-jacket',
    price: 60000,
    images: [Product12, Product3],
    sizes: ['L', 'XL', 'XXL'],
  },
  {
    id: 4,
    name: 'Brown Jacket',
    urlName: 'brown-jacket',
    price: 60000,
    images: [Product4, Product10],
    sizes: ['L', 'XL', 'XXL'],
  },
  {
    id: 5,
    name: 'Black Pants',
    urlName: 'black-pants',
    price: 60000,
    images: [Product5, Product11],
    sizes: ['L', 'XL', 'XXL'],
  },
  {
    id: 6,
    name: 'Brown Pants',
    urlName: 'brown-pants',
    price: 60000,
    images: [Product6, Product13],
    sizes: ['L', 'XL', 'XXL'],
  },
  {
    id: 7,
    name: 'Brown Jorts',
    urlName: 'brown-jorts',
    price: 60000,
    images: [Product14, Product7],
    sizes: ['L', 'XL', 'XXL'],
  },
  {
    id: 8,
    name: 'White Tank Top',
    urlName: 'white-tank-top',
    price: 35000,
    images: [Product15],
    sizes: ['S', 'M', 'L'],
  },
  {
    id: 9,
    name: 'Black Tank Top',
    urlName: 'black-tank-top',
    price: 35000,
    images: [Product8],
    sizes: ['S', 'M', 'L'],
  },
];

// Brand assets export
export const brandAssets = {
  modelImage: YourModelImage,
  logo: RandomShi,
};

// Swiper configuration
export const swiperConfig = {
  spaceBetween: 30,
  loop: true,
  autoplay: { delay: 3000, disableOnInteraction: false },
  pagination: {
    clickable: true,
    bulletClass: 'swiper-pagination-bullet custom-bullet',
    bulletActiveClass: 'swiper-pagination-bullet-active custom-bullet-active',
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1024: { slidesPerView: 3 },
  },
};

// Product card image cycling configuration
export const productCardConfig = {
  autoImageCycle: true,
  imageDelay: 2500, // 2.5 seconds between images
  pauseOnHover: true, // Pause cycling on desktop hover
};

// Brand text content
export const brandContent = {
  description:
    'Rooted in the energy of the streets, our brand is built for those who move against the grain, challenge norms, and carve out their own space in the world.',
  productDescription:
    'Rooted in the energy of the streets, our brand is built for those who move against the grain, challenge norms, and carve out their own space in the world. Premium quality materials meet street-inspired design.',
};
