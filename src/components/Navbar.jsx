import React, {useContext} from 'react';
import {AppBar, Avatar, Button, Grid, Toolbar} from "@mui/material";
import {NavLink} from "react-router-dom";
import {LOGIN_ROUTE} from "../utils/consts";
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";

const Navbar = () => {
	const {auth} = useContext(Context)
	const [user] = useAuthState(auth)

	return (
		<div>
			<AppBar position="static">
				<Toolbar style={{background: '#17212b', height: '8vh'}} variant={"dense"}>
						{user ?
							<Grid
								width={'90%'}
								margin={'auto'}
								container
								direction="row"
								justifyContent="space-between"
								alignItems="center"

							>
								<Grid
									container
									direction="row"
									width={"fit-content"}
									justifyContent="space-between"
									alignItems="center"
								>
									<Avatar
										src={user.photoURL}
										style={{marginRight: 10}}
									></Avatar>
									<div>{user.displayName}</div>
								</Grid>
								<Button onClick={() => auth.signOut()} color="inherit">Logout</Button>
							</Grid>
							:
							<Grid containter={"true"} >
								<NavLink to={LOGIN_ROUTE}>
									<Button color="inherit">Login</Button>
								</NavLink>
							</Grid>
						}

				</Toolbar>
			</AppBar>
		</div>
	);
};

export default Navbar;