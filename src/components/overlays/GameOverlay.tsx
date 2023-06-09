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
	const [messages, setMessages] = useState({ success: getRandom(success), fail: getRandom(fail) });

	useEffect(() => {
		if (didMount && !previousState?.isCompleted && isCompleted) {
			setTrueTimeout(setShowCompleted, 3000, 500).then(() =>
				setMessages(prev => ({ ...prev, success: getRandom(success) }))
			);
		} else if (didMount && !previousState?.isLoss && isLoss) {
			setTrueTimeout(setShowLoss, 3000, 500).then(() => setMessages(prev => ({ ...prev, fail: getRandom(fail) })));
		}
	}, [isCompleted, isLoss]);

	return (
		<div style={{ position: "absolute", width: "100vw", height: "100vh", zIndex: "100", pointerEvents: "none" }}>
			<TextAnimation show={showCompleted} text={messages.success} lottieData={confettiData} />
			<TextAnimation show={showLoss} text={messages.fail} lottieData={smokeData} />
		</div>
	);
};

const setTrueTimeout = (dispatch: React.Dispatch<React.SetStateAction<boolean>>, timeout: number, post = 0) =>
	new Promise(resolve => {
		dispatch(true);
		setTimeout(resolve, timeout);
	}).then(
		() =>
			new Promise(resolve => {
				dispatch(false);
				setTimeout(resolve, post);
			})
	);

const success: string[][] = [
	["¡Felicidades!"],
	["¡Eres un", "campeón!"],
	["¡Ganador!"],
	["¡Lo lograste!"],
	["¡Bravo!"],
	["¡Excelente!"],
	["¡Increíble!"],
	["¡Fantástico!"],
	["¡Espectacular!"],
	["¡Impresionante!"],
	["¡Perfecto!"],
	["¡Genial!"],
	["¡Asombroso!"],
	["¡Victoria!"],
	["¡Eres el", "mejor!"],
	["¡Superaste", "el desafío!"],
	["¡Eres imparable!"],
	["¡Ganaste!"],
];

const fail: string[][] = [
	["Inténtalo", "de nuevo"],
	["Lo siento", "perdiste"],
	["Vuelve a", "intentarlo"],
	["No te rindas"],
	["Prueba", "otra vez"],
	["Mejor suerte", "la próxima"],
	["Ups, fallaste"],
	["Mala suerte"],
	["Intentalo", "otra vez"],
];

const getRandom = (list: any[]) => list[Math.floor(Math.random() * list.length)];

export default GameOverlay;
