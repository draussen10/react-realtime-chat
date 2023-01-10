import React, {useContext, useEffect, useState} from 'react';
import {Context} from "../index";
import {useAuthState} from "react-firebase-hooks/auth";
import {Avatar, Button, Container, Grid, TextField} from "@mui/material";
import {addDoc, collection, onSnapshot, orderBy, query, Timestamp,} from "firebase/firestore";

const Chat = () => {
	const {auth, db} = useContext(Context)
	const [user] = useAuthState(auth)
	const [value, setValue] = useState('')
	const [messagesData, setMessagesData] = useState([]);

	const sendMessage = async () => {
		if(value.trim().length){
			try {
				const docRef = await addDoc(collection(db, "messages"), {
					uid: user.uid,
					displayName: user.displayName,
					photoURL: user.photoURL,
					text: value.trim(),
					createdAt: Timestamp.fromDate(new Date()),
				});
				console.log("Document written with ID: ", docRef.id);
			} catch (e) {
				console.error("Error adding document: ", e);
			}
			setValue("");
		}
	}



	const getMessages = async () => {
		const q = query(collection(db, "messages"), orderBy("createdAt", "asc"));

		onSnapshot(q, (querySnapshot) => {
			setMessagesData([]);

			querySnapshot.docs.map((doc) => {
				setMessagesData((prevState) => {
					return [...prevState, doc.data()];
				});
			});
		});
	};

	const keypressHandle = (e) => {
		if(e.code === "Enter"){
			sendMessage()
		}
	}

	useEffect(() => {
		getMessages();
	}, []);

	return (
		<Container>
			<Grid container
						style={{marginTop: 20}}
						justifyContent={"center"}
			>
				<div style={{width: '90%', height: '76vh', overflowY: 'auto'}}>
					{messagesData.map(message =>
						<div style={{
							margin: 10,
							borderRadius: user.uid === message.uid ? '15px 15px 0px 15px' : '15px 15px 15px 0px',
							background: user.uid === message.uid ? '#2b5278' : '#182533',
							width: 'fit-content',
							padding: 10,
							marginLeft: user.uid === message.uid ? "auto" : "10px"
						}}>
							{user.uid === message.uid
							? <div style={{color: '#fff'}}>{message.text}</div>
							:
							<>
								<Grid
									container direction="row"
									width={"fit-content"}
									justifyContent="space-between"
									alignItems="center"
									style={{marginBottom: 10, backgroundColor: 'rgba(73,73,73,0.55)', padding: '2px 7px', borderRadius: 15}}
								>

									<Avatar
										src={message.photoURL}
										style={{height: 30, width: 30, marginRight: 5}}
									/>
									<div style={{
										color: user.uid === message.uid ? 'white' :'rgba(255,255,255,0.58)'
									}}>{message.displayName}</div>
								</Grid>
								<div style={{color: '#fff'}}>{message.text}</div>
							</>
							}
						</div>
					)}
				</div>
				<Grid
					container
					style={{width: "90%", marginTop: 20}}
					justifyContent={"space-between"}
				>
					<TextField
						style={{width: '79%', background: '#17212b'}}
						sx={{ input: { color: 'white' } }}
						maxRows={2}
						variant={"outlined"}
						value={value}
						onChange={e => setValue(e.target.value)}
						onKeyDown={(e) => keypressHandle(e)}
					/>
					<Button
						style={{width: '20%'}}
						variant={"outlined"}
						onClick={sendMessage}
					>Send</Button>
				</Grid>
			</Grid>
		</Container>
	);
};

export default Chat;