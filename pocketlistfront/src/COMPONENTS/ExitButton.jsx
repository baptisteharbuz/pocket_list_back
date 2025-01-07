import React from 'react';
// ASSETS
import Logout from '../ASSETS/Logout.svg';
// STYLES
import styles from './ExitButton.module.css';
// Navigate
import { useNavigate } from 'react-router-dom';

export default function ExitButton() {
  const navigate = useNavigate();

  const handleDisconnect = () => {
    localStorage.removeItem('authToken');
    // Rediriger vers la page de connexion
    navigate('/');
  };

  return (
    <div className={styles.ExitButtonContainer}>
      <img 
        src={Logout} 
        alt="Déconnexion"
        onClick={handleDisconnect} 
        className={styles.LogoutIcon} 
      />
    </div>
  );
}
