import { Suspense, useEffect, lazy } from 'react';

import './App.css'
import { ComplexNavbar } from './presentation/components'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import {Routes,Route, Navigate} from 'react-router-dom';
import PersonView from './presentation/views/PersonView';

import { Provider } from 'react-redux';
import {ThemeProvider} from '@material-tailwind/react';
import { store } from './redux/sotre';
import { BrowserRouter } from 'react-router-dom';
import {RoutesWithNotFound} from './presentation/utils';
import { PrivateRoutes, PublicRoutes } from './interfaces';
import AuthGuard from './presentation/guards/auth_guard';


//Lazy components
const Login = lazy(()=> import('./presentation/pages/Login'));
const ListPerson = lazy(()=> import('./presentation/views/mantenedores/ListPerson'));

function App() {
  return (
    <div className='App'>
        <Suspense fallback={<>Cargando.....</>}>
            <Provider store={store}>
              <ThemeProvider>
                <BrowserRouter>
                  <ToastContainer/>
                  <ComplexNavbar/>
                    <RoutesWithNotFound>
                          <Route path={PublicRoutes.LOGIN} element={<Login/>}/>
                          <Route element={<AuthGuard privateValidation={true}/>}>
                                <Route path={PrivateRoutes.PERSONAS} element={<ListPerson/>}/>
                                <Route path={PrivateRoutes.PRIVATE} element={<PersonView title="pestaña prueba"/>}/>
                          </Route>
                          <Route path="/" element={<Navigate to={PublicRoutes.LOGIN} />} />
                    </RoutesWithNotFound>
                </BrowserRouter>
              </ThemeProvider>
            </Provider>
        </Suspense>
    </div>
  )
}

export default App
