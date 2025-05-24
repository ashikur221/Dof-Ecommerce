// news related images 
import new1 from '@/assets/blogs/news1.png'
import new2 from '@/assets/blogs/news2.png'
import new3 from '@/assets/blogs/news3.png'

// testimonial related image 
import profile1 from '@/assets/images/profile1.png'
import profile2 from '@/assets/images/profile2.png'
import profile3 from '@/assets/images/profile3.png'

// social Icons 
import icon1 from '@/assets/images/social/company1.png';
import icon2 from '@/assets/images/social/company2.png';
import icon3 from '@/assets/images/social/company3.png';
import icon4 from '@/assets/images/social/company4.png';
import icon5 from '@/assets/images/social/company5.png';
import icon6 from '@/assets/images/social/company6.png';

// insta images 
import insta1 from '@/assets/images/social/insta/insta1.png';
import insta2 from '@/assets/images/social/insta/insta2.png';
import insta3 from '@/assets/images/social/insta/insta3.png';
import insta4 from '@/assets/images/social/insta/insta4.png';
import insta5 from '@/assets/images/social/insta/insta5.png';
import insta6 from '@/assets/images/social/insta/insta6.png';
import { assets } from './Assets'

export const dofProducts = [
  {
    id: 'daf14',
    name: '১৪" সাইজ দফ',
    image: assets.daf14,
    price: 2700,
    discountPrice: 2550,
    description: '১৪ ইঞ্চির দফ, সাউন্ড কোয়ালিটি ও ব্যবহারে হালকা। মাহফিল ও বাসায় ব্যবহারে আদর্শ।',
    specs: ['সাইজ: ১৪ ইঞ্চি', 'মেটেরিয়াল: কাঠ ও চামড়া', 'ওজন: ১.০ কেজি']
  },
  {
    id: 'daf16',
    name: '১৬" সাইজ দফ',
    image: assets.daf16,
    price: 3000,
    discountPrice: 2750,
    description: '১৬ ইঞ্চির দফ, মজবুত কাঠ, মসজিদ ও ইভেন্টে ব্যবহারের জন্য উপযোগী।',
    specs: ['সাইজ: ১৬ ইঞ্চি', 'মেটেরিয়াল: উন্নত কাঠ', 'ওজন: ১.২ কেজি']
  },
  {
    id: 'daf18',
    name: '১৮" সাইজ দফ',
    image: assets.daf18,
    price: 3500,
    discountPrice: 2950,
    description: '১৮ ইঞ্চির বড় দফ, গভীর সাউন্ড ও প্রো পারফর্মারদের জন্য তৈরি।',
    specs: ['সাইজ: ১৮ ইঞ্চি', 'মেটেরিয়াল: হাই গ্রেড কাঠ', 'ওজন: ১.৫ কেজি']
  }
];


const latestNews = [
  {
    id: 1,
    image: new1,
    title: `The Art of Food: A Journey Through Flavors and Cultures`,
    desc: `Food is more than just sustenance; it's an experience, a journey through cultures, and an expression of art. From the sizzling street food of Asia to the rich, comforting flavors of Italian cuisine, every dish tells a story. In this blog, we explore the beauty of food, its cultural significance, and how it brings people together across the globe. Whether you're a foodie, a home cook, or an adventurous eater, this blog will take you on a delicious ride through the world of flavors.`
  },
  {
    id: 2,
    image: new2,
    title: `The Art of Food: A Journey Through Flavors and Cultures`,
    desc: `Food is more than just sustenance; it's an experience, a journey through cultures, and an expression of art. From the sizzling street food of Asia to the rich, comforting flavors of Italian cuisine, every dish tells a story. In this blog, we explore the beauty of food, its cultural significance, and how it brings people together across the globe. Whether you're a foodie, a home cook, or an adventurous eater, this blog will take you on a delicious ride through the world of flavors.`
  },
  {
    id: 3,
    image: new3,
    title: `The Art of Food: A Journey Through Flavors and Cultures`,
    desc: `Food is more than just sustenance; it's an experience, a journey through cultures, and an expression of art. From the sizzling street food of Asia to the rich, comforting flavors of Italian cuisine, every dish tells a story. In this blog, we explore the beauty of food, its cultural significance, and how it brings people together across the globe. Whether you're a foodie, a home cook, or an adventurous eater, this blog will take you on a delicious ride through the world of flavors.`
  }
]

const testimonials = [
  {
    id: 1,
    testimonial: `Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget`,
    name: 'Robert Fox',
    designation: 'Customer',
    profile: profile1,
    star: 5
  },
  {
    id: 2,
    testimonial: `Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget`,
    name: 'Robert Fox',
    designation: 'Customer',
    profile: profile2,
    star: 4
  },
  {
    id: 3,
    testimonial: `Pellentesque eu nibh eget mauris congue mattis mattis nec tellus. Phasellus imperdiet elit eu magna dictum, bibendum cursus velit sodales. Donec sed neque eget`,
    name: 'Robert Fox',
    designation: 'Customer',
    profile: profile3,
    star: 4
  }

]

const socialIcons = [
  {
    id: 1,
    icon: icon1
  },
  {
    id: 2,
    icon: icon2
  },
  {
    id: 3,
    icon: icon3
  },
  {
    id: 4,
    icon: icon4
  },
  {
    id: 5,
    icon: icon5
  },
  {
    id: 6,
    icon: icon6
  }

]

const instaImages = [
  {
    id: 1,
    image: insta1
  },
  {
    id: 2,
    image: insta2
  },
  {
    id: 3,
    image: insta3
  },
  {
    id: 4,
    image: insta4
  },
  {
    id: 5,
    image: insta5
  },
  {
    id: 6,
    image: insta6
  }
]


export { latestNews, testimonials, socialIcons, instaImages }