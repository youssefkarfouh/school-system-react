import React from 'react';
function ButtonComp({ type, text, click , children }) {
	return (
		<button  type={type} className="btn btn_style" onClick={click}>
			{text}

			{children}
			
		</button>
	);
}

ButtonComp.defaultProps = {
	type: 'submit',
  };
  
export default ButtonComp;
