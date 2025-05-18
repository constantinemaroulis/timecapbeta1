import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Edit({ item }) {
    const { data, setData, put, processing, errors } = useForm(item);

    function handleSubmit(e) {
        e.preventDefault();
        put(`/timecap-emp-timecard/${item.id}`);
    }

    return (
        <div>
            <h1>Edit Timecap emp timecard</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tc timecard id</label>
                    <input
                        value={data.tc_timecard_id}
                        onChange={e => setData('tc_timecard_id', e.target.value)}
                    />
                    {errors.tc_timecard_id && <div>{errors.tc_timecard_id}</div>}
                </div>
<div>
                    <label>Tc emp id</label>
                    <input
                        value={data.tc_emp_id}
                        onChange={e => setData('tc_emp_id', e.target.value)}
                    />
                    {errors.tc_emp_id && <div>{errors.tc_emp_id}</div>}
                </div>
<div>
                    <label>Tc job id</label>
                    <input
                        value={data.tc_job_id}
                        onChange={e => setData('tc_job_id', e.target.value)}
                    />
                    {errors.tc_job_id && <div>{errors.tc_job_id}</div>}
                </div>
<div>
                    <label>Tc assignments id</label>
                    <input
                        value={data.tc_assignments_id}
                        onChange={e => setData('tc_assignments_id', e.target.value)}
                    />
                    {errors.tc_assignments_id && <div>{errors.tc_assignments_id}</div>}
                </div>
<div>
                    <label>Tc job costcodes</label>
                    <input
                        value={data.tc_job_costcodes}
                        onChange={e => setData('tc_job_costcodes', e.target.value)}
                    />
                    {errors.tc_job_costcodes && <div>{errors.tc_job_costcodes}</div>}
                </div>
<div>
                    <label>Tc emp timecard note</label>
                    <input
                        value={data.tc_emp_timecard_note}
                        onChange={e => setData('tc_emp_timecard_note', e.target.value)}
                    />
                    {errors.tc_emp_timecard_note && <div>{errors.tc_emp_timecard_note}</div>}
                </div>
<div>
                    <label>Tc emp timecard start</label>
                    <input
                        value={data.tc_emp_timecard_start}
                        onChange={e => setData('tc_emp_timecard_start', e.target.value)}
                    />
                    {errors.tc_emp_timecard_start && <div>{errors.tc_emp_timecard_start}</div>}
                </div>
<div>
                    <label>Tc emp timecard end</label>
                    <input
                        value={data.tc_emp_timecard_end}
                        onChange={e => setData('tc_emp_timecard_end', e.target.value)}
                    />
                    {errors.tc_emp_timecard_end && <div>{errors.tc_emp_timecard_end}</div>}
                </div>
<div>
                    <label>Tc emp timecard date</label>
                    <input
                        value={data.tc_emp_timecard_date}
                        onChange={e => setData('tc_emp_timecard_date', e.target.value)}
                    />
                    {errors.tc_emp_timecard_date && <div>{errors.tc_emp_timecard_date}</div>}
                </div>
<div>
                    <label>Tc emp timecard total hours</label>
                    <input
                        value={data.tc_emp_timecard_total_hours}
                        onChange={e => setData('tc_emp_timecard_total_hours', e.target.value)}
                    />
                    {errors.tc_emp_timecard_total_hours && <div>{errors.tc_emp_timecard_total_hours}</div>}
                </div>
<div>
                    <label>Tc emp timecard start photo</label>
                    <input
                        value={data.tc_emp_timecard_start_photo}
                        onChange={e => setData('tc_emp_timecard_start_photo', e.target.value)}
                    />
                    {errors.tc_emp_timecard_start_photo && <div>{errors.tc_emp_timecard_start_photo}</div>}
                </div>
<div>
                    <label>Tc emp timecard end photo</label>
                    <input
                        value={data.tc_emp_timecard_end_photo}
                        onChange={e => setData('tc_emp_timecard_end_photo', e.target.value)}
                    />
                    {errors.tc_emp_timecard_end_photo && <div>{errors.tc_emp_timecard_end_photo}</div>}
                </div>
<div>
                    <label>Tc emp timecard start signature</label>
                    <input
                        value={data.tc_emp_timecard_start_signature}
                        onChange={e => setData('tc_emp_timecard_start_signature', e.target.value)}
                    />
                    {errors.tc_emp_timecard_start_signature && <div>{errors.tc_emp_timecard_start_signature}</div>}
                </div>
<div>
                    <label>Tc emp timecard end signature</label>
                    <input
                        value={data.tc_emp_timecard_end_signature}
                        onChange={e => setData('tc_emp_timecard_end_signature', e.target.value)}
                    />
                    {errors.tc_emp_timecard_end_signature && <div>{errors.tc_emp_timecard_end_signature}</div>}
                </div>
                <button type="submit" disabled={processing}>Save</button>
            </form>
        </div>
    );
}
