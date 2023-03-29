import { motion, SVGMotionProps } from "framer-motion";
import { SVGProps, useEffect } from "react";

interface IProps {
	tries: number;
	onLoss?: () => void;
	svgProps?: SVGProps<SVGElement>;
}

const hidden = { pathLength: 0, opacity: 0 };
const visible = {
	pathLength: 1,
	opacity: 1,
	transition: {
		pathLength: { type: "spring", duration: 1.7, bounce: 0 },
		opacity: { duration: 0.01 },
	},
};

const Hangman = ({ tries, onLoss, svgProps }: IProps) => {
	useEffect(() => {
		if (onLoss && tries >= 10) {
			onLoss();
		}
	}, [tries]);

	let props = svgProps as SVGMotionProps<SVGSVGElement>;

	return (
		<motion.svg height='100%' width='100%' {...props} viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'>
			<motion.rect
				x='0'
				y='0'
				width='200'
				height='200'
				fill='none'
				stroke='black'
				stroke-width='2'
				strokeOpacity='0.175'
				rx='5'
				ry='5'
				initial={hidden}
				animate={visible}
			/>
			<motion.line
				rx='20'
				x1={70}
				y1={180}
				x2={130}
				y2={180}
				strokeWidth={3}
				strokeLinecap='round'
				stroke='black'
				initial={hidden}
				animate={tries < 1 ? hidden : visible}
			/>
			<motion.line
				x1={100}
				y1={180}
				x2={100}
				y2={20}
				strokeWidth={3}
				strokeLinecap='round'
				stroke='black'
				initial={hidden}
				animate={tries < 2 ? hidden : visible}
			/>
			<motion.line
				x1={100}
				y1={20}
				x2={140}
				y2={20}
				strokeWidth={3}
				strokeLinecap='round'
				stroke='black'
				initial={hidden}
				animate={tries < 3 ? hidden : visible}
			/>
			<motion.line
				x1={140}
				y1={20}
				x2={140}
				y2={50}
				strokeWidth={3}
				strokeLinecap='round'
				stroke='black'
				initial={hidden}
				animate={tries < 4 ? hidden : visible}
			/>

			<motion.circle
				id='head'
				cx={140}
				cy={65}
				r={15}
				transform='rotate(-90, 140, 65)'
				strokeWidth={3}
				strokeLinecap='round'
				fill='none'
				stroke='black'
				initial={hidden}
				animate={tries < 5 ? hidden : visible}
			/>
			<motion.line
				id='body'
				x1={140}
				y1={80}
				x2={140}
				y2={130}
				strokeWidth={3}
				strokeLinecap='round'
				stroke='black'
				initial={hidden}
				animate={tries < 6 ? hidden : visible}
			/>
			<motion.line
				id='left-arm'
				x1={140}
				y1={90}
				x2={120}
				y2={110}
				strokeWidth={3}
				strokeLinecap='round'
				stroke='black'
				initial={hidden}
				animate={tries < 7 ? hidden : visible}
			/>
			<motion.line
				id='right-arm'
				x1={140}
				y1={90}
				x2={160}
				y2={110}
				strokeWidth={3}
				strokeLinecap='round'
				stroke='black'
				initial={hidden}
				animate={tries < 8 ? hidden : visible}
			/>
			<motion.line
				id='left-leg'
				x1={140}
				y1={130}
				x2={120}
				y2={150}
				strokeWidth={3}
				strokeLinecap='round'
				stroke='black'
				initial={hidden}
				animate={tries < 9 ? hidden : visible}
			/>
			<motion.line
				id='right-leg'
				x1={140}
				y1={130}
				x2={160}
				y2={150}
				strokeWidth={3}
				strokeLinecap='round'
				stroke='black'
				initial={hidden}
				animate={tries < 10 ? hidden : visible}
			/>
		</motion.svg>
	);
};

export default Hangman;
