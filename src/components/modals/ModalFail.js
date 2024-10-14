import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useSpring, animated } from '@react-spring/web';
import error from '../../resources/img/eliminar.png';

const ModalFail = ({ visible, onClose, title, content }) => {
  const [show, setShow] = useState(visible);

  const shakeAnimation = useSpring({
    from: { transform: 'translateX(0px)' },
    to: async (next) => {
      await next({ transform: 'translateX(-10px)' });
      await next({ transform: 'translateX(10px)' });
      await next({ transform: 'translateX(-10px)' });
      await next({ transform: 'translateX(0px)' });
    },
    config: { duration: 50 },
    reset: true,
  });

  useEffect(() => {
    if (visible) {
      setShow(true);
    } else {
      setShow(false);
    }
  }, [visible]);

  return (
    <Modal show={show} onHide={onClose} centered backdrop="static" keyboard={false}>
      <animated.div style={shakeAnimation}>
        <Modal.Header style={{ backgroundColor: '#f8f9fa', borderBottom: 'none', textAlign: 'center' }}>
          <Modal.Title style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.5rem', fontWeight: 'bold' }}>
            {title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ textAlign: 'center', padding: '2rem' }}>
          <img
            src={error}
            alt="Icono de error"
            width={80}
            height={80}
            style={{
              marginBottom: '20px',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              borderRadius: '50%',
            }}
          />
          <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '1.1rem', color: '#555' }}>{content}</p>
        </Modal.Body>
        <Modal.Footer style={{ borderTop: 'none', justifyContent: 'center' }}>
          <Button
            variant="primary"
            onClick={onClose}
            style={{
              backgroundColor: '#007bff',
              border: 'none',
              borderRadius: '50px',
              padding: '10px 30px',
              fontFamily: 'Arial, sans-serif',
              fontSize: '1rem',
              boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'background-color 0.3s ease',
            }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#0056b3')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#007bff')}
          >
            Ok
          </Button>
        </Modal.Footer>
      </animated.div>
    </Modal>
  );
};

export default ModalFail;
