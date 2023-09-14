import { MdEmail, MdCall, MdLocationPin } from "react-icons/md";
import {
  FaFacebookSquare,
  FaTwitterSquare,
  FaGooglePlusSquare,
} from "react-icons/fa";

export const footerData = [
  {
    id: 1,
    title: "Find Us",
    description: "1010 Avenue, SW 54321, Chandigarh",
    iconSrc: <MdLocationPin size={40} color="#F54748" />,
  },
  {
    id: 2,
    title: "Call Us",
    description: "98746548210",
    iconSrc: <MdCall size={40} color="#F54748" />,
  },
  {
    id: 3,
    title: "Email Us",
    description: "contact@pizzalicious.com",
    iconSrc: <MdEmail size={40} color="#F54748" />,
  },
];

export const footerLinks = [
    {
        id: 1,
        name: 'Home',
        path: '/'
    },
    {
        id: 2,
        name: 'Menu',
        path: '/'
    },
    {
        id: 3,
        name: 'Contact',
        path: '/'
    },
]

export const followLinks = [
  {
    id: 1,
    iconSrc: <FaFacebookSquare size={40} color="F54748"/>,
    path: "/",
  },
  {
    id: 2,
    iconSrc: <FaTwitterSquare size={40} color="F54748"/>,
    path: "/",
  },
  {
    id: 3,
    iconSrc: <FaGooglePlusSquare size={40} color="F54748"/>,
    path: "/",
  },
];
