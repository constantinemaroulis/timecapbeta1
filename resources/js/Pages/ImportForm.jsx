import React from 'react';
import { useForm } from '@inertiajs/inertia-react';

const ImportForm = () => {
    const { data, setData, post, errors } = useForm({
        file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('employees.import'));
    };

    return (
        <div>
            <h1>Import Data</h1>
            {errors.file && <div>{errors.file}</div>}
            <form onSubmit={handleSubmit}>
                <input
                    type="file"
                    name="file"
                    onChange={(e) => setData('file', e.target.files[0])}
                />
                <button type="submit">Import</button>
            </form>
        </div>
    );
};

export default ImportForm;
