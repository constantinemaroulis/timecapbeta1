import {useForm} from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        body: '', // This is the body of the post
    });

    function submit(e) {
        e.preventDefault();
        post("/posts");
    }

    console.log(errors);

    return (
        <>
            
            <div>
                <h1 className="title">Create</h1>

                <div className="w-1/2 mx-auto">
                    <form onSubmit={submit}>
                        <textarea rows="10" value={data.body} onChange={(e) => setData('body', e.target.value)} className={errors.body && '!ring-red-700'}></textarea>

                        {errors.body && <div className="text-red-500">{errors.body}</div>}

                        <button className="primary-btn mt-4" disabled={processing}>Create Post</button>
                    </form>
                </div>
            </div>
        </>
    );
}