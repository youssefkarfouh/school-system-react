import React from 'react';
function ButtonComp({ type, text, click }) {
	return (
		<button  type={type} className="btn btn_style" onClick={click}>
			{text}
		</button>
	);
}

ButtonComp.defaultProps = {
	type: 'button',
  };
  
export default ButtonComp;
