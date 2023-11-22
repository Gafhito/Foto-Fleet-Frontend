
function detectarDesbordamiento() {
  const elementosDesbordados = Array.from(document.querySelectorAll('*')).filter(elemento => {
    const estilos = getComputedStyle(elemento);
    return elemento.offsetWidth > elemento.scrollWidth || elemento.offsetHeight > elemento.scrollHeight;
  });

  console.log('Elementos desbordados:', elementosDesbordados);
}

detectarDesbordamiento();