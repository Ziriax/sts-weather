import styles from "./App.module.scss";
import WeatherView from "./views/WeatherView";

function App() {
	return (
		<div className={styles.app}>
			<WeatherView />
		</div>
	);
}

export default App;
