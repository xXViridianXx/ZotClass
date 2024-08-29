import { Provider } from 'react-redux';
import store from './redux/store/store';
import Main from './Main';
// const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <Provider store={store}>
      <Main />
    </Provider>
  )
}
