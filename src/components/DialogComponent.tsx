import React, { MouseEvent } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

interface Props {
	readonly title: string;
	readonly description: string;
	readonly getWeatherAsync: (city: string) => void;
}

const DialogComponent = ({ title, description, getWeatherAsync }: Props) => {
	const [open, setOpen] = React.useState(true);
	const [city, setCity] = React.useState(localStorage.getItem("CITY") || "");

	const handleClose = (e: MouseEvent<HTMLButtonElement>) => {
		const id = e.currentTarget.id;
		if (id === "ok") {
			try {
				localStorage.setItem("CITY", city);
			} catch (err) {
				console.error(err?.message || err);
			}
			getWeatherAsync(city);
		}
		setOpen(false);
	};

	const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCity(e.currentTarget.value);
	};

	return (
		<Dialog
			open={open}
			onClose={handleClose}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{description}</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					id="city"
					label="City"
					type="text"
					fullWidth
					value={city}
					onChange={handleTextChange}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleClose} id="cancel" color="secondary">
					Cancel
				</Button>
				<Button onClick={handleClose} id="ok" color="primary">
					Show me the weather!
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default DialogComponent;
