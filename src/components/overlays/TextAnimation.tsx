import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "react-lottie";
import { useIsMobile } from "../../utils/useIsMobile";
import clases from "./TextAnimation.module.css";

interface IProps {
	show: boolean;
	text: string[];
	lottieData?: any;
}

const containerAnimations: Variants = {
	hidden: { display: "none", transition: { when: "afterChildren" } },
	shown: { display: "block", transition: { when: "beforeChildren" } },
};

const textAnimations: Variants = {
	hidden: i => ({
		opacity: 0,
		y: 100,
		transition: {
			delay: i * 0.05,
			opacity: { duration: 0.2 },
			y: { type: "spring", stiffness: 300, damping: 24, duration: 2 },
		},
	}),
	shown: i => ({
		opacity: 1,
		y: 0,
		transition: {
			delay: i * 0.05,
			opacity: { duration: 0.5 },
			y: { type: "spring", stiffness: 300, damping: 8, duration: 2 },
		},
	}),
};

const TextAnimation = ({ show, text, lottieData }: IProps) => {
	const [isLottieVisible, setIsLottieVisible] = useState(false);
	const isMobile = useIsMobile();
	const fontSize = (isMobile ? 120 : 70) / text.reduce((prev, curr) => Math.max(prev, curr.length), 0);

	useEffect(() => (show ? setIsLottieVisible(true) : undefined), [show]);
	return (
		<motion.div
			className={clases.outerContainer}
			variants={containerAnimations}
			initial='hidden'
			animate={show ? "shown" : "hidden"}>
			<div className={clases.innerContainer}>
				{text.map((phrase, i) => (
					<div key={i} className={clases.charContainer}>
						{phrase.split("").map((char, j, arr) => (
							<motion.span
								key={j}
								className={clases.char}
								style={{ fontSize: `${fontSize}vw` }}
								variants={textAnimations}
								custom={j}>
								{char === " " ? "\u2000" : char}
							</motion.span>
						))}
					</div>
				))}
			</div>
			<Lottie
				options={{
					loop: false,
					autoplay: false,
					animationData: lottieData,
					rendererSettings: {
						preserveAspectRatio: "xMidYMid meet",
					},
				}}
				isStopped={!show}
				style={{ position: "absolute", opacity: isLottieVisible ? 1 : 0 }}
				isClickToPauseDisabled={true}
				eventListeners={[{ eventName: "complete", callback: () => setIsLottieVisible(false) }]}
			/>
		</motion.div>
	);
};

export default TextAnimation;
