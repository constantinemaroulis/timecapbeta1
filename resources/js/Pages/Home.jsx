import { Head, Link, usePage } from "@inertiajs/react";
import { useRoute } from "../../../vendor/tightenco/ziggy";
import { useState } from "react";
import Clock from '../Components/Clock';

// preserveScroll is used to keep the scroll position when navigating between pages - Added by Gus

function Home({ posts }) {
    const route = useRoute();
    const { flash } = usePage().props;
    const { component } = usePage();

    const [flashMsg, setFlashMsg] = useState(flash.message);

    setTimeout(() => {
        setFlashMsg(null);
    }, 2000);

    return (
        <>
        <Head title={component}>
            <meta name="description" head-key="description" content={component} />
        </Head>
        <div>
            <div className="container mx-auto">
                <Clock />
            </div>
        </div>
        <div>
            <h1 className="title">Welcome </h1>
            { flashMsg && (<div className="absolute top-24 right-6 bg-rose-500 p-2 rounded-md shadow-lg text-sm text-white">{flashMsg}</div>)}
            { flash.success && (<div className="absolute top-24 right-6 bg-green-500 p-2 rounded-md shadow-lg text-sm text-white">{flash.success}</div>)}
            <div>
                {posts.data.map(post => (
                    <div key={post.id} className="p-4 border-b">
                        <div className="text-sm text-slate-600">
                            <span>Posted on: </span>
                            <span>{new Date(post.created_at).toLocaleTimeString()}</span>
                        </div>

                        <p className="font-medium">{post.body}</p>

                        {/*<Link className="text-link" href={`/posts/${post.id}`}>Read More...</Link>*/}
                        <Link className="text-link" href={route('posts.show', post)}>Read More...</Link>
                    </div>
                ))}
            </div>
            <div className="py-12 px-4">
                {posts.links.map((url) => (
                    url.url ?
                    <Link 
                        key={url.label}
                        href={url.url}
                        dangerouslySetInnerHTML={{ __html: url.label }} 
                        className={`p-1 mx-1 ${
                            url.active ? 'bg-blue-500 text-white' : 'text-blue-500'
                        }`}
                    />
                    :
                    <span
                        key={url.label}
                        dangerouslySetInnerHTML={{ __html: url.label }} 
                        className="p-1 mx-1 text-slate-300"
                    ></span>
                ))}
            </div>
        </div>
            
        </>
    );
}

// Commenting out because it is not needed. Easier way located in app.jsx - Added by Gus
// Home.layout = page => <Layout children={page} /> // This is the layout for the page that is located in Layout.jsx - Added by Gus

export default Home;