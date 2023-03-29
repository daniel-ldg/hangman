import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import TipViewer from "./TipViewer";
import WordsExpander from "./WordsExpander";

interface IProps {
	word: { category: string; value: string; normalizedValue: string; definition: string };
	unveiled: string[];
	isLoss: boolean;
	onUnfound: () => void;
	onComplete: () => void;
}

const WordViewer = ({ word, unveiled, isLoss, onUnfound, onComplete }: IProps) => {
	const [isCompleted, setIsCompleted] = useState(false);
	useEffect(() => setIsCompleted(false), [word]);

	return (
		<div className='d-flex flex-column justify-content-evenly h-100'>
			<Card body className='mb-3'>
				<Card.Title>Palabra</Card.Title>
				<WordsExpander
					value={word.value}
					normalizedValue={word.normalizedValue}
					unveiled={unveiled}
					isLoss={isLoss}
					onUnfound={onUnfound}
					onComplete={() => {
						setIsCompleted(true);
						onComplete();
					}}
				/>
			</Card>
			<Card body>
				<Card.Subtitle>Pistas</Card.Subtitle>
				<TipViewer label='Mostrar pista 1' text={word.category} reveal={isCompleted || isLoss} />
				<TipViewer label='Mostrar pista 2' text={word.definition} reveal={isCompleted || isLoss} />
			</Card>
		</div>
	);
};

export default WordViewer;
