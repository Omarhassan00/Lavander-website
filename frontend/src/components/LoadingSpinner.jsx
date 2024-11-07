import "../../public/css/preload.css"

const LoadingSpinner = () => {
	return (
		<div className="preload">
        <div className="container-pre">
            <div className="ring-pre"></div>
            <div className="ring-pre"></div>
            <div className="ring-pre"></div>
        </div>
    </div>
	);
};

export default LoadingSpinner;
