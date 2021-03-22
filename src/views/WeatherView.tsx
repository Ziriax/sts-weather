import { useEffect, useState, useMemo, useCallback } from "react";
import styles from "./WeatherView.module.scss";
import { Container } from "@material-ui/core";
import { ModalComponent, DialogComponent } from "../components";
import { useAlerts } from "../hooks/AlertHooks";

interface WeatherModalProps {
	text: string;
	title: string;
}

interface CityPromptProps {
	title: string;
	description: string;
	initialInputValue: string;
	inputValueName: string;
	confirmButtonText: string;
}

export default function WeatherView() {
	const { errorAlert } = useAlerts();
	const [city, setCity] = useState("");
	// const [openWeatherModal, setOpenWeatherModal] = useState(false);
	const [weatherModal, setWeatherModal] = useState<WeatherModalProps>({
		text: "",
		title: "",
	});
	const cityPrompt = useMemo<CityPromptProps>(() => {
		return {
			title: "Enter city",
			description:
				"Enter city name for a weather forecast of this city.",
			initialInputValue: localStorage.getItem("CITY") || "",
			inputValueName: "city",
			confirmButtonText: "Show me the weather!",
		};
	}, []);

	const weatherModalIsNotEmpty = useMemo(() => {
		return weatherModal.text !== "" && weatherModal.title !== "";
	}, [weatherModal]);

	const weatherSuccessCallback = useCallback((city: string) => {
		try {
			if (city.trim() === "") {
				throw new Error("The city can't be empty");
			}
			setCity(city);
			localStorage.setItem("CITY", city);
		} catch (err) {
			errorAlert(err?.message || err);
		}
	}, []);

	const resetWeatherModal = useCallback(() => {
		setWeatherModal({ text: "", title: "" });
	}, []);

	useEffect(() => {
		const showWeatherAsync = async (city: string) => {
			const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

			if (!apiKey) {
				errorAlert(
					"put API key in .env.local as REACT_APP_WEATHER_API_KEY"
				);
				return;
			}

			try {
				const requestUri = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
				const response = await fetch(requestUri);
				const data = await response.json();
				setWeatherModal({
					text: `Today it feels like ${Math.round(
						data.main.feels_like - 273
					)}°C`,
					title: `Weather in ${city}`,
				});
			} catch (err) {
				errorAlert(err?.message || err);
			}
		};

		if (city !== "") {
			showWeatherAsync(city);
		}
	}, [city]);

	return (
		<Container>
			<h1 className={styles.textCenter}>Weather page</h1>
			<DialogComponent
				{...cityPrompt}
				successCallback={weatherSuccessCallback}
			/>
			<ModalComponent
				{...weatherModal}
				open={weatherModalIsNotEmpty}
				handleClose={resetWeatherModal}
			/>
		</Container>
	);
}
