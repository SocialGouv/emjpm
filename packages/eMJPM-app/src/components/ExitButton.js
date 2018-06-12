import styled from "styled-components";

const ExitButton = styled.button`
	cursor: pointer;
	margin: 5px;
	background-color: grey;
	color: white;
	font-weight: bold;
	border-radius: 50%;
	border: 1px solid;
	border-color: grey;
	box-shadow: 0px 0px 0px grey;
	position: absolute;
	top: 0;
	right: 0;
	&:hover {
		background-color: red;
		border-color: red;
		box-shadow: 0px 0px 0px red;
	}
`;

export default ExitButton;
