import { Link } from '@inertiajs/react'; // Intertia Link component which replaces the A tag is used to navigate between pages by intercepting the click event and making a request to the server - Added by Gus

export default function Layout({ children }) {
    return (
        <>
        <div>
            <header>
                <nav>
                    <Link className="nav-link" href="/">Home</Link>
                    <Link className="nav-link" href="/backend">Backend</Link>
                    <Link className="nav-link" href="/posts/create">Create</Link>
                    <Link className="nav-link" href="/about">About</Link>
                </nav>
            </header>
            <main>{children}</main>
        </div>
        </>
    );
}