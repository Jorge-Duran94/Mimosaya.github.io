import { initializeApp} from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore, serverTimestamp } from "firebase/firestore";



// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQQfA84mAl0x4IIP3rxDBL4v2qrZ15kCM",
  authDomain: "mimosasya-2e657.firebaseapp.com",
  projectId: "mimosasya-2e657",
  storageBucket: "mimosasya-2e657.appspot.com",
  messagingSenderId: "391436648457",
  appId: "1:391436648457:web:3e61c040dec445d996f8d8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fbstorage = getStorage(app);
const fbFirestore = getFirestore(app);
const timeStamp = serverTimestamp();

export {fbstorage, fbFirestore, timeStamp}