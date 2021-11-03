import { useCallback, useRef } from 'react';
import { Form } from '@unform/web';
import { useHistory } from 'react-router-dom';

import logo from '../../assets/logo-modalmais.png';
import './styles.css';
import { useAccount } from '../../hooks/account';
import Input from '../../components/Input';
import { FormHandles } from '@unform/core';

interface CreateAccountFormData {
  nome: string;
  sobrenome: string;
  cpf: string;
  email: string;
  celular: string;
}

const Home = () => {
  const formRef = useRef<FormHandles>(null);
  const history = useHistory();
  const { createAccount } = useAccount();

  const handleSubmit = useCallback(async (data: CreateAccountFormData) => {
    try {
      await createAccount({ 
        nome: data.nome, 
        sobrenome: data.sobrenome, 
        cpf: data.cpf,
        email: data.email, 
        celular: data.celular 
      });

      history.push('/dashboard');
    } catch(err) {
      console.log("Ocorreu um error");
    }
  }, [createAccount, history]);

  return (
    <div className="App1">
      <div>
        <img src={logo} alt="Modalmais logo"/>
        
        <h1 className="p1">
          Um banco digital <br/>
          Sem taxas <br/>
          Sem tarifas
        </h1>
        
        <p className="p2">
          E com tudo o que você precisa <br/>
          Na palma da sua mão.
        </p>
        
      </div>
        
      <div className="block">
        <h2 className="titleh2">Abra a sua conta agora. <br/> É grátis!</h2>
        
        <Form ref={formRef} className="formulario" onSubmit={handleSubmit}>
          <Input name="nome" placeholder="Nome*" />
          <Input name="sobrenome" placeholder="Sobrenome*" />
          <Input name="cpf" placeholder="CPF*" />
          <Input name="email" placeholder="E-mail*" />
          <Input name="celular" placeholder="Celular*" />

          <button className="button1" type="submit">
            <p>ABRA SUA CONTA</p>
          </button>
        </Form>
      </div>
    </div>
  );
};
  
export default Home;