import { motion, Variants } from "framer-motion";

const animations: Variants = {
	visibleWaiting: location => ({
		y: [0, -3, 0],
		transition: {
			delay: location.index * 0.2,
			repeatDelay: location.total * 0.2,
			duration: 0.2,
			repeatType: "reverse",
			repeat: Infinity,
		},
	}),
	visible: {
		opacity: 1,
		y: 0,
		transition: { type: "spring", damping: 12, stiffness: 100 },
	},
	hiddenBottom: {
		opacity: 0,
		y: 20,
		transition: { type: "spring", damping: 12, stiffness: 100 },
	},
	hiddenTop: {
		opacity: 0,
		y: -20,
		transition: {
			opacity: { duration: 0 },
			y: { type: "spring", damping: 12, stiffness: 100 },
		},
	},
	untinted: {
		backgroundColor: "rgba(0,0,0,0)",
	},
	rightAnswer: {
		backgroundColor: ["rgba(0,0,0,0)", "rgba(0,255,0,0.15)", "rgba(0,0,0,0)"],
		transition: { duration: 1.5 },
	},
	wrongAnswer: {
		backgroundColor: ["rgba(0,0,0,0)", "rgba(255,0,0,0.15)", "rgba(0,0,0,0)"],
		transition: { duration: 0.5, repeat: Infinity },
	},
};

interface IProps {
	index: number;
	total: number;
	char: string;
	isUnveiled: boolean;
	isRevealed: boolean;
}

const WordItem = ({ char, isUnveiled, isRevealed, index, total }: IProps) => {
	return (
		<motion.div
			className={`d-flex justify-content-center align-items-center ${char !== " " && "border-bottom border-4"}`}
			style={{ width: "1.7em", height: "2em", marginRight: "0.3em" }}
			variants={animations}
			initial={"untinted"}
			animate={isUnveiled ? "rightAnswer" : isRevealed ? "wrongAnswer" : "untinted"}>
			<motion.span
				className='position-absolute'
				style={{ overflow: "hidden", display: "flex", fontSize: "2rem" }}
				variants={animations}
				initial={"hiddenTop"}
				animate={isUnveiled || isRevealed ? "visible" : "hiddenTop"}>
				{char}
			</motion.span>
			<motion.span
				className='position-absolute text-muted fw-light'
				style={{ overflow: "hidden", display: "flex", fontSize: "1rem" }}
				variants={animations}
				initial={"visibleWaiting"}
				animate={isUnveiled || isRevealed ? "hiddenBottom" : "visibleWaiting"}
				custom={{ index: index, total: total }}>
				?
			</motion.span>
		</motion.div>
	);
};

export default WordItem;
