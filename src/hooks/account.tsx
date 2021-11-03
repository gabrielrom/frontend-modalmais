import React, { createContext, useState, useCallback, useContext } from 'react';
import { apiAccount } from '../services/apiAccount';

interface AccountState {
  data: Account;
}

interface Credentials {
  nome: string; 
  sobrenome: string; 
  cpf: string; 
  email: string; 
  celular: string;
}

interface PixData {
  key: string;
  pixType: string;
}

interface Account {
  id: string;
  firstName: string;
  lastName: string;
  bankCode: string;
  bankBranch: string;
  accountNumber: string;
  documentImages: [];
  createdAt: string;
  pixs: Array<PixData>;
}

interface AccountContextData {
  account: Account;
  createAccount(credentials: Credentials): Promise<void>;
  createPix(pixData: PixData): Promise<void>;
}

const AccountContext = createContext({} as AccountContextData);

const AccountProvider: React.FC = ({ children }) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [account, setAccount] = useState<AccountState>(() => {

    const account = localStorage.getItem('@Modalmais:account');

    if (account) {
      return { data: JSON.parse(account) };
    }

    return {} as AccountState;
  });

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const createAccount = useCallback(async ({ nome, sobrenome, cpf, email, celular }) => {
    var ddd = celular.substring(0, 2);
    var numero = celular.substring(2);

    const response = await apiAccount.post('/accounts', { 
      firstName: nome,
      lastName: sobrenome,
      documentNumber: {
        digits: cpf
      },
      phone: {
        ddd: ddd,
        number: numero
      },
      email: {
        value: email
      }
    });

    const { data } = response.data;

    localStorage.setItem('@Modalmais:account', JSON.stringify(data));

    setAccount({ data });
  }, []);

  const createPix = useCallback(async ({ key, pixType }) => {
    let response;
     
    if (pixType === "Random") {
      response = await apiAccount.post(`/accounts/${account.data.id}/pix`, {
        pixType
      });
    } else {
      response = await apiAccount.post(`/accounts/${account.data.id}/pix`, {
        key,
        pixType
      });
    }

    const { data } = response.data;
    account.data.pixs.push(data);

    const accountStoraged = localStorage.getItem('@Modalmais:account');
    const accountStoragedParsed : Account = accountStoraged !== null ? JSON.parse(accountStoraged) : console.log("não tem nada");

    accountStoragedParsed.pixs.push(data);

    localStorage.setItem('@Modalmais:account', JSON.stringify(accountStoragedParsed));
  }, [account.data]);

  return (
    <AccountContext.Provider value={{ account: account.data, createAccount, createPix }}>
      {children}
    </AccountContext.Provider>
  );
}

function useAccount(): AccountContextData {
  const context = useContext(AccountContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

export { AccountProvider, useAccount };