import styles from './App.module.scss';
import WeatherView from './WeatherView';

function App() {
  return (
    <div className={styles.app}>
      <WeatherView/>
    </div>
  );
}

export default App;
