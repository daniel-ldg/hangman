import { useEffect, useState } from "react";
import { useDidMount } from "../../utils/useDidMount";
import { motion, Variants } from "framer-motion";
import WordItem from "./WordItem";

interface IProps {
	value: string;
	normalizedValue: string;
	unveiled: string[];
	isLoss: boolean;
	onUnfound: () => void;
	onComplete: () => void;
}

interface IState {
	words: { value: string; normalized: string; isUnveiled: boolean }[][];
	unveiledCount: number;
	isCompleted: boolean;
}

const animations: Variants = {
	normal: {
		background: "rgba(76, 175, 80, 0)",
	},
	animated: {
		background: ["rgba(76, 175, 80, 0.15)", "rgba(76, 175, 80, 0)"],
		transition: { duration: 0.5, repeat: Infinity, repeatType: "reverse" },
	},
};

const WordsExpander = ({ value, normalizedValue, unveiled, isLoss, onUnfound, onComplete }: IProps) => {
	const [chars, setChars] = useState<IState>({ words: [], unveiledCount: 0, isCompleted: false });
	const didMount = useDidMount();

	useEffect(() => {
		// build new state
		const wordsValues = value.split(/(\S+\s+)/).filter(n => n);
		const wordsState = normalizedValue
			.split(/(\S+\s+)/)
			.filter(v => v)
			.map((item, i) =>
				item.split("").map((char, j) => ({
					value: wordsValues.at(i)?.split("")?.at(j) || "",
					normalized: char,
					isUnveiled: unveiled.includes(char),
				}))
			);

		const filteredWords = normalizedValue.split("").filter(char => ![",", " "].includes(char));
		const unveiledCount = filteredWords.filter(char => unveiled.includes(char)).length;

		const isAllUnveiled = filteredWords.length === unveiledCount;

		const newState: IState = { words: wordsState, unveiledCount: unveiledCount, isCompleted: isAllUnveiled };

		if (didMount && chars.unveiledCount === newState.unveiledCount) {
			onUnfound();
		}

		if (isAllUnveiled) {
			onComplete();
		}

		setChars(newState);
	}, [unveiled]);

	return (
		<div className='d-inline-flex flex-wrap'>
			{chars.words.map((word, i) => (
				<motion.div
					className='d-inline-flex'
					key={`word_${i}`}
					variants={animations}
					initial={"normal"}
					animate={chars.isCompleted ? "animated" : "normal"}>
					{word.map((char, j) => (
						<WordItem
							key={j}
							index={chars.words.reduce(
								(total, word, k) => (k === i ? total + j : k < i ? total + word.length : total),
								0
							)}
							total={chars.words.reduce((total, word) => total + word.length, 0)}
							char={i === 0 && j === 0 ? char.value.toUpperCase() : char.value}
							isUnveiled={char.isUnveiled}
							isRevealed={isLoss && !char.isUnveiled}
						/>
					))}
				</motion.div>
			))}
		</div>
	);
};

export default WordsExpander;
