import Modal from "@material-ui/core/Modal";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";

interface Props {
	readonly open: boolean;
	readonly title: string;
	readonly text: string;
	readonly handleClose: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		paper: {
			position: "absolute",
			width: 400,
			backgroundColor: theme.palette.background.paper,
			boxShadow: theme.shadows[5],
			padding: theme.spacing(2, 4, 3),
		},
	})
);

const ModalComponent = ({ open, title, text, handleClose }: Props) => {
	const classes = useStyles();
	const modalStyle = {
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
	};

	const body = (
		<div style={modalStyle} className={classes.paper}>
			<h2 id="weather-modal-title">{title}</h2>
			<p id="weather-modal-description">{text}</p>
		</div>
	);

	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="weather-modal-title"
			aria-describedby="weather-modal-description"
		>
			{body}
		</Modal>
	);
};

export default ModalComponent;
