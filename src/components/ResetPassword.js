import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lottie from 'react-lottie';
import checkedIcon from '../resources/img/comprobado.png';
import passwordAnimation from '../resources/lotties/password.json';
import PasswordStrengthChecker from './PasswordStrengthChecker';
import ModalFail from './modals/ModalFail';

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [contentModal, setContentModal] = useState('');
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get('token');
  const [showModalFail, setShowModalFail] = useState(false);

  const evaluatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength += 0.25;
    if (/[A-Z]/.test(password)) strength += 0.25;
    if (/[0-9]/.test(password)) strength += 0.25;
    if (/[^A-Za-z0-9]/.test(password)) strength += 0.25;
    return strength;
  };

  useEffect(() => {
    // Evaluar la fortaleza de la contraseña al cambiar el valor
    setPasswordStrength(evaluatePasswordStrength(newPassword));
  }, [newPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar fortaleza de la contraseña dentro del submit
    if (passwordStrength < 0.75) {
      setContentModal('La contraseña es débil. Por favor, elige una más fuerte.');
      setShowModalFail(true);
      return;
    }

    const data = {
      token: token,
      newPassword: newPassword,
    };

    try {
      const response = await fetch('http://localhost:8080/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSuccess(true); // Aquí se establece en true si la respuesta es correcta
      } else {
        setContentModal('Error al restablecer la contraseña');
        setShowModalFail(true); // Si hay un error, se puede mostrar el modal de error
      }
    } catch (error) {
      console.error('Error de red:', error);
      setContentModal('Error de red. Inténtalo de nuevo.'); // Mensaje de error en caso de fallo
      setShowModalFail(true);
    }
};  

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Restablecer Contraseña</h2>
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: passwordAnimation,
        }}
        height={300}
        width={300}
        style={styles.lottie}
      />
      {!isSuccess ? (
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputContainer}>
            <label htmlFor="newPassword" style={styles.label}>Nueva Contraseña:</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              style={styles.input}
            />
          </div>

          <ModalFail
            visible={showModalFail} 
            onClose={() => setShowModalFail(false)} 
            title="Contraseña Débil" 
            content={contentModal} 
          />

          <PasswordStrengthChecker strength={passwordStrength} />

          <button type="submit" style={styles.button}>Restablecer Contraseña</button>
        </form>
      ) : (
        <div style={styles.successContainer}>
          <img src={checkedIcon} alt="Comprobado" style={styles.icon} />
          <h3 style={styles.successMessage}>CONTRASEÑA RESTABLECIDA</h3>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: '#f8f9fa',
    height: '100vh',
  },
  title: {
    color: '#343a40',
    marginBottom: '20px',
  },
  lottie: {
    marginBottom: '20px',
  },
  form: {
    width: '100%',
    maxWidth: '400px',
  },
  inputContainer: {
    marginBottom: '20px',
  },
  label: {
    display: 'block',
    marginBottom: '8px',
    color: '#495057',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ced4da',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '100%',
  },
  successContainer: {
    textAlign: 'center',
    marginTop: '20px',
  },
  icon: {
    width: '50px',
    height: '50px',
    marginBottom: '10px',
  },
  successMessage: {
    color: '#28a745',
    fontWeight: 'bold',
  },
};

export default ResetPassword;
