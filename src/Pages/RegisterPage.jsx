import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        rollNumber: '',
        graduation_type: '',
        contactNumber: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/api/auth/addStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                alert(errorData.message)
                console.error('Registration failed:', errorData.message);
            } else {
                console.log('Registration successful!');
                // Reset the form fields
                setFormData({
                    fullName: '',
                    email: '',
                    password: '',
                    rollNumber: '',
                    graduation_type: '',
                    contactNumber: ''
                });
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <div className='flex justify-center items-center '>
            <form onSubmit={handleSubmit} className='bg-gray-200 p-6 rounded shadow-md boder-2 border-black'>
                <h2 className='text-2xl mb-4'>Register</h2>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='fullName'>
                        Full Name
                    </label>
                    <input
                        type='text'
                        id='fullName'
                        name='fullName'
                        value={formData.fullName}
                        onChange={handleChange}
                        className='p-2 border rounded'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                        Email
                    </label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                        className='p-2 border rounded'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='password'>
                        Password
                    </label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                        className='p-2 border rounded'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='rollNumber'>
                        Roll Number
                    </label>
                    <input
                        type='number'
                        id='rollNumber'
                        name='rollNumber'
                        value={formData.rollNumber}
                        onChange={handleChange}
                        className='p-2 border rounded'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='graduation_type'>
                        Graduation Type
                    </label>
                    <input
                        type='text'
                        id='graduation_type'
                        name='graduation_type'
                        value={formData.graduation_type}
                        onChange={handleChange}
                        className='p-2 border rounded'
                        required
                    />
                </div>
                <div className='mb-4'>
                    <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='contactNumber'>
                        Contact Number
                    </label>
                    <input
                        type='number'
                        id='contactNumber'
                        name='contactNumber'
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className='p-2 border rounded'
                        required
                    />
                </div>
                <button
                    type='submit'
                    className="w-full my-5 py-2 bg-[#3dafaa] shadow-lg shadow-[#3dafaa]/50 hover:shadow-[#3dafaa]/40 text-white font-semibold rounded-lg"
                >
                    Register
                </button>
            </form>
        </div>
    );
};

export default Register;
