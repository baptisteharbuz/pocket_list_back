import React from 'react';

//STYLES
import styles from './MyList.module.css';

//ASSETS
import Edit from "../ASSETS/Edit.svg";
import Share from "../ASSETS/Share.svg";
import Trash from "../ASSETS/Trash.svg";


export default function MyList() {
  const userLists = [
    { id: 1, name: 'Liste des courses', dateCreated: '2025-01-05' },
    { id: 2, name: 'Projets à terminer', dateCreated: '2025-01-03' },
    { id: 3, name: 'Vacances d\'été', dateCreated: '2025-01-01' },
    { id: 4, name: 'Livres à lire', dateCreated: '2025-01-02' },
  ];

  return (
    <div className={styles.MyListContainer}>
      <h1>Mes Listes</h1>
      <ul>
        {userLists.map((list) => (
          <li key={list.id} className={styles.MyListCard}>
            <h2>{list.name}</h2>
            <p>Créée le {list.dateCreated}</p>
            <div className={styles.IconContainer}>

              <img src={Edit}  alt='Icone modification' onClick={null}/>
              <img src={Share} alt='Icone de partage'   onClick={null}/>
              <img src={Trash} alt='Icone de Poubelle'  onClick={null}/>
              
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
