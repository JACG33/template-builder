import "./loader.css";
export const Loader = ({ css, size }) => {
	return (
		<div className={`wrapper__loader wrap__loader--show ${css}`}>
			<div className={`loader ${size}`} />
		</div>
	);
};
