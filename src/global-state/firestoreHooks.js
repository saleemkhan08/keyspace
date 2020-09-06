import { useEffect, useState } from 'react';
import { firestore, auth } from '../firebase';

export const useDocument = (docPath) => {
	const [data, setData] = useState({});
	useEffect(() => {
		const ref = firestore.doc(docPath);
		const unSubscribe = ref.onSnapshot((doc) => {
			setData(doc?.data());
		});
		return () => {
			unSubscribe();
		};
	}, [docPath]);

	return data;
};

export const useCollection = ({ collectionPath, order = null }) => {
	const [collection, setCollection] = useState([]);
	useEffect(() => {
		const ref = order
			? firestore.collection(collectionPath).orderBy(order)
			: firestore.collection(collectionPath);
		const unSubscribe = ref.onSnapshot((querySnapshot) => {
			setCollection(querySnapshot?.docs?.map((doc) => doc.data()));
		});
		return () => {
			unSubscribe();
		};
	}, [collectionPath, order]);
	return collection;
};

export const useAuth = () => {
	const [user, setUser] = useState({ isLoading: true });
	useEffect(() => {
		const unSubscribe = auth.onAuthStateChanged((user) => {
			setUser(user);
		});
		return () => {
			unSubscribe();
		};
	}, []);
	return user;
};
