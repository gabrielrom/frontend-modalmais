import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import React, { useCallback, useRef } from 'react';
import Input from '../Input';
import './styles.css';

import closeIcon from '../../assets/close-icon.png';
import { useAccount } from '../../hooks/account';

interface IProps {
  show: boolean;
  onClose(): void;
}

interface CreatePixFormData {
  chave: string;
  pixType: string;
}

const Modal: React.FC<IProps> = (props) => {
  const formRef = useRef<FormHandles>(null);
  const { createPix } = useAccount();

  const handleSubmit = useCallback(async (data: CreatePixFormData) => {
    try {
      await createPix({ 
        key: data.chave,
        pixType: data.pixType
      });

      alert("Pix criado com sucesso!");

    } catch(err) {
      console.log("Ocorreu um error");
    }
  }, [createPix]);

  const handleSubmitPixRandom = useCallback(async () => {
    try {
      await createPix({ 
        key: "",
        pixType: "Random"
      });

      alert("Pix criado com sucesso!");

    } catch(err) {
      console.log("Ocorreu um error");
    }
  }, [createPix]);
  

  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h4 className="modal-title">Crie sua chave <br /> pix agora!</h4>
          <button className="button-modal-close" onClick={props.onClose}>
            <img src={closeIcon} alt="icon close"/>
          </button>
        </div>
        <Form ref={formRef} className="modal-body" onSubmit={handleSubmit}>
          <Input name="chave" placeholder="chave*" className="input-modal"/>
          <Input name="pixType" placeholder="tipo da chave*" className="input-modal" />

          <div className="modal-footer">
            <button className="button-modal" type="submit">
              <p>CRIAR PIX</p>
            </button>
          </div>
        </Form> 

        <button className="button-modal-random" onClick={handleSubmitPixRandom}>
          <p>GERAR PIX ALEATORIO</p>
        </button> 
      </div>
    </div>
  );
};

export default Modal;