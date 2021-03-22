import { useEffect, SyntheticEvent, useState } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";

interface Props {
	severity: Color;
	text: string;
	triggerOpen: boolean;
}

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackbarComponent = ({ severity, text, triggerOpen }: Props) => {
	const [open, setOpen] = useState(false);

	const handleClose = (event?: SyntheticEvent, reason?: string) => {
		if (reason === "clickaway") {
			return;
		}

		setOpen(false);
	};

	useEffect(() => {
		if (triggerOpen) {
			setOpen(true);
		}
	}, [triggerOpen]);

	return (
		<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
			<Alert onClose={handleClose} severity={severity}>
				{text}
			</Alert>
		</Snackbar>
	);
};

export default SnackbarComponent;
