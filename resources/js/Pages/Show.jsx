import { Link, Head, useForm } from '@inertiajs/react';
import { useRoute } from "../../../vendor/tightenco/ziggy";

export default function Show({ post }) {

    const { delete: destroy } = useForm();
    const route = useRoute();

    function submit(e) {
        e.preventDefault();
        // destroy(`/posts/${post.id}`);
        destroy(route('posts.destroy', post));
    }

    return (
        <>
        <Head>
            <meta name="description" head-key="description" content="Show Post" />
            <title>Show Post</title>   
        </Head>
        <div className="p-4 border-b">
                        <div className="text-sm text-slate-600">
                            <span>Posted on: </span>
                            <span>{new Date(post.created_at).toLocaleTimeString()}</span>
                        </div>

                        <p className="font-medium">{post.body}</p>

                        <div className="flex items-center justify-end gap-2">
                            <form onSubmit={submit}>
                                <button className="bg-red-500 rounded-md text-sm px-4 py-1 text-white">Delete</button>
                            </form>
                            {/*<Link className="bg-green-500 rounded-md text-sm px-4 py-1 text-white" href={`/posts/${post.id}/edit`}>Update</Link>*/}
                            <Link className="bg-green-500 rounded-md text-sm px-4 py-1 text-white" href={route('posts.edit', post)}>Update</Link>
                        </div>

                    </div>
        </>
    );
}