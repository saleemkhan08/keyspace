import { useEffect, useRef, useState } from 'react';
import { firestore, auth, storage } from 'globalState/firebase';
import {
	showNotification,
	NotificationTypeEnum,
} from 'globalState/notificationSlice';
import { useDispatch } from 'react-redux';

export const useFileStorage = ({
	docPath,
	fileName,
	updateDoc,
	updateCollectionDoc,
	recordData,
}) => {
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

			const fileUploadPath = fileName
				? `${docPath}/${fileName}.${file.name.split('.').pop()}`
				: `${docPath}/${file.name}`;
			console.log('Salresult : ', { fileUploadPath });
			const snapshot = await storage.ref().child(fileUploadPath).put(file);
			console.log('Salresult : ', { snapshot });
			const downloadUrl = await snapshot.ref.getDownloadURL();
			console.log('Salresult : ', { downloadUrl });
			if (updateDoc) {
				console.log('Salresult : ', { updateDoc });
				await updateDoc({ ...recordData, [fileName]: downloadUrl });
			}
			if (updateCollectionDoc) {
				console.log('Salresult : ', { updateCollectionDoc });
				await updateCollectionDoc({
					id: recordData.id,
					doc: { ...recordData, [fileName]: downloadUrl },
				});
			}

			setError(null);
			dispatch(
				showNotification({
					message: `Uploaded`,
					type: NotificationTypeEnum.SUCCESS,
				})
			);
		} catch (err) {
			console.log('Salerr : ', { err });
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
	const [isLoading, setIsLoading] = useState(false);
	const dispatch = useDispatch();
	const docRef = firestore.doc(docPath);

	const updateDoc = async (doc) => {
		try {
			setIsLoading(true);
			await docRef.set(doc);
		} catch (err) {
			console.log('Salerr : ', { err });
			dispatch(
				showNotification({
					message: 'Something went wrong! Please try again...',
					type: NotificationTypeEnum.ERROR,
				})
			);
		}
		setIsLoading(false);
	};
	const deleteDoc = async (id) => {
		try {
			setIsLoading(true);
			await docRef.delete();
		} catch (err) {
			console.log('Salerr : ', { err });
			dispatch(
				showNotification({
					message: 'Something went wrong! Please try again...',
					type: NotificationTypeEnum.ERROR,
				})
			);
		}
		setIsLoading(false);
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

	return { data, deleteDoc, updateDoc, isLoading };
};

export const useCollection = ({
	collectionPath,
	order = null,
	filter = undefined,
}) => {
	const options = useRef({ order: null, filter: null });
	const [collection, setCollection] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const collectionPathRef = firestore.collection(collectionPath);

	const dispatch = useDispatch();

	const addDoc = async (doc) => {
		try {
			setIsLoading(true);
			await collectionPathRef.doc().set(doc);
		} catch (err) {
			console.log('Salerr : ', { err });
			dispatch(
				showNotification({
					message: 'Something went wrong! Please try again...',
					type: NotificationTypeEnum.ERROR,
				})
			);
		}
		setIsLoading(false);
	};
	const updateDoc = async ({ id, doc }) => {
		try {
			setIsLoading(true);
			await collectionPathRef.doc(id).set(doc);
		} catch (err) {
			console.log('Salerr : ', { err });
			dispatch(
				showNotification({
					message: 'Something went wrong! Please try again...',
					type: NotificationTypeEnum.ERROR,
				})
			);
		}
		setIsLoading(false);
	};
	const deleteDoc = async (id) => {
		try {
			setIsLoading(true);
			await collectionPathRef.doc(id).delete();
		} catch (err) {
			console.log('Salerr : ', { err });
			dispatch(
				showNotification({
					message: 'Something went wrong! Please try again...',
					type: NotificationTypeEnum.ERROR,
				})
			);
		}
		setIsLoading(false);
	};

	useEffect(() => {
		const filteredRef =
			filter?.field && filter?.operator && filter?.value
				? collectionPathRef.where(filter.field, filter.operator, filter.value)
				: collectionPathRef;

		const ref = order ? filteredRef.orderBy(order) : filteredRef;
		if (
			options.current.order !== order ||
			options.current.filter?.field !== filter?.field ||
			options.current.filter?.operator !== filter?.operator ||
			options.current.filter?.value !== filter?.value
		) {
			options.current.order = order;
			options.current.filter = filter;
			const unSubscribe = ref.onSnapshot((querySnapshot) => {
				setCollection(
					querySnapshot?.docs?.map((doc) => ({ ...doc.data(), id: doc.id }))
				);
			});
			return () => {
				unSubscribe();
			};
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [collectionPath, order, filter?.field, filter?.operator, filter?.value]);
	return { collection, addDoc, updateDoc, deleteDoc, isLoading };
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
