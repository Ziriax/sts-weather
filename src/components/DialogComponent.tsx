import { useState, ChangeEvent, memo } from "react";
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
	readonly initialInputValue?: string;
	readonly inputValueName: string;
	readonly cancelButtonText?: string;
	readonly confirmButtonText?: string;
	successCallback(userInput: string): void;
}

const DialogComponent = ({
	title,
	description,
	confirmButtonText,
	cancelButtonText,
	initialInputValue,
	inputValueName,
	successCallback,
}: Props) => {
	const [open, setOpen] = useState(true);
	const [userInput, setUserInput] = useState(initialInputValue || "");

	const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
		setUserInput(e.currentTarget.value);
	};

	const handleCancel = () => {
		setOpen(false);
	};

	const handleConfirm = () => {
		successCallback(userInput);
		setOpen(false);
	};

	return (
		<Dialog
			open={open}
			onClose={handleCancel}
			aria-labelledby="form-dialog-title"
		>
			<DialogTitle id="form-dialog-title">{title}</DialogTitle>
			<DialogContent>
				<DialogContentText>{description}</DialogContentText>
				<TextField
					autoFocus
					margin="dense"
					label={inputValueName}
					type="text"
					fullWidth
					value={userInput}
					onChange={handleTextChange}
				/>
			</DialogContent>
			<DialogActions>
				<Button onClick={handleCancel} color="secondary">
					{cancelButtonText ?? "Cancel"}
				</Button>
				<Button onClick={handleConfirm} color="primary">
					{confirmButtonText ?? "Confirm"}
				</Button>
			</DialogActions>
		</Dialog>
	);
};

export default memo(DialogComponent);
