import { useSnackbar, VariantType } from "notistack";

export const useAlerts = () => {
	const { enqueueSnackbar } = useSnackbar();
	const errorAlert = (text: string) => {
		return enqueueSnackbar(text, { variant: "error" });
	};

	const alertWithVariant = (text: string, variant: VariantType) => {
		return enqueueSnackbar(text, { variant });
	};

	return { errorAlert, alertWithVariant };
};
