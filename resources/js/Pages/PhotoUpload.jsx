import React, { useRef } from 'react';
import { useForm } from '@inertiajs/react';

export default function PhotoUpload() {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: '',
        photo: null,
    });

    const fileInput = useRef();

    const handleFileChange = (e) => {
        setData('photo', e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post('/api/photo-upload', {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
    };

    return (
        <div>
            <h1>Photo Upload</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Employee ID:</label>
                    <input
                        type="text"
                        value={data.employee_id}
                        onChange={(e) => setData('employee_id', e.target.value)}
                    />
                    {errors.employee_id && <div>{errors.employee_id}</div>}
                </div>
                <div>
                    <label>Photo:</label>
                    <input
                        type="file"
                        ref={fileInput}
                        onChange={handleFileChange}
                    />
                    {errors.photo && <div>{errors.photo}</div>}
                </div>
                <button type="submit" disabled={processing}>Upload Photo</button>
            </form>
        </div>
    );
}
