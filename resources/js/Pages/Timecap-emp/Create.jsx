import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        tc_emp_id: '', erp_emp_id: '', tc_emp_ssn6: '', tc_emp_local: '', tc_emp_union: '', tc_emp_classification: '', tc_emp_portal_registered: '', tc_emp_registered_time: '', tc_emp_updated: '', tc_emp_email: '', tc_emp_portal_activate: '', tc_emp_hourly_rate: '', tc_emp_tax_exemption: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/timecap-emp');
    }

    return (
        <div>
            <h1>Create New Timecap emp</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tc emp id</label>
                    <input
                        value={data.tc_emp_id}
                        onChange={e => setData('tc_emp_id', e.target.value)}
                    />
                    {errors.tc_emp_id && <div>{errors.tc_emp_id}</div>}
                </div>
<div>
                    <label>Erp emp id</label>
                    <input
                        value={data.erp_emp_id}
                        onChange={e => setData('erp_emp_id', e.target.value)}
                    />
                    {errors.erp_emp_id && <div>{errors.erp_emp_id}</div>}
                </div>
<div>
                    <label>Tc emp ssn6</label>
                    <input
                        value={data.tc_emp_ssn6}
                        onChange={e => setData('tc_emp_ssn6', e.target.value)}
                    />
                    {errors.tc_emp_ssn6 && <div>{errors.tc_emp_ssn6}</div>}
                </div>
<div>
                    <label>Tc emp local</label>
                    <input
                        value={data.tc_emp_local}
                        onChange={e => setData('tc_emp_local', e.target.value)}
                    />
                    {errors.tc_emp_local && <div>{errors.tc_emp_local}</div>}
                </div>
<div>
                    <label>Tc emp union</label>
                    <input
                        value={data.tc_emp_union}
                        onChange={e => setData('tc_emp_union', e.target.value)}
                    />
                    {errors.tc_emp_union && <div>{errors.tc_emp_union}</div>}
                </div>
<div>
                    <label>Tc emp classification</label>
                    <input
                        value={data.tc_emp_classification}
                        onChange={e => setData('tc_emp_classification', e.target.value)}
                    />
                    {errors.tc_emp_classification && <div>{errors.tc_emp_classification}</div>}
                </div>
<div>
                    <label>Tc emp portal registered</label>
                    <input
                        value={data.tc_emp_portal_registered}
                        onChange={e => setData('tc_emp_portal_registered', e.target.value)}
                    />
                    {errors.tc_emp_portal_registered && <div>{errors.tc_emp_portal_registered}</div>}
                </div>
<div>
                    <label>Tc emp registered time</label>
                    <input
                        value={data.tc_emp_registered_time}
                        onChange={e => setData('tc_emp_registered_time', e.target.value)}
                    />
                    {errors.tc_emp_registered_time && <div>{errors.tc_emp_registered_time}</div>}
                </div>
<div>
                    <label>Tc emp updated</label>
                    <input
                        value={data.tc_emp_updated}
                        onChange={e => setData('tc_emp_updated', e.target.value)}
                    />
                    {errors.tc_emp_updated && <div>{errors.tc_emp_updated}</div>}
                </div>
<div>
                    <label>Tc emp email</label>
                    <input
                        value={data.tc_emp_email}
                        onChange={e => setData('tc_emp_email', e.target.value)}
                    />
                    {errors.tc_emp_email && <div>{errors.tc_emp_email}</div>}
                </div>
<div>
                    <label>Tc emp portal activate</label>
                    <input
                        value={data.tc_emp_portal_activate}
                        onChange={e => setData('tc_emp_portal_activate', e.target.value)}
                    />
                    {errors.tc_emp_portal_activate && <div>{errors.tc_emp_portal_activate}</div>}
                </div>
<div>
                    <label>Tc emp hourly rate</label>
                    <input
                        value={data.tc_emp_hourly_rate}
                        onChange={e => setData('tc_emp_hourly_rate', e.target.value)}
                    />
                    {errors.tc_emp_hourly_rate && <div>{errors.tc_emp_hourly_rate}</div>}
                </div>
<div>
                    <label>Tc emp tax exemption</label>
                    <input
                        value={data.tc_emp_tax_exemption}
                        onChange={e => setData('tc_emp_tax_exemption', e.target.value)}
                    />
                    {errors.tc_emp_tax_exemption && <div>{errors.tc_emp_tax_exemption}</div>}
                </div>
                <button type="submit" disabled={processing}>Save</button>
            </form>
        </div>
    );
}
