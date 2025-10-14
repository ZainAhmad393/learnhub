import React from 'react';
import styles from './../stylesheet/about.module.css';
import { FaLaptopCode, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { teamMembers, milestones } from './JobDataofabout'; 
import imageheader from './../assets/stduying.jpg'
import Navbar from './Navbar';
import Footer from './Footer';
const About = () => {
    return (
        <div className={styles.pageContainer}>
            <Navbar />
            
            {/* Section 1: Hero & Mission */}
            <section className={styles.heroSection}>
                <div className={styles.container}>
                    <div className={styles.missionContent}>
                        <div className={styles.missionText}>
                            <h1>Our Mission: <br/> Empowering Tomorrow's Learners.</h1>
                            <p>
                                LearnHub was founded on the belief that high-quality, practical education should be accessible to everyone, everywhere. We transform complex subjects into engaging, easy-to-digest courses through interactive technology and expert instruction.
                            </p>
                            <p>
                                We are committed to fostering a global community where curiosity is rewarded and professional growth is limitless. Our goal is not just to teach, but to equip learners with the skills necessary for the modern digital economy.
                            </p>
                        </div>
                        <img 
                        src={imageheader}
                            alt="Mission Vision Illustration" 
                            className={styles.missionImage}
                        />
                    </div>
                </div>
            </section>

            {/* Section 2: Our Team */}
            <section className={styles.teamSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Meet the Innovators</h2>
                        <p className={styles.sectionSubtitle}>
                            Behind every great course is a dedicated team. Meet the experts driving our platform's success and guiding our educational philosophy.
                        </p>
                    </div>
                    
                    <div className={styles.teamGrid}>
                        {teamMembers.map(member => (
                            <div key={member.id} className={styles.teamCard}>
                                <img src={member.image} alt={member.name} className={styles.memberImage} />
                                <h4 className={styles.memberName}>{member.name}</h4>
                                <p className={styles.memberRole}>{member.role}</p>
                                <p className={styles.memberBio}>{member.bio}</p>
                                <div className={styles.socialIcons}>
                                    <a href={member.social.linkedin} target="_blank" rel="noopener noreferrer">
                                        <FaLinkedin size={20} />
                                    </a>
                                    <a href={member.social.twitter} target="_blank" rel="noopener noreferrer">
                                        <FaTwitter size={20} />
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Section 3: Milestones & History */}
            <section className={styles.milestonesSection}>
                <div className={styles.container}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>Our Journey So Far</h2>
                        <p className={styles.sectionSubtitle}>
                            From a small startup to a global learning platform—explore the key moments that defined our growth.
                        </p>
                    </div>
                    
                    <div className={styles.milestoneContainer}>
                        {milestones.map((milestone, index) => (
                            <div key={index} className={styles.milestoneItem}>
                                <div className={styles.milestoneCard}>
                                    <p className={styles.milestoneYear}>{milestone.year}</p>
                                    <h4 className={styles.milestoneTitle}>{milestone.title}</h4>
                                    <p className={styles.milestoneDescription}>{milestone.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
}

export default About;
