import React from 'react';
import { useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        tc_payroll_id: '', tc_emp_id: '', tc_payroll_start_date: '', tc_payroll_end_date: '', tc_total_hours: '', tc_hourly_rate: '', tc_gross_pay: '', tc_tax_withheld: '', tc_net_pay: '', tc_payroll_generated_at: ''
    });

    function handleSubmit(e) {
        e.preventDefault();
        post('/timecap-payroll');
    }

    return (
        <div>
            <h1>Create New Timecap payroll</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Tc payroll id</label>
                    <input
                        value={data.tc_payroll_id}
                        onChange={e => setData('tc_payroll_id', e.target.value)}
                    />
                    {errors.tc_payroll_id && <div>{errors.tc_payroll_id}</div>}
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
                    <label>Tc payroll start date</label>
                    <input
                        value={data.tc_payroll_start_date}
                        onChange={e => setData('tc_payroll_start_date', e.target.value)}
                    />
                    {errors.tc_payroll_start_date && <div>{errors.tc_payroll_start_date}</div>}
                </div>
<div>
                    <label>Tc payroll end date</label>
                    <input
                        value={data.tc_payroll_end_date}
                        onChange={e => setData('tc_payroll_end_date', e.target.value)}
                    />
                    {errors.tc_payroll_end_date && <div>{errors.tc_payroll_end_date}</div>}
                </div>
<div>
                    <label>Tc total hours</label>
                    <input
                        value={data.tc_total_hours}
                        onChange={e => setData('tc_total_hours', e.target.value)}
                    />
                    {errors.tc_total_hours && <div>{errors.tc_total_hours}</div>}
                </div>
<div>
                    <label>Tc hourly rate</label>
                    <input
                        value={data.tc_hourly_rate}
                        onChange={e => setData('tc_hourly_rate', e.target.value)}
                    />
                    {errors.tc_hourly_rate && <div>{errors.tc_hourly_rate}</div>}
                </div>
<div>
                    <label>Tc gross pay</label>
                    <input
                        value={data.tc_gross_pay}
                        onChange={e => setData('tc_gross_pay', e.target.value)}
                    />
                    {errors.tc_gross_pay && <div>{errors.tc_gross_pay}</div>}
                </div>
<div>
                    <label>Tc tax withheld</label>
                    <input
                        value={data.tc_tax_withheld}
                        onChange={e => setData('tc_tax_withheld', e.target.value)}
                    />
                    {errors.tc_tax_withheld && <div>{errors.tc_tax_withheld}</div>}
                </div>
<div>
                    <label>Tc net pay</label>
                    <input
                        value={data.tc_net_pay}
                        onChange={e => setData('tc_net_pay', e.target.value)}
                    />
                    {errors.tc_net_pay && <div>{errors.tc_net_pay}</div>}
                </div>
<div>
                    <label>Tc payroll generated at</label>
                    <input
                        value={data.tc_payroll_generated_at}
                        onChange={e => setData('tc_payroll_generated_at', e.target.value)}
                    />
                    {errors.tc_payroll_generated_at && <div>{errors.tc_payroll_generated_at}</div>}
                </div>
                <button type="submit" disabled={processing}>Save</button>
            </form>
        </div>
    );
}
