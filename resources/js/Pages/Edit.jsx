import { Link, Head, useForm } from '@inertiajs/react';
import { useRoute } from "../../../vendor/tightenco/ziggy";

export default function Create({ post }) {
    const route = useRoute();
    
    const { data, setData, put, processing, errors } = useForm({
        body: post.body, // This is the body of the post
    });

    function submit(e) {
        e.preventDefault();
        // put(`/posts/${post.id}`);
        put(route('posts.update', post));
    }

    console.log(errors);

    return (
        <>
            <Head>
                <meta name="description" head-key="description" content="Edit Post" />
                <title>Edit Post</title>
            </Head>
            <div>
                <h1 className="title">Update your Post</h1>

                <div className="w-1/2 mx-auto">
                    <form onSubmit={submit}>
                        <textarea rows="10" value={data.body} onChange={(e) => setData('body', e.target.value)} className={errors.body && '!ring-red-700'}></textarea>

                        {errors.body && <div className="text-red-500">{errors.body}</div>}

                        <button className="primary-btn mt-4" disabled={processing}>Update Post</button>
                    </form>
                </div>
            </div>
        </>
    );
}