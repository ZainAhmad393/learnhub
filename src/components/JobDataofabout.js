import { FaLinkedin, FaTwitter } from 'react-icons/fa';
import employee1 from './../assets/about/em1.jpg';
import employee2 from './../assets/about/em2.jpg';
import employee3 from './../assets/about/em3.jpg';
import employee4 from './../assets/about/em5.jpg';
export const teamMembers = [
    { 
        id: 1, 
        name: 'Julia', 
        role: 'CEO & Founder', 
        bio: 'Visionary leader with 20+ years in EdTech, focused on democratizing high-quality education globally.',
        image: employee1,
        social: { linkedin: '#', twitter: '#' }
    },
    { 
        id: 2, 
        name: 'Winston', 
        role: 'Head of Curriculum', 
        bio: 'Former university professor dedicated to designing engaging and industry-relevant course material.',
        image: employee2,
        social: { linkedin: '#', twitter: '#' }
    },
    { 
        id: 3, 
        name: 'Gwen', 
        role: 'Lead Platform Architect', 
        bio: 'Specialist in scalable cloud infrastructure and high-performance React applications.',
        image: employee3,
        social: { linkedin: '#', twitter: '#' }
    },
    { 
        id: 4, 
        name: 'Bruce', 
        role: 'Chief Marketing Officer', 
        bio: 'Expert in digital growth strategies and building strong educational communities.',
        image: employee4,
        social: { linkedin: '#', twitter: '#' }
    },
];

export const milestones = [
    { year: 2020, title: 'Company Founded', description: 'Began development with a focus on interactive virtual classrooms.' },
    { year: 2021, title: 'First 10K Users', description: 'Successfully launched Beta program and achieved 10,000 active enrollments.' },
    { year: 2022, title: 'Global Expansion', description: 'Courses localized for five major international markets across Asia and Europe.' },
    { year: 2023, title: 'Series B Funding', description: 'Secured significant investment to expand AI-driven learning tools.' },
];
