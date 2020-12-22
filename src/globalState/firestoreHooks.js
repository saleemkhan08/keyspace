import { useEffect, useState } from 'react';
import { firestore, auth, storage } from 'globalState/firebase';
import {
	showNotification,
	NotificationTypeEnum,
} from 'globalState/notificationSlice';
import { useDispatch } from 'react-redux';

export const useFileStorage = ({ docPath, fileName, updateDoc, userData }) => {
	const [error, setError] = useState(null);
	const dispatch = useDispatch();
	const [selectedFile, setSelectedFile] = useState();
	const [uploading, setUploading] = useState(false);
	const [preview, setPreview] = useState();

	useEffect(() => {
		if (!selectedFile) {
			setPreview(undefined);
			return;
		}
		const objectUrl = URL.createObjectURL(selectedFile);
		setPreview(objectUrl);
		return () => URL.revokeObjectURL(objectUrl);
	}, [selectedFile]);

	const fileInputChangeHandler = async (e) => {
		if (!e.target.files || e.target.files.length === 0) {
			setSelectedFile(undefined);
			return;
		}
		try {
			const file = e.target.files[0];
			setUploading(true);
			setSelectedFile(file);
			const fileUploadPath = `${docPath}/${fileName}.${file.name
				.split('.')
				.pop()}`;
			const snapshot = await storage.ref().child(fileUploadPath).put(file);
			const downloadUrl = await snapshot.ref.getDownloadURL();
			await updateDoc({ ...userData, [fileName]: downloadUrl });
			setError(null);
			dispatch(
				showNotification({
					message: `Uploaded`,
					type: NotificationTypeEnum.SUCCESS,
				})
			);
		} catch (err) {
			dispatch(
				showNotification({
					message: "Couldn't upload! Please try again...",
					type: NotificationTypeEnum.ERROR,
				})
			);
			setError(err);
		}
		setUploading(false);
	};
	return {
		preview,
		uploading,
		error,
		fileInputChangeHandler,
	};
};

export const useDocument = (docPath) => {
	const [data, setData] = useState({});
	const docRef = firestore.doc(docPath);

	const updateDoc = (doc) => {
		return docRef.set(doc);
	};
	const deleteDoc = (id) => {
		return docRef.delete();
	};
	useEffect(() => {
		const unSubscribe = docRef.onSnapshot((doc) => {
			setData(doc?.data());
		});
		return () => {
			unSubscribe();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [docPath]);

	return { data, deleteDoc, updateDoc };
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
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
