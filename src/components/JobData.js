import { FaHeart, FaHandsHelping, FaPills, FaPlane, FaDumbbell } from 'react-icons/fa';

export const initialJobData = [
    { id: 1, title: 'Senior Frontend Developer', department: 'Engineering', location: 'Remote', type: 'Full-time', posted: '1 day ago' },
    { id: 2, title: 'Data Analyst', department: 'Product', location: 'Lahore, PK', type: 'Full-time', posted: '3 days ago' },
    { id: 3, title: 'UI/UX Designer', department: 'Design', location: 'Karachi, PK', type: 'Full-time', posted: '1 week ago' },
    { id: 4, title: 'Customer Support Specialist', department: 'Operations', location: 'Remote', type: 'Contract', posted: '2 weeks ago' },
    { id: 5, title: 'Product Manager', department: 'Product', location: 'Remote', type: 'Full-time', posted: '3 weeks ago' },
];

export const benefitsData = [
    { icon: FaHeart, title: 'Health Insurance', description: 'Comprehensive medical coverage for you and your family.' },
    { icon: FaHandsHelping, title: 'Generous PTO', description: 'Flexible paid time off to recharge and pursue personal goals.' },
    { icon: FaPills, title: 'Wellness Stipend', description: 'Funds to support your fitness and mental health journey.' },
    { icon: FaPlane, title: 'Remote Work', description: 'Work from anywhere with flexible hours (Time zone limits apply).' },
    { icon: FaDumbbell, title: 'Gym Membership', description: 'Subsidized membership to any major local gym chain.' },
];
