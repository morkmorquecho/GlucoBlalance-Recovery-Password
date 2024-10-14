import React from 'react';
import { ProgressBar } from 'react-bootstrap'; // Utilizamos react-bootstrap para la barra de progreso
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de importar los estilos de Bootstrap

const PasswordStrengthChecker = ({ strength }) => {

  const getBarColor = () => {
    if (strength >= 0 && strength < 0.25) {
      return 'danger'; // Rojo
    } else if (strength < 0.5) {
      return 'warning'; // Amarillo
    } else if (strength < 0.75) {
      return 'info'; // Azul
    } else {
      return 'success'; // Verde
    }
  };

  return (
    <div style={styles.container}>
      <p style={styles.strengthText}>Seguridad: {Math.floor(strength * 100)}%</p>
      <ProgressBar 
        now={strength * 100} 
        variant={getBarColor()} 
        style={styles.progressBar} 
      />
    </div>
  );
};

const styles = {
  container: {
    marginTop: 5,
    marginBottom: 20,
    padding: 12,
  },
  strengthText: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  progressBar: {
    height: '10px',
  },
};

export default PasswordStrengthChecker;
