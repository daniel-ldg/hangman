import { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Hangman from "./components/draw/Hangman";
import GameControls from "./components/GameControls";
import ScreenKeyboard from "./components/keyboard/ScreenKeyboard";
import GameOverlay from "./components/overlays/GameOverlay";
import WordViewer from "./components/viewer/WordViewer";
import { getRandomWord } from "./data/words";

const autoEnteredChars = [",", " "];
const initGameState = { isLoss: false, isCompleted: false };

const App = () => {
	const [word, setWord] = useState(getRandomWord());
	const [enteredLetters, setEnteredLetters] = useState<string[]>(autoEnteredChars);
	const [tries, setTries] = useState(0);
	const [gameState, setGameState] = useState(initGameState);

	const replay = () => {
		setWord(getRandomWord());
		setEnteredLetters(autoEnteredChars);
		setTries(0);
		setGameState(initGameState);
	};

	return (
		<>
			<GameOverlay {...gameState} />
			<Container>
				<Row className='p-2'>
					<Col className='d-flex flex-column justify-content-around' md='auto'>
						<div style={{ maxHeight: "240px" }}>
							<Hangman tries={tries} onLoss={() => setGameState(prev => ({ ...prev, isLoss: true }))} />
						</div>
						<GameControls {...gameState} onReplay={replay} />
					</Col>
					<Col>
						<WordViewer
							word={word}
							unveiled={enteredLetters}
							onUnfound={() => setTries(n => n + 1)}
							isLoss={gameState.isLoss}
							onComplete={() => setGameState(prev => ({ ...prev, isCompleted: true }))}
						/>
					</Col>
				</Row>
				<ScreenKeyboard
					onNewLetter={newLetter => setEnteredLetters(actualLetters => [...actualLetters, newLetter])}
					disabledChars={enteredLetters}
					disableAll={gameState.isLoss || gameState.isCompleted}
				/>
			</Container>
		</>
	);
};

export default App;
