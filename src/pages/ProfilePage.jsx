import Header from '../component/Header';
import UpdateProfile from '../component/UpdateProfile';
import Footer from '../component/Footer';
import { useAuth } from '../contexts/AuthContext';


function ProfilePage() {
  const { session } = useAuth();
  return (
    <>
      <Header />
      <UpdateProfile session={session} />
      <Footer />
    </>
  );
}

export default ProfilePage;