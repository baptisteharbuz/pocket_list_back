import React, { useState } from 'react';

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
    { id: 5, name: 'Films à regarder', dateCreated: '2025-01-04' },
    { id: 6, name: 'Recettes à tester', dateCreated: '2025-01-06' },
  ];

  const itemsPerPage = 3; // Nombre de listes par page
  const [currentPage, setCurrentPage] = useState(1); // Page active

  // Calculer les listes à afficher pour la page active
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentLists = userLists.slice(indexOfFirstItem, indexOfLastItem);

  // Gestion du changement de page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Calcul du nombre total de pages
  const totalPages = Math.ceil(userLists.length / itemsPerPage);

  return (
    <div className={styles.MyListContainer}>
      <h1>Mes Listes</h1>
      <ul>
        {currentLists.map((list) => (
          <li key={list.id} className={styles.MyListCard}>
            <h2>{list.name}</h2>
            <p>Créée le {list.dateCreated}</p>
            <div className={styles.IconContainer}>
              <img src={Edit} alt='Icone modification' onClick={null} />
              <img src={Share} alt='Icone de partage' onClick={null} />
              <img src={Trash} alt='Icone de Poubelle' onClick={null} />
            </div>
          </li>
        ))}
      </ul>

      {/* Pagination */}
      <div className={styles.PaginationContainer}>
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            className={`${styles.PaginationButton} ${index + 1 === currentPage ? styles.ActiveButton : ''}`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
}
