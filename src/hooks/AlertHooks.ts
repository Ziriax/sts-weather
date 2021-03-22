import { useSnackbar, VariantType } from "notistack";
import { useCallback } from "react";

export const useAlerts = () => {
	const { enqueueSnackbar } = useSnackbar();

	const errorAlert = useCallback(
		(text: string, variant?: VariantType) => {
			return enqueueSnackbar(text, { variant: variant ?? "error" });
		},
		[enqueueSnackbar]
	);

	return { errorAlert };
};
