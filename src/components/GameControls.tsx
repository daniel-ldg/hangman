import { Button } from "react-bootstrap";

interface IProps {
	isLoss: boolean;
	isCompleted: boolean;
	onReplay: () => void;
}

const GameControls = ({ isLoss, isCompleted, onReplay }: IProps) => {
	const isPlaying = !isLoss && !isCompleted;
	return (
		<div className='d-flex p-2'>
			<Button
				variant='outline-dark'
				size='sm'
				className='flex-fill mx-3'
				style={{ opacity: isPlaying ? 0.2 : 1 }}
				disabled={isPlaying}
				onClick={onReplay}>
				{isPlaying ? "Jugando..." : "Jugar otra vez"}
			</Button>
		</div>
	);
};

export default GameControls;
