import { Route, Switch, BrowserRouter } from 'react-router-dom';

import Home from '../pages/Home/index.tsx';
import Dashboard from '../pages/Dashboard/index.tsx';

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/dashboard" component={Dashboard} />
    </Switch>
  </BrowserRouter>
)

export default Routes;