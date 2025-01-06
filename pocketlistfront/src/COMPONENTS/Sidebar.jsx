import React from 'react'
import { Link } from 'react-router-dom';

// STYLES
import styles from './Sidebar.module.css';

export default function Sidebar() {
  return (
    <div className={styles.ContainerSidebar}>
        <div className={styles.BoxListLink}>
            <li><Link to='/WelcomePLus' className='Link'>Ajouter Une Liste</Link></li>
            <li><Link to="/MyList" className='Link'>Mes Listes</Link></li>
            <li><Link to="/SharedList" className='Link'>Listes Partager</Link></li>
        </div>
    </div>
  )
}
