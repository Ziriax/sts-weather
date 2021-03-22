import { useEffect, useState, useMemo } from "react";
import styles from "./WeatherView.module.scss";
import { Container } from "@material-ui/core";
import { Color } from "@material-ui/lab/Alert";
import {
	ModalComponent,
	DialogComponent,
	SnackbarComponent,
} from "../components";

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

interface SnackbarProps {
	text: string;
	severity: Color;
}

export default function WeatherView() {
	const [city, setCity] = useState("");
	const [openWeatherModal, setOpenWeatherModal] = useState(false);
	const [weatherModal, setWeatherModal] = useState<WeatherModalProps>({
		text: "",
		title: "",
	});
	const [openSnackbar, setOpenSnackbar] = useState(false);
	const [snackbar, setSnackbar] = useState<SnackbarProps>({
		severity: "error",
		text: "",
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

	const handleGetWeather = (city: string) => {
		try {
			setCity(city);
			localStorage.setItem("CITY", city);
		} catch (err) {
			setSnackbar({
				severity: "error",
				text: err?.message || err,
			});
		}
	};

	const showWeatherAsync = async (city: string) => {
		const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

		if (!apiKey) {
			setSnackbar({
				severity: "error",
				text:
					"put API key in .env.local as REACT_APP_WEATHER_API_KEY",
			});
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
			setSnackbar({
				severity: "error",
				text: err?.message || err,
			});
		}
	};

	const handleCloseBackdrop = () => {
		setOpenWeatherModal(false);
	};

	useEffect(() => {
		if (city !== "") {
			showWeatherAsync(city);
		}
	}, [city]);

	useEffect(() => {
		setOpenSnackbar(true);
	}, [snackbar]);

	useEffect(() => {
		setOpenWeatherModal(true);
	}, [weatherModal]);

	return (
		<Container>
			<h1 className={styles.textCenter}>Weather page</h1>
			<DialogComponent
				{...cityPrompt}
				successCallback={handleGetWeather}
			/>
			<ModalComponent
				{...weatherModal}
				open={openWeatherModal}
				handleClose={handleCloseBackdrop}
			/>
			<SnackbarComponent {...snackbar} triggerOpen={openSnackbar} />
		</Container>
	);
}
