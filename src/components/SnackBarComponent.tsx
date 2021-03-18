import React, { useEffect } from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert, { AlertProps, Color } from "@material-ui/lab/Alert";

interface SnackBarComponentProps {
	severity: Color;
	text: string;
	triggerOpen: boolean;
}

function Alert(props: AlertProps) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SnackBarComponent = ({
	severity,
	text,
	triggerOpen,
}: SnackBarComponentProps) => {
	const [open, setOpen] = React.useState(false);

	const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
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

export default SnackBarComponent;
