import { Variants, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { usePrevious } from "../../utils/usePrevious";

interface IProps {
	label: string;
	text: string;
	reveal?: boolean;
}

const animations: Variants = {
	bluried: {
		color: "rgba(0,0,0,0)",
		textShadow: "0 0 5px rgba(0,0,0,0.2)",
		transition: { duration: 0 },
	},
	unbluried: {
		color: "rgba(0,0,0,1)",
		textShadow: "0 0 0px rgba(0,0,0,0)",
		transition: { type: "spring", damping: 12, stiffness: 100, duration: 1, delay: 0.2 },
	},
	hidden: {
		opacity: 0,
		transition: {
			duration: 0.2,
		},
	},
	visible: {
		opacity: 1,
		transition: {
			duration: 0.2,
		},
	},
};

const TipViewer = ({ label, text, reveal }: IProps) => {
	const [isRevealed, setIsRevealed] = useState(false);
	const prevousData = usePrevious({ label, text });

	useEffect(() => {
		if (prevousData?.label !== label || prevousData?.text !== text) {
			// content changed!
			setIsRevealed(false);
		}
	}, [label, text]);

	useEffect(() => setIsRevealed(reveal || false), [reveal]);

	return (
		<div
			style={{ cursor: isRevealed ? "default" : "pointer" }}
			className='position-relative d-flex justify-content-center align-items-center mb-3'
			onClick={() => setIsRevealed(true)}>
			<motion.div
				style={{ backgroundColor: "white" }}
				className='position-absolute border rounded px-2'
				variants={animations}
				initial={"visible"}
				animate={isRevealed ? "hidden" : "visible"}>
				{label}
			</motion.div>
			<motion.span
				style={{ textAlign: "center" }}
				variants={animations}
				initial={"bluried"}
				animate={isRevealed ? "unbluried" : "bluried"}>
				{text}
			</motion.span>
		</div>
	);
};

export default TipViewer;
