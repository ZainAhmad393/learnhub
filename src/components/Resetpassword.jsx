// src/pages/ResetPasswordPage.jsx
import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom'; // ✅ Link ko import karen
import axios from 'axios';
import styles from '../stylesheet/ResetPasswordPage.module.css'; // ✅ ResetPasswordPage.module.css use karen
import { toast } from 'react-toastify';

const API_URL = import.meta.env.VITE_BACKEND_API_URL || 'http://localhost:5000/api/auth';

const ResetPasswordPage = () => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const { resetToken } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        if (password !== confirmPassword) {
            toast.error('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                },
            };

            const { data } = await axios.put(
                `${API_URL}/resetpassword/${resetToken}`,
                { password },
                config
            );

            toast.success(data.message || 'Password reset successful! Please login.');
            navigate('/login');

        } catch (error) {
            console.error('Password Reset Error:', error);
            toast.error(error.response?.data?.message || 'Failed to reset password.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className={styles.authPageContainer}>
            <div className={styles.authCard}>
                <h2 className={styles.authTitle}>Reset Your Password</h2>
                <p className={`${styles.authSubtitle} w-100`}>Enter your new password below to regain access to your account.</p> {/* ✅ Added a subtitle */}
                <form onSubmit={handleSubmit} className={styles.authForm}>
                    <div className={styles.formGroup}>
                        <label htmlFor="password">New Password</label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="••••••••" /* Modern placeholder */
                            required
                            className={styles.formControl}
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="confirmPassword">Confirm New Password</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••" /* Modern placeholder */
                            required
                            className={styles.formControl}
                        />
                    </div>
                    <button type="submit" className={styles.authButton} disabled={loading}>
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
                {/* Optional: Back to Login link */}
                <Link to="/login" className={styles.backToLogin}>Back to Login</Link>
            </div>
        </div>
    );
};

export default ResetPasswordPage;