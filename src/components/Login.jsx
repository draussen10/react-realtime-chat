import React, {useContext} from 'react';
import {Box, Button, Container, Grid} from "@mui/material";
import {Context} from "../index";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const Login = () => {
	const {auth} = useContext(Context)

	const login = () => {
		const provider = new GoogleAuthProvider();
		signInWithPopup(auth, provider)
		.then((result) => {
		  const user = result.user;
			console.log(user)
		})
		.catch((e) => {
			console.log('errorCode: ', e.code)
			console.log('errorMessage: ',e.message)
			console.log('email: ', e.customData.email)
			console.log('credential: ', GoogleAuthProvider.credentialFromError(e))
		});
	};

	return (
		<Container>
			<Grid container
						style={{height: window.innerHeight - 50}}
						alignItems={"center"}
						justifyContent={"center"}
				>
					<Grid
						style={{width: 400, background: 'lightgray', borderRadius: 10}}
						container
						alignItems={"center"}
						direction={"column"}
					>
						<Box p={5}>
							<Button onClick={login} variant={"outlined"}>Login with Google</Button>
						</Box>
					</Grid>
			</Grid>
		</Container>
	);
};

export default Login;