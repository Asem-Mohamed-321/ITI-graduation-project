import { useNavigate } from "react-router-dom";

export default function Dashboard(){
    const navigate = useNavigate();

    return(
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">Admin Dashboard</h1>
                    <p className="text-lg text-gray-600">Manage your application's users and companies</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {/* Red Card - User List */}
                    <div 
                        className="bg-red-500 hover:bg-red-600 transition-all duration-300 transform hover:scale-105 cursor-pointer rounded-lg shadow-lg p-8 text-white"
                        onClick={() => navigate('/admin/users-list')}
                    >
                        <div className="text-center">
                            <div className="bg-red-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">User Management</h3>
                            <p className="text-red-100">View and manage all registered users</p>
                        </div>
                    </div>

                    {/* Blue Card - Company List */}
                    <div 
                        className="bg-blue-500 hover:bg-blue-600 transition-all duration-300 transform hover:scale-105 cursor-pointer rounded-lg shadow-lg p-8 text-white"
                        onClick={() => navigate('/admin/companies-list')}
                    >
                        <div className="text-center">
                            <div className="bg-blue-400 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                </svg>
                            </div>
                            <h3 className="text-2xl font-bold mb-2">Company Management</h3>
                            <p className="text-blue-100">View and manage all registered companies</p>
                        </div>
                    </div>
                </div>

                {/* Additional Stats Section */}
                <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">Quick Actions</div>
                        <p className="text-gray-600">Access frequently used admin functions</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">System Overview</div>
                        <p className="text-gray-600">Monitor application performance</p>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6 text-center">
                        <div className="text-3xl font-bold text-gray-900 mb-2">Settings</div>
                        <p className="text-gray-600">Configure system preferences</p>
                    </div>
                </div>
            </div>
        </div>
    )
}