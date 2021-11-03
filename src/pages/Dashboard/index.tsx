import { Form } from '@unform/web';
import { useCallback, useState } from 'react';
import Input from '../../components/Input';
import Modal from '../../components/modal';
import ModalTransfer from '../../components/modalTransfer';
import { useAccount } from '../../hooks/account';
import { apiTransfers } from '../../services/apiAccount';
import './styles.css';

interface TransfersProperties {
  key: string;
  pixType: string;
  description: string;
  amount: string;
}

const Dashboard = () => {
  const [ show, setShow ] = useState(false);
  const [transferModal, setTransferModal] = useState(false);
  const [funcionou, setFuncionou] = useState(false);

  const { account  } = useAccount();

  const createTransferHandle = useCallback(async (data: TransfersProperties) => {
    try {
      await apiTransfers.post("/transfers", {
        key: data.key,
        pixType: data.pixType,
        description: data.description,
        amount: parseFloat(data.amount)
      });
      
      setFuncionou(true);
    } catch (error) {
      console.log("Ocorreu um error");
    }

  }, [])

  return (
    <>
      <p className="saudacao">
        Seja Bem vindo! <br/>
        {`${account.firstName} ${account.lastName}`} 
      </p>

      <div className="App2">
        <div className="block2">
          <h2 className="titleh2">
            Informações 
            <br/>da conta
          </h2>

          <div className="block-account-info">
            <p>Agencia</p>
            <p>{account.bankBranch}</p>
          </div>

          <div className="block-account-info">
            <p>Codigo do banco</p>
            <p>{account.bankCode}</p>
          </div>

          <div className="block-account-info">
            <p>Numero da conta</p>
            <p>{account.accountNumber}</p>
          </div>
          
        </div>

        <div className="block2">
          <h2 className="titleh2">
            Chaves <br/>
            PIX
          </h2>

          {account.pixs.length <= 0 ? 
            <div className="block-without-pix">
              <p>Você não tem nenhuma <br/> chave pix criada!</p>
            </div> 
            : account.pixs.map(pix =>  {

                if (pix.pixType !== "Random") {
                  return (
                    <div className="block-pix-key" key="some-key">
                      <p>{pix.pixType}</p>
                      <p>{pix.key}</p>
                    </div>
                  )
                }
                
                return (
                  <div className="block-pix-key block-pix-key-random">
                    <p>{pix.pixType}</p>
                    <p>{pix.key}</p>
                  </div>
                )
            })}

          <button className="button2" onClick={() => setShow(true)}>
              <p>CRIAR PIX</p>
          </button>
        </div>

        <Modal onClose={() => setShow(false) } show={show}/>

        <div className="block2">
          <h2 className="titleh2">
            Fazer <br/>
            Transferência
          </h2>
          
          <Form className="formulario-transferencia" onSubmit={createTransferHandle}>
            <Input name="key" placeholder="Chave pix*"></Input>
            <Input name="pixType" placeholder="Tipo da chave*"></Input>
            <Input name="description" placeholder="Descrição"></Input>
            <Input name="amount" placeholder="Valor*"></Input>

            <button className="button2" type="submit" onClick={() => setTransferModal(true)}>
              <p>FAZER TRANSFERÊNCIA</p>
            </button> 
          </Form>
        </div>

        <ModalTransfer onClose={() => setTransferModal(false)} show={funcionou === true ? transferModal : false}/>
      </div>
    </>
  )
};

export default Dashboard;