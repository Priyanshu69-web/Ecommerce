import Layout from "..//./../components/Layouts/Layout";
import AdminMenu from '..//./../components/AdminMenu';
import {useAuth} from '..//./../components/context/Auth';

const AdminDashboard = () => {
    const[auth]=useAuth();
    return (
        <Layout>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                     <AdminMenu/>
                    </div>
                    <div className="col-9">
                   <h3>{auth?.user?.name}</h3>
                        <h3>{auth?.user?.email}</h3>
                      
                    </div>
                </div>
            </div>

        </Layout>
    )
}
export default AdminDashboard;