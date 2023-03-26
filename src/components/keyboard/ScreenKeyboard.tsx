import { FunctionComponent } from "react";
import KeyboardReact from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import styles from "./ScreenKeyboard.module.css";

interface IProps {
	onNewLetter: (newLetter: string) => void;
	disabled?: string[];
}

const ScreenKeyboard: FunctionComponent<IProps> = ({ onNewLetter, disabled = [] }) => {
	return (
		<KeyboardReact
			layout={{
				default: ["q w e r t y u i o p", "a s d f g h j k l \u00f1", "z x c v b n m"],
			}}
			buttonAttributes={[
				{ attribute: "style", value: "margin-left:2vw", buttons: "a" },
				{ attribute: "style", value: "margin-right:2vw", buttons: "p" },
				{ attribute: "style", value: "margin-left:4vw", buttons: "z" },
				{ attribute: "style", value: "margin-right:26.86vw", buttons: "m" },
			]}
			buttonTheme={disabled && disabled.length !== 0 ? [{ class: styles.disabledBtn, buttons: disabled?.join(" ") }] : []}
			onKeyPress={onNewLetter}
			useButtonTag={true}
			disableButtonHold={true}
		/>
	);
};

export default ScreenKeyboard;
