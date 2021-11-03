import React from 'react';
import './styles.css';

import closeIcon from '../../assets/close-icon.png';

interface IProps {
  show: boolean;
  onClose(): void;
}


const ModalTransfer: React.FC<IProps> = (props) => {
  if (!props.show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <button className="button-modal-close" onClick={props.onClose}>
            <img src={closeIcon} alt="icon close"/>
          </button>
        </div>

        <div className="modal-body">
          <div className="block-transfer">
            <p>Parabens!, a transferência foi realizada com sucesso!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTransfer;