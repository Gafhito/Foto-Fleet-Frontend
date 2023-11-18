import { Button } from "../common/button/Button";

import { colors } from "../../utils/constants";

export const PaginationNumbers = ({ totalPages, currentPage, changePage }) => {
  const pagesToShow = 6;
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const handleClick = (page) => {
    changePage(page);
  };

  return (
    <div style={{marginRight: '1rem'}}>
      {pages.length <= pagesToShow ? (
        // Mostrar todos los números de página
        pages.map((page) => (
          <Button minWidth={'16px'} color={colors.blackColor} label={page} key={page} onClick={() => handleClick(page)} disabled={currentPage === page}>
            {page}
          </Button>
        ))
      ) : (
        // Mostrar los primeros 5 números de página, puntos suspensivos y el último número de página
        <>
          {pages.slice(0, pagesToShow - 1).map((page) => (
            <Button key={page} onClick={() => handleClick(page)} disabled={currentPage === page}>
              {page}
            </Button>
          ))}
          <span>...</span>
          <Button onClick={() => handleClick(pages[pages.length - 1])} disabled={currentPage === pages[pages.length - 1]}>
            {pages[pages.length - 1]}
          </Button>
        </>
      )}
    </div>
  );
};