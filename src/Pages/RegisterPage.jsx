import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import Swal from "sweetalert2";

const Register = () => {
    const location = useLocation();
    const email = location.state?.email || 'your email id';
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: email,
        password: '',
        rollNumber: '',
        graduationType: '',
        branch: '',
        contactNumber: '',
        graduationYear: ''
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
            if(email === 'your email id'){
                alert("Please generate OTP from Login page");
                return;
            }
            if(formData.fullName === '' || formData.password === '' || formData.rollNumber === '' || formData.graduationType === '' || formData.branch === '' || formData.contactNumber === '' || formData.graduationYear === ''){
                alert("Please in fill all fields");
                return;
            }
            setLoading(true);
            const response = await fetch('http://localhost:3000/api/auth/addStudent', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                setLoading(false);
                const errorData = await response.json();
                alert(errorData.message)
            } else {
                setLoading(false);
                Swal.fire('Submitted!', 'You have sucessfully registered to the portal.', 'success').then((result) => {
                    if (result.isConfirmed) {
                      window.location.replace("http://localhost:5173");
                    }
                  });
            }
        } catch (error) {
            console.error('Error during registration:', error);
        }
    };

    return (
        <>
        {
        loading ? (
            <div className="flex justify-center items-center">
            <ClipLoader
                color={"#3dafaa"}
                loading={loading}
                size={100}
                aria-label="Loading Spinner"
                data-testid="loader"
            />
            </div>
        )
        : (

            <div className='flex justify-center items-center '>
                <img
                    src="/Images/iiitdrndblock2.jpeg"
                    className="h-full w-auto object-contain filter blur-sm absolute inset-0"
                    alt="Sample image"
                />
                <form onSubmit={handleSubmit} className='bg-white px-6 rounded shadow-md boder-2 border-black z-10 overflow-auto max-h-[95vh] mt-5'>
                    <div className='flex justify-center sticky top-0 bg-white py-2'>
                        <h2 className='text-2xl text-[#3dafaa] mb-4 font-bold'>Register</h2>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='email'>
                            Email
                        </label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={email}
                            onChange={handleChange}
                            className='p-2 border rounded'
                            disabled
                        />
                    </div>
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
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='graduationType'>
                            Graduation Type
                        </label>
                        <select
                            id='graduationType'
                            name='graduationType'
                            value={formData.graduationType}
                            onChange={handleChange}
                            className='p-2 border rounded'
                            required
                        >
                            <option value=''>Select Graduation Type</option>
                            <option value='btech'>B.Tech</option>
                            <option value='mtech'>M.Tech</option>
                            <option value='phd'>PhD</option>
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='branch'>
                            Branch
                        </label>
                        <select
                            id='branch'
                            name='branch'
                            value={formData.branch}
                            onChange={handleChange}
                            className='p-2 border rounded'
                            required
                        >
                            <option value=''>Select Branch</option>
                            <option value='cse'>CSE</option>
                            <option value='csb'>CSB</option>
                            <option value='csam'>CSAM</option>
                            <option value='csd'>CSD</option>
                            <option value='csai'>CSAI</option>
                            <option value='ece'>ECE</option>
                            <option value='csss'>CSSS</option>
                            <option value='vlsi'>VLSI</option>
                        </select>
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700 text-sm font-bold mb-2' htmlFor='graduationYear'>
                            Graduation Year
                        </label>
                        <input
                            type='number'
                            id='graduationYear'
                            name='graduationYear'
                            value={formData.graduationYear}
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
                    <div className='flex justify-center py-4'>
                        <button
                            type='submit'
                            className="w-full py-2 bg-[#3dafaa] shadow-lg shadow-[#3dafaa]/50 hover:shadow-[#3dafaa]/40 text-white font-semibold rounded-lg"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            )
        }
        </>
    );
};

export default Register;
