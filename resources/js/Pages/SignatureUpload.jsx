import React, { useRef } from 'react';
import { useForm } from '@inertiajs/react';

export default function SignatureUpload() {
    const { data, setData, post, processing, errors } = useForm({
        employee_id: '',
        signature: '',
    });

    const canvasRef = useRef();

    const handleSubmit = (e) => {
        e.preventDefault();
        const canvas = canvasRef.current;
        const signature = canvas.toDataURL('image/png');
        setData('signature', signature);
        post('/api/signature-upload');
    };

    return (
        <div>
            <h1>Signature Upload</h1>
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
                    <canvas ref={canvasRef} width="400" height="200" style={{ border: '1px solid black' }}></canvas>
                </div>
                <button type="submit" disabled={processing}>Upload Signature</button>
            </form>
        </div>
    );
}
