import React, { useState } from 'react';
import { useGetAllUserQuery, useUpDateUserMutation, useDeleteUserMutation } from './userApi';

const Users = () => {
    const { data: users, isLoading, isError, error } = useGetAllUserQuery();
    const [updateUser] = useUpDateUserMutation();
    const [deleteUser] = useDeleteUserMutation();

    const [editMode, setEditMode] = useState(null);
    const [formData, setFormData] = useState({ fullName: '', email: '' });

    if (isLoading) return <div className="p-10 text-center text-blue-600 font-bold">טוען משתמשים...</div>;
    if (isError) return <div className="p-10 text-center text-red-500">שגיאה בטעינה: {error?.data?.message || 'בדוק חיבור לשרת'}</div>;

    const handleEditClick = (user) => {
        setEditMode(user.id);
        setFormData({ fullName: user.fullName, email: user.email });
    };

    const handleSave = async (id) => {
        try {
            await updateUser({ id, ...formData }).unwrap();
            setEditMode(null);
            alert("המשתמש עודכן בהצלחה");
        } catch (err) {
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("האם את בטוחה שברצונך למחוק משתמש זה?")) {
            try {
                await deleteUser(id).unwrap();
                alert("משתמש נמחק");
            } catch (err) {
            }
        }
    };

    return (
        <div className="p-8 max-w-4xl mx-auto">
            <h1 className="text-2xl font-black mb-6 border-b pb-2">ניהול משתמשים במערכת</h1>
            <div className="bg-white shadow-xl rounded-2xl overflow-hidden border">
                <table className="w-full text-right">
                    <thead className="bg-slate-100 border-b">
                        <tr>
                            <th className="p-4">שם מלא</th>
                            <th className="p-4">אימייל</th>
                            <th className="p-4 text-center">פעולות</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((user) => (
                            <tr key={user.id} className="border-b hover:bg-slate-50 transition-colors">
                                <td className="p-4">
                                    {editMode === user.id ? (
                                        <input 
                                            className="border p-1 rounded w-full"
                                            value={formData.fullName}
                                            onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                                        />
                                    ) : user.fullName}
                                </td>
                                <td className="p-4">
                                    {editMode === user.id ? (
                                        <input 
                                            className="border p-1 rounded w-full"
                                            value={formData.email}
                                            onChange={(e) => setFormData({...formData, email: e.target.value})}
                                        />
                                    ) : user.email}
                                </td>
                                <td className="p-4 flex justify-center gap-2">
                                    {editMode === user.id ? (
                                        <button onClick={() => handleSave(user.id)} className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm">שמור</button>
                                    ) : (
                                        <button onClick={() => handleEditClick(user)} className="bg-blue-600 text-white px-3 py-1 rounded-lg text-sm">ערוך</button>
                                    )}
                                    <button onClick={() => handleDelete(user.id)} className="bg-red-600 text-white px-3 py-1 rounded-lg text-sm">מחק</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Users;