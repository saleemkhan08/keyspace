import { useEffect, useState } from 'react';
import { firestore, auth } from 'globalState/firebase';

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
	const collectionPathRef = firestore.collection(collectionPath);
	const addDoc = (doc) => {
		return collectionPathRef.doc().set(doc);
	};
	const updateDoc = ({ id, doc }) => {
		return collectionPathRef.doc(id).set(doc);
	};
	const deleteDoc = (id) => {
		return collectionPathRef.doc(id).delete();
	};

	useEffect(() => {
		const ref = order ? collectionPathRef.orderBy(order) : collectionPathRef;
		const unSubscribe = ref.onSnapshot((querySnapshot) => {
			setCollection(
				querySnapshot?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }))
			);
		});
		return () => {
			unSubscribe();
		};
	}, [collectionPath, order]);
	return { collection, addDoc, updateDoc, deleteDoc };
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
