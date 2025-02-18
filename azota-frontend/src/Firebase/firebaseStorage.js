import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebase-config";
import { v4 as uuidv4 } from "uuid";

const storage = getStorage(app);

const FirebaseStorage = {
  upload: async (file) => {
    const uniqueFileName = `${uuidv4()}_${file.name}`;
    const storageRef = ref(storage, uniqueFileName);
    const snapshot = await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(snapshot.ref);
    return { downloadURL, filename: file.name };
  },
};

export default FirebaseStorage;
