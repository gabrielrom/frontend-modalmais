import './App.css';
import { AccountProvider } from './hooks/account';
import Routes from './routes';

function App() {
  return (
    <AccountProvider>
      <Routes />
    </AccountProvider>
  );
}

export default App;
