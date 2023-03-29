import { useEffect, useState } from "react";
import { usePrevious } from "../../utils/usePrevious";
import { useDidMount } from "../../utils/useDidMount";
import TextAnimation from "./TextAnimation";
import confettiData from "../../assets/74659-confetti-day.json";
import smokeData from "../../assets/79142-fall-smoke-dust.json";

interface IProps {
	isCompleted: boolean;
	isLoss: boolean;
}

const GameOverlay = ({ isCompleted, isLoss }: IProps) => {
	const previousState = usePrevious({ isCompleted, isLoss });
	const didMount = useDidMount();
	const [showCompleted, setShowCompleted] = useState(false);
	const [showLoss, setShowLoss] = useState(false);

	useEffect(() => {
		if (didMount && !previousState?.isCompleted && isCompleted) {
			setTrueTimeout(setShowCompleted, 3000);
		} else if (didMount && !previousState?.isLoss && isLoss) {
			setTrueTimeout(setShowLoss, 3000);
		}
	}, [isCompleted, isLoss]);

	return (
		<div style={{ position: "absolute", width: "100vw", height: "100vh", zIndex: "100", pointerEvents: "none" }}>
			<TextAnimation show={showCompleted} text={["¡Ganaste!"]} lottieData={confettiData} />
			<TextAnimation show={showLoss} text={["Intentalo", "otra vez"]} lottieData={smokeData} />
		</div>
	);
};

const setTrueTimeout = (dispatch: React.Dispatch<React.SetStateAction<boolean>>, timeout: number) => {
	dispatch(true);
	setTimeout(() => {
		dispatch(false);
	}, timeout);
};

export default GameOverlay;
